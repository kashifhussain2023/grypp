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

  // Effect to handle comparison modal opening from agent signal
  useEffect(() => {
    const handleComparisonAction = (event) => {
      console.log("🎭 PackageShareDialog received comparison action signal:", event);
      try {
        const data = JSON.parse(event.data);

        // Ignore signals from same user type
        if (data.userType === 'customer') {
          return;
        }

        console.log("🎭 PackageShareDialog received comparison action:", data.action);
        console.log("🎭 PackageShareDialog current compareList length:", compareList.length);
        console.log("🎭 PackageShareDialog sharedPackages length:", sharedPackages.length);

        if (data.action === 'clear-comparison') {
          console.log("🎭 Agent cleared comparison - clearing customer comparison");
          clearComparison();
        } else if (data.action === 'close-comparison') {
          console.log("🎭 Agent closed comparison - closing customer comparison modal");
          toggleDrawer(false);
        } else if (data.action === 'agent-opened-comparison') {
          console.log("🎭 Agent opened comparison - opening customer comparison modal");
          console.log("🎭 Customer compareList before opening:", compareList);
          console.log("🎭 Customer sharedPackages:", sharedPackages);
          console.log("🎭 Agent compareList data:", data.compareList);

          // If agent sent comparison data, update customer's comparison list
          if (data.compareList && data.compareList.length > 0) {
            console.log("🎭 Customer received comparison data from agent:", data.compareList.length, "packages");
            // Clear current comparison and add agent's packages
            clearComparison();
            data.compareList.forEach(pkg => {
              console.log("🎭 Customer adding package from agent:", pkg.id, pkg.name);
              addToCompare(pkg);
            });
          } else if (compareList.length === 0 && sharedPackages.length > 0) {
            // If customer has no packages in comparison but has shared packages, add them
            console.log("🎭 Customer has no comparison packages but has shared packages, adding them");
            sharedPackages.forEach(pkg => {
              console.log("🎭 Adding package to comparison:", pkg.id, pkg.name);
              addToCompare(pkg);
            });
          }

          console.log("🎭 Opening comparison drawer with compareList length:", compareList.length);
          toggleDrawer(true);
        }
      } catch (err) {
        console.error("🎭 PackageShareDialog failed to parse comparison action signal:", err);
      }
    };

    // Register signal handler for comparison actions
    const session = openTokSessionSingleton.getSession();
    if (!session) {
      console.log("🎭 PackageShareDialog: No session available, skipping signal registration");
      return;
    }

    console.log("🎭 PackageShareDialog: Registering comparison signal handlers");

    const success1 = openTokSessionSingleton.registerSignalHandler('signal:comparison-action', handleComparisonAction);
    const success2 = openTokSessionSingleton.registerSignalHandler('signal:shared-comparison-open', handleComparisonAction);

    console.log("🎭 PackageShareDialog: Signal registration results:", { success1, success2 });

    return () => {
      if (session) {
        console.log("🎭 PackageShareDialog: Cleaning up comparison signal handlers");
        openTokSessionSingleton.unregisterSignalHandler('signal:comparison-action');
        openTokSessionSingleton.unregisterSignalHandler('signal:shared-comparison-open');
      }
    };
  }, [clearComparison, toggleDrawer, compareList.length, sharedPackages, addToCompare]);

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
      // Send the comparison data along with the action
      const session = openTokSessionSingleton.getSession();
      if (session) {
        openTokSessionSingleton.sendSignal(
          {
            type: "comparison-action",
            data: JSON.stringify({
              action: 'customer-opened-comparison',
              userType: 'customer',
              compareList: compareList, // Include the comparison data
              timestamp: new Date().toISOString(),
            }),
          },
          (err) => {
            if (err) {
              console.error("Failed to send comparison action signal:", err);
            } else {
              console.log("🎭 Sent customer-opened-comparison signal with", compareList.length, "packages");
            }
          }
        );
      }
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