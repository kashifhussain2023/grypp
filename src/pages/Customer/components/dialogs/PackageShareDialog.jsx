import React, { useState, useEffect } from "react";
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
import { openTokSessionSingleton } from "../../../../services/OpenTokSessionManager";

const PackageShareDialog = ({
  open,
  onClose,
  sharedPackages,
  userType = "customer",
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    console.log("🎭 PackageShareDialog useEffect - open changed to:", open);
  }, [open]);

  // Effect to log when packages change
  useEffect(() => {
    console.log("🎭 PackageShareDialog: sharedPackages changed:", sharedPackages);
  }, [sharedPackages]);

  const handleOpenComparison = () => {
    console.log("🎭 Opening comparison drawer");
    setIsDrawerOpen(true);

    // Notify agent that customer opened comparison
    const session = openTokSessionSingleton.getSession();
    if (session) {
      session.signal(
        {
          type: "shared-comparison-open",
          data: JSON.stringify({
            action: "customer-opened-comparison",
            timestamp: Date.now(),
          }),
        },
        (err) => {
          if (err) {
            console.error("Failed to send comparison open signal:", err);
          }
        }
      );
    }
  };

  const handleCloseComparison = () => {
    console.log("🎭 Closing comparison drawer");
    setIsDrawerOpen(false);
  };

  return (
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
          userType={userType}
          isDrawerOpen={isDrawerOpen}
          onCloseDrawer={handleCloseComparison}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageShareDialog; 