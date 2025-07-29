import { openTokSessionSingleton } from './OpenTokSessionManager';

/**
 * Centralized scroll synchronization manager
 * Manages multiple scroll containers and their synchronization states
 */
class ScrollSyncManager {
  constructor() {
    if (ScrollSyncManager.instance) {
      return ScrollSyncManager.instance;
    }
    
    this.containers = new Map(); // Map of containerId -> container data
    this.isEnabled = true;
    this.userType = null;
    this.session = null;
    this.signalHandlers = new Map();
    
    ScrollSyncManager.instance = this;
  }

  /**
   * Get the singleton instance
   */
  static getInstance() {
    if (!ScrollSyncManager.instance) {
      ScrollSyncManager.instance = new ScrollSyncManager();
    }
    return ScrollSyncManager.instance;
  }

  /**
   * Initialize the scroll sync manager
   * @param {string} userType - 'agent' or 'customer'
   * @param {Object} session - OpenTok session object
   */
  initialize(userType, session) {
    this.userType = userType;
    this.session = session;
    this.isEnabled = true;
    
    console.log(`📊 ScrollSyncManager initialized for ${userType}`);
    
    // Set up signal handlers for all container types
    this.setupSignalHandlers();
  }

  /**
   * Set up signal handlers for all scroll sync container types
   */
  setupSignalHandlers() {
    const containerTypes = [
      'catalog',
      'comparison', 
      'details',
      'modal',
      'drawer',
      'package-list'
    ];

    containerTypes.forEach(containerType => {
      const signalType = `cobrowse-${containerType}-scroll-sync`;
      const handler = this.createScrollSignalHandler(containerType);
      
      this.signalHandlers.set(signalType, handler);
      openTokSessionSingleton.registerSignalHandler(`signal:${signalType}`, handler);
    });

    // Also register the general comparison signal handler
    const comparisonHandler = this.createScrollSignalHandler('comparison');
    this.signalHandlers.set('cobrowse-comparison-scroll-sync', comparisonHandler);
    openTokSessionSingleton.registerSignalHandler('signal:cobrowse-comparison-scroll-sync', comparisonHandler);
  }

  /**
   * Create a scroll signal handler for a specific container type
   * @param {string} containerType - Type of container
   * @returns {Function} Signal handler function
   */
  createScrollSignalHandler(containerType) {
    return (event) => {
      if (!this.isEnabled) return;

      try {
        const data = JSON.parse(event.data);
        
        // Ignore signals from same user type or different container type
        if (data.userType === this.userType || data.containerType !== containerType) {
          return;
        }

        console.log(`📊 [${this.userType}] Received scroll signal for ${containerType}:`, data);

        // Find and update the corresponding container
        const container = this.containers.get(data.containerId || containerType);
        if (container && container.onScrollSync) {
          container.onScrollSync(data.scrollTop, data.scrollLeft);
        }

      } catch (err) {
        console.error(`📊 Failed to parse scroll signal for ${containerType}:`, err);
      }
    };
  }

  /**
   * Register a scroll container
   * @param {string} containerId - Unique identifier for the container
   * @param {Object} containerData - Container data including ref and callbacks
   */
  registerContainer(containerId, containerData) {
    this.containers.set(containerId, {
      ...containerData,
      id: containerId,
      isActive: false,
      lastScrollPosition: { scrollTop: 0, scrollLeft: 0 }
    });
    
    console.log(`📊 Registered scroll container: ${containerId}`);
  }

  /**
   * Unregister a scroll container
   * @param {string} containerId - Container identifier
   */
  unregisterContainer(containerId) {
    this.containers.delete(containerId);
    console.log(`📊 Unregistered scroll container: ${containerId}`);
  }

  /**
   * Send scroll position for a specific container
   * @param {string} containerId - Container identifier
   * @param {number} scrollTop - Vertical scroll position
   * @param {number} scrollLeft - Horizontal scroll position
   * @param {string} containerType - Type of container
   */
  sendScrollPosition(containerId, scrollTop, scrollLeft, containerType = 'catalog') {
    if (!this.isEnabled || !this.session) return;

    const scrollData = {
      scrollTop,
      scrollLeft,
      userType: this.userType,
      containerType,
      containerId,
      timestamp: Date.now()
    };

    const signalType = `cobrowse-${containerType}-scroll-sync`;

    openTokSessionSingleton.sendSignal(
      {
        type: signalType,
        data: JSON.stringify(scrollData)
      },
      (err) => {
        if (err) {
          console.error(`📊 Failed to send scroll signal for ${containerId}:`, err);
        }
      }
    );
  }

  /**
   * Enable or disable scroll synchronization
   * @param {boolean} enabled - Whether to enable scroll sync
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
    console.log(`📊 Scroll sync ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Get all registered containers
   * @returns {Map} Map of registered containers
   */
  getContainers() {
    return this.containers;
  }

  /**
   * Get a specific container
   * @param {string} containerId - Container identifier
   * @returns {Object|null} Container data or null
   */
  getContainer(containerId) {
    return this.containers.get(containerId);
  }

  /**
   * Update container scroll position
   * @param {string} containerId - Container identifier
   * @param {number} scrollTop - Vertical scroll position
   * @param {number} scrollLeft - Horizontal scroll position
   */
  updateContainerPosition(containerId, scrollTop, scrollLeft) {
    const container = this.containers.get(containerId);
    if (container) {
      container.lastScrollPosition = { scrollTop, scrollLeft };
    }
  }

  /**
   * Set container as active controller
   * @param {string} containerId - Container identifier
   * @param {boolean} isActive - Whether container is active
   */
  setContainerActive(containerId, isActive) {
    const container = this.containers.get(containerId);
    if (container) {
      container.isActive = isActive;
    }
  }

  /**
   * Cleanup and reset the manager
   */
  cleanup() {
    console.log('📊 Cleaning up ScrollSyncManager');
    
    // Unregister all signal handlers
    this.signalHandlers.forEach((handler, signalType) => {
      openTokSessionSingleton.unregisterSignalHandler(`signal:${signalType}`);
    });
    
    this.containers.clear();
    this.signalHandlers.clear();
    this.isEnabled = false;
    this.userType = null;
    this.session = null;
  }

  /**
   * Get scroll sync statistics
   * @returns {Object} Statistics about scroll sync usage
   */
  getStats() {
    return {
      enabled: this.isEnabled,
      userType: this.userType,
      containerCount: this.containers.size,
      containers: Array.from(this.containers.keys()),
      activeContainers: Array.from(this.containers.values())
        .filter(container => container.isActive)
        .map(container => container.id)
    };
  }
}

// Export singleton instance
export const scrollSyncManager = ScrollSyncManager.getInstance();

// Export the class for testing purposes
export { ScrollSyncManager };