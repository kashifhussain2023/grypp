import React, { useState } from 'react';
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
  StepConnector,
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Flight as FlightIcon,
  //Transfer as TransferIcon,
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
} from '@mui/icons-material';

const PackageDetailsModal = ({ open, onClose, packageData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

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

  const renderTopBanner = () => (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        px: 3,
        py: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
            {packageData.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <LocationIcon color="action" fontSize="small" />
            {packageData.route && packageData.route.map((location, index) => (
              <React.Fragment key={index}>
                <Chip
                  label={location}
                  variant="outlined"
                  size="small"
                  color="primary"
                />
                {index < packageData.route.length - 1 && (
                  <Typography variant="body2" color="text.secondary">•</Typography>
                )}
              </React.Fragment>
            ))}
            <Chip
              label={packageData.duration}
              color="secondary"
              size="small"
              sx={{ ml: 1 }}
            />
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: 'grey.100',
            '&:hover': { bgcolor: 'grey.200' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );

  const renderImageGallery = () => (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={9}>
        <Card elevation={3}>
          <CardMedia
            component="img"
            height="400"
            image={packageData.images[selectedImageIndex]}
            alt="Package main image"
            sx={{ objectFit: 'cover' }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Stack spacing={1} sx={{ height: '400px', overflowY: 'auto' }}>
          {packageData.images.map((image, index) => (
            <Card
              key={index}
              elevation={selectedImageIndex === index ? 3 : 1}
              sx={{
                cursor: 'pointer',
                border: selectedImageIndex === index ? 2 : 0,
                borderColor: 'primary.main',
                transition: 'all 0.3s ease',
                '&:hover': { elevation: 3 },
              }}
              onClick={() => handleImageSelect(index)}
            >
              <CardMedia
                component="img"
                height="90"
                image={image}
                alt={`Package image ${index + 1}`}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );

  const renderHighlightsBadges = () => (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              height: '100%',
              bgcolor: 'primary.50',
              border: 1,
              borderColor: 'primary.200',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <HighlightIcon color="primary" />
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  PACKAGE HIGHLIGHTS
                </Typography>
              </Box>
              <Stack spacing={1}>
                {packageData.highlights.map((highlight, index) => (
                  <Box key={index} display="flex" alignItems="flex-start" gap={1}>
                    <CheckIcon color="success" fontSize="small" sx={{ mt: 0.2 }} />
                    <Typography variant="body2">{highlight}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              height: '100%',
              bgcolor: 'success.50',
              border: 1,
              borderColor: 'success.200',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <ActivityIcon color="success" />
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  ACTIVITIES
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Exciting activities and experiences included in this package
              </Typography>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              >
                View Activities
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              height: '100%',
              bgcolor: 'warning.50',
              border: 1,
              borderColor: 'warning.200',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PhotoIcon color="warning" />
                <Typography variant="h6" fontWeight="bold" color="warning.main">
                  PROPERTY PHOTOS
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View photos of hotels and properties in this package
              </Typography>
              <Button
                startIcon={<PhotoIcon />}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              >
                View Gallery
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderTabSection = () => (
    <Box sx={{ mb: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            fontWeight: 'bold',
            fontSize: '1rem',
          },
        }}
      >
        {packageData.tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>

      {activeTab === 0 && renderItineraryContent()}
      {activeTab === 1 && renderPoliciesContent()}
      {activeTab === 2 && renderSummaryContent()}
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
                    color: selectedDay === index ? 'primary.main' : 'text.primary'
                  }
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {day.day} - {day.city}
                  </Typography>
                  <Chip label={day.date} size="small" color="primary" variant="outlined" />
                </Box>
              </StepLabel>
              <StepContent>
                <Card
                  elevation={selectedDay === index ? 4 : 1}
                  sx={{
                    p: 2,
                    border: selectedDay === index ? 2 : 0,
                    borderColor: 'primary.main',
                    transition: 'all 0.3s ease',
                    mb: 2,
                  }}
                >
                  {/* Flight Information */}
                  {day.flightNote && (
                    <Box sx={{ mb: 2 }}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <FlightIcon color="primary" />
                        <Typography variant="subtitle2" fontWeight="bold">
                          FLIGHT
                        </Typography>
                      </Box>
                      <Paper elevation={1} sx={{ p: 1.5, bgcolor: 'info.50' }}>
                        <Typography variant="body2" color="info.main">
                          <InfoIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {day.flightNote}
                        </Typography>
                      </Paper>
                    </Box>
                  )}

                  {/* Transfer Information */}
                  {day.transfers && day.transfers.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        {/* <TransferIcon color="secondary" /> */}
                        <Typography variant="subtitle2" fontWeight="bold">
                          TRANSFER
                        </Typography>
                      </Box>
                      {day.transfers.map((transfer, idx) => (
                        <Paper key={idx} elevation={1} sx={{ p: 1.5, mb: 1 }}>
                          <Typography variant="body2" fontWeight="bold">
                            {transfer.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {transfer.details}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  )}

                  {/* Hotel Information */}
                  {day.hotel && (
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <HotelIcon color="success" />
                        <Typography variant="subtitle2" fontWeight="bold">
                          HOTEL
                        </Typography>
                      </Box>
                      <Paper elevation={1} sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <Typography variant="h6" fontWeight="bold">
                              {day.hotel.name}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                              <Rating value={day.hotel.stars} readOnly size="small" />
                              <Typography variant="body2">
                                ({day.hotel.rating})
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {day.hotel.location}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                              {day.hotel.stay}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {day.hotel.type}
                            </Typography>
                            {day.hotel.inclusions.map((inclusion, idx) => (
                              <Chip
                                key={idx}
                                label={inclusion}
                                size="small"
                                color="success"
                                variant="outlined"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Grid>
                          <Grid item xs={4}>
                            <CardMedia
                              component="img"
                              height="100"
                              image={day.hotel.image || '/api/placeholder/150/100'}
                              alt={day.hotel.name}
                              sx={{ borderRadius: 1 }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  )}

                  {/* Activities Information */}
                  {day.activities && day.activities.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <ActivityIcon color="warning" />
                        <Typography variant="subtitle2" fontWeight="bold">
                          ACTIVITIES
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {day.activities.map((activity, idx) => (
                          <Chip
                            key={idx}
                            label={activity}
                            size="small"
                            color="warning"
                            variant="outlined"
                            sx={{ mb: 0.5 }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Add Activities Option */}
                  {day.options?.addActivityText && (
                    <Button
                      startIcon={<AddIcon />}
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2 }}
                    >
                      {day.options.addActivityText}
                    </Button>
                  )}
                </Card>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>

      {/* Date Sidebar */}
      <Grid item xs={12} md={4}>
        <Card elevation={2} sx={{ position: 'sticky', top: 100 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Trip Timeline
            </Typography>
            <List dense>
              {packageData.sidebar.days.map((date, index) => (
                <ListItem
                  key={index}
                  button
                  selected={selectedDay === index}
                  onClick={() => handleDaySelect(index)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.50',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemIcon>
                    <CalendarIcon
                      color={selectedDay === index ? 'primary' : 'action'}
                      fontSize="small"
                    />
                  </ListItemIcon>
                  <ListItemText primary={date} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Best Deals Section */}
            <Paper elevation={1} sx={{ p: 2, bgcolor: 'success.50' }}>
              <Typography variant="subtitle2" fontWeight="bold" color="success.main" gutterBottom>
                {packageData.sidebar.bestDeals.message}
              </Typography>
              <Stack spacing={1}>
                {packageData.sidebar.bestDeals.actions.map((action, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={1}>
                    <CheckIcon color="success" fontSize="small" />
                    <Typography variant="body2">{action}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderPoliciesContent = () => (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cancellation & Payment Policies
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Cancellation Policy
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • Free cancellation up to 7 days before departure
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 50% refund for cancellations between 3-7 days before departure
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • No refund for cancellations within 3 days of departure
          </Typography>
        </Box>
        
        <Divider />
        
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Payment Policy
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 30% advance payment required to confirm booking
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • Balance payment due 15 days before departure
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • EMI options available with 0% interest for 6 months
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  const renderSummaryContent = () => (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Package Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Package Includes
          </Typography>
          <Stack spacing={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <CheckIcon color="success" fontSize="small" />
              <Typography variant="body2">Accommodation as per itinerary</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CheckIcon color="success" fontSize="small" />
              <Typography variant="body2">Daily breakfast at hotels</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CheckIcon color="success" fontSize="small" />
              <Typography variant="body2">AC transportation throughout</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CheckIcon color="success" fontSize="small" />
              <Typography variant="body2">Sightseeing as per itinerary</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CheckIcon color="success" fontSize="small" />
              <Typography variant="body2">Professional tour guide</Typography>
            </Box>
          </Stack>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Package Excludes
          </Typography>
          <Stack spacing={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <CloseIcon color="error" fontSize="small" />
              <Typography variant="body2">International/Domestic flights</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CloseIcon color="error" fontSize="small" />
              <Typography variant="body2">Personal expenses</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CloseIcon color="error" fontSize="small" />
              <Typography variant="body2">Travel insurance</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CloseIcon color="error" fontSize="small" />
              <Typography variant="body2">Entry fees to monuments</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CloseIcon color="error" fontSize="small" />
              <Typography variant="body2">Tips and gratuities</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderCouponSection = () => (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Available Offers
        </Typography>
        <Stack spacing={2}>
          {packageData.coupons.map((coupon, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                p: 2,
                border: coupon.applied ? 2 : 1,
                borderColor: coupon.applied ? 'success.main' : 'divider',
                bgcolor: coupon.applied ? 'success.50' : 'background.paper',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {coupon.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {coupon.desc}
                  </Typography>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    Save ₹{Math.abs(coupon.value)}
                  </Typography>
                </Box>
                <Button
                  variant={coupon.applied ? "contained" : "outlined"}
                  color={coupon.applied ? "success" : "primary"}
                  size="small"
                  disabled={coupon.applied}
                >
                  {coupon.applied ? "Applied" : "Apply"}
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );

  const renderPriceBox = () => (
    <Card
      elevation={4}
      sx={{
        position: 'sticky',
        top: 100,
        border: 2,
        borderColor: 'primary.main',
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Price Summary
        </Typography>

        {/* Original Price */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2">Original Price</Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: 'line-through' }}
            color="text.secondary"
          >
            ₹{packageData.price.original.toLocaleString()}
          </Typography>
        </Box>

        {/* Discounted Price */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            Final Price
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            ₹{packageData.price.discounted.toLocaleString()}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Per {packageData.price.per} • {packageData.price.notes}
        </Typography>

        {/* Savings */}
        <Box
          sx={{
            bgcolor: 'success.50',
            p: 1,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography variant="body2" color="success.main" fontWeight="bold">
            You Save: ₹{(packageData.price.original - packageData.price.discounted).toLocaleString()}
          </Typography>
        </Box>

        {/* EMI Option */}
        <Box
          sx={{
            bgcolor: 'info.50',
            p: 1,
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Typography variant="body2" color="info.main">
            💳 EMI starting from {packageData.price.emi}
          </Typography>
        </Box>

        {/* CTA Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          Proceed to Payment
        </Button>

        <Button
          variant="outlined"
          fullWidth
          size="medium"
          sx={{ mb: 2 }}
        >
          Add to Wishlist
        </Button>

        <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
          Secure payment • 24/7 support • Easy cancellation
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          margin: 0,
          maxHeight: '100vh',
        },
      }}
    >
      {renderTopBanner()}
      
      <DialogContent
        sx={{
          p: 0,
          height: 'calc(100vh - 120px)',
          overflow: 'auto',
        }}
      >
        <Box sx={{ px: 3, py: 2 }}>
          {renderImageGallery()}
          {renderHighlightsBadges()}
          
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              {renderTabSection()}
            </Grid>
            <Grid item xs={12} lg={4}>
              <Stack spacing={2}>
                {renderCouponSection()}
                {renderPriceBox()}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetailsModal; 