import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import CustomerCatalogView from "../../../../components/CustomerCatalogView";
import TourComparisonModal from "../../../../components/Compare/TourComparisonModal";
import { useComparePackages } from "../../../../hooks/useComparePackages";

const PackageShareDialog = ({
  open,
  onClose,
  sharedPackages = [],
  sessionRef // Add sessionRef for scroll sync
}) => {
  // Customer comparison functionality
  const {
    compareList,
    addToCompare,
    removeFromCompare,
    clearComparison,
    getBestValue,
    isInComparison,
    isComparisonFull,
  } = useComparePackages(sessionRef, 'customer');

  // State for comparison modal
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  // Handle opening comparison modal
  const handleComparePackages = () => {
    setComparisonModalOpen(true);
  };

  // Debug logging
  console.log("🎭 PackageShareDialog rendered with:", {
    open,
    sharedPackagesLength: sharedPackages.length,
    comparisonCount: compareList.length
  });

  // Effect to log when open state changes
  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - open changed to:", open);
  }, [open]);

  // Effect to log when packages change
  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - packages changed:", sharedPackages.length);
  }, [sharedPackages]);

  // Effect to log when open state changes
  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - open changed to:", open);
  }, [open]);

  // Effect to log when packages change
  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - packages changed:", sharedPackages.length);
  }, [sharedPackages]);

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
          // Comparison props
          compareList={compareList}
          addToCompare={addToCompare}
          removeFromCompare={removeFromCompare}
          isInComparison={isInComparison}
          isComparisonFull={isComparisonFull}
          onComparePackages={handleComparePackages}
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

      {/* Tour Comparison Modal - Full screen modal for customer comparison */}
      <TourComparisonModal
        open={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={removeFromCompare}
        onClearComparison={() => {
          clearComparison();
          setComparisonModalOpen(false);
        }}
        getBestValue={getBestValue}
      />
    </>
  );
};

export default PackageShareDialog; 