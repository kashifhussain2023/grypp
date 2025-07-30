import { openTokSessionSingleton } from './OpenTokSessionManager';

/**
 * Singleton pattern for Package Details Co-browsing management
 * Provides centralized bi-directional co-browsing for package details modal
 */
class PackageDetailsCoBrowseSingleton {
  constructor() {
    if (PackageDetailsCoBrowseSingleton.instance) {
      return PackageDetailsCoBrowseSingleton.instance;
    }

    this.isInitialized = false;
    this.listeners = new Map();
    this.signalHandlers = new Map();
    this.isIncomingActionRef = { current: false };

    PackageDetailsCoBrowseSingleton.instance = this;
  }

  /**
   * Get the singleton instance
   */
  static getInstance() {
    if (!PackageDetailsCoBrowseSingleton.instance) {
      PackageDetailsCoBrowseSingleton.instance = new PackageDetailsCoBrowseSingleton();
    }
    return PackageDetailsCoBrowseSingleton.instance;
  }

  /**
   * Initialize the co-browsing manager
   */
  initialize() {
    if (this.isInitialized) {
      console.log('📦 Package Details Co-browsing already initialized');
      return;
    }

    console.log('📦 Initializing Package Details Co-browsing singleton');
    this.isInitialized = true;

    // Register signal handlers
    this.registerSignalHandlers();
  }

  /**
   * Register all signal handlers for package details co-browsing
   */
  registerSignalHandlers() {
    const session = openTokSessionSingleton.getSession();
    if (!session) {
      console.warn('📦 Cannot register signal handlers: No session available');
      return false;
    }

    const handlers = {
      'package-details-tab-change': this.handleTabChange.bind(this),
      'package-details-image-select': this.handleImageSelect.bind(this),
      'package-details-day-select': this.handleDaySelect.bind(this),
      'package-details-fullscreen-toggle': this.handleFullscreenToggle.bind(this),
      'package-details-slideshow-toggle': this.handleSlideshowToggle.bind(this),
      'package-details-image-navigate': this.handleImageNavigate.bind(this),
      'package-details-zoom-change': this.handleZoomChange.bind(this),
      'package-details-scroll-sync': this.handleScrollSync.bind(this),
      'package-details-comparison-action': this.handleComparisonAction.bind(this),
      'package-details-payment-action': this.handlePaymentAction.bind(this),
      'package-details-modal-open': this.handleModalOpen.bind(this),
      'package-details-modal-close': this.handleModalClose.bind(this),
    };

    Object.entries(handlers).forEach(([signalType, handler]) => {
      this.signalHandlers.set(signalType, handler);
      openTokSessionSingleton.registerSignalHandler(`signal:${signalType}`, handler);
    });

    console.log('📦 Registered package details co-browsing signal handlers');
    return true;
  }

  /**
   * Unregister all signal handlers
   */
  unregisterSignalHandlers() {
    const session = openTokSessionSingleton.getSession();
    if (!session) return;

    this.signalHandlers.forEach((handler, signalType) => {
      openTokSessionSingleton.unregisterSignalHandler(`signal:${signalType}`);
    });

    this.signalHandlers.clear();
    console.log('📦 Unregistered package details co-browsing signal handlers');
  }

  /**
   * Send a package details action signal
   * @param {string} actionType - Type of action
   * @param {Object} data - Action data
   * @param {string} userType - 'agent' or 'customer'
   */
  sendAction(actionType, data, userType) {
    if (this.isIncomingActionRef.current) {
      return; // Don't send signals for incoming actions
    }

    const session = openTokSessionSingleton.getSession();
    if (!session) {
      console.warn('📦 Cannot send action: No session available');
      return false;
    }

    const signalData = {
      type: actionType,
      userType,
      data,
      timestamp: Date.now()
    };

    console.log(`📦 [${userType}] Sending package details action:`, actionType, data);

    openTokSessionSingleton.sendSignal(
      {
        type: `package-details-${actionType}`,
        data: JSON.stringify(signalData)
      },
      (err) => {
        if (err) {
          console.error('📦 Package details action signal error:', err);
        } else {
          console.log(`📦 [${userType}] Package details action sent successfully:`, actionType);
        }
      }
    );

    return true;
  }

  /**
   * Add a listener for package details events
   * @param {string} eventType - Event type
   * @param {Function} callback - Callback function
   */
  addListener(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType).add(callback);
  }

  /**
   * Remove a listener
   * @param {string} eventType - Event type
   * @param {Function} callback - Callback function
   */
  removeListener(eventType, callback) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  /**
   * Notify listeners of an event
   * @param {string} eventType - Event type
   * @param {Object} data - Event data
   */
  notifyListeners(eventType, data) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('📦 Error in package details listener:', error);
        }
      });
    }
  }

  // Signal handlers for incoming actions
  handleTabChange(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received tab change signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('tabChange', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling tab change signal:', error);
    }
  }

  handleImageSelect(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received image select signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('imageSelect', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling image select signal:', error);
    }
  }

  handleDaySelect(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received day select signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('daySelect', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling day select signal:', error);
    }
  }

  handleFullscreenToggle(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received fullscreen toggle signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('fullscreenToggle', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 150);
    } catch (error) {
      console.error('📦 Error handling fullscreen toggle signal:', error);
    }
  }

  handleSlideshowToggle(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received slideshow toggle signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('slideshowToggle', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling slideshow toggle signal:', error);
    }
  }

  handleImageNavigate(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received image navigate signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('imageNavigate', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 150);
    } catch (error) {
      console.error('📦 Error handling image navigate signal:', error);
    }
  }

  handleZoomChange(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received zoom change signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('zoomChange', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 150);
    } catch (error) {
      console.error('📦 Error handling zoom change signal:', error);
    }
  }

  handleScrollSync(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received scroll sync signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('scrollSync', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling scroll sync signal:', error);
    }
  }

  handleComparisonAction(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received comparison action signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('comparisonAction', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling comparison action signal:', error);
    }
  }

  handlePaymentAction(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received payment action signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('paymentAction', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling payment action signal:', error);
    }
  }

  handleModalOpen(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received modal open signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('modalOpen', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling modal open signal:', error);
    }
  }

  handleModalClose(event) {
    try {
      const data = JSON.parse(event.data);
      console.log('📦 Received modal close signal:', data);

      this.isIncomingActionRef.current = true;
      this.notifyListeners('modalClose', data);

      setTimeout(() => {
        this.isIncomingActionRef.current = false;
      }, 50);
    } catch (error) {
      console.error('📦 Error handling modal close signal:', error);
    }
  }

  /**
   * Cleanup and reset the singleton
   */
  cleanup() {
    console.log('📦 Cleaning up Package Details Co-browsing singleton');

    this.unregisterSignalHandlers();
    this.listeners.clear();
    this.isInitialized = false;
    this.isIncomingActionRef.current = false;
  }
}

// Export singleton instance
export const packageDetailsCoBrowseSingleton = PackageDetailsCoBrowseSingleton.getInstance();

// Export the class for testing purposes
export { PackageDetailsCoBrowseSingleton }; 