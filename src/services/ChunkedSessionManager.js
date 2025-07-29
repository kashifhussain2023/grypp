/**
 * OpenTok Session Manager for handling chunked data transmission
 * Handles large package data by breaking it into chunks and reassembling on receiver side
 */

// Maximum size for OpenTok signals (in bytes) - keeping it safe under the 8KB limit
const MAX_SIGNAL_SIZE = 6000;
const CHUNK_TIMEOUT = 10000; // 10 seconds timeout for chunk reception

export class ChunkedSessionManager {
  constructor() {
    this.pendingChunks = new Map(); // Store pending chunk assemblies
    this.chunkTimeouts = new Map(); // Store timeouts for cleanup
    this.progressCallbacks = new Map(); // Store progress callbacks
  }

  /**
   * Split large data into manageable chunks
   * @param {Object} data - Data to be chunked
   * @param {string} messageId - Unique identifier for this message
   * @returns {Array} Array of chunk objects
   */
  createChunks(data, messageId) {
    const jsonString = JSON.stringify(data);
    const totalSize = new Blob([jsonString]).size;
    
    // If data is small enough, send as single chunk
    if (totalSize <= MAX_SIGNAL_SIZE) {
      return [{
        messageId,
        chunkIndex: 0,
        totalChunks: 1,
        isLast: true,
        data: jsonString,
        size: totalSize
      }];
    }

    const chunks = [];
    const chunkSize = MAX_SIGNAL_SIZE - 200; // Reserve space for metadata
    let chunkIndex = 0;
    
    for (let i = 0; i < jsonString.length; i += chunkSize) {
      const chunk = jsonString.slice(i, i + chunkSize);
      const isLast = i + chunkSize >= jsonString.length;
      
      chunks.push({
        messageId,
        chunkIndex,
        totalChunks: Math.ceil(jsonString.length / chunkSize),
        isLast,
        data: chunk,
        size: new Blob([chunk]).size
      });
      
      chunkIndex++;
    }
    
    return chunks;
  }

  /**
   * Send chunked data through OpenTok session
   * @param {Object} session - OpenTok session
   * @param {Object} data - Data to send
   * @param {string} signalType - Signal type (e.g., 'package-share-chunk')
   * @param {Function} onProgress - Progress callback function
   * @param {Function} onComplete - Completion callback function
   * @param {Function} onError - Error callback function
   */
  sendChunkedData(session, data, signalType, onProgress, onComplete, onError) {
    const messageId = this.generateMessageId();
    const chunks = this.createChunks(data, messageId);
    
    console.log(`📦 Sending ${chunks.length} chunks for message ${messageId}`);
    
    // Send metadata first
    session.signal({
      type: `${signalType}-metadata`,
      data: JSON.stringify({
        messageId,
        totalChunks: chunks.length,
        totalSize: chunks.reduce((sum, chunk) => sum + chunk.size, 0),
        timestamp: Date.now()
      })
    }, (error) => {
      if (error) {
        console.error('Failed to send metadata:', error);
        onError?.(error);
        return;
      }
      
      // Send chunks with delay to avoid overwhelming the connection
      this.sendChunksSequentially(session, chunks, signalType, 0, onProgress, onComplete, onError);
    });
  }

  /**
   * Send chunks sequentially with small delays
   */
  sendChunksSequentially(session, chunks, signalType, index, onProgress, onComplete, onError) {
    if (index >= chunks.length) {
      onComplete?.();
      return;
    }

    const chunk = chunks[index];
    
    session.signal({
      type: signalType,
      data: JSON.stringify(chunk)
    }, (error) => {
      if (error) {
        console.error(`Failed to send chunk ${index}:`, error);
        onError?.(error);
        return;
      }
      
      const progress = ((index + 1) / chunks.length) * 100;
      onProgress?.(progress, index + 1, chunks.length);
      
      console.log(`📦 Sent chunk ${index + 1}/${chunks.length} (${progress.toFixed(1)}%)`);
      
      if (index + 1 < chunks.length) {
        // Small delay between chunks to avoid overwhelming the connection
        setTimeout(() => {
          this.sendChunksSequentially(session, chunks, signalType, index + 1, onProgress, onComplete, onError);
        }, 50);
      } else {
        onComplete?.();
      }
    });
  }

