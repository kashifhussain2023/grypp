import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Hook for co-browsing scroll synchronization between agent and customer
 * @param {Object} params - Configuration parameters
 * @param {Object} params.sessionRef - OpenTok session ref for sending signals
 * @param {string} params.userType - 'agent' or 'customer'
 * @param {string} params.scrollContainerId - Unique identifier for the scroll container
 * @param {number} params.throttleDelay - Throttle delay in milliseconds (default: 100)
 * @returns {Object} - { scrollRef, isActiveController }
 */
export const useCoBrowseScrollSync = ({
  sessionRef,
  userType,
  scrollContainerId = 'catalog-scroll',
  throttleDelay = 100
}) => {
  // Refs for DOM elements and state
  const scrollRef = useRef(null);
  const isActiveControllerRef = useRef(false);
  const throttleTimeoutRef = useRef(null);
  const lastScrollPositionRef = useRef({ scrollTop: 0, scrollLeft: 0 });
  const incomingScrollRef = useRef(false);
  const scrollAnimationRef = useRef(false);
  const [isActiveController, setIsActiveController] = useState(false);

  // Debug logging
  const log = useCallback((message, data = {}) => {
    console.log(`[CoBrowse ${userType.toUpperCase()}] ${message}`, data);
  }, [userType]);

  // Throttled scroll position sender
  const sendScrollPosition = useCallback((scrollTop, scrollLeft) => {
    if (!sessionRef.current || incomingScrollRef.current || scrollAnimationRef.current) {
      return;
    }

    // Clear existing timeout
    if (throttleTimeoutRef.current) {
      clearTimeout(throttleTimeoutRef.current);
    }

    // Set new throttled timeout
    throttleTimeoutRef.current = setTimeout(() => {
      const scrollData = {
        scrollTop,
        scrollLeft,
        userType,
        containerId: scrollContainerId,
        timestamp: Date.now(),
        activeController: true
      };

      log('Sending scroll position:', scrollData);

      sessionRef.current.signal(
        {
          type: 'cobrowse-scroll-sync',
          data: JSON.stringify(scrollData)
        },
        (err) => {
          if (err) {
            console.error('Scroll sync signal error:', err);
          }
        }
      );

      // Update last known position
      lastScrollPositionRef.current = { scrollTop, scrollLeft };
    }, throttleDelay);
  }, [sessionRef, userType, scrollContainerId, throttleDelay, log]);

  // Handle incoming scroll signals
  const handleScrollSignal = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);

      // Ignore signals from same user type or different containers
      if (data.userType === userType || data.containerId !== scrollContainerId) {
        return;
      }

      log('Received scroll signal:', data);

      const scrollElement = scrollRef.current;
      if (!scrollElement) {
        log('Scroll element not found, ignoring signal');
        return;
      }

      // Prevent scroll feedback loop
      incomingScrollRef.current = true;
      scrollAnimationRef.current = true;

      // Update active controller state
      isActiveControllerRef.current = false;
      setIsActiveController(false);

      // Apply scroll position
      scrollElement.scrollTo({
        top: data.scrollTop,
        left: data.scrollLeft || 0,
        behavior: 'smooth'
      });

      // Update last position
      lastScrollPositionRef.current = {
        scrollTop: data.scrollTop,
        scrollLeft: data.scrollLeft || 0
      };

      log('Applied scroll position:', {
        scrollTop: data.scrollTop,
        scrollLeft: data.scrollLeft,
        isActiveController: isActiveControllerRef.current
      });

      // Reset incoming flag after smooth scroll animation completes
      setTimeout(() => {
        incomingScrollRef.current = false;
        scrollAnimationRef.current = false;
      }, 500); // Increased delay to account for smooth scroll animation

    } catch (err) {
      console.error('Failed to parse scroll sync signal:', err);
    }
  }, [userType, scrollContainerId, log]);

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
    if (!sessionRef.current) {
      log('Session not available, skipping signal setup');
      return;
    }

    const session = sessionRef.current;

    log('Setting up scroll sync signal listener');
    session.on('signal:cobrowse-scroll-sync', handleScrollSignal);

    return () => {
      log('Cleaning up scroll sync signal listener');
      session.off('signal:cobrowse-scroll-sync', handleScrollSignal);
    };
  }, [sessionRef, handleScrollSignal, log]);

  // Set up scroll event listener on the container
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) {
      return;
    }

    log('Setting up scroll event listener');

    let scrollTimeout;
    const throttledScrollHandler = (event) => {
      handleScroll(event);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set new timeout for scroll end detection
      scrollTimeout = setTimeout(handleScrollEnd, 200); // Increased delay
    };

    scrollElement.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      log('Cleaning up scroll event listener');
      scrollElement.removeEventListener('scroll', throttledScrollHandler);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll, handleScrollEnd, log]);

  // Cleanup throttle timeout on unmount
  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  return {
    scrollRef,
    isActiveController
  };
}; 