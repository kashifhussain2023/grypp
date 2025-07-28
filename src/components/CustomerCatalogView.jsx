import React, { useState } from "react";
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
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CompareArrows as CompareIcon,
  Compare as CompareActiveIcon,
} from "@mui/icons-material";
import { useCoBrowseScrollSync } from "../hooks/useCoBrowseScrollSync";
import PackageDetailsModal from "./PackageDetailsModal";

const CustomerCatalogView = ({
  sharedPackages = [],
  sessionRef,
  onInterested = () => { },
  // Comparison props
  compareList = [],
  addToCompare = () => { },
  removeFromCompare = () => { },
  isInComparison = () => false,
  isComparisonFull = false,
  onComparePackages = () => { },
}) => {
  // Local state for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Co-browse scroll sync hook
  const { scrollRef, isActiveController } = useCoBrowseScrollSync({
    sessionRef,
    userType: 'customer',
    scrollContainerId: 'agent-catalog-scroll', // Same container ID as agent to sync
    throttleDelay: 100
  });

  // Modal handlers
  const handleOpenModal = (pkg) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPackage(null);
  };

  console.log("[Customer Catalog] Scroll sync active controller:", isActiveController);
  console.log("[Customer Catalog] Shared packages:", sharedPackages.length);

  return (
    <Box sx={{ position: 'relative', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <DialogContent
        sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}
      >
      {/* Header with sync indicator */}
      <Box sx={{
        p: 3,
        bgcolor: "primary.main",
        color: "white",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6">
          Shared Tour Packages ({sharedPackages.length})
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            label="From Agent"
            size="small"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          />

          {/* Comparison Notification */}
          {compareList && compareList.length > 0 && (
            <Chip
              label={`${compareList.length} packages to compare`}
              size="small"
              color="secondary"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 600,
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.7 },
                  "100%": { opacity: 1 },
                },
              }}
            />
          )}

          {/* {isActiveController && (
            <Chip
              label="You're controlling scroll"
              size="small"
              sx={{
                bgcolor: "rgba(76, 175, 80, 0.9)",
                color: "white",
              }}
            />
          )} */}
          {!isActiveController && sessionRef?.current && (
            <Chip
              label="Synced with agent"
              size="small"
              sx={{
                bgcolor: "rgba(33, 150, 243, 0.9)",
                color: "white",
              }}
            />
          )}
        </Box>
      </Box>

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
          borderColor: 'success.main',
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
          {sharedPackages.map((pkg, index) => (
            <Grid sx={{ width: "250px" }} item xs={3} sm={3} md={3} lg={3} key={pkg.id}>
              <Grow
                in={true}
                timeout={300 + (index * 100)}
                style={{ transformOrigin: '0 0 0' }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      "& .package-image": {
                        transform: "scale(1.05)",
                      },
                    },
                    "&::before": {
                      content: '"⭐"',
                      position: "absolute",
                      top: -8,
                      right: -8,
                      fontSize: "24px",
                      zIndex: 2,
                    },
                  }}
                  onClick={() => handleOpenModal(pkg)}
                >
                  {/* Add to Compare Button */}
                  <Tooltip title={
                    isInComparison(pkg.id)
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
                        } else if (!isComparisonFull) {
                          addToCompare(pkg);
                        }
                      }}
                      disabled={!isInComparison(pkg.id) && isComparisonFull}
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
                      <CompareIcon fontSize="small" />
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

                    {/* Recommended Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        bgcolor: "rgba(76, 175, 80, 0.95)",
                        color: "white",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      RECOMMENDED
                    </Box>

                    {/* Type Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
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

                    {/* Price and Action */}
                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto"
                    }}>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                        }}
                      >
                        ${(pkg.price?.discounted || pkg.price)?.toLocaleString?.('en-US') || pkg.price?.discounted || pkg.price}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: "success.main",
                          "&:hover": {
                            bgcolor: "success.dark",
                            transform: "scale(1.05)",
                          },
                          fontSize: "0.7rem",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => onInterested(pkg)}
                      >
                        Interested
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {sharedPackages.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No packages shared yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Your agent will share personalized travel packages during the call
            </Typography>
          </Box>
        )}
      </Box>
      </DialogContent>

      {/* Sticky Footer for Comparison */}
      {compareList.length > 0 && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: '#c8e6c9',
            color: 'black',
            p: 3, // Match DialogActions padding
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            animation: 'slideUp 0.3s ease-out',
            '@keyframes slideUp': {
              from: {
                transform: 'translateY(100%)',
                opacity: 0,
              },
              to: {
                transform: 'translateY(0)',
                opacity: 1,
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CompareActiveIcon />
            <Typography variant="h6" fontWeight="bold">
              {compareList.length}/3 Selected
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {compareList.length === 3 ? 'Maximum reached' : `Add ${3 - compareList.length} more`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={onComparePackages}
              sx={{
                fontWeight: 'bold',
                px: 3,
                py: 1,
                mr: 2, // Match close button margin-right
                minWidth: 160, // Match "Discuss with Agent" button width for consistency
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Compare Packages
            </Button>
          </Box>
        </Box>
      )}

      {/* Package Details Modal */}
      {modalOpen && (
      <PackageDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        packageData={selectedPackage}
      />
      )}
    </Box>
  );
};

export default CustomerCatalogView; 