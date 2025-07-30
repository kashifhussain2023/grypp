import { useState, useEffect, useCallback, useRef } from 'react';
import { packageDetailsCoBrowseSingleton } from '../services/PackageDetailsCoBrowseManager';

/**
 * Custom hook for package details co-browsing
 * Provides bi-directional synchronization for all package details actions
 * @param {string} userType - 'agent' or 'customer'
 * @param {boolean} enabled - Whether co-browsing is enabled
 * @returns {Object} - Co-browsing state and methods
 */
export const usePackageDetailsCoBrowse = (userType = 'agent', enabled = true) => {
  // State for incoming actions
  const [incomingTabChange, setIncomingTabChange] = useState(null);
  const [incomingImageSelect, setIncomingImageSelect] = useState(null);
  const [incomingDaySelect, setIncomingDaySelect] = useState(null);
  const [incomingFullscreenToggle, setIncomingFullscreenToggle] = useState(null);
  const [incomingSlideshowToggle, setIncomingSlideshowToggle] = useState(null);
  const [incomingImageNavigate, setIncomingImageNavigate] = useState(null);
  const [incomingZoomChange, setIncomingZoomChange] = useState(null);
  const [incomingScrollSync, setIncomingScrollSync] = useState(null);
  const [incomingComparisonAction, setIncomingComparisonAction] = useState(null);
  const [incomingPaymentAction, setIncomingPaymentAction] = useState(null);
  const [incomingModalOpen, setIncomingModalOpen] = useState(null);
  const [incomingModalClose, setIncomingModalClose] = useState(null);

  // Use the singleton's ref to prevent signal loops
  const isProcessingIncomingActionRef = useRef(false);

  // Initialize the co-browsing singleton
  useEffect(() => {
    if (enabled) {
      packageDetailsCoBrowseSingleton.initialize();
    }
  }, [enabled]);

  // Event handlers for incoming actions
  const handleTabChange = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received tab change:`, data);
    setIncomingTabChange(data);
  }, [userType]);

  const handleImageSelect = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received image select:`, data);
    setIncomingImageSelect(data);
  }, [userType]);

  const handleDaySelect = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received day select:`, data);
    setIncomingDaySelect(data);
  }, [userType]);

  const handleFullscreenToggle = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received fullscreen toggle:`, data);
    setIncomingFullscreenToggle(data);
  }, [userType]);

  const handleSlideshowToggle = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received slideshow toggle:`, data);
    setIncomingSlideshowToggle(data);
  }, [userType]);

  const handleImageNavigate = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received image navigate:`, data);
    setIncomingImageNavigate(data);
  }, [userType]);

  const handleZoomChange = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received zoom change:`, data);
    setIncomingZoomChange(data);
  }, [userType]);

  const handleScrollSync = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received scroll sync:`, data);
    setIncomingScrollSync(data);
  }, [userType]);

  const handleComparisonAction = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received comparison action:`, data);
    setIncomingComparisonAction(data);
  }, [userType]);

  const handlePaymentAction = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received payment action:`, data);
    setIncomingPaymentAction(data);
  }, [userType]);

  const handleModalOpen = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received modal open:`, data);
    setIncomingModalOpen(data);
  }, [userType]);

  const handleModalClose = useCallback((data) => {
    if (data.userType === userType) return;

    console.log(`📦 [${userType}] Received modal close:`, data);
    setIncomingModalClose(data);
  }, [userType]);

  // Register listeners
  useEffect(() => {
    if (!enabled) return;

    packageDetailsCoBrowseSingleton.addListener('tabChange', handleTabChange);
    packageDetailsCoBrowseSingleton.addListener('imageSelect', handleImageSelect);
    packageDetailsCoBrowseSingleton.addListener('daySelect', handleDaySelect);
    packageDetailsCoBrowseSingleton.addListener('fullscreenToggle', handleFullscreenToggle);
    packageDetailsCoBrowseSingleton.addListener('slideshowToggle', handleSlideshowToggle);
    packageDetailsCoBrowseSingleton.addListener('imageNavigate', handleImageNavigate);
    packageDetailsCoBrowseSingleton.addListener('zoomChange', handleZoomChange);
    packageDetailsCoBrowseSingleton.addListener('scrollSync', handleScrollSync);
    packageDetailsCoBrowseSingleton.addListener('comparisonAction', handleComparisonAction);
    packageDetailsCoBrowseSingleton.addListener('paymentAction', handlePaymentAction);
    packageDetailsCoBrowseSingleton.addListener('modalOpen', handleModalOpen);
    packageDetailsCoBrowseSingleton.addListener('modalClose', handleModalClose);

    return () => {
      packageDetailsCoBrowseSingleton.removeListener('tabChange', handleTabChange);
      packageDetailsCoBrowseSingleton.removeListener('imageSelect', handleImageSelect);
      packageDetailsCoBrowseSingleton.removeListener('daySelect', handleDaySelect);
      packageDetailsCoBrowseSingleton.removeListener('fullscreenToggle', handleFullscreenToggle);
      packageDetailsCoBrowseSingleton.removeListener('slideshowToggle', handleSlideshowToggle);
      packageDetailsCoBrowseSingleton.removeListener('imageNavigate', handleImageNavigate);
      packageDetailsCoBrowseSingleton.removeListener('zoomChange', handleZoomChange);
      packageDetailsCoBrowseSingleton.removeListener('scrollSync', handleScrollSync);
      packageDetailsCoBrowseSingleton.removeListener('comparisonAction', handleComparisonAction);
      packageDetailsCoBrowseSingleton.removeListener('paymentAction', handlePaymentAction);
      packageDetailsCoBrowseSingleton.removeListener('modalOpen', handleModalOpen);
      packageDetailsCoBrowseSingleton.removeListener('modalClose', handleModalClose);
    };
  }, [enabled, userType]);

  // Action senders - use the singleton's isIncomingActionRef
  const sendTabChange = useCallback((tabIndex) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending tab change:`, tabIndex);
    packageDetailsCoBrowseSingleton.sendAction('tab-change', { tabIndex }, userType);
  }, [enabled, userType]);

  const sendImageSelect = useCallback((imageIndex) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending image select:`, imageIndex);
    packageDetailsCoBrowseSingleton.sendAction('image-select', { imageIndex }, userType);
  }, [enabled, userType]);

  const sendDaySelect = useCallback((dayIndex) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending day select:`, dayIndex);
    packageDetailsCoBrowseSingleton.sendAction('day-select', { dayIndex }, userType);
  }, [enabled, userType]);

  const sendFullscreenToggle = useCallback(() => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending fullscreen toggle`);
    packageDetailsCoBrowseSingleton.sendAction('fullscreen-toggle', {}, userType);
  }, [enabled, userType]);

  const sendSlideshowToggle = useCallback(() => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending slideshow toggle`);
    packageDetailsCoBrowseSingleton.sendAction('slideshow-toggle', {}, userType);
  }, [enabled, userType]);

  const sendImageNavigate = useCallback((direction) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending image navigate:`, direction);
    packageDetailsCoBrowseSingleton.sendAction('image-navigate', { direction }, userType);
  }, [enabled, userType]);

  const sendZoomChange = useCallback((direction) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending zoom change:`, direction);
    packageDetailsCoBrowseSingleton.sendAction('zoom-change', { direction }, userType);
  }, [enabled, userType]);

  const sendScrollSync = useCallback((scrollTop, scrollLeft) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending scroll sync:`, { scrollTop, scrollLeft });
    packageDetailsCoBrowseSingleton.sendAction('scroll-sync', { scrollTop, scrollLeft }, userType);
  }, [enabled, userType]);

  const sendComparisonAction = useCallback((action, data = {}) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending comparison action:`, action, data);
    packageDetailsCoBrowseSingleton.sendAction('comparison-action', { action, ...data }, userType);
  }, [enabled, userType]);

  const sendPaymentAction = useCallback((action, data = {}) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending payment action:`, action, data);
    packageDetailsCoBrowseSingleton.sendAction('payment-action', { action, ...data }, userType);
  }, [enabled, userType]);

  const sendModalOpen = useCallback((packageData) => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending modal open:`, packageData?.id);
    packageDetailsCoBrowseSingleton.sendAction('modal-open', { packageData }, userType);
  }, [enabled, userType]);

  const sendModalClose = useCallback(() => {
    if (!enabled || packageDetailsCoBrowseSingleton.isIncomingActionRef.current) return;

    console.log(`📦 [${userType}] Sending modal close`);
    packageDetailsCoBrowseSingleton.sendAction('modal-close', {}, userType);
  }, [enabled, userType]);

  // Clear incoming actions after processing
  const clearIncomingActions = useCallback(() => {
    setIncomingTabChange(null);
    setIncomingImageSelect(null);
    setIncomingDaySelect(null);
    setIncomingFullscreenToggle(null);
    setIncomingSlideshowToggle(null);
    setIncomingImageNavigate(null);
    setIncomingZoomChange(null);
    setIncomingScrollSync(null);
    setIncomingComparisonAction(null);
    setIncomingPaymentAction(null);
    setIncomingModalOpen(null);
    setIncomingModalClose(null);
  }, []);

  return {
    // Incoming actions
    incomingTabChange,
    incomingImageSelect,
    incomingDaySelect,
    incomingFullscreenToggle,
    incomingSlideshowToggle,
    incomingImageNavigate,
    incomingZoomChange,
    incomingScrollSync,
    incomingComparisonAction,
    incomingPaymentAction,
    incomingModalOpen,
    incomingModalClose,

    // Action senders
    sendTabChange,
    sendImageSelect,
    sendDaySelect,
    sendFullscreenToggle,
    sendSlideshowToggle,
    sendImageNavigate,
    sendZoomChange,
    sendScrollSync,
    sendComparisonAction,
    sendPaymentAction,
    sendModalOpen,
    sendModalClose,

    // Utility functions
    clearIncomingActions,
    isIncomingAction: packageDetailsCoBrowseSingleton.isIncomingActionRef.current,
    isProcessingIncomingAction: isProcessingIncomingActionRef.current,
  };
}; 