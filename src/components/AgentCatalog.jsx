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
} from "@mui/material";
import {
  FilterList
} from "@mui/icons-material";
import { useCoBrowseScrollSync } from "../hooks/useCoBrowseScrollSync";
import { samplePackageData } from "../data/samplePackageData";

// Use centralized package data
const tourPackages = samplePackageData;

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
  clearSelectedPackages,
  sharedPackages = [],
  isSharingPackages = false, // eslint-disable-line no-unused-vars
  sharingProgress = 0, // eslint-disable-line no-unused-vars
  sharingStatus = '' // eslint-disable-line no-unused-vars
}) => {
  // Filter states
  const [priceRange, setPriceRange] = useState([3000, 90000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState(tourPackages);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);

  // Co-browse scroll sync hook
  const { scrollRef, isActiveController } = useCoBrowseScrollSync('agent', true);

  // Filter packages based on price range and selected types
  useEffect(() => {
    let filtered = tourPackages.filter((pkg) => {
      const packagePrice = pkg.price?.discounted || pkg.price;
      return packagePrice >= priceRange[0] && packagePrice <= priceRange[1];
    });

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
                        ${(pkg.price?.discounted || pkg.price)?.toLocaleString?.("en-US") || pkg.price?.discounted || pkg.price}
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