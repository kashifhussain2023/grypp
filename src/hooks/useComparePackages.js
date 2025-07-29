import { useState, useEffect, useCallback } from 'react';
import { openTokSessionSingleton } from '../services/OpenTokSessionManager';

/**
 * Custom hook for managing tour package comparison
 * @param {string} userType - 'agent' or 'customer'
 * @returns {Object} - Comparison state and methods
 */
export const useComparePackages = (userType = 'agent') => {
    const [compareList, setCompareList] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Send comparison update to other party
    const syncComparison = useCallback((newCompareList) => {
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
    }, [userType]);

    // Send drawer state sync to other party
    const syncDrawerState = useCallback((isOpen) => {
        const session = openTokSessionSingleton.getSession();
        if (!session) return;

        const syncData = {
            type: 'comparison-drawer-state',
            userType,
            isDrawerOpen: isOpen,
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
    }, [userType]);

    // Add to comparison list
    const addToCompare = useCallback((packageData) => {
        setCompareList(prev => {
            const newList = [...prev];
            if (!newList.find(pkg => pkg.id === packageData.id)) {
                newList.push(packageData);
                // Sync with other party
                syncComparison(newList);
            }
            return newList;
        });
    }, [syncComparison]);

    // Remove from comparison list
    const removeFromCompare = useCallback((packageId) => {
        setCompareList(prev => {
            const newList = prev.filter(pkg => pkg.id !== packageId);
            // Sync with other party
            syncComparison(newList);
            return newList;
        });
    }, [syncComparison]);

    // Clear comparison list
    const clearComparison = useCallback(() => {
        setCompareList([]);
        // Sync with other party
        syncComparison([]);
    }, [syncComparison]);

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

    // Toggle drawer
    const toggleDrawer = useCallback((open) => {
        setIsDrawerOpen(open);
        // Sync drawer state with other party
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

            console.log('[Compare] Received comparison sync:', data);

            // For customers, only update the comparison list (view-only)
            // For agents, handle as before
            if (userType === 'customer') {
                setCompareList(data.compareList || []);
            } else {
                setCompareList(data.compareList || []);
            }
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

            console.log('[Compare] Received drawer sync:', data);

            // Update drawer state
            setIsDrawerOpen(data.isDrawerOpen || false);
        } catch (err) {
            console.error('Failed to parse drawer sync signal:', err);
        }
    }, [userType]);

    // Set up signal listener for comparison sync
    useEffect(() => {
        const session = openTokSessionSingleton.getSession();
        if (!session) return;

        // Register signal handlers with singleton
        openTokSessionSingleton.registerSignalHandler('signal:cobrowse-comparison-sync', handleComparisonSync);
        openTokSessionSingleton.registerSignalHandler('signal:cobrowse-drawer-sync', handleDrawerSync);

        return () => {
            openTokSessionSingleton.unregisterSignalHandler('signal:cobrowse-comparison-sync');
            openTokSessionSingleton.unregisterSignalHandler('signal:cobrowse-drawer-sync');
        };
    }, [handleComparisonSync, handleDrawerSync]);

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