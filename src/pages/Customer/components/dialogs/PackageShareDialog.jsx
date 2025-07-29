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

  // Effect to handle comparison modal opening from agent
  useEffect(() => {
    const session = openTokSessionSingleton.getSession();
    if (!session) return;

    const handleComparisonSignal = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.action === "agent-opened-comparison") {
          console.log("🎭 Agent opened comparison - opening customer comparison");
          
          // Update the comparison list with agent's data if provided
          if (data.compareList && data.compareList.length > 0) {
            console.log("🎭 Customer received comparison data from agent:", data.compareList);
            
            // Clear existing comparison and add agent's packages
            clearComparison();
            
            // Add each package from agent's comparison list
            data.compareList.forEach(pkg => {
              addToCompare(pkg);
            });
            
            console.log("🎭 Customer updated comparison list with agent data");
          } else if (data.sharedPackages && data.sharedPackages.length > 0) {
            // If no compareList but sharedPackages are available, use those
            console.log("🎭 Customer received shared packages data from agent:", data.sharedPackages);
            
            // Clear existing comparison and add shared packages
            clearComparison();
            
            // Add each shared package to comparison
            data.sharedPackages.forEach(pkg => {
              addToCompare(pkg);
            });
            
            console.log("🎭 Customer updated comparison list with shared packages data");
          }
          
          toggleDrawer(true);
        }
      } catch (err) {
        console.error("🎭 Failed to parse comparison signal:", err);
      }
    };

    // Register signal handler for comparison opening
    openTokSessionSingleton.registerSignalHandler("signal:shared-comparison-open", handleComparisonSignal);

    return () => {
      openTokSessionSingleton.unregisterSignalHandler("signal:shared-comparison-open");
    };
  }, [toggleDrawer, clearComparison, addToCompare]);

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

    // Notify agent that customer opened comparison
    const session = openTokSessionSingleton.getSession();
    if (session) {
      openTokSessionSingleton.sendSignal(
        {
          type: "shared-comparison-open",
          data: JSON.stringify({
            action: "customer-opened-comparison",
            compareList: compareList.length > 0 ? compareList : sharedPackages, // Send comparison data or shared packages
            timestamp: new Date().toISOString(),
          }),
        },
        (err) => {
          if (err) {
            console.error("Failed to send comparison open signal:", err);
          } else {
            console.log("Successfully sent comparison open signal with", compareList.length > 0 ? compareList.length : sharedPackages.length, "packages");
          }
        }
      );
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
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            height: "90vh",
            maxHeight: "90vh",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShareIcon color="primary" />
            <Typography variant="h6" component="span">
              Shared Packages
            </Typography>
            {sharedPackages.length > 0 && (
              <Chip
                label={sharedPackages.length}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {sharedPackages.length > 1 && (
              <Tooltip title="Compare Packages">
                <IconButton
                  onClick={handleOpenComparison}
                  color="primary"
                  size="small"
                >
                  <CompareIcon />
                </IconButton>
              </Tooltip>
            )}
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0, flex: 1, overflow: "hidden" }}>
          <CustomerCatalogView
            sharedPackages={sharedPackages}
            sessionRef={null} // Customer doesn't need session ref for scroll sync
            onInterested={() => {}} // Customer doesn't need interested handler
            // Comparison props
            compareList={compareList}
            addToCompare={addToCompare}
            removeFromCompare={removeFromCompare}
            isInComparison={isInComparison}
            isComparisonFull={isComparisonFull}
            onComparePackages={handleComparePackages}
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
      />
    </>
  );
};

export default PackageShareDialog; 