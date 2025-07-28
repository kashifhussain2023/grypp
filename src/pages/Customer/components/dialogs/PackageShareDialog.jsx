import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import CustomerCatalogView from "../../../../components/CustomerCatalogView";
import TourComparisonDrawer from "../../../../components/Compare/TourComparisonDrawer";
import { useComparePackages } from "../../../../hooks/useComparePackages";

const PackageShareDialog = ({
  open,
  onClose,
  sharedPackages = [],
  sessionRef // Add sessionRef for scroll sync
}) => {
  // Comparison functionality (view-only for customers)
  const {
    compareList,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCompare,
    clearComparison,
    getBestValue,
    setCompareList, // Added setCompareList to the hook
  } = useComparePackages(sessionRef, 'customer');
  // Debug logging
  console.log("🎭 PackageShareDialog rendered with:", {
    open,
    sharedPackagesLength: sharedPackages.length,
    sharedPackages: sharedPackages.slice(0, 2) // First 2 packages for debugging
  });

  // Effect to log when open state changes
  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - open changed to:", open);
  }, [open]);

  // Effect to log when packages change
  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - packages changed:", sharedPackages.length);
  }, [sharedPackages]);

  // Listen for shared comparison signals from agent
  useEffect(() => {
    if (!sessionRef?.current) return;

    const handleSharedComparison = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🎭 Received shared comparison signal:", data);

        // Update the comparison list with shared packages
        if (data.packages && data.packages.length > 0) {
          setCompareList(data.packages);
          setIsDrawerOpen(true);
        }
      } catch (err) {
        console.error("Failed to parse shared comparison signal:", err);
      }
    };

    const session = sessionRef.current;
    session.on('signal:shared-comparison-open', handleSharedComparison);

    return () => {
      session.off('signal:shared-comparison-open', handleSharedComparison);
    };
  }, [sessionRef, setCompareList, setIsDrawerOpen]);

  const handleInterested = (pkg) => {
    console.log("🎭 Customer interested in package:", pkg.name);
    // Here you could send a signal to the agent about customer interest
    if (sessionRef?.current) {
      sessionRef.current.signal(
        {
          type: "customer-package-interest",
          data: JSON.stringify({
            packageId: pkg.id,
            packageName: pkg.name,
            timestamp: new Date().toISOString()
          })
        },
        (err) => {
          if (err) console.error("Interest signal error:", err);
        }
      );
    }
  };

  const handleDiscuss = () => {
    console.log("🎭 PackageShareDialog: Discuss with Agent button clicked");
    onClose();
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
        <CustomerCatalogView
          sharedPackages={sharedPackages}
          sessionRef={sessionRef}
          onInterested={handleInterested}
          onDiscuss={handleDiscuss}
          compareList={compareList}
        />

        <DialogActions sx={{ p: 3, bgcolor: "grey.50" }}>
          <Button
            onClick={() => {
              console.log("🎭 PackageShareDialog: Close button clicked");
              onClose();
            }}
            color="secondary"
            sx={{ mr: 2 }}
          >
            Close
          </Button>
          <Button
            onClick={handleDiscuss}
            variant="contained"
            color="primary"
            sx={{ minWidth: 160 }}
          >
            Discuss with Agent
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tour Comparison Drawer - Rendered outside dialog to appear on top */}
      {compareList.length > 0 && (
        <TourComparisonDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          compareList={compareList}
          onRemoveFromCompare={removeFromCompare}
          onClearComparison={clearComparison}
          getBestValue={getBestValue}
          userType="customer"
          sessionRef={sessionRef}
        />
      )}
    </>
  );
};

export default PackageShareDialog; 