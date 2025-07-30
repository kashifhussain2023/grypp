import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Share as ShareIcon,
  Compare as CompareIcon,
} from "@mui/icons-material";
import CustomerCatalogView from "../../../../components/CustomerCatalogView";
import TourComparisonModal from "../../../../components/Compare/TourComparisonModal";
import { useComparePackages } from "../../../../hooks/useComparePackages";
import { openTokSessionSingleton } from "../../../../services/OpenTokSessionManager";

const PackageShareDialog = ({
  open,
  onClose,
  sharedPackages,
  userType = "customer",
  packageDetailsToOpen = null,
  onPackageDetailsOpened = () => { },
  sendPackageDetailsAction = null,
  sendComparisonAction = null
}) => {
  // Use the comparison hook
  const {
    compareList,
    isDrawerOpen,
    addToCompare,
    removeFromCompare,
    clearComparison,
    getBestValue,
    isInComparison,
    isComparisonFull,
    toggleDrawer,
  } = useComparePackages(userType);

  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - open changed to:", open);
  }, [open]);

  // Effect to log when packages change
  useEffect(() => {
    console.log("🎭 PackageShareDialog: sharedPackages changed:", sharedPackages);
  }, [sharedPackages]);

  // Effect to handle comparison modal opening from agent (handled by parent)
  // Signal listening is now handled by parent components

  const handleOpenComparison = () => {
    console.log("🎭 Opening comparison drawer with", compareList.length, "packages");

    // If customer has no packages in comparison but has shared packages, add them
    if (compareList.length === 0 && sharedPackages.length > 0) {
      console.log("🎭 Customer has no comparison packages but has shared packages, adding them");
      sharedPackages.forEach(pkg => {
        addToCompare(pkg);
      });
    }

    toggleDrawer(true);

    // Notify agent that customer opened comparison using parent's signal function
    if (sendComparisonAction) {
      sendComparisonAction('customer-opened-comparison');
    }
  };

  const handleComparePackages = () => {
    console.log("🎭 handleComparePackages called");
    handleOpenComparison();
  };

  const handleCloseComparison = () => {
    console.log("🎭 Closing comparison drawer");
    toggleDrawer(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "90vh",
            maxHeight: "95vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <ShareIcon />
          Shared Tour Packages ({sharedPackages.length})
          {compareList.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <Chip
                label={`${compareList.length} to compare`}
                size="small"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              />
              <Tooltip title="Open Comparison">
                <IconButton
                  onClick={handleOpenComparison}
                  sx={{
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <CompareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </DialogTitle>

        <DialogContent sx={{ p: 0, flex: 1, overflow: "hidden" }}>
          <CustomerCatalogView
            sharedPackages={sharedPackages}
            onInterested={() => { }} // Customer doesn't need interested handler
            // Comparison props
            compareList={compareList}
            addToCompare={addToCompare}
            removeFromCompare={removeFromCompare}
            isInComparison={isInComparison}
            isComparisonFull={isComparisonFull}
            onComparePackages={handleComparePackages}
            packageDetailsToOpen={packageDetailsToOpen}
            onPackageDetailsOpened={onPackageDetailsOpened}
            sendPackageDetailsAction={sendPackageDetailsAction}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comparison Modal */}
      <TourComparisonModal
        open={isDrawerOpen}
        onClose={handleCloseComparison}
        compareList={compareList}
        onRemoveFromCompare={removeFromCompare}
        onClearComparison={clearComparison}
        getBestValue={getBestValue}
        userType="customer"
        sharedPackages={sharedPackages}
        sendComparisonAction={sendComparisonAction}
      />
    </>
  );
};

export default PackageShareDialog; 