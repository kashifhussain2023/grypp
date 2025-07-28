import React, { useRef, useEffect, useCallback } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Alert,
    Button,
    Divider,
    Tooltip,
    Collapse,
    Slide,
    Fade,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Close as CloseIcon,
    Compare as CompareIcon,
    Star as StarIcon,
    AttachMoney as MoneyIcon,
    AccessTime as TimeIcon,
    LocationOn as LocationIcon,
    Delete as DeleteIcon,
    EmojiEvents as TrophyIcon
} from '@mui/icons-material';

const TourComparisonDrawer = ({
    open,
    onClose,
    compareList,
    onRemoveFromCompare,
    onClearComparison,
    getBestValue,
    userType = 'agent',
    sessionRef = null // Add sessionRef for scroll sync
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const scrollContainerRef = useRef(null);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef(null);

    const bestValuePackage = getBestValue();

    // Scroll synchronization functions
    const sendScrollPosition = useCallback((scrollTop) => {
        if (sessionRef && sessionRef.current && !isScrollingRef.current) {
            console.log(`📊 [${userType}] Sending scroll position: ${scrollTop}`);
            try {
                sessionRef.current.signal({
                    type: 'cobrowse-comparison-scroll-sync',
                    data: JSON.stringify({ scrollTop, userType, timestamp: Date.now() })
                });
            } catch (err) {
                console.error('Failed to send scroll signal:', err);
            }
        }
    }, [sessionRef, userType]);

    const handleScroll = useCallback((event) => {
        if (!scrollContainerRef.current) {
            console.log(`📊 [${userType}] No scroll container ref`);
            return;
        }

        const scrollTop = event.target.scrollTop;
        console.log(`📊 [${userType}] Scroll event: ${scrollTop}`);

        isScrollingRef.current = true;

        // Throttle scroll signals to prevent spam
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            // Send scroll position to other user
            sendScrollPosition(scrollTop);
            isScrollingRef.current = false;
        }, 100); // Increased throttle for better stability
    }, [sendScrollPosition, userType]);

    // Listen for incoming scroll signals
    useEffect(() => {
        if (!sessionRef || !sessionRef.current) {
            console.log(`📊 [${userType}] No session ref available`);
            return;
        }

        const handleIncomingScroll = (event) => {
            console.log(`📊 [${userType}] Received signal:`, event);
            try {
                const data = JSON.parse(event.data);
                console.log(`📊 [${userType}] Parsed data:`, data);

                if (data.scrollTop !== undefined && data.userType !== userType && open) {
                    console.log(`📊 [${userType}] Applying scroll from ${data.userType}: ${data.scrollTop}`);
                    if (scrollContainerRef.current && !isScrollingRef.current) {
                        // Set a flag to prevent feedback loop
                        isScrollingRef.current = true;
                        scrollContainerRef.current.scrollTop = data.scrollTop;

                        // Reset flag after a short delay
                        setTimeout(() => {
                            isScrollingRef.current = false;
                        }, 150);
                    }
                }
            } catch (err) {
                console.error(`📊 [${userType}] Failed to parse scroll signal:`, err, event);
            }
        };

        console.log(`📊 [${userType}] Setting up scroll signal listener`);
        sessionRef.current.on('signal:cobrowse-comparison-scroll-sync', handleIncomingScroll);

        return () => {
            if (sessionRef.current) {
                console.log(`📊 [${userType}] Cleaning up scroll signal listener`);
                sessionRef.current.off('signal:cobrowse-comparison-scroll-sync', handleIncomingScroll);
            }
        };
    }, [sessionRef, userType, open]);

    // Add scroll event listener to container
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container && open) {
            console.log(`📊 [${userType}] Adding scroll listener to container`);
            container.addEventListener('scroll', handleScroll, { passive: true });

            // Test scroll sync after a short delay
            setTimeout(() => {
                console.log(`📊 [${userType}] Testing scroll sync - container:`, container);
                console.log(`📊 [${userType}] Container scrollHeight:`, container.scrollHeight);
                console.log(`📊 [${userType}] Container clientHeight:`, container.clientHeight);
            }, 1000);

            return () => {
                console.log(`📊 [${userType}] Removing scroll listener from container`);
                container.removeEventListener('scroll', handleScroll);
            };
        } else {
            console.log(`📊 [${userType}] No container or drawer not open`);
        }
    }, [handleScroll, userType, open]);

    // Test scroll sync function
    const testScrollSync = useCallback(() => {
        if (scrollContainerRef.current && sessionRef?.current) {
            console.log(`📊 [${userType}] Testing scroll sync manually`);
            sendScrollPosition(100); // Send test scroll position
        }
    }, [sendScrollPosition, userType]);

    // Debug drawer open status
    useEffect(() => {
        if (open) {
            console.log(`📊 [${userType}] Drawer opened`);
            setTimeout(() => {
                if (scrollContainerRef.current) {
                    console.log(`📊 [${userType}] Container available:`, {
                        scrollHeight: scrollContainerRef.current.scrollHeight,
                        clientHeight: scrollContainerRef.current.clientHeight,
                        scrollTop: scrollContainerRef.current.scrollTop
                    });
                } else {
                    console.log(`📊 [${userType}] Container not available`);
                }
            }, 500);
        } else {
            console.log(`📊 [${userType}] Drawer closed`);
        }
    }, [open, userType]);

    // Calculate package duration (mock data - you can add duration to your package data)
    const getPackageDuration = (packageData) => {
        // Mock duration calculation based on package type
        const durationMap = {
            'Adventure': '7-10 days',
            'Cultural': '5-7 days',
            'Relaxation': '3-5 days',
            'Party': '3-4 days',
            'Trekking': '4-6 days'
        };
        return durationMap[packageData.type] || '5-7 days';
    };

    // Get package highlights
    const getPackageHighlights = (packageData) => {
        const highlightsMap = {
            'Adventure': ['Professional guides', 'Safety equipment', 'Mountain views'],
            'Cultural': ['Local guides', 'Historical sites', 'Traditional experiences'],
            'Relaxation': ['Luxury accommodation', 'Spa access', 'Beach activities'],
            'Party': ['Nightlife access', 'DJ events', 'Premium drinks'],
            'Trekking': ['Expert guides', 'Mountain gear', 'Scenic trails']
        };
        return highlightsMap[packageData.type] || ['Guided tours', 'Local experiences', 'Quality accommodation'];
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            variant="temporary"
            sx={{
                zIndex: 9999, // Ensure it appears above all other modals
                '& .MuiBackdrop-root': {
                    zIndex: 9998, // Backdrop should be below the drawer but above other content
                },
                '& .MuiDrawer-paper': {
                    width: isMobile ? '100vw' : 600,
                    maxWidth: '90vw',
                    bgcolor: 'background.paper',
                    boxShadow: theme.shadows[24],
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    zIndex: 9999, // Ensure drawer paper is on top
                },
            }}
            transitionDuration={300}
            ModalProps={{
                keepMounted: true, // Better for performance
                disablePortal: false, // Allow proper stacking
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 3,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${theme.palette.primary.dark}`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CompareIcon />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {userType === 'customer' ? 'Package Comparison (Agent Selected)' : 'Package Comparison'}
                    </Typography>
                    {compareList.length > 0 && (
                        <Chip
                            label={`${compareList.length}/3`}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontWeight: 600,
                            }}
                        />
                    )}
                    {/* Scroll Sync Indicator */}
                    <Chip
                        label="Scroll Sync"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            fontSize: '0.7rem',
                            height: '20px',
                        }}
                    />
                    {/* Debug Info */}
                    <Chip
                        label={`${compareList.length} items`}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            fontSize: '0.7rem',
                            height: '20px',
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {compareList.length > 0 && userType === 'agent' && (
                        <Tooltip title="Clear all comparisons">
                            <IconButton
                                onClick={onClearComparison}
                                sx={{ color: 'white' }}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {/* Test Scroll Sync Button */}
                    <Tooltip title="Test scroll sync">
                        <IconButton
                            onClick={testScrollSync}
                            sx={{ color: 'white' }}
                            size="small"
                        >
                            <CompareIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={onClose} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Content */}
            <Box
                ref={scrollContainerRef}
                id={`comparison-scroll-${userType}`}
                sx={{
                    flex: 1,
                    overflow: 'auto',
                    scrollBehavior: 'smooth',
                    position: 'relative',
                    minHeight: '400px', // Ensure minimum height for scrolling
                    maxHeight: 'calc(100vh - 200px)', // Ensure it doesn't exceed viewport
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                }}
            >
                {compareList.length === 0 ? (
                    // Empty State
                    <Fade in={true} timeout={500}>
                        <Box
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <CompareIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
                            <Typography variant="h6" color="text.secondary">
                                No packages to compare
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Select up to 3 packages to compare their features and prices
                            </Typography>
                        </Box>
                    </Fade>
                ) : (
                    // Comparison Content
                    <Box sx={{ p: 3 }}>
                        {/* Best Value Alert */}
                        {bestValuePackage && compareList.length > 1 && (
                            <Slide direction="down" in={true} timeout={600}>
                                <Alert
                                    icon={<TrophyIcon />}
                                    severity="success"
                                    sx={{
                                        mb: 3,
                                        '& .MuiAlert-message': {
                                            fontWeight: 600,
                                        },
                                    }}
                                >
                                    <strong>Best Value:</strong> {bestValuePackage.name} at ${bestValuePackage.price.toLocaleString()}
                                </Alert>
                            </Slide>
                        )}

                        {/* Package Comparison Grid */}
                        <Grid container spacing={3}>
                            {compareList.map((pkg, index) => (
                                <Grid sx={{ width: "250px" }} item xs={3} lg={3} md={3} key={pkg.id}>
                                    <Slide direction="up" in={true} timeout={300 + index * 200}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                position: 'relative',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: theme.shadows[8],
                                                },
                                                border: bestValuePackage?.id === pkg.id ? `2px solid ${theme.palette.success.main}` : 'none',
                                            }}
                                        >
                                            {/* Best Value Badge */}
                                            {bestValuePackage?.id === pkg.id && compareList.length > 1 && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    <Chip
                                                        icon={<TrophyIcon />}
                                                        label="Best Value"
                                                        size="small"
                                                        color="success"
                                                        sx={{ fontWeight: 600 }}
                                                    />
                                                </Box>
                                            )}

                                            {/* Remove Button */}
                                            {userType === 'agent' && (
                                                <IconButton
                                                    onClick={() => onRemoveFromCompare(pkg.id)}
                                                    sx={{
                                                        position: "absolute",
                                                        top: 8,
                                                        left: 8,
                                                        zIndex: 2,
                                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                                        '&:hover': {
                                                            bgcolor: 'error.main',
                                                            color: 'white',
                                                        },
                                                    }}
                                                    size="small"
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            )}

                                            {/* Package Image */}
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={pkg.image}
                                                alt={pkg.name}
                                                sx={{
                                                    objectFit: 'cover',
                                                    position: 'relative',
                                                }}
                                            />

                                            <CardContent sx={{ p: 2 }}>
                                                {/* Package Name */}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 1,
                                                        lineHeight: 1.2,
                                                        minHeight: '2.4rem',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {pkg.name}
                                                </Typography>

                                                {/* Package Type */}
                                                <Chip
                                                    label={pkg.type}
                                                    size="small"
                                                    sx={{
                                                        mb: 2,
                                                        bgcolor: 'primary.light',
                                                        color: 'white',
                                                        fontWeight: 600,
                                                    }}
                                                />

                                                {/* Price */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                    <MoneyIcon color="primary" />
                                                    <Typography
                                                        variant="h5"
                                                        color="primary.main"
                                                        sx={{ fontWeight: 700 }}
                                                    >
                                                        ${pkg.price.toLocaleString()}
                                                    </Typography>
                                                </Box>

                                                {/* Duration */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                    <TimeIcon color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {getPackageDuration(pkg)}
                                                    </Typography>
                                                </Box>

                                                <Divider sx={{ my: 2 }} />

                                                {/* Highlights */}
                                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                                    Highlights:
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                    {getPackageHighlights(pkg).map((highlight, idx) => (
                                                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {highlight}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>

                                                {/* Description */}
                                                <Collapse in={true} timeout={800}>
                                                    <Box sx={{ mt: 2 }}>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{
                                                                lineHeight: 1.5,
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 3,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            {pkg.description}
                                                        </Typography>
                                                    </Box>
                                                </Collapse>
                                            </CardContent>
                                        </Card>
                                    </Slide>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Action Buttons */}
                        {compareList.length > 0 && (
                            <Fade in={true} timeout={1000}>
                                <Box
                                    sx={{
                                        mt: 3,
                                        pt: 2,
                                        borderTop: `1px solid ${theme.palette.divider}`,
                                        display: 'flex',
                                        gap: 2,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {userType === 'agent' && (
                                        <Button
                                            variant="outlined"
                                            onClick={onClearComparison}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Clear All
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={onClose}
                                    >
                                        {userType === 'customer' ? 'Close Comparison' : 'Close Comparison'}
                                    </Button>
                                </Box>
                            </Fade>
                        )}
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default TourComparisonDrawer; 