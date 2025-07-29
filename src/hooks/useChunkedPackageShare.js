import { useState, useCallback, useRef, useEffect } from 'react';
import { openTokSessionSingleton } from '../services/OpenTokSessionManager';

/**
 * Custom hook for handling chunked package sharing over OpenTok sessions
 * Uses the singleton session manager for better session handling
 */
export const useChunkedPackageShare = () => {
  console.log('📦 useChunkedPackageShare: Hook called');
  
  const [isReceiving, setIsReceiving] = useState(false);
  const [receivingProgress, setReceivingProgress] = useState(0);
  const [receivingDetails, setReceivingDetails] = useState({
    chunksReceived: 0,
    totalChunks: 0,
    messageId: null,
    estimatedSize: 0
  });
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [error, setError] = useState(null);

  // Refs for cleanup
  const currentMessageRef = useRef(null);
  const sessionManager = openTokSessionSingleton.getSessionManager();

  /**
   * Send chunked package data to the session
   * @param {Array} packages - Package data to send
   * @param {Function} onComplete - Callback when sending is complete
   * @param {Function} onError - Callback when sending fails
   */
  const sendPackages = useCallback(async (packages, onComplete, onError) => {
    const session = openTokSessionSingleton.getSession();
    if (!session) {
      const error = new Error('No active session');
      setError(error);
      onError?.(error);
      return;
    }

    if (!packages || !Array.isArray(packages)) {
      const error = new Error('Invalid package data');
      setError(error);
      onError?.(error);
      return;
    }

    try {
      setIsSending(true);
      setSendingProgress(0);
      setError(null);

      const packageData = { packages };

      sessionManager.sendChunkedData(
        session,
        packageData,
        'package-share-chunk',
        // Progress callback
        (progress, sentChunks, totalChunks) => {
          setSendingProgress(progress);
          console.log(`📦 Sending progress: ${progress.toFixed(1)}% (${sentChunks}/${totalChunks})`);
        },
        // Complete callback
        () => {
          setIsSending(false);
          setSendingProgress(100);
          console.log('📦 Package sending completed successfully');
          onComplete?.();
        },
        // Error callback
        (error) => {
          setIsSending(false);
          setSendingProgress(0);
          setError(error);
          console.error('📦 Package sending failed:', error);
          onError?.(error);
        }
      );
    } catch (error) {
      setIsSending(false);
      setSendingProgress(0);
      setError(error);
      onError?.(error);
    }
  }, [sessionManager]);

  /**
   * Handle incoming chunk metadata signal
   */
  const handleChunkMetadata = useCallback((event) => {
    console.log('📦 CUSTOMER: Received chunk metadata signal:', event);
    
    const session = openTokSessionSingleton.getSession();
    if (!session) {
      console.warn('📦 CUSTOMER: No session available for chunk metadata handling');
      return;
    }
    
    try {
      const metadata = JSON.parse(event.data);
      currentMessageRef.current = metadata.messageId;
      
      setIsReceiving(true);
      setReceivingProgress(0);
      setReceivingDetails({
        chunksReceived: 0,
        totalChunks: metadata.totalChunks,
        messageId: metadata.messageId,
        estimatedSize: metadata.totalSize
      });
      setError(null);

      console.log(`📦 CUSTOMER: Starting to receive chunked package data: ${metadata.totalChunks} chunks, ${metadata.totalSize} bytes`);

      sessionManager.handleChunkMetadata(
        session,
        metadata,
        // Progress callback
        (progress, receivedChunks, totalChunks) => { // eslint-disable-line no-unused-vars
          setReceivingProgress(progress);
          setReceivingDetails(prev => ({
            ...prev,
            chunksReceived: receivedChunks
          }));
        },
        // Complete callback
        (assembledData) => {
          setIsReceiving(false);
          setReceivingProgress(100);
          currentMessageRef.current = null;
          
          console.log(`📦 CHUNKED HOOK: Successfully received and assembled package data: ${assembledData.packages?.length} packages`);
          console.log('📦 CHUNKED HOOK: Assembled data structure:', assembledData);
          console.log('📦 CHUNKED HOOK: Assembled data type:', typeof assembledData);
          console.log('📦 CHUNKED HOOK: Assembled data keys:', Object.keys(assembledData));
          
          // Trigger the original package-share logic
          if (assembledData.packages && Array.isArray(assembledData.packages)) {
            // Create a synthetic event to maintain compatibility
            const syntheticEvent = {
              data: JSON.stringify(assembledData),
              type: 'signal:package-share'
            };
            
            console.log('📦 CHUNKED HOOK: Created synthetic event:', syntheticEvent);
            console.log('📦 CHUNKED HOOK: Synthetic event data:', syntheticEvent.data);
            console.log('📦 CHUNKED HOOK: window.chunkedPackageReceived exists:', !!window.chunkedPackageReceived);
            
            // Dispatch to any registered package share handlers
            if (window.chunkedPackageReceived) {
              console.log('📦 CHUNKED HOOK: Calling window.chunkedPackageReceived');
              window.chunkedPackageReceived(syntheticEvent);
            } else {
              console.error('📦 CHUNKED HOOK: window.chunkedPackageReceived callback not found!');
            }
          } else {
            console.error('📦 CHUNKED HOOK: Invalid assembled data structure:', assembledData);
            console.error('📦 CHUNKED HOOK: packages property:', assembledData.packages);
            console.error('📦 CHUNKED HOOK: packages is array:', Array.isArray(assembledData.packages));
          }
        },
        // Error callback
        (error) => {
          setIsReceiving(false);
          setReceivingProgress(0);
          setError(error);
          currentMessageRef.current = null;
          console.error('📦 Failed to receive chunked package data:', error);
        }
      );
    } catch (error) {
      console.error('📦 Failed to parse chunk metadata:', error);
      setError(error);
    }
  }, [sessionManager]);

  /**
   * Handle incoming chunk signal
   */
  const handleChunk = useCallback((event) => {
    console.log('📦 CUSTOMER: Received chunk signal:', event);
    try {
      const chunkData = JSON.parse(event.data);
      
      // Only process chunks for the current message
      if (chunkData.messageId !== currentMessageRef.current) {
        console.warn(`📦 CUSTOMER: Received chunk for different message: ${chunkData.messageId} vs ${currentMessageRef.current}`);
        return;
      }

      console.log(`📦 CUSTOMER: Processing chunk ${chunkData.chunkIndex + 1}/${chunkData.totalChunks} for message ${chunkData.messageId}`);
      sessionManager.handleChunk(chunkData);
    } catch (error) {
      console.error('📦 CUSTOMER: Failed to parse chunk data:', error);
      setError(error);
    }
  }, [sessionManager]);

  // Register signal handlers when session becomes available
  useEffect(() => {
    const handleSessionInitialized = () => {
      console.log('📦 useChunkedPackageShare: Session initialized, registering signal handlers');
      
      // Register chunked package signal handlers
      openTokSessionSingleton.registerSignalHandler('signal:package-share-chunk-metadata', handleChunkMetadata);
      openTokSessionSingleton.registerSignalHandler('signal:package-share-chunk', handleChunk);
    };

    // If session is already available, register handlers immediately
    if (openTokSessionSingleton.isSessionAvailable()) {
      handleSessionInitialized();
    }

    // Listen for session initialization
    openTokSessionSingleton.addListener('sessionInitialized', handleSessionInitialized);

    return () => {
      openTokSessionSingleton.removeListener('sessionInitialized', handleSessionInitialized);
    };
  }, [handleChunkMetadata, handleChunk]);

  /**
   * Cleanup function to call when session ends
   */
  const cleanup = useCallback(() => {
    sessionManager.cleanup();
    setIsReceiving(false);
    setIsSending(false);
    setReceivingProgress(0);
    setSendingProgress(0);
    setError(null);
    setReceivingDetails({
      chunksReceived: 0,
      totalChunks: 0,
      messageId: null,
      estimatedSize: 0
    });
    currentMessageRef.current = null;
  }, [sessionManager]);

  /**
   * Get human-readable file size
   */
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    // States
    isReceiving,
    receivingProgress,
    receivingDetails: {
      ...receivingDetails,
      formattedSize: formatFileSize(receivingDetails.estimatedSize)
    },
    isSending,
    sendingProgress,
    error,
    
    // Functions
    sendPackages,
    cleanup,
    formatFileSize,
    handleChunkMetadata,
    handleChunk,
    
    // Status helpers
    isActive: isReceiving || isSending,
    canSend: !isReceiving && !isSending && openTokSessionSingleton.isSessionAvailable(),
  };
}; 