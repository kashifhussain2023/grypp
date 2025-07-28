import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  Chip,
  Button,
  Slide,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
  useMediaQuery,
  Rating,
  Divider,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Compare as CompareIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Description as DescriptionIcon,
  FeaturedPlayList as FeaturesIcon,
  Category as TypeIcon,
  Image as ImageIcon,
  Group as GroupIcon,
  LocalOffer as IncludesIcon,
  Terrain as DifficultyIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Favorite as HeartIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TourComparisonModal = ({
  open,
  onClose,
  compareList = [],
  onRemoveFromCompare,
  onClearComparison,
  getBestValue,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const bestValuePackage = getBestValue();

  const formatHighlights = (description) => {
    const sentences = description.split('.').filter(s => s.trim().length > 0);
    return sentences.slice(0, 3).map(s => s.trim());
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'success';
      case 'moderate': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  const getDifficultyProgress = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 33;
      case 'moderate': return 66;
      case 'hard': return 100;
      default: return 0;
    }
  };

  // Enhanced comparison sections with more detailed information
  const comparisonSections = [
    {
      id: 'images',
      label: 'Package Images',
      icon: <ImageIcon />,
      type: 'image'
    },
    {
      id: 'name',
      label: 'Package Name',
      icon: <CompareIcon />,
      type: 'text'
    },
    {
      id: 'rating',
      label: 'Customer Rating',
      icon: <StarIcon />,
      type: 'rating'
    },
    {
      id: 'type',
      label: 'Tour Type',
      icon: <TypeIcon />,
      type: 'chip'
    },
    {
      id: 'price',
      label: 'Price',
      icon: <MoneyIcon />,
      type: 'price'
    },
    {
      id: 'duration',
      label: 'Duration',
      icon: <TimeIcon />,
      type: 'text'
    },
    {
      id: 'location',
      label: 'Location',
      icon: <LocationIcon />,
      type: 'location'
    },
    {
      id: 'difficulty',
      label: 'Difficulty Level',
      icon: <DifficultyIcon />,
      type: 'difficulty'
    },
    {
      id: 'groupSize',
      label: 'Group Size',
      icon: <GroupIcon />,
      type: 'text'
    },
    {
      id: 'includes',
      label: 'What\'s Included',
      icon: <IncludesIcon />,
      type: 'includes'
    },
    {
      id: 'description',
      label: 'Description',
      icon: <DescriptionIcon />,
      type: 'text'
    },
    {
      id: 'highlights',
      label: 'Key Highlights',
      icon: <StarIcon />,
      type: 'highlights'
    },
    {
      id: 'features',
      label: 'Special Features',
      icon: <FeaturesIcon />,
      type: 'badges'
    }
  ];

  // Helper function to find best-priced package
  const getBestPricedPackage = () => {
    if (compareList.length === 0) return null;
    return compareList.reduce((best, current) => 
      (current.price < best.price) ? current : best
    );
  };

  const bestPricedPackage = getBestPricedPackage();

  // Helper function to calculate discount percentage
  const getDiscountPercentage = (pkg) => {
    if (!bestPricedPackage || pkg.id !== bestPricedPackage.id) return 0;
    const maxPrice = Math.max(...compareList.map(p => p.price));
    return Math.round(((maxPrice - pkg.price) / maxPrice) * 100);
  };

  const renderCellContent = (section, pkg) => {
    const isBestValue = bestValuePackage?.id === pkg.id;
    const isBestPrice = bestPricedPackage?.id === pkg.id;
    const discountPercentage = getDiscountPercentage(pkg);

    switch (section.type) {
      case 'image':
        return (
          <Box sx={{ position: 'relative' }}>
                         {/* Best Deal Banner */}
             {isBestPrice && (
               <Box
                 sx={{
                   position: 'absolute',
                   top: -12,
                   left: -12,
                   right: -12,
                   background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                   color: 'white',
                   py: 1,
                   px: 2,
                   borderRadius: '12px 12px 0 0',
                   zIndex: 4,
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: 0.5,
                   fontSize: isMobile ? '0.7rem' : '0.8rem',
                   fontWeight: 'bold',
                   boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px',
                 }}
               >
                 <TrophyIcon sx={{ fontSize: isMobile ? 16 : 18 }} />
                 Best Deal – Limited time only
               </Box>
             )}

            {/* Discount Badge */}
            {isBestPrice && discountPercentage > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: isMobile ? 20 : 25,
                  right: -8,
                  background: 'linear-gradient(135deg, #76ff03, #64dd17)',
                  color: '#1b5e20',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '20px',
                  zIndex: 5,
                  fontSize: isMobile ? '0.65rem' : '0.75rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  boxShadow: '0 3px 10px rgba(118, 255, 3, 0.4)',
                  animation: 'bounce 2s infinite',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                  },
                }}
              >
                {discountPercentage}% OFF
              </Box>
            )}

            {/* Legacy Best Value Badge */}
            {isBestValue && !isBestPrice && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  left: -8,
                  right: -8,
                  bgcolor: 'success.main',
                  color: 'white',
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <TrophyIcon sx={{ fontSize: 14 }} />
                BEST VALUE
              </Box>
            )}

                         {/* Enhanced Card for Best Price */}
             <Card 
               sx={{ 
                 borderRadius: isBestPrice ? 3 : 2, 
                 overflow: 'hidden', 
                 mt: (isBestValue || isBestPrice) ? 2 : 0,
                 border: isBestPrice ? '3px solid' : isBestValue ? '2px solid' : '1px solid',
                 borderColor: isBestPrice ? '#4caf50' : isBestValue ? 'success.main' : 'grey.300',
                 boxShadow: isBestPrice ? '0 12px 40px rgba(76, 175, 80, 0.25)' : 
                           isBestValue ? '0 8px 25px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
                 transition: 'all 0.3s ease',
                 position: 'relative',
                 '&:hover': {
                   transform: isBestPrice ? 'scale(1.03)' : 'scale(1.02)',
                   boxShadow: isBestPrice ? '0 16px 50px rgba(76, 175, 80, 0.35)' : '0 8px 25px rgba(0,0,0,0.15)',
                 },
                 '&::before': isBestPrice ? {
                   content: '""',
                   position: 'absolute',
                   top: 0,
                   left: 0,
                   right: 0,
                   bottom: 0,
                   background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(46, 125, 50, 0.1))',
                   zIndex: 1,
                 } : {},
               }}
             >
              <CardMedia
                component="img"
                height={isMobile ? "130" : "160"}
                image={pkg.image}
                alt={pkg.name}
                sx={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  zIndex: 2,
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              />
              
                             {/* Premium Overlay for Best Price */}
               {isBestPrice && (
                 <Box
                   sx={{
                     position: 'absolute',
                     bottom: 0,
                     left: 0,
                     right: 0,
                     background: 'linear-gradient(to top, rgba(46, 125, 50, 0.8), transparent)',
                     height: '40%',
                     zIndex: 2,
                     display: 'flex',
                     alignItems: 'flex-end',
                     justifyContent: 'center',
                     pb: 1,
                   }}
                 >
                   <Chip
                     label="PREMIUM CHOICE"
                     size="small"
                     sx={{
                       bgcolor: 'rgba(255, 255, 255, 0.95)',
                       color: '#2e7d32',
                       fontWeight: 'bold',
                       fontSize: '0.65rem',
                       letterSpacing: '0.3px',
                     }}
                   />
                 </Box>
               )}
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5, gap: 1 }}>
              <IconButton
                onClick={() => onRemoveFromCompare(pkg.id)}
                size="small"
                sx={{
                  color: 'error.main',
                  bgcolor: 'background.paper',
                  boxShadow: isBestPrice ? 4 : 2,
                  border: isBestPrice ? '2px solid' : 'none',
                  borderColor: isBestPrice ? 'error.light' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'error.main',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
                             <IconButton
                 size="small"
                 sx={{
                   color: isBestPrice ? '#2e7d32' : 'primary.main',
                   bgcolor: 'background.paper',
                   boxShadow: isBestPrice ? 4 : 2,
                   border: isBestPrice ? '2px solid' : 'none',
                   borderColor: isBestPrice ? '#c8e6c9' : 'transparent',
                   transition: 'all 0.3s ease',
                   '&:hover': {
                     bgcolor: isBestPrice ? '#2e7d32' : 'primary.main',
                     color: 'white',
                     transform: 'scale(1.1)',
                   },
                 }}
               >
                <HeartIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: 'info.main',
                  bgcolor: 'background.paper',
                  boxShadow: isBestPrice ? 4 : 2,
                  border: isBestPrice ? '2px solid' : 'none',
                  borderColor: isBestPrice ? 'info.light' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'info.main',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );

      case 'text':
        if (section.id === 'name') {
          return (
                         <Box 
               sx={{ 
                 textAlign: 'center',
                 position: 'relative',
                 ...(isBestPrice && {
                   background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(46, 125, 50, 0.1))',
                   borderRadius: 2,
                   p: 2,
                   border: '2px solid #c8e6c9',
                   boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
                 })
               }}
             >
               <Typography 
                 variant={isMobile ? "body1" : "h6"} 
                 fontWeight="bold" 
                 color={isBestPrice ? '#2e7d32' : 'primary.main'}
                 sx={{ 
                   mb: 1,
                   fontSize: isBestPrice ? (isMobile ? '1rem' : '1.25rem') : (isMobile ? '0.875rem' : '1rem'),
                   background: isBestPrice ? 'linear-gradient(135deg, #2e7d32, #4caf50)' : 
                             isBestValue ? 'linear-gradient(45deg, #4caf50, #2e7d32)' : 'transparent',
                   WebkitBackgroundClip: (isBestPrice || isBestValue) ? 'text' : 'unset',
                   WebkitTextFillColor: (isBestPrice || isBestValue) ? 'transparent' : 'inherit',
                   textShadow: isBestPrice ? '0 2px 4px rgba(46, 125, 50, 0.1)' : 'none',
                   fontWeight: isBestPrice ? 'bolder' : 'bold',
                 }}
               >
                 {pkg.name}
               </Typography>

               {/* Enhanced chip for best price */}
               {isBestPrice && (
                 <Chip 
                   label="PREMIUM CHOICE" 
                   size="small" 
                   sx={{
                     background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                     color: 'white',
                     fontWeight: 'bold',
                     fontSize: '0.65rem',
                     textTransform: 'uppercase',
                     letterSpacing: '0.3px',
                     boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
                     border: 'none',
                     animation: 'premium-pulse 3s infinite',
                     '@keyframes premium-pulse': {
                       '0%, 100%': { transform: 'scale(1)' },
                       '50%': { transform: 'scale(1.05)' },
                     },
                   }}
                 />
               )}

              {/* Legacy recommended chip */}
              {isBestValue && !isBestPrice && (
                <Chip 
                  label="RECOMMENDED" 
                  size="small" 
                  color="success" 
                  sx={{ fontWeight: 'bold', fontSize: '0.6rem' }}
                />
              )}
            </Box>
          );
        }
        if (section.id === 'duration') {
          return pkg.duration ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="body1" 
                color="text.primary" 
                fontWeight="600"
                sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
              >
                {pkg.duration}
              </Typography>
            </Box>
          ) : (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              textAlign="center"
              sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
            >
              Duration not specified
            </Typography>
          );
        }
        if (section.id === 'description') {
          return (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              lineHeight={1.6}
              sx={{ 
                maxHeight: isMobile ? '80px' : '100px',
                overflow: 'auto',
                textAlign: 'left',
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '2px',
                },
              }}
            >
              {pkg.description}
            </Typography>
          );
        }
                 if (section.id === 'groupSize') {
           return (
             <Box sx={{ textAlign: 'center' }}>
               <Typography 
                 variant="body2" 
                 fontWeight="600"
                 sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
               >
                 {pkg.groupSize || 'Not specified'}
               </Typography>
             </Box>
           );
         }
         return (
           <Typography 
             variant="body2" 
             textAlign="center"
             sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}
           >
             {pkg[section.id] || 'N/A'}
           </Typography>
         );

      case 'rating':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Rating 
              value={pkg.rating || 0} 
              readOnly 
              precision={0.1}
              size="small"
              sx={{ mb: 0.5, fontSize: isMobile ? '1rem' : '1.2rem' }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
            >
              {pkg.rating ? `${pkg.rating}/5.0` : 'No rating'}
            </Typography>
          </Box>
        );

      case 'location':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <LocationIcon sx={{ 
              color: 'primary.main', 
              mb: 0.5, 
              fontSize: isMobile ? '1rem' : '1.2rem' 
            }} />
            <Typography 
              variant="body2" 
              fontWeight="600"
              sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
            >
              {pkg.location || 'Location not specified'}
            </Typography>
          </Box>
        );

      case 'difficulty':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label={pkg.difficulty || 'Not specified'}
              color={getDifficultyColor(pkg.difficulty)}
              variant="filled"
              size={isMobile ? "small" : "medium"}
              sx={{ fontWeight: 600, mb: 1 }}
            />
            <LinearProgress
              variant="determinate"
              value={getDifficultyProgress(pkg.difficulty)}
              color={getDifficultyColor(pkg.difficulty)}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        );

      case 'chip':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Chip
              label={pkg.type}
              color="primary"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{ fontWeight: 600 }}
            />
          </Box>
        );

      case 'price':
                 return (
           <Box 
             sx={{ 
               textAlign: 'center',
               position: 'relative',
               mt: isBestPrice ? 2 : 0,
               ...(isBestPrice && {
                 background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(46, 125, 50, 0.1))',
                 borderRadius: 2,
                 p: 2,
                 border: '2px solid #c8e6c9',
                 boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
               })
             }}
           >
             {/* Premium Badge for Best Price */}
             {isBestPrice && (
               <Box
                 sx={{
                   position: 'absolute',
                   top: -8,
                   left: '50%',
                   transform: 'translateX(-50%)',
                   background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                   color: 'white',
                   px: 2,
                   py: 0.5,
                   borderRadius: '15px',
                   fontSize: '0.65rem',
                   fontWeight: 'bold',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px',
                   zIndex: 2,
                   boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
                 }}
               >
                 LOWEST PRICE
               </Box>
             )}

             <Typography 
               variant={isMobile ? "h5" : "h4"} 
               color={isBestPrice ? '#2e7d32' : 'success.main'}
               fontWeight="bold"
               sx={{ 
                 mb: 0.5,
                 mt: isBestPrice ? 1 : 0,
                 fontSize: isBestPrice ? (isMobile ? '1.5rem' : '2rem') : (isMobile ? '1rem' : '1.25rem'),
                 textShadow: isBestPrice ? '0 2px 4px rgba(46, 125, 50, 0.2)' : 'none',
                 ...(isBestPrice && {
                   background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   backgroundClip: 'text',
                 })
               }}
             >
               ${pkg.price?.toLocaleString('en-US') || pkg.price}
             </Typography>

            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                fontWeight: isBestPrice ? 600 : 400,
              }}
            >
              {pkg.currency || 'USD'}
            </Typography>

            {/* Discount savings for best price */}
            {isBestPrice && discountPercentage > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#4caf50',
                    fontWeight: 'bold',
                    fontSize: '0.7rem',
                    display: 'block',
                  }}
                >
                  Save ${(Math.max(...compareList.map(p => p.price)) - pkg.price).toLocaleString('en-US')}
                </Typography>
              </Box>
            )}

            {/* Enhanced chip for best price */}
            {isBestPrice && (
              <Box sx={{ mt: 1.5 }}>
                <Chip 
                  label="BEST DEAL" 
                  size="small" 
                  sx={{
                    background: 'linear-gradient(135deg, #76ff03, #64dd17)',
                    color: '#1b5e20',
                    fontWeight: 'bold',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    boxShadow: '0 3px 10px rgba(118, 255, 3, 0.3)',
                    border: 'none',
                  }}
                />
              </Box>
            )}

            {/* Legacy best value chip */}
            {isBestValue && !isBestPrice && (
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label="BEST VALUE" 
                  size="small" 
                  color="success" 
                  variant="filled"
                  sx={{ fontWeight: 'bold', fontSize: '0.6rem' }}
                />
              </Box>
            )}
          </Box>
        );

      case 'includes':
        return pkg.includes && pkg.includes.length > 0 ? (
                     <Box
             sx={{
               ...(isBestPrice && {
                 background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(46, 125, 50, 0.1))',
                 borderRadius: 2,
                 p: 2,
                 border: '2px solid #c8e6c9',
                 boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
                 position: 'relative',
               })
             }}
           >
             {/* Premium Features Header for Best Price */}
             {isBestPrice && (
               <Box
                 sx={{
                   position: 'absolute',
                   top: -8,
                   left: '50%',
                   transform: 'translateX(-50%)',
                   background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                   color: 'white',
                   px: 2,
                   py: 0.5,
                   borderRadius: '15px',
                   fontSize: '0.6rem',
                   fontWeight: 'bold',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px',
                   zIndex: 2,
                   boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
                 }}
               >
                 PREMIUM FEATURES
               </Box>
             )}

            <Stack spacing={isBestPrice ? 0.6 : 0.4} sx={{ mt: isBestPrice ? 1 : 0 }}>
              {pkg.includes.slice(0, isMobile ? 3 : 4).map((item, idx) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    transition: 'transform 0.2s ease',
                    '&:hover': isBestPrice ? { transform: 'translateX(4px)' } : {},
                  }}
                >
                                     <CheckIcon 
                     sx={{ 
                       fontSize: isBestPrice ? 14 : 12, 
                       color: isBestPrice ? '#2e7d32' : 'success.main',
                       filter: isBestPrice ? 'drop-shadow(0 2px 4px rgba(46, 125, 50, 0.3))' : 'none',
                     }} 
                   />
                  <Typography 
                    variant="caption" 
                    color={isBestPrice ? 'text.primary' : 'text.secondary'}
                    lineHeight={1.3}
                    sx={{ 
                      fontSize: isMobile ? '0.65rem' : '0.7rem',
                      fontWeight: isBestPrice ? 600 : 400,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
              
              {pkg.includes.length > (isMobile ? 3 : 4) && (
                                 <Box
                   sx={{
                     ...(isBestPrice && {
                       background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(46, 125, 50, 0.15))',
                       borderRadius: 1,
                       p: 1,
                       border: '1px solid #c8e6c9',
                     })
                   }}
                 >
                   <Typography 
                     variant="caption" 
                     color={isBestPrice ? '#2e7d32' : 'primary.main'}
                     sx={{ 
                       fontStyle: 'italic',
                       fontSize: isMobile ? '0.6rem' : '0.65rem',
                       fontWeight: isBestPrice ? 'bold' : 'normal',
                       display: 'flex',
                       alignItems: 'center',
                       gap: 0.5,
                     }}
                   >
                     +{pkg.includes.length - (isMobile ? 3 : 4)} more {isBestPrice ? 'premium ' : ''}items
                   </Typography>
                 </Box>
              )}

                             {/* Bonus section for best price */}
               {isBestPrice && (
                 <Box
                   sx={{
                     mt: 1,
                     pt: 1,
                     borderTop: '2px solid #c8e6c9',
                     background: 'linear-gradient(135deg, rgba(118, 255, 3, 0.1), rgba(100, 221, 23, 0.15))',
                     borderRadius: 1,
                     p: 1,
                   }}
                 >
                   <Typography
                     variant="caption"
                     sx={{
                       color: '#388e3c',
                       fontWeight: 'bold',
                       fontSize: '0.65rem',
                       textTransform: 'uppercase',
                       letterSpacing: '0.3px',
                       display: 'flex',
                       alignItems: 'center',
                       gap: 0.5,
                     }}
                   >
                     BONUS: Priority Support & Free Cancellation
                   </Typography>
                 </Box>
               )}
            </Stack>
          </Box>
        ) : (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center"
            sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
          >
            Details not available
          </Typography>
        );

      case 'highlights': {
        const highlights = formatHighlights(pkg.description);
        return (
          <Stack spacing={0.4}>
            {highlights.slice(0, isMobile ? 2 : 3).map((highlight, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                <StarIcon sx={{ fontSize: 12, color: 'warning.main', mt: 0.2 }} />
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  lineHeight={1.3}
                  sx={{ fontSize: isMobile ? '0.65rem' : '0.7rem' }}
                >
                  {highlight}
                </Typography>
              </Box>
            ))}
          </Stack>
        );
      }

      case 'badges':
        return (
                     <Box
             sx={{
               ...(isBestPrice && {
                 background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(46, 125, 50, 0.1))',
                 borderRadius: 2,
                 p: 2,
                 border: '2px solid #c8e6c9',
                 boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
                 position: 'relative',
               })
             }}
           >
             {/* Premium Action Button for Best Price */}
             {isBestPrice && (
               <Box sx={{ mb: 2 }}>
                 <Button
                   variant="contained"
                   fullWidth
                   size={isMobile ? "medium" : "large"}
                   sx={{
                     background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                     color: 'white',
                     fontWeight: 'bold',
                     fontSize: isMobile ? '0.8rem' : '0.9rem',
                     textTransform: 'uppercase',
                     letterSpacing: '0.5px',
                     py: isMobile ? 1 : 1.5,
                     borderRadius: '25px',
                     boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
                     transition: 'all 0.3s ease',
                     '&:hover': {
                       background: 'linear-gradient(135deg, #1b5e20, #388e3c)',
                       transform: 'translateY(-2px)',
                       boxShadow: '0 12px 35px rgba(46, 125, 50, 0.5)',
                     },
                     '&:active': {
                       transform: 'translateY(0px)',
                     }
                   }}
                 >
                   Choose Best Deal
                 </Button>
                 <Typography
                   variant="caption"
                   sx={{
                     display: 'block',
                     textAlign: 'center',
                     mt: 1,
                     color: '#2e7d32',
                     fontWeight: 'bold',
                     fontSize: '0.65rem',
                     animation: 'fade-pulse 2s infinite',
                     '@keyframes fade-pulse': {
                       '0%, 100%': { opacity: 1 },
                       '50%': { opacity: 0.7 },
                     },
                   }}
                 >
                   Limited Time Offer
                 </Typography>
               </Box>
             )}

            {/* Features/Badges Section */}
            {pkg.badges && pkg.badges.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4, justifyContent: 'center' }}>
                {pkg.badges.slice(0, isMobile ? 2 : 3).map((badge, idx) => (
                  <Chip
                    key={idx}
                    label={badge}
                    size="small"
                    color={isBestPrice ? "primary" : "secondary"}
                    variant={isBestPrice ? "filled" : "outlined"}
                                         sx={{ 
                       fontWeight: 600,
                       fontSize: isMobile ? '0.6rem' : '0.65rem',
                       height: 'auto',
                       background: isBestPrice ? 'linear-gradient(135deg, #2e7d32, #4caf50)' : undefined,
                       color: isBestPrice ? 'white' : undefined,
                       boxShadow: isBestPrice ? '0 4px 12px rgba(46, 125, 50, 0.3)' : undefined,
                      '& .MuiChip-label': {
                        px: 0.5,
                        py: 0.2,
                      },
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                ))}
              </Box>
            ) : (
              !isBestPrice && (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  textAlign="center"
                  sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
                >
                  No special features
                </Typography>
              )
            )}

                         {/* Premium guarantee for best price */}
             {isBestPrice && (
               <Box
                 sx={{
                   mt: 2,
                   pt: 1.5,
                   borderTop: '2px solid #c8e6c9',
                   textAlign: 'center',
                 }}
               >
                 <Typography
                   variant="caption"
                   sx={{
                     color: '#388e3c',
                     fontWeight: 'bold',
                     fontSize: '0.65rem',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: 0.5,
                     textTransform: 'uppercase',
                     letterSpacing: '0.3px',
                   }}
                 >
                   Best Price Guarantee
                 </Typography>
                 <Typography
                   variant="caption"
                   sx={{
                     color: 'text.secondary',
                     fontSize: '0.6rem',
                     display: 'block',
                     mt: 0.5,
                   }}
                 >
                   We'll match any lower price
                 </Typography>
               </Box>
             )}
          </Box>
        );

      default:
        return <Typography variant="body2" textAlign="center">-</Typography>;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'background.default',
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #4caf50, #2196f3, #ff9800)',
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CompareIcon />
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            component="div"
            sx={{ 
              fontWeight: 'bold',
              fontSize: isMobile ? '1rem' : '1.25rem'
            }}
          >
            Compare Packages ({compareList.length})
          </Typography>
          {compareList.length > 0 && (
            <Chip 
              label={`${compareList.length}/3 selected`}
              size="small"
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.65rem'
              }}
            />
          )}
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: 'grey.50' }}>
        {compareList.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60vh',
              textAlign: 'center',
              p: 3,
            }}
          >
            <CompareIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No packages to compare
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Add packages to comparison to see them side by side
            </Typography>
          </Box>
        ) : (
          <Box sx={{ height: 'calc(100vh - 180px)', overflow: 'auto' }}>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
              <Table stickyHeader>
                <TableBody>
                  {comparisonSections.map((section, sectionIndex) => (
                    <TableRow
                      key={section.id}
                      sx={{
                        bgcolor: sectionIndex % 2 === 0 ? 'background.default' : 'grey.50',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          bgcolor: sectionIndex % 2 === 0 ? 'grey.100' : 'grey.200',
                        },
                      }}
                    >
                                             {/* Enhanced Label Column */}
                       <TableCell
                         sx={{
                           bgcolor: 'primary.dark',
                           color: 'white',
                           fontWeight: 'bold',
                           fontSize: isMobile ? '0.75rem' : '0.875rem',
                           minWidth: isMobile ? 120 : 180,
                           maxWidth: isMobile ? 120 : 180,
                           width: isMobile ? 120 : 180,
                           position: 'sticky',
                           left: 0,
                           zIndex: 2,
                           borderRight: '3px solid',
                           borderColor: 'primary.main',
                           background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                         }}
                       >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            sx={{ 
                              bgcolor: 'rgba(255,255,255,0.2)', 
                              width: 28, 
                              height: 28 
                            }}
                          >
                            {React.cloneElement(section.icon, { 
                              sx: { fontSize: isMobile ? 14 : 16, color: 'white' } 
                            })}
                          </Avatar>
                                                     <Typography 
                             variant={isMobile ? "caption" : "body2"} 
                             fontWeight="bold"
                             color="inherit"
                             sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
                           >
                             {section.label}
                           </Typography>
                        </Box>
                      </TableCell>

                                             {/* Enhanced Package Value Columns */}
                       {compareList.map((pkg, pkgIndex) => (
                         <TableCell
                           key={pkg.id}
                           sx={{
                             minWidth: isMobile ? 140 : 220,
                             maxWidth: isMobile ? 180 : 280,
                             p: isMobile ? 1 : 2,
                             verticalAlign: 'top',
                             borderRight: pkgIndex < compareList.length - 1 ? '2px solid' : 'none',
                             borderColor: 'grey.300',
                             transition: 'all 0.3s ease',
                             position: 'relative',
                             '&:hover': {
                               bgcolor: 'rgba(25, 118, 210, 0.04)',
                               transform: 'translateY(-1px)',
                             },
                           }}
                         >
                          {renderCellContent(section, pkg, pkgIndex)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Additional Information Footer */}
            <Paper 
              elevation={3} 
              sx={{ 
                mt: 2, 
                p: 3, 
                bgcolor: 'background.paper',
                borderTop: '3px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography 
                variant="body1" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                <InfoIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                Comparison Tips & Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 1.5 }}>
                    <MoneyIcon sx={{ fontSize: 30, color: 'success.main', mb: 1 }} />
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="bold"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      Price Comparison
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Compare total package costs including all mentioned inclusions and services.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 1.5 }}>
                    <StarIcon sx={{ fontSize: 30, color: 'warning.main', mb: 1 }} />
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="bold"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      Rating & Reviews
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Customer ratings based on actual traveler experiences and feedback.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 1.5 }}>
                    <TrophyIcon sx={{ fontSize: 30, color: 'success.main', mb: 1 }} />
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="bold"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      Best Value
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Recommended packages offering the best combination of price, quality, and experience.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          bgcolor: 'background.paper',
          p: 3,
          borderTop: '1px solid',
          borderColor: 'grey.300',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Button
          onClick={onClearComparison}
          color="error"
          variant="outlined"
          disabled={compareList.length === 0}
          fullWidth={isMobile}
          startIcon={<CloseIcon />}
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            }
          }}
        >
          Clear All ({compareList.length})
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained" 
          size="large"
          fullWidth={isMobile}
          startIcon={<CheckIcon />}
          sx={{
            background: 'linear-gradient(45deg, #1976d2, #2196f3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0, #1976d2)',
              transform: 'scale(1.02)',
            }
          }}
        >
          Close Comparison
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TourComparisonModal; 