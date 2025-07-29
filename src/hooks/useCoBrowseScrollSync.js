import { useState, useRef, useEffect, useCallback } from 'react';
import { openTokSessionSingleton } from '../services/OpenTokSessionManager';

/**
 * Custom hook for synchronizing scroll position between agent and customer
 * @param {string} userType - 'agent' or 'customer'
 * @param {boolean} enabled - Whether scroll sync is enabled
 * @returns {Object} - Scroll sync state and methods
 */
export const useCoBrowseScrollSync = (userType = 'agent', enabled = true) => {
  const [isActiveController, setIsActiveController] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
  
  // Refs for tracking scroll state
  const lastScrollPositionRef = useRef({ scrollTop: 0, scrollLeft: 0 });
  const incomingScrollRef = useRef(false);
  const scrollAnimationRef = useRef(false);
  const isActiveControllerRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Debug logging function
  const log = useCallback((message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 [${userType}] ${message}`, data || '');
    }
  }, [userType]);

  // Send scroll position to other party
  const sendScrollPosition = useCallback((scrollTop, scrollLeft) => {
    const session = openTokSessionSingleton.getSession();
    if (!session || !enabled) return;

    const scrollData = {
      scrollTop,
      scrollLeft,
      userType,
      timestamp: Date.now()
    };

    openTokSessionSingleton.sendSignal(
      {
        type: 'cobrowse-scroll-sync',
        data: JSON.stringify(scrollData)
      },
      (err) => {
        if (err) {
          log('Failed to send scroll signal:', err);
        }
      }
    );
  }, [userType, enabled, log]);

  // Handle incoming scroll signals
  const handleScrollSignal = useCallback((event) => {
    if (!enabled) return;

    try {
      const data = JSON.parse(event.data);
      
      // Ignore signals from same user type
      if (data.userType === userType) {
        return;
      }

      log('Received scroll signal:', data);

      // Mark that we're receiving an incoming scroll
      incomingScrollRef.current = true;
      scrollAnimationRef.current = true;

      // Update last scroll position
      const newPosition = { scrollTop: data.scrollTop, scrollLeft: data.scrollLeft };
      setLastScrollPosition(newPosition);
      lastScrollPositionRef.current = newPosition;

      // Reset flags after a short delay
      setTimeout(() => {
        incomingScrollRef.current = false;
        scrollAnimationRef.current = false;
      }, 100);

    } catch (err) {
      log('Failed to parse scroll signal:', err);
    }
  }, [userType, enabled, log]);

  // Handle scroll events from the local container
  const handleScroll = useCallback((event) => {
    if (incomingScrollRef.current || scrollAnimationRef.current) {
      return; // Ignore scroll events caused by incoming signals
    }

    const { scrollTop, scrollLeft } = event.target;

    // Check if scroll position actually changed significantly
    const lastPos = lastScrollPositionRef.current;
    const scrollThreshold = 5; // Increased threshold to prevent micro-movements
    if (Math.abs(scrollTop - lastPos.scrollTop) < scrollThreshold &&
      Math.abs(scrollLeft - lastPos.scrollLeft) < scrollThreshold) {
      return;
    }

    // Mark this user as the active controller
    isActiveControllerRef.current = true;
    setIsActiveController(true);

    log('Local scroll detected:', { scrollTop, scrollLeft });

    // Send scroll position to other party
    sendScrollPosition(scrollTop, scrollLeft);
  }, [sendScrollPosition, log]);

  // Handle scroll timeout (when user stops scrolling)
  const handleScrollEnd = useCallback(() => {
    // Reset active controller after user stops scrolling
    setTimeout(() => {
      if (isActiveControllerRef.current && !incomingScrollRef.current) {
        isActiveControllerRef.current = false;
        setIsActiveController(false);
        log('Released active control');
      }
    }, 1500); // Increased delay to prevent rapid switching
  }, [log]);

  // Set up OpenTok signal listener
  useEffect(() => {
    const session = openTokSessionSingleton.getSession();
    if (!session || !enabled) {
      log('Session not available or scroll sync disabled, skipping signal setup');
      return;
    }

    log('Setting up scroll sync signal listener');
    openTokSessionSingleton.registerSignalHandler('signal:cobrowse-scroll-sync', handleScrollSignal);

    return () => {
      log('Cleaning up scroll sync signal listener');
      openTokSessionSingleton.unregisterSignalHandler('signal:cobrowse-scroll-sync');
    };
  }, [handleScrollSignal, enabled, log]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    isActiveController,
    lastScrollPosition,
    handleScroll,
    handleScrollEnd,
    isIncomingScroll: incomingScrollRef.current,
    isScrollAnimating: scrollAnimationRef.current
  };
}; 