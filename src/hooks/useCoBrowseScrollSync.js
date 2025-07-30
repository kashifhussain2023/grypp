import { useState, useRef, useEffect, useCallback } from 'react';
import { openTokSessionSingleton } from '../services/OpenTokSessionManager';

/**
 * Custom hook for synchronizing scroll position between agent and customer
 * @param {string} userType - 'agent' or 'customer'
 * @param {boolean} enabled - Whether scroll sync is enabled
 * @param {string} containerType - Type of scroll container ('catalog', 'comparison', 'details', 'modal', 'drawer', 'package-list')
 * @returns {Object} - Scroll sync state and methods
 */
export const useCoBrowseScrollSync = (userType = 'agent', enabled = true, containerType = 'catalog') => {
  const [isActiveController, setIsActiveController] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });

  // Refs for tracking scroll state
  const scrollRef = useRef(null);
  const lastScrollPositionRef = useRef({ scrollTop: 0, scrollLeft: 0 });
  const incomingScrollRef = useRef(false);
  const scrollAnimationRef = useRef(false);
  const isActiveControllerRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const throttleTimeoutRef = useRef(null);
  const scrollDelayTimeoutRef = useRef(null);

  // Determine signal type based on container type
  const getSignalType = useCallback(() => {
    switch (containerType) {
      case 'comparison':
        return 'cobrowse-comparison-scroll-sync';
      case 'details':
        return 'cobrowse-details-scroll-sync';
      case 'modal':
        return 'cobrowse-modal-scroll-sync';
      case 'drawer':
        return 'cobrowse-drawer-scroll-sync';
      case 'package-list':
        return 'cobrowse-package-list-scroll-sync';
      case 'catalog':
      default:
        return 'cobrowse-scroll-sync';
    }
  }, [containerType]);

  // Debug logging function
  const log = useCallback((message, data = null) => {
    console.log(`📊 [${userType}-${containerType}] ${message}`, data || '');
  }, [userType, containerType]);

  // Throttled scroll position sender with delay for smooth scrolling
  const sendScrollPositionThrottled = useCallback((scrollTop, scrollLeft) => {
    // Clear existing throttle timeout
    if (throttleTimeoutRef.current) {
      clearTimeout(throttleTimeoutRef.current);
    }

    // Set new throttle timeout with delay for smooth scrolling
    throttleTimeoutRef.current = setTimeout(() => {
      const session = openTokSessionSingleton.getSession();
      if (!session || !enabled) return;

      const scrollData = {
        scrollTop,
        scrollLeft,
        userType,
        containerType,
        timestamp: Date.now()
      };

      openTokSessionSingleton.sendSignal(
        {
          type: getSignalType(),
          data: JSON.stringify(scrollData)
        },
        (err) => {
          if (err) {
            log('Failed to send scroll signal:', err);
          }
        }
      );
    }, 150); // Increased delay to 150ms for smoother scrolling
  }, [userType, enabled, log, getSignalType, containerType]);

  // Send scroll position to other party (immediate, for important updates)
  const sendScrollPosition = useCallback((scrollTop, scrollLeft) => {
    const session = openTokSessionSingleton.getSession();
    if (!session || !enabled) return;

    const scrollData = {
      scrollTop,
      scrollLeft,
      userType,
      containerType,
      timestamp: Date.now()
    };

    openTokSessionSingleton.sendSignal(
      {
        type: getSignalType(),
        data: JSON.stringify(scrollData)
      },
      (err) => {
        if (err) {
          log('Failed to send scroll signal:', err);
        }
      }
    );
  }, [userType, enabled, log, getSignalType, containerType]);

  // Apply scroll position to the scroll container with smooth animation and delay
  const applyScrollPosition = useCallback((scrollTop, scrollLeft) => {
    if (!scrollRef.current) return;

    log('Applying scroll position:', { scrollTop, scrollLeft });

    // Mark that we're applying an incoming scroll
    incomingScrollRef.current = true;
    scrollAnimationRef.current = true;

    // Add a small delay before applying scroll for smoother experience
    if (scrollDelayTimeoutRef.current) {
      clearTimeout(scrollDelayTimeoutRef.current);
    }

    scrollDelayTimeoutRef.current = setTimeout(() => {
      // Apply the scroll position smoothly
      scrollRef.current.scrollTo({
        top: scrollTop,
        left: scrollLeft,
        behavior: 'smooth'
      });

      // Update last scroll position
      const newPosition = { scrollTop, scrollLeft };
      setLastScrollPosition(newPosition);
      lastScrollPositionRef.current = newPosition;

      // Reset flags after animation completes
      setTimeout(() => {
        incomingScrollRef.current = false;
        scrollAnimationRef.current = false;
      }, 400); // Increased delay to account for smooth scroll animation
    }, 50); // 50ms delay before applying scroll
  }, [log]);

  // Handle incoming scroll signals
  const handleScrollSignal = useCallback((event) => {
    if (!enabled) return;

    try {
      const data = JSON.parse(event.data);

      // Ignore signals from same user type or different container type
      if (data.userType === userType || data.containerType !== containerType) {
        return;
      }

      log('Received scroll signal:', data);

      // Apply the scroll position to our container
      applyScrollPosition(data.scrollTop, data.scrollLeft);

    } catch (err) {
      log('Failed to parse scroll signal:', err);
    }
  }, [userType, enabled, log, applyScrollPosition, containerType]);

  // Handle scroll events from the local container
  const handleScroll = useCallback((event) => {
    if (incomingScrollRef.current || scrollAnimationRef.current) {
      return; // Ignore scroll events caused by incoming signals
    }

    const { scrollTop, scrollLeft } = event.target;

    // Check if scroll position actually changed significantly
    const lastPos = lastScrollPositionRef.current;
    const scrollThreshold = 5; // Increased threshold for smoother sync
    if (Math.abs(scrollTop - lastPos.scrollTop) < scrollThreshold &&
      Math.abs(scrollLeft - lastPos.scrollLeft) < scrollThreshold) {
      return;
    }

    // Mark this user as the active controller
    isActiveControllerRef.current = true;
    setIsActiveController(true);

    log('Local scroll detected:', { scrollTop, scrollLeft });

    // Send scroll position to other party (throttled for performance)
    sendScrollPositionThrottled(scrollTop, scrollLeft);

    // Update last scroll position
    lastScrollPositionRef.current = { scrollTop, scrollLeft };
    setLastScrollPosition({ scrollTop, scrollLeft });
  }, [sendScrollPositionThrottled, log]);

  // Handle scroll timeout (when user stops scrolling)
  const handleScrollEnd = useCallback(() => {
    // Reset active controller after user stops scrolling
    setTimeout(() => {
      if (isActiveControllerRef.current && !incomingScrollRef.current) {
        isActiveControllerRef.current = false;
        setIsActiveController(false);
        log('Released active control');
      }
    }, 2500); // Increased delay to prevent rapid switching
  }, [log]);

  // Set up scroll event listener on the scroll container
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !enabled) return;

    log('Setting up scroll event listener on container');

    const handleScrollEvent = (event) => {
      handleScroll(event);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout for scroll end
      scrollTimeoutRef.current = setTimeout(() => {
        handleScrollEnd();
      }, 150); // Increased delay for more responsive control switching
    };

    scrollContainer.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScrollEvent);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, handleScrollEnd, enabled, log]);

  // Set up OpenTok signal listener
  useEffect(() => {
    const session = openTokSessionSingleton.getSession();
    if (!session || !enabled) {
      log('Session not available or scroll sync disabled, skipping signal setup');
      return;
    }

    const signalType = getSignalType();
    log(`Setting up scroll sync signal listener for: ${signalType}`);
    openTokSessionSingleton.registerSignalHandler(`signal:${signalType}`, handleScrollSignal);

    return () => {
      log(`Cleaning up scroll sync signal listener for: ${signalType}`);
      openTokSessionSingleton.unregisterSignalHandler(`signal:${signalType}`);
    };
  }, [handleScrollSignal, enabled, log, getSignalType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      if (scrollDelayTimeoutRef.current) {
        clearTimeout(scrollDelayTimeoutRef.current);
      }
    };
  }, []);

  return {
    scrollRef,
    isActiveController,
    lastScrollPosition,
    handleScroll,
    handleScrollEnd,
    applyScrollPosition,
    isIncomingScroll: incomingScrollRef.current,
    isScrollAnimating: scrollAnimationRef.current,
    // Additional utility methods
    syncToPosition: (scrollTop, scrollLeft) => {
      if (!incomingScrollRef.current) {
        sendScrollPosition(scrollTop, scrollLeft);
      }
    },
    getScrollPosition: () => {
      if (scrollRef.current) {
        return {
          scrollTop: scrollRef.current.scrollTop,
          scrollLeft: scrollRef.current.scrollLeft
        };
      }
      return { scrollTop: 0, scrollLeft: 0 };
    }
  };
}; 