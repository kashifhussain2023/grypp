import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing tour package comparison
 * @param {Object} sessionRef - OpenTok session ref for real-time sync
 * @param {string} userType - 'agent' or 'customer'
 * @returns {Object} - Comparison state and methods
 */
export const useComparePackages = (sessionRef, userType = 'agent') => {
    const [compareList, setCompareList] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Send comparison update to other party
    const syncComparison = useCallback((newCompareList) => {
        if (!sessionRef?.current) return;

        const syncData = {
            type: 'package-comparison-update',
            userType,
            compareList: newCompareList,
            timestamp: Date.now()
        };

        sessionRef.current.signal(
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
    }, [sessionRef, userType]);

    // Send drawer state sync to other party
    const syncDrawerState = useCallback((isOpen) => {
        if (!sessionRef?.current) return;

        const syncData = {
            type: 'comparison-drawer-state',
            userType,
            isDrawerOpen: isOpen,
            timestamp: Date.now()
        };

        sessionRef.current.signal(
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
    }, [sessionRef, userType]);

    // Custom setIsDrawerOpen that syncs with other party
    const setDrawerOpenWithSync = useCallback((isOpen) => {
        console.log(`[Compare ${userType}] Setting drawer to: ${isOpen}`);
        setIsDrawerOpen(isOpen);
        syncDrawerState(isOpen);
    }, [syncDrawerState, userType]);

    // Load initial state from localStorage
    useEffect(() => {
        const savedCompareList = localStorage.getItem(`compare-packages-${userType}`);
        if (savedCompareList) {
            try {
                setCompareList(JSON.parse(savedCompareList));
            } catch (error) {
                console.error('Failed to load compare list from localStorage:', error);
            }
        }
    }, [userType]);

    // Save to localStorage whenever compareList changes
    useEffect(() => {
        localStorage.setItem(`compare-packages-${userType}`, JSON.stringify(compareList));
    }, [compareList, userType]);

    // Add package to comparison
    const addToCompare = useCallback((packageData) => {
        if (compareList.length >= 3) {
            return false; // Max 3 packages
        }

        // Check if package is already in comparison
        const isDuplicate = compareList.some(pkg => pkg.id === packageData.id);
        if (isDuplicate) {
            return false;
        }

        const newCompareList = [...compareList, packageData];
        setCompareList(newCompareList);
        syncComparison(newCompareList);
        return true;
    }, [compareList, syncComparison]);

    // Remove package from comparison
    const removeFromCompare = useCallback((packageId) => {
        const newCompareList = compareList.filter(pkg => pkg.id !== packageId);
        setCompareList(newCompareList);
        syncComparison(newCompareList);
    }, [compareList, syncComparison]);

    // Clear all comparisons
    const clearComparison = useCallback(() => {
        setCompareList([]);
        syncComparison([]);
    }, [syncComparison]);

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
        if (!sessionRef?.current) return;

        const session = sessionRef.current;
        session.on('signal:cobrowse-comparison-sync', handleComparisonSync);
        session.on('signal:cobrowse-drawer-sync', handleDrawerSync); // Add this line

        return () => {
            session.off('signal:cobrowse-comparison-sync', handleComparisonSync);
            session.off('signal:cobrowse-drawer-sync', handleDrawerSync); // Add this line
        };
    }, [sessionRef, handleComparisonSync, handleDrawerSync]); // Add handleDrawerSync to dependencies

    // Get best value package (lowest price)
    const getBestValue = useCallback(() => {
        if (compareList.length === 0) return null;

        return compareList.reduce((best, current) => {
            return current.price < best.price ? current : best;
        });
    }, [compareList]);

    // Check if package is in comparison
    const isInComparison = useCallback((packageId) => {
        return compareList.some(pkg => pkg.id === packageId);
    }, [compareList]);

    // Check if comparison is full
    const isComparisonFull = compareList.length >= 3;

    return {
        compareList,
        isDrawerOpen,
        setIsDrawerOpen: setDrawerOpenWithSync,
        addToCompare,
        removeFromCompare,
        clearComparison,
        getBestValue,
        isInComparison,
        isComparisonFull,
        comparisonCount: compareList.length,
        setCompareList
    };
}; 