  /**
   * Handle incoming chunk metadata
   * @param {Object} session - OpenTok session
   * @param {Object} metadata - Metadata object
   * @param {Function} onProgress - Progress callback
   * @param {Function} onComplete - Completion callback
   * @param {Function} onError - Error callback
   */
  handleChunkMetadata(session, metadata, onProgress, onComplete, onError) {
    const { messageId, totalChunks, totalSize } = metadata;
    
    console.log(`📦 Receiving chunked message ${messageId}: ${totalChunks} chunks, ${totalSize} bytes`);
    
    // Initialize chunk assembly
    this.pendingChunks.set(messageId, {
      chunks: new Array(totalChunks),
      receivedCount: 0,
      totalChunks,
      totalSize,
      onProgress,
      onComplete,
      onError
    });
    
    // Set timeout for cleanup
    const timeout = setTimeout(() => {
      console.error(`📦 Timeout waiting for chunks for message ${messageId}`);
      this.cleanupPendingChunks(messageId);
      onError?.(new Error('Chunk reception timeout'));
    }, CHUNK_TIMEOUT);
    
    this.chunkTimeouts.set(messageId, timeout);
  }

  /**
   * Handle incoming chunk
   * @param {Object} chunkData - Chunk data object
   */
  handleChunk(chunkData) {
    const { messageId, chunkIndex, totalChunks, data } = chunkData;
    
    const pending = this.pendingChunks.get(messageId);
    if (!pending) {
      console.warn(`📦 Received chunk for unknown message ${messageId}`);
      return;
    }
    
    // Store chunk
    pending.chunks[chunkIndex] = data;
    pending.receivedCount++;
    
    console.log(`📦 Received chunk ${chunkIndex + 1}/${totalChunks} for message ${messageId}`);
    
    // Update progress
    const progress = (pending.receivedCount / totalChunks) * 100;
    pending.onProgress?.(progress, pending.receivedCount, totalChunks);
    
    // Check if all chunks received
    if (pending.receivedCount === totalChunks) {
      this.assembleChunks(messageId);
    }
  }

  /**
   * Assemble chunks into original data
   * @param {string} messageId - Message identifier
   */
  assembleChunks(messageId) {
    const pending = this.pendingChunks.get(messageId);
    if (!pending) return;
    
    try {
      // Concatenate all chunks
      const fullData = pending.chunks.join('');
      const parsedData = JSON.parse(fullData);
      
      console.log(`📦 Successfully assembled message ${messageId}`);
      
      // Clear timeout
      const timeout = this.chunkTimeouts.get(messageId);
      if (timeout) {
        clearTimeout(timeout);
        this.chunkTimeouts.delete(messageId);
      }
      
      // Call completion callback
      pending.onComplete?.(parsedData);
      
      // Cleanup
      this.cleanupPendingChunks(messageId);
      
    } catch (error) {
      console.error(`📦 Failed to assemble chunks for message ${messageId}:`, error);
      pending.onError?.(error);
      this.cleanupPendingChunks(messageId);
    }
  }

  /**
   * Clean up pending chunks and timeouts
   * @param {string} messageId - Message identifier
   */
  cleanupPendingChunks(messageId) {
    this.pendingChunks.delete(messageId);
    
    const timeout = this.chunkTimeouts.get(messageId);
    if (timeout) {
      clearTimeout(timeout);
      this.chunkTimeouts.delete(messageId);
    }
  }

  /**
   * Generate unique message ID
   * @returns {string} Unique message ID
   */
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clean up all pending operations (call on session disconnect)
   */
  cleanup() {
    // Clear all timeouts
    this.chunkTimeouts.forEach(timeout => clearTimeout(timeout));
    
    // Clear all maps
    this.pendingChunks.clear();
    this.chunkTimeouts.clear();
    this.progressCallbacks.clear();
    
    console.log('📦 ChunkedSessionManager cleaned up');
  }
}

// Export singleton instance
export const chunkedSessionManager = new ChunkedSessionManager();