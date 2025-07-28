import React, { useState, useEffect } from "react";
import {
  DialogContent,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Grow,
  Chip,
  Paper,
  Checkbox,
  Slider,
  FormGroup,
  FormControlLabel,
  Button,
  Divider,
  IconButton,
  Collapse,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  FilterList,
  Compare as CompareIcon,
  CompareArrows as CompareArrowsIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { useCoBrowseScrollSync } from "../hooks/useCoBrowseScrollSync";

// Sample tour packages data (this should ideally come from props or a data store)
const tourPackages = [

  {
    id: "pkg2",
    name: "Goa Beach Party",
    type: "Party",
    price: 660,
    currency: "USD",
    description:
      "3-day beach party experience with DJ nights, water sports, luxury beach resort, and vibrant nightlife.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg3",
    name: "Kerala Backwaters",
    type: "Relaxation",
    price: 840,
    currency: "USD",
    description:
      "Peaceful 5-day houseboat journey through Kerala's serene backwaters with traditional cuisine and spa treatments.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg4",
    name: "Rajasthan Heritage",
    type: "Cultural",
    price: 1140,
    currency: "USD",
    description:
      "Explore the royal heritage of Rajasthan with palace visits, cultural shows, camel safaris, and heritage hotels.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg5",
    name: "Ladakh Bike Trek",
    type: "Adventure",
    price: 1440,
    currency: "USD",
    description:
      "Epic 10-day motorcycle adventure through the rugged landscapes of Ladakh with high-altitude passes and monasteries.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg6",
    name: "Mumbai Nightlife",
    type: "Party",
    price: 540,
    currency: "USD",
    description:
      "Experience Mumbai's vibrant nightlife with club hopping, rooftop parties, fine dining, and luxury accommodations.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg7",
    name: "Manali Snow Trek",
    type: "Trekking",
    price: 600,
    currency: "USD",
    description:
      "4-day snow trekking experience in the beautiful valleys of Manali with professional guides and mountain gear.",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg8",
    name: "Andaman Islands",
    type: "Relaxation",
    price: 1320,
    currency: "USD",
    description:
      "7-day tropical paradise with pristine beaches, scuba diving, water activities, and beachfront resorts.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg9",
    name: "Delhi Food Tour",
    type: "Cultural",
    price: 360,
    currency: "USD",
    description:
      "Discover Delhi's rich culinary heritage with guided food walks, cooking classes, and heritage restaurant visits.",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },


  {
    id: "pkg12",
    name: "Tokyo Cultural Immersion",
    type: "Cultural",
    price: 1800,
    currency: "USD",
    description:
      "5-day journey through traditional and modern Tokyo with temple visits, sushi classes, and traditional ryokan stays.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg13",
    name: "Bali Wellness Retreat",
    type: "Relaxation",
    price: 1200,
    currency: "USD",
    description:
      "6-day spiritual wellness retreat in Bali with yoga sessions, meditation, spa treatments, and healthy organic cuisine.",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg14",
    name: "Patagonia Hiking",
    type: "Trekking",
    price: 2200,
    currency: "USD",
    description:
      "10-day guided hiking expedition through Patagonia's dramatic landscapes with expert guides and camping under the stars.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg15",
    name: "Ibiza Electronic Festival",
    type: "Party",
    price: 1600,
    currency: "USD",
    description:
      "4-day electronic music festival experience in Ibiza with VIP access, beach clubs, and luxury accommodation.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg16",
    name: "African Safari",
    type: "Adventure",
    price: 3200,
    currency: "USD",
    description:
      "8-day luxury safari in Kenya and Tanzania with game drives, hot air balloon rides, and premium lodge accommodations.",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg17",
    name: "Tuscany Wine Tour",
    type: "Cultural",
    price: 1500,
    currency: "USD",
    description:
      "5-day wine tasting journey through Tuscany's vineyards with cooking classes, villa stays, and countryside experiences.",
    image:
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg18",
    name: "Maldives Overwater Villa",
    type: "Relaxation",
    price: 4800,
    currency: "USD",
    description:
      "7-day luxury escape in an overwater villa with private beach access, snorkeling, and world-class spa treatments.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg19",
    name: "Iceland Northern Lights",
    type: "Adventure",
    price: 1900,
    currency: "USD",
    description:
      "6-day Northern Lights expedition with glacier hiking, hot springs, and cozy lodge accommodations in Iceland.",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg20",
    name: "Amazon Rainforest Explorer",
    type: "Trekking",
    price: 1700,
    currency: "USD",
    description:
      "7-day eco-adventure deep into the Amazon rainforest with wildlife spotting, canopy walks, and indigenous culture experiences.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg21",
    name: "Santorini Sunset Romance",
    type: "Relaxation",
    price: 2100,
    currency: "USD",
    description:
      "5-day romantic getaway in Santorini with sunset dinners, private yacht tours, and luxury cave hotel stays.",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "pkg22",
    name: "Las Vegas VIP Experience",
    type: "Party",
    price: 2800,
    currency: "USD",
    description:
      "4-day VIP Las Vegas experience with high-end shows, exclusive clubs, luxury suites, and gourmet dining.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: "pkg25",
    name: "Everest Base Camp Trek",
    type: "Trekking",
    price: 2600,
    currency: "USD",
    description:
      "14-day ultimate trekking challenge to Everest Base Camp with experienced Sherpa guides and mountain lodge accommodations.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
  },
];

const packageTypes = [
  "Beach",
  "Adventure",
  "Cultural",
  "Wildlife",
  "City Break",
  "Wellness",
  "Cruise",
  "Trekking"
];

const AgentCatalog = ({
  sessionRef,
  selectedPackages,
  onPackageSelect,
  clearSelectedPackages, // Add this prop
  // Comparison props
  compareList = [],
  isDrawerOpen = false,
  setIsDrawerOpen = () => { },
  addToCompare = () => { },
  removeFromCompare = () => { },
  clearComparison = () => { },
  getBestValue = () => null,
  isInComparison = () => false,
  isComparisonFull = false,
  comparisonCount = 0,
  sharedPackages = []
}) => {
  // Filter states
  const [priceRange, setPriceRange] = useState([300, 5000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState(tourPackages);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);

  // Co-browse scroll sync hook
  const { scrollRef, isActiveController } = useCoBrowseScrollSync({
    sessionRef,
    userType: 'agent',
    scrollContainerId: 'agent-catalog-scroll',
    throttleDelay: 100
  });

  // Filter packages based on price range and selected types
  useEffect(() => {
    let filtered = tourPackages.filter(
      (pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
    );

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((pkg) => selectedTypes.includes(pkg.type));
    }

    setFilteredPackages(filtered);
  }, [priceRange, selectedTypes]);

  const handleTypeFilterChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  console.log("[Agent Catalog] Scroll sync active controller:", isActiveController);

  return (
    <DialogContent
      sx={{ p: 0, height: '80vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Filter Icon and Collapsible Filters Section */}
      <Box sx={{ p: 2, bgcolor: "grey.50", borderBottom: 1, borderColor: 'grey.200' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            Tour Packages
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
              sx={{
                color: "primary.main",
                bgcolor: "white",
                border: "1px solid",
                borderColor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              <FilterList />
            </IconButton>

            {/* Comparison Button */}
            <Tooltip title={comparisonCount > 0 ? `Compare ${comparisonCount} packages` : "Compare packages"}>
              <Badge badgeContent={comparisonCount} color="secondary" max={3}>
                <IconButton
                  onClick={() => setIsDrawerOpen(true)}
                  disabled={comparisonCount === 0}
                  sx={{
                    color: comparisonCount > 0 ? "secondary.main" : "text.secondary",
                    bgcolor: comparisonCount > 0 ? "secondary.light" : "grey.100",
                    border: "1px solid",
                    borderColor: comparisonCount > 0 ? "secondary.main" : "grey.300",
                    "&:hover": {
                      bgcolor: comparisonCount > 0 ? "secondary.main" : "grey.200",
                      color: comparisonCount > 0 ? "white" : "text.primary",
                    },
                  }}
                >
                  <CompareIcon />
                </IconButton>
              </Badge>
            </Tooltip>

            {/* Clear Comparison Button */}
            {comparisonCount > 0 && (
              <Tooltip title="Clear all comparisons">
                <IconButton
                  onClick={clearComparison}
                  sx={{
                    color: "error.main",
                    bgcolor: "error.light",
                    border: "1px solid",
                    borderColor: "error.main",
                    "&:hover": {
                      bgcolor: "error.main",
                      color: "white",
                    },
                  }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {/* {isActiveController && (
              <Chip
                label="You're controlling scroll"
                size="small"
                color="primary"
              />
            )} */}
          </Box>
        </Box>

        <Collapse in={!isFiltersCollapsed}>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, color: "primary.main" }}>
              Filter Packages
            </Typography>

            <Grid container spacing={3}>
              {/* Price Range Filter */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Price Range: ${priceRange[0].toLocaleString("en-US")} - $
                  {priceRange[1].toLocaleString("en-US")}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) =>
                    `$${value.toLocaleString("en-US")}`
                  }
                  min={300}
                  max={5000}
                  step={100}
                  sx={{ width: "90%" }}
                />
              </Grid>

              {/* Package Type Filter */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Package Types
                </Typography>
                <FormGroup>
                  <Grid container spacing={1}>
                    {packageTypes.map((type) => (
                      <Grid item xs={6} key={type}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedTypes.includes(type)}
                              onChange={() => handleTypeFilterChange(type)}
                              size="small"
                            />
                          }
                          label={type}
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "0.9rem",
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </Grid>
            </Grid>

            {/* Clear Filters */}
            <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setPriceRange([300, 5000]);
                  setSelectedTypes([]);
                }}
              >
                Clear Filters
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => {
                  setPriceRange([300, 5000]);
                  setSelectedTypes([]);
                  setFilteredPackages(tourPackages);
                  // Clear selected packages for sharing
                  if (clearSelectedPackages) {
                    clearSelectedPackages();
                  }
                  // Clear comparison list
                  if (clearComparison) {
                    clearComparison();
                  }
                }}
                sx={{
                  bgcolor: "error.main",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }}
              >
                Reset All
              </Button>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                Showing {filteredPackages.length} of {tourPackages.length} packages
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Divider />

      {/* Scrollable Packages Grid */}
      <Box
        ref={scrollRef}
        id="agent-catalog-scroll"
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          // Add visual indicator when this side is actively controlling
          borderLeft: isActiveController ? '4px solid' : 'none',
          borderColor: 'primary.main',
          // Prevent scroll conflicts
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}
      >
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {filteredPackages.map((pkg, index) => (
            <Grid sx={{ width: "250px" }} item xs={3} sm={3} md={3} lg={3} key={pkg.id}>
              <Grow
                in={true}
                timeout={300 + index * 100}
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper
                  elevation={selectedPackages.includes(pkg.id) ? 8 : 2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: selectedPackages.includes(pkg.id)
                      ? "3px solid"
                      : "2px solid transparent",
                    borderColor: selectedPackages.includes(pkg.id)
                      ? "primary.main"
                      : "transparent",
                    transition:
                      "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      "& .package-checkbox": {
                        opacity: 1,
                        transform: "scale(1.1)",
                      },
                      "& .package-image": {
                        transform: "scale(1.05)",
                      },
                      "& .package-price": {
                        color: "secondary.main",
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                  onClick={() => onPackageSelect(pkg.id)}
                >
                  {/* Selection Checkbox */}
                  <Checkbox
                    className="package-checkbox"
                    checked={selectedPackages.includes(pkg.id)}
                    onChange={() => onPackageSelect(pkg.id)}
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      zIndex: 3,
                      bgcolor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "50%",
                      padding: "8px",
                      opacity: selectedPackages.includes(pkg.id) ? 1 : 0.7,
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 1)",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPackageSelect(pkg.id);
                    }}
                  />

                  {/* Compare Button */}
                  <Tooltip title={
                    !sharedPackages.find(shared => shared.id === pkg.id)
                      ? "Share package first to compare"
                      : isInComparison(pkg.id)
                        ? "Remove from comparison"
                        : isComparisonFull
                          ? "Maximum 3 packages for comparison"
                          : "Add to comparison"
                  }>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInComparison(pkg.id)) {
                          removeFromCompare(pkg.id);
                        } else if (!isComparisonFull && sharedPackages.find(shared => shared.id === pkg.id)) {
                          addToCompare(pkg);
                        }
                      }}
                      disabled={
                        !sharedPackages.find(shared => shared.id === pkg.id) ||
                        (!isInComparison(pkg.id) && isComparisonFull)
                      }
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        zIndex: 3,
                        bgcolor: isInComparison(pkg.id) ? "secondary.main" : "rgba(255, 255, 255, 0.95)",
                        color: isInComparison(pkg.id) ? "white" : "primary.main",
                        borderRadius: "50%",
                        padding: "8px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        "&:hover": {
                          bgcolor: isInComparison(pkg.id) ? "secondary.dark" : "rgba(255, 255, 255, 1)",
                          transform: "scale(1.1)",
                        },
                        "&:disabled": {
                          opacity: 0.5,
                          bgcolor: "rgba(255, 255, 255, 0.7)",
                        },
                      }}
                    >
                      <CompareArrowsIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* Package Image */}
                  <Box
                    sx={{
                      height: 180,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      className="package-image"
                      component="img"
                      image={pkg.image}
                      alt={pkg.name}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                    />

                    {/* Type Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        zIndex: 2,
                      }}
                    >
                      <Chip
                        label={pkg.type}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.95)",
                          color: "primary.main",
                          fontWeight: 600,
                          backdropFilter: "blur(10px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                      />
                    </Box>

                    {/* Shared Badge */}
                    {sharedPackages.find(shared => shared.id === pkg.id) && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          label="Shared"
                          size="small"
                          color="success"
                          sx={{
                            bgcolor: "rgba(76, 175, 80, 0.95)",
                            color: "white",
                            fontWeight: 600,
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    {/* Package Name */}
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        lineHeight: 1.2,
                        mb: 1,
                        minHeight: "2.4rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {pkg.name}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontSize: "0.8rem",
                        lineHeight: 1.4,
                        minHeight: "3.6rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {pkg.description}
                    </Typography>

                    {/* Price and Selection */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Typography
                        className="package-price"
                        variant="h6"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "primary.main",
                          transition: "all 0.3s ease",
                        }}
                      >
                        ${pkg.price.toLocaleString("en-US")}
                      </Typography>

                      {selectedPackages.includes(pkg.id) && (
                        <Chip
                          label="Selected"
                          size="small"
                          color="success"
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            animation: "pulse 2s infinite",
                            "@keyframes pulse": {
                              "0%": { transform: "scale(1)" },
                              "50%": { transform: "scale(1.05)" },
                              "100%": { transform: "scale(1)" },
                            },
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {filteredPackages.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No packages match your filters
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your price range or package type filters
            </Typography>
          </Box>
        )}
      </Box>

    </DialogContent>
  );
};

export default AgentCatalog; 