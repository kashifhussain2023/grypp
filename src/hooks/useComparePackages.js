import { useState, useEffect, useCallback, useRef } from 'react';
import { openTokSessionSingleton } from '../services/OpenTokSessionManager';

/**
 * Custom hook for managing tour package comparison
 * @param {string} userType - 'agent' or 'customer'
 * @returns {Object} - Comparison state and methods
 */
export const useComparePackages = (userType = 'agent') => {
    const [compareList, setCompareList] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Refs to prevent signal loops and debounce rapid changes
    const isUpdatingFromSignalRef = useRef(false);
    const syncTimeoutRef = useRef(null);

    // Send comparison update to other party with debouncing
    const syncComparison = useCallback((newCompareList) => {
        // Don't send signals if we're updating from an incoming signal
        if (isUpdatingFromSignalRef.current) {
            return;
        }

        // Clear any pending sync timeout
        if (syncTimeoutRef.current) {
            clearTimeout(syncTimeoutRef.current);
        }

        // Debounce the sync to prevent rapid successive signals
        syncTimeoutRef.current = setTimeout(() => {
            const session = openTokSessionSingleton.getSession();
            if (!session) return;

            const syncData = {
                type: 'package-comparison-update',
                userType,
                compareList: newCompareList,
                timestamp: Date.now()
            };

            openTokSessionSingleton.sendSignal(
                {
                    type: 'cobrowse-comparison-sync',
                    data: JSON.stringify(syncData)
                },
                (err) => {
                    if (err) {
                        console.error('Comparison sync signal error:', err);
                    }
                }
            );
        }, 100); // 100ms debounce
    }, [userType]);

    // Send drawer state sync to other party with comparison data
    const syncDrawerState = useCallback((isOpen) => {
        const session = openTokSessionSingleton.getSession();
        if (!session) return;

        const syncData = {
            type: 'comparison-drawer-state',
            userType,
            isDrawerOpen: isOpen,
            compareList: isOpen ? compareList : [], // Include comparison data when opening
            timestamp: Date.now()
        };

        openTokSessionSingleton.sendSignal(
            {
                type: 'cobrowse-drawer-sync',
                data: JSON.stringify(syncData)
            },
            (err) => {
                if (err) {
                    console.error('Drawer sync signal error:', err);
                }
            }
        );
    }, [userType, compareList]);

    // Add to comparison list
    const addToCompare = useCallback((packageData) => {
        console.log(`[Compare-${userType}] Adding package to comparison:`, packageData.id, packageData.name);
        setCompareList(prev => {
            const newList = [...prev];
            if (!newList.find(pkg => pkg.id === packageData.id)) {
                newList.push(packageData);
                console.log(`[Compare-${userType}] Updated comparison list:`, newList.length, 'packages');
                // Sync with other party
                syncComparison(newList);
            }
            return newList;
        });
    }, [syncComparison, userType]);

    // Remove from comparison list
    const removeFromCompare = useCallback((packageId) => {
        console.log(`[Compare-${userType}] Removing package from comparison:`, packageId);
        setCompareList(prev => {
            const newList = prev.filter(pkg => pkg.id !== packageId);
            console.log(`[Compare-${userType}] Updated comparison list:`, newList.length, 'packages');
            // Sync with other party
            syncComparison(newList);
            return newList;
        });
    }, [syncComparison, userType]);

    // Clear comparison list
    const clearComparison = useCallback(() => {
        console.log(`[Compare-${userType}] Clearing comparison list`);
        setCompareList([]);
        // Sync with other party
        syncComparison([]);
    }, [syncComparison, userType]);

    // Get best value package
    const getBestValue = useCallback(() => {
        if (compareList.length === 0) return null;
        return compareList.reduce((best, current) => {
            const bestPrice = best.price?.discounted || best.price;
            const currentPrice = current.price?.discounted || current.price;
            return currentPrice < bestPrice ? current : best;
        });
    }, [compareList]);

    // Check if package is in comparison
    const isInComparison = useCallback((packageId) => {
        return compareList.some(pkg => pkg.id === packageId);
    }, [compareList]);

    // Check if comparison is full (max 3 packages)
    const isComparisonFull = useCallback(() => {
        return compareList.length >= 3;
    }, [compareList]);

    // Get comparison count
    const comparisonCount = compareList.length;

    // Toggle drawer with data sync
    const toggleDrawer = useCallback((open) => {
        setIsDrawerOpen(open);
        // Sync drawer state with other party (includes comparison data when opening)
        syncDrawerState(open);
    }, [syncDrawerState]);

    // Handle incoming comparison sync
    const handleComparisonSync = useCallback((event) => {
        try {
            const data = JSON.parse(event.data);

            // Ignore signals from same user type
            if (data.userType === userType) {
                return;
            }

            console.log(`[Compare-${userType}] Received comparison sync:`, data.compareList?.length, 'packages');

            // Set flag to prevent sending signals while updating from incoming signal
            isUpdatingFromSignalRef.current = true;

            // Update comparison list for both user types
            setCompareList(data.compareList || []);
            console.log(`[Compare-${userType}] Updated comparison list from sync:`, data.compareList?.length, 'packages');

            // Reset flag after a short delay
            setTimeout(() => {
                isUpdatingFromSignalRef.current = false;
            }, 50);
        } catch (err) {
            console.error('Failed to parse comparison sync signal:', err);
        }
    }, [userType]);

    // Handle incoming drawer state sync
    const handleDrawerSync = useCallback((event) => {
        try {
            const data = JSON.parse(event.data);

            // Ignore signals from same user type
            if (data.userType === userType) {
                return;
            }

            console.log(`[Compare-${userType}] Received drawer sync:`, data.isDrawerOpen, 'with', data.compareList?.length, 'packages');

            // Set flag to prevent sending signals while updating from incoming signal
            isUpdatingFromSignalRef.current = true;

            // Update drawer state
            setIsDrawerOpen(data.isDrawerOpen || false);

            // If opening and there's comparison data, update the comparison list
            if (data.isDrawerOpen && data.compareList && data.compareList.length > 0) {
                console.log(`[Compare-${userType}] Received comparison data with drawer open:`, data.compareList.length, 'packages');
                setCompareList(data.compareList);
            }

            // Reset flag after a short delay
            setTimeout(() => {
                isUpdatingFromSignalRef.current = false;
            }, 50);
        } catch (err) {
            console.error('Failed to parse drawer sync signal:', err);
        }
    }, [userType]);

    // Handle shared comparison open signal
    const handleSharedComparisonOpen = useCallback((event) => {
        try {
            const data = JSON.parse(event.data);

            // Ignore signals from same user type
            if (data.action && data.action.includes(userType)) {
                return;
            }

            console.log(`[Compare-${userType}] Received shared comparison open signal:`, data.action, 'with', data.compareList?.length, 'packages');

            // Set flag to prevent sending signals while updating from incoming signal
            isUpdatingFromSignalRef.current = true;

            // If there's comparison data, update the comparison list
            if (data.compareList && data.compareList.length > 0) {
                console.log(`[Compare-${userType}] Received comparison data from shared signal:`, data.compareList.length, 'packages');
                setCompareList(data.compareList);
            }

            // Reset flag after a short delay
            setTimeout(() => {
                isUpdatingFromSignalRef.current = false;
            }, 50);
        } catch (err) {
            console.error('Failed to parse shared comparison open signal:', err);
        }
    }, [userType]);

    // Handle comparison action signals (clear comparison, close comparison)
    const handleComparisonAction = useCallback((event) => {
        try {
            const data = JSON.parse(event.data);

            // Ignore signals from same user type
            if (data.userType === userType) {
                return;
            }

            console.log(`[Compare-${userType}] Received comparison action signal:`, data.action);

            if (data.action === 'clear-comparison') {
                console.log(`[Compare-${userType}] Received clear comparison signal from ${data.userType}`);
                // Clear the comparison list
                setCompareList([]);
            } else if (data.action === 'close-comparison') {
                console.log(`[Compare-${userType}] Received close comparison signal from ${data.userType}`);
                // Close the drawer/modal
                setIsDrawerOpen(false);
            }
        } catch (err) {
            console.error('Failed to parse comparison action signal:', err);
        }
    }, [userType]);

    // Set up signal listener for comparison sync
    useEffect(() => {
        const session = openTokSessionSingleton.getSession();
        if (!session) {
            console.log(`[Compare-${userType}] No session available, skipping signal registration`);
            return;
        }

        console.log(`[Compare-${userType}] Registering signal handlers with session`);

        // Register signal handlers with singleton
        const success1 = openTokSessionSingleton.registerSignalHandler('signal:cobrowse-comparison-sync', handleComparisonSync);
        const success2 = openTokSessionSingleton.registerSignalHandler('signal:cobrowse-drawer-sync', handleDrawerSync);
        const success3 = openTokSessionSingleton.registerSignalHandler('signal:shared-comparison-open', handleSharedComparisonOpen);
        const success4 = openTokSessionSingleton.registerSignalHandler('signal:comparison-action', handleComparisonAction);

        console.log(`[Compare-${userType}] Signal registration results:`, { success1, success2, success3, success4 });

        return () => {
            console.log(`[Compare-${userType}] Cleaning up signal handlers`);
            openTokSessionSingleton.unregisterSignalHandler('signal:cobrowse-comparison-sync');
            openTokSessionSingleton.unregisterSignalHandler('signal:cobrowse-drawer-sync');
            openTokSessionSingleton.unregisterSignalHandler('signal:shared-comparison-open');
            openTokSessionSingleton.unregisterSignalHandler('signal:comparison-action');

            // Clear any pending timeouts
            if (syncTimeoutRef.current) {
                clearTimeout(syncTimeoutRef.current);
            }
        };
    }, [userType, handleComparisonSync, handleDrawerSync, handleSharedComparisonOpen, handleComparisonAction]);

    return {
        compareList,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCompare,
        removeFromCompare,
        clearComparison,
        getBestValue,
        isInComparison,
        isComparisonFull,
        comparisonCount,
        toggleDrawer
    };
}; 