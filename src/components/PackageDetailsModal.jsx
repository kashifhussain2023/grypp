import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  Chip,
  Button,
  Paper,
  Stack,
  Rating,
  Divider,
  Avatar,
  Tab,
  Tabs,
  Badge,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fade,
  Zoom,
  Slide,
  Collapse,
  Backdrop,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Tooltip,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Fab,
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Star as StarIcon,
  LocalOffer as OfferIcon,
  Add as AddIcon,
  KeyboardArrowLeft as LeftArrowIcon,
  KeyboardArrowRight as RightArrowIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  AttachMoney as MoneyIcon,
  LocalActivity as ActivityIcon,
  PhotoCamera as PhotoIcon,
  EmojiEvents as HighlightIcon,
  FavoriteBorder as FavoriteIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Security as SecurityIcon,
  Schedule as ScheduleIcon,
  LocalPhone as PhoneIcon,
  Email as EmailIcon,
  Language as WebIcon,
} from '@mui/icons-material';

const PackageDetailsModal = ({ open, onClose, packageData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [isImageSlideshow, setIsImageSlideshow] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isFloatingButtonsVisible, setIsFloatingButtonsVisible] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dialogRef = useRef(null);
  const slideshowInterval = useRef(null);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      if (dialogRef.current) {
        const scrollTop = dialogRef.current.scrollTop;
        setScrollY(scrollTop);
        setIsFloatingButtonsVisible(scrollTop > 200);
      }
    };

    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.addEventListener('scroll', handleScroll);
      return () => dialogElement.removeEventListener('scroll', handleScroll);
    }
  }, [open]);

  useEffect(() => {
    if (isImageSlideshow) {
      slideshowInterval.current = setInterval(() => {
        setSelectedImageIndex(prev => 
          prev === packageData.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    } else {
      clearInterval(slideshowInterval.current);
    }

    return () => clearInterval(slideshowInterval.current);
  }, [isImageSlideshow, packageData?.images?.length]);

  if (!packageData) return null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleDaySelect = (index) => {
    setSelectedDay(index);
  };

  const toggleImageFullscreen = () => {
    setIsImageFullscreen(!isImageFullscreen);
  };

  const toggleSlideshow = () => {
    setIsImageSlideshow(!isImageSlideshow);
  };

  const handleImageZoom = (direction) => {
    setImageZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % packageData.images.length
      : selectedImageIndex === 0 ? packageData.images.length - 1 : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderLoadingScreen = () => (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
      }}
    >
      <Box textAlign="center">
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="white">
          Preparing your travel experience...
        </Typography>
      </Box>
    </Box>
  );

  const renderTopBanner = () => (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: 3,
        py: 2,
        transition: 'all 0.3s ease',
        transform: scrollY > 50 ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: scrollY > 50 ? theme.shadows[8] : theme.shadows[2],
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Slide direction="right" in={!isLoading} timeout={800}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              fontWeight="bold" 
              color="primary.main" 
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
            {packageData.title}
          </Typography>
          </Slide>
          <Fade in={!isLoading} timeout={1000}>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <LocationIcon color="action" fontSize="small" />
            {packageData.route && packageData.route.map((location, index) => (
              <React.Fragment key={index}>
                  <Zoom in={!isLoading} timeout={800 + index * 100}>
                <Chip
                  label={location}
                  variant="outlined"
                  size="small"
                  color="primary"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    />
                  </Zoom>
                {index < packageData.route.length - 1 && (
                  <Typography variant="body2" color="text.secondary">•</Typography>
                )}
              </React.Fragment>
            ))}
              <Zoom in={!isLoading} timeout={1200}>
            <Chip
              label={packageData.duration}
              color="secondary"
              size="small"
                  sx={{ 
                    ml: 1,
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Zoom>
          </Box>
          </Fade>
        </Box>
        <Box display="flex" gap={1}>
          <Tooltip title="Add to Wishlist">
            <IconButton
              onClick={toggleWishlist}
              sx={{
                bgcolor: isWishlisted ? 'error.main' : 'grey.100',
                color: isWishlisted ? 'white' : 'grey.700',
                '&:hover': { 
                  bgcolor: isWishlisted ? 'error.dark' : 'grey.200',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share Package">
            <IconButton
              sx={{
                bgcolor: 'grey.100',
                '&:hover': { 
                  bgcolor: 'grey.200',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: 'grey.100',
                '&:hover': { 
                  bgcolor: 'error.light',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
          }}
        >
          <CloseIcon />
        </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  const renderImageGallery = () => (
    <Box sx={{ mb: 4, position: 'relative' }}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
          <Card 
            elevation={8}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              '&:hover .image-controls': {
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: isMobile ? 300 : 500,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={toggleImageFullscreen}
            >
          <CardMedia
            component="img"
                height="100%"
            image={packageData.images[selectedImageIndex]}
            alt="Package main image"
                sx={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  transform: `scale(${imageZoom})`,
                  '&:hover': {
                    transform: `scale(${imageZoom * 1.05})`,
                  },
                }}
              />
              
              {/* Image overlay with gradient */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 3,
                }}
              >
                <Typography variant="h6" color="white" fontWeight="bold">
                  {packageData.images.length} Photos • Click to view fullscreen
                </Typography>
              </Box>

              {/* Image Navigation Controls */}
              <Box
                className="image-controls"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 2,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  sx={{
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  <PrevIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  sx={{
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  <NextIcon />
                </IconButton>
              </Box>

              {/* Top Right Controls */}
              <Box
                className="image-controls"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  display: 'flex',
                  gap: 1,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Tooltip title="Slideshow">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSlideshow();
                    }}
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    }}
                  >
                    {isImageSlideshow ? <PauseIcon /> : <PlayIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fullscreen">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImageFullscreen();
                    }}
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    }}
                  >
                    <FullscreenIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Image Counter */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="body2">
                  {selectedImageIndex + 1} / {packageData.images.length}
                </Typography>
              </Box>
            </Box>
        </Card>
      </Grid>
        
      <Grid item xs={12} md={3}>
          <Stack spacing={1} sx={{ height: isMobile ? 'auto' : 500, overflowY: 'auto' }}>
          {packageData.images.map((image, index) => (
              <Zoom key={index} in={!isLoading} timeout={600 + index * 50}>
            <Card
                  elevation={selectedImageIndex === index ? 8 : 2}
              sx={{
                cursor: 'pointer',
                    border: selectedImageIndex === index ? 3 : 0,
                borderColor: 'primary.main',
                transition: 'all 0.3s ease',
                    '&:hover': { 
                      elevation: 6,
                      transform: 'scale(1.02)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
              }}
              onClick={() => handleImageSelect(index)}
            >
              <CardMedia
                component="img"
                height="90"
                image={image}
                alt={`Package image ${index + 1}`}
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                  />
                  {selectedImageIndex === index && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckIcon fontSize="small" />
                    </Box>
                  )}
            </Card>
              </Zoom>
          ))}
        </Stack>
      </Grid>
    </Grid>
    </Box>
  );

  const renderImageFullscreen = () => (
    <Dialog
      open={isImageFullscreen}
      onClose={toggleImageFullscreen}
      maxWidth={false}
      fullScreen
      sx={{ '& .MuiDialog-paper': { bgcolor: 'black' } }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={packageData.images[selectedImageIndex]}
          alt="Fullscreen"
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            transform: `scale(${imageZoom})`,
            transition: 'transform 0.3s ease',
          }}
        />
        
        {/* Fullscreen Controls */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton
            onClick={() => handleImageZoom('out')}
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <ZoomOutIcon />
          </IconButton>
          <IconButton
            onClick={() => handleImageZoom('in')}
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            onClick={toggleImageFullscreen}
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Navigation */}
        <IconButton
          onClick={() => navigateImage('prev')}
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <PrevIcon />
        </IconButton>
        <IconButton
          onClick={() => navigateImage('next')}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <NextIcon />
        </IconButton>

        {/* Image Info */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="body1">
            {selectedImageIndex + 1} of {packageData.images.length}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );

  const renderHighlightsBadges = () => (
    <Fade in={!isLoading} timeout={1400}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
              elevation={4}
            sx={{
              height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}20)`,
                border: `2px solid ${theme.palette.primary.light}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <HighlightIcon />
                  </Avatar>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  PACKAGE HIGHLIGHTS
                </Typography>
              </Box>
                <Stack spacing={2}>
                {packageData.highlights.map((highlight, index) => (
                    <Slide key={index} direction="right" in={!isLoading} timeout={800 + index * 100}>
                      <Box display="flex" alignItems="flex-start" gap={2}>
                        <CheckIcon 
                          color="success" 
                          fontSize="small" 
                          sx={{ 
                            mt: 0.2,
                            p: 0.5,
                            bgcolor: 'success.light',
                            borderRadius: '50%',
                            color: 'white',
                          }} 
                        />
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {highlight}
                        </Typography>
                  </Box>
                    </Slide>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
          
        <Grid item xs={12} md={4}>
          <Card
              elevation={4}
            sx={{
              height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.success.light}20, ${theme.palette.success.main}20)`,
                border: `2px solid ${theme.palette.success.light}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar
                    sx={{
                      bgcolor: 'success.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <ActivityIcon />
                  </Avatar>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  ACTIVITIES
                </Typography>
              </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Exciting activities and experiences included in this package
              </Typography>
              <Button
                startIcon={<AddIcon />}
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                    transition: 'all 0.3s ease',
                  }}
              >
                View Activities
              </Button>
            </CardContent>
          </Card>
        </Grid>
          
        <Grid item xs={12} md={4}>
          <Card
              elevation={4}
            sx={{
              height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.warning.light}20, ${theme.palette.warning.main}20)`,
                border: `2px solid ${theme.palette.warning.light}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar
                    sx={{
                      bgcolor: 'warning.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <PhotoIcon />
                  </Avatar>
                <Typography variant="h6" fontWeight="bold" color="warning.main">
                  PROPERTY PHOTOS
                </Typography>
              </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                View photos of hotels and properties in this package
              </Typography>
              <Button
                startIcon={<PhotoIcon />}
                  variant="contained"
                  color="warning"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                    transition: 'all 0.3s ease',
                  }}
              >
                View Gallery
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </Fade>
  );

  const renderTabSection = () => (
    <Box sx={{ mb: 4 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          mb: 3,
        }}
      >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
        sx={{
            bgcolor: 'grey.50',
          '& .MuiTab-root': {
            fontWeight: 'bold',
            fontSize: '1rem',
              py: 2,
              px: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
              },
            },
            '& .Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white !important',
          },
        }}
      >
        {packageData.tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
      </Paper>

      <Fade in={!isLoading} timeout={1000}>
        <Box>
      {activeTab === 0 && renderItineraryContent()}
      {activeTab === 1 && renderPoliciesContent()}
      {activeTab === 2 && renderSummaryContent()}
        </Box>
      </Fade>
    </Box>
  );

  const renderItineraryContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Stepper orientation="vertical" activeStep={selectedDay}>
          {packageData.itinerary.map((day, index) => (
            <Step key={index} expanded={true}>
              <StepLabel
                onClick={() => handleDaySelect(index)}
                sx={{ 
                  cursor: 'pointer',
                  '& .MuiStepLabel-label': {
                    fontWeight: selectedDay === index ? 'bold' : 'normal',
                    color: selectedDay === index ? 'primary.main' : 'text.primary',
                    fontSize: '1.1rem',
                  }
                }}
              >
                <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                  <Typography variant="h6" fontWeight="bold">
                    {day.day} - {day.city}
                  </Typography>
                  <Chip 
                    label={day.date} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: 'primary.light', color: 'white' },
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Box>
              </StepLabel>
              <StepContent>
                <Collapse in={selectedDay === index} timeout={500}>
                <Card
                    elevation={selectedDay === index ? 8 : 2}
                  sx={{
                      p: 3,
                      border: selectedDay === index ? 3 : 0,
                    borderColor: 'primary.main',
                      borderRadius: 3,
                      transition: 'all 0.5s ease',
                    mb: 2,
                      background: selectedDay === index 
                        ? `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.background.paper})`
                        : 'background.paper',
                  }}
                >
                  {/* Flight Information */}
                  {day.flightNote && (
                      <Fade in={selectedDay === index} timeout={800}>
                        <Box sx={{ mb: 3 }}>
                          <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>
                              <FlightIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight="bold" color="info.main">
                          FLIGHT
                        </Typography>
                      </Box>
                          <Paper 
                            elevation={2} 
                            sx={{ 
                              p: 2.5, 
                              bgcolor: 'info.50',
                              borderRadius: 2,
                              border: `1px solid ${theme.palette.info.light}`,
                            }}
                          >
                            <Typography variant="body2" color="info.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <InfoIcon fontSize="small" />
                          {day.flightNote}
                        </Typography>
                      </Paper>
                    </Box>
                      </Fade>
                  )}

                  {/* Hotel Information */}
                  {day.hotel && (
                      <Fade in={selectedDay === index} timeout={1000}>
                    <Box>
                          <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                              <HotelIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                          HOTEL
                        </Typography>
                      </Box>
                          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={8}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                              {day.hotel.name}
                            </Typography>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                              <Rating value={day.hotel.stars} readOnly size="small" />
                                  <Typography variant="body2" fontWeight="bold">
                                ({day.hotel.rating})
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                  📍 {day.hotel.location}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                                  🛏️ {day.hotel.stay}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                  🏨 {day.hotel.type}
                            </Typography>
                                <Box sx={{ mt: 2 }}>
                            {day.hotel.inclusions.map((inclusion, idx) => (
                              <Chip
                                key={idx}
                                label={inclusion}
                                size="small"
                                color="success"
                                variant="outlined"
                                      sx={{ 
                                        mr: 1, 
                                        mb: 1,
                                        '&:hover': { bgcolor: 'success.light', color: 'white' },
                                        transition: 'all 0.3s ease',
                                      }}
                              />
                            ))}
                                </Box>
                          </Grid>
                              <Grid item xs={12} md={4}>
                                <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            <CardMedia
                              component="img"
                                    height="120"
                                    image={day.hotel.image || '/api/placeholder/150/120'}
                              alt={day.hotel.name}
                                    sx={{
                                      transition: 'transform 0.3s ease',
                                      '&:hover': { transform: 'scale(1.1)' },
                                    }}
                            />
                                </Card>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                      </Fade>
                  )}
                </Card>
                </Collapse>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>

      {/* Enhanced Sidebar */}
      <Grid item xs={12} md={4}>
        <Card 
          elevation={6} 
          sx={{ 
            position: 'sticky', 
            top: 120,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              p: 3,
              color: 'white',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Trip Timeline
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Click on any day to view details
            </Typography>
          </Box>
          <CardContent sx={{ p: 0 }}>
            <List dense>
              {packageData.sidebar.days.map((date, index) => (
                <ListItem
                  key={index}
                  button
                  selected={selectedDay === index}
                  onClick={() => handleDaySelect(index)}
                  sx={{
                    py: 2,
                    px: 3,
                    borderLeft: selectedDay === index ? 4 : 0,
                    borderColor: 'primary.main',
                    bgcolor: selectedDay === index ? 'primary.50' : 'transparent',
                    '&:hover': {
                      bgcolor: 'primary.100',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: selectedDay === index ? 'primary.main' : 'grey.300',
                        color: selectedDay === index ? 'white' : 'grey.600',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={date}
                    primaryTypographyProps={{
                      fontWeight: selectedDay === index ? 'bold' : 'normal',
                      color: selectedDay === index ? 'primary.main' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Enhanced Best Deals Section */}
            <Box sx={{ p: 3 }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  background: `linear-gradient(135deg, ${theme.palette.success.light}20, ${theme.palette.success.main}20)`,
                  border: `2px solid ${theme.palette.success.light}`,
                  borderRadius: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <OfferIcon color="success" />
                  <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                {packageData.sidebar.bestDeals.message}
              </Typography>
                </Box>
                <Stack spacing={1.5}>
                {packageData.sidebar.bestDeals.actions.map((action, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1.5}>
                      <CheckIcon 
                        color="success" 
                        fontSize="small"
                        sx={{
                          p: 0.3,
                          bgcolor: 'success.main',
                          borderRadius: '50%',
                          color: 'white',
                        }}
                      />
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {action}
                      </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderPoliciesContent = () => (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Avatar sx={{ bgcolor: 'info.main', width: 48, height: 48 }}>
          <SecurityIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
        Cancellation & Payment Policies
      </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="error.main">
            Cancellation Policy
          </Typography>
            <Stack spacing={2}>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <CheckIcon color="success" fontSize="small" sx={{ mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>Free cancellation</strong> up to 7 days before departure
          </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <InfoIcon color="warning" fontSize="small" sx={{ mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>50% refund</strong> for cancellations between 3-7 days before departure
          </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <CloseIcon color="error" fontSize="small" sx={{ mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>No refund</strong> for cancellations within 3 days of departure
          </Typography>
        </Box>
            </Stack>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="success.main">
            Payment Policy
          </Typography>
            <Stack spacing={2}>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <MoneyIcon color="primary" fontSize="small" sx={{ mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>30% advance payment</strong> required to confirm booking
          </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <ScheduleIcon color="warning" fontSize="small" sx={{ mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>Balance payment</strong> due 15 days before departure
          </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <CheckIcon color="success" fontSize="small" sx={{ mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>EMI options available</strong> with 0% interest for 6 months
          </Typography>
        </Box>
      </Stack>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'info.50', borderRadius: 2, border: `1px solid ${theme.palette.info.light}` }}>
        <Typography variant="body2" color="info.main" fontWeight="bold" gutterBottom>
          💡 Pro Tip:
        </Typography>
        <Typography variant="body2" color="info.main">
          Book early to secure the best rates and ensure availability. Our flexible payment options make it easy to plan your dream vacation.
        </Typography>
      </Box>
    </Paper>
  );

  const renderSummaryContent = () => (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          <InfoIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
        Package Summary
      </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 2,
              border: `2px solid ${theme.palette.success.light}`,
              bgcolor: 'success.50',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom color="success.main">
              ✅ Package Includes
          </Typography>
            <Stack spacing={2}>
              {[
                'Accommodation as per itinerary',
                'Daily breakfast at hotels',
                'AC transportation throughout',
                'Sightseeing as per itinerary',
                'Professional tour guide'
              ].map((item, index) => (
                <Box key={index} display="flex" alignItems="flex-start" gap={2}>
                  <CheckIcon 
                    color="success" 
                    fontSize="small" 
                    sx={{ 
                      mt: 0.5,
                      p: 0.3,
                      bgcolor: 'success.main',
                      borderRadius: '50%',
                      color: 'white',
                    }} 
                  />
                  <Typography variant="body2">{item}</Typography>
            </Box>
              ))}
          </Stack>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 2,
              border: `2px solid ${theme.palette.error.light}`,
              bgcolor: 'error.50',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom color="error.main">
              ❌ Package Excludes
          </Typography>
            <Stack spacing={2}>
              {[
                'International/Domestic flights',
                'Personal expenses',
                'Travel insurance',
                'Entry fees to monuments',
                'Tips and gratuities'
              ].map((item, index) => (
                <Box key={index} display="flex" alignItems="flex-start" gap={2}>
                  <CloseIcon 
                    color="error" 
                    fontSize="small" 
                    sx={{ 
                      mt: 0.5,
                      p: 0.3,
                      bgcolor: 'error.main',
                      borderRadius: '50%',
                      color: 'white',
                    }} 
                  />
                  <Typography variant="body2">{item}</Typography>
            </Box>
              ))}
          </Stack>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <PhoneIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Round-the-clock assistance for your peace of mind
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <SecurityIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Secure Booking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your data and payments are completely secure
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <StarIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Best Value
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Guaranteed best prices with premium service
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  const renderCouponSection = () => (
    <Card elevation={4} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
          p: 3,
          color: 'white',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <OfferIcon sx={{ fontSize: 32 }} />
          <Typography variant="h6" fontWeight="bold">
            🎉 Available Offers
        </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {packageData.coupons.map((coupon, index) => (
            <Fade key={index} in={!isLoading} timeout={800 + index * 200}>
            <Paper
                elevation={3}
              sx={{
                  p: 3,
                  border: coupon.applied ? 3 : 1,
                borderColor: coupon.applied ? 'success.main' : 'divider',
                  borderRadius: 2,
                  background: coupon.applied 
                    ? `linear-gradient(135deg, ${theme.palette.success.light}20, ${theme.palette.success.main}20)`
                    : 'background.paper',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8],
                  },
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Chip
                        label={coupon.code}
                        color="primary"
                        variant="filled"
                        sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                      />
                      {coupon.applied && (
                        <Chip
                          label="APPLIED"
                          color="success"
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                    {coupon.desc}
                  </Typography>
                    <Typography variant="h6" color="success.main" fontWeight="bold">
                      💰 Save ₹{Math.abs(coupon.value).toLocaleString()}
                  </Typography>
                </Box>
                <Button
                  variant={coupon.applied ? "contained" : "outlined"}
                  color={coupon.applied ? "success" : "primary"}
                    size="large"
                  disabled={coupon.applied}
                    sx={{
                      minWidth: 120,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      '&:hover': {
                        transform: coupon.applied ? 'none' : 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {coupon.applied ? "✓ Applied" : "Apply Now"}
                </Button>
              </Box>
            </Paper>
            </Fade>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );

  const renderPriceBox = () => (
    <Card
      elevation={8}
      sx={{
        position: 'sticky',
        top: 120,
        border: `3px solid ${theme.palette.primary.main}`,
        borderRadius: 3,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.light}10)`,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          p: 3,
          color: 'white',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          💳 Price Summary
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Original Price */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2">Original Price</Typography>
          <Typography
            variant="h6"
            sx={{ textDecoration: 'line-through' }}
            color="text.secondary"
          >
            ₹{packageData.price.original.toLocaleString()}
          </Typography>
        </Box>

        {/* Discounted Price */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            Final Price
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            ₹{packageData.price.discounted.toLocaleString()}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom textAlign="center">
          Per {packageData.price.per} • {packageData.price.notes}
        </Typography>

        {/* Savings */}
        <Box
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            p: 2,
            borderRadius: 2,
            mb: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            🎉 You Save: ₹{(packageData.price.original - packageData.price.discounted).toLocaleString()}
          </Typography>
        </Box>

        {/* EMI Option */}
        <Box
          sx={{
            bgcolor: 'info.50',
            p: 2,
            borderRadius: 2,
            mb: 3,
            border: `1px solid ${theme.palette.info.light}`,
          }}
        >
          <Typography variant="body2" color="info.main" fontWeight="bold" textAlign="center">
            💳 EMI starting from {packageData.price.emi}
          </Typography>
        </Box>

        {/* CTA Buttons */}
        <Stack spacing={2}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
              py: 2,
              fontSize: '1.2rem',
            fontWeight: 'bold',
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[12],
              },
              transition: 'all 0.3s ease',
            }}
          >
            🚀 Proceed to Payment
        </Button>

        <Button
          variant="outlined"
          fullWidth
            size="large"
            startIcon={<FavoriteIcon />}
            sx={{ 
              py: 1.5,
              borderRadius: 2,
              borderWidth: 2,
              fontWeight: 'bold',
              '&:hover': {
                borderWidth: 2,
                transform: 'scale(1.02)',
              },
              transition: 'all 0.3s ease',
            }}
        >
          Add to Wishlist
        </Button>
        </Stack>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Box textAlign="center">
              <SecurityIcon color="success" fontSize="small" />
              <Typography variant="caption" display="block" color="text.secondary">
                Secure
        </Typography>
            </Box>
            <Box textAlign="center">
              <PhoneIcon color="primary" fontSize="small" />
              <Typography variant="caption" display="block" color="text.secondary">
                24/7 Support
              </Typography>
            </Box>
            <Box textAlign="center">
              <CheckIcon color="success" fontSize="small" />
              <Typography variant="caption" display="block" color="text.secondary">
                Easy Cancel
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );

  const renderFloatingActions = () => (
    <Fade in={isFloatingButtonsVisible}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1300,
        }}
      >
        <SpeedDial
          ariaLabel="Package Actions"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<ShareIcon />}
            tooltipTitle="Share Package"
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          />
          <SpeedDialAction
            icon={<DownloadIcon />}
            tooltipTitle="Download Itinerary"
            sx={{ bgcolor: 'success.main', color: 'white' }}
          />
          <SpeedDialAction
            icon={<PhoneIcon />}
            tooltipTitle="Call Expert"
            sx={{ bgcolor: 'warning.main', color: 'white' }}
          />
          <SpeedDialAction
            icon={<EmailIcon />}
            tooltipTitle="Email Details"
            sx={{ bgcolor: 'info.main', color: 'white' }}
          />
        </SpeedDial>
      </Box>
    </Fade>
  );

  return (
    <>
      {isLoading && renderLoadingScreen()}
      
    <Dialog
        open={open && !isLoading}
      onClose={onClose}
      maxWidth={false}
      fullScreen
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
      sx={{
        '& .MuiDialog-paper': {
          margin: 0,
          maxHeight: '100vh',
            background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.grey[50]})`,
        },
      }}
    >
      {renderTopBanner()}
      
      <DialogContent
          ref={dialogRef}
        sx={{
          p: 0,
          height: 'calc(100vh - 120px)',
          overflow: 'auto',
            scrollBehavior: 'smooth',
        }}
      >
          <Box sx={{ px: isMobile ? 2 : 4, py: 3 }}>
          {renderImageGallery()}
          {renderHighlightsBadges()}
          
            <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              {renderTabSection()}
            </Grid>
            <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                {renderCouponSection()}
                {renderPriceBox()}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>

      {renderImageFullscreen()}
      {renderFloatingActions()}
    </>
  );
};

export default PackageDetailsModal; 