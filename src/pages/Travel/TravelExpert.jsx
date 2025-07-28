// src/components/Travel/TravelExpert.jsx
import { useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { Chat, VideoCall } from "@mui/icons-material";
import VideoCallDialog from "./VideoCallDialog";

const TravelExpert = () => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const handleClose = (reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
      return;
    }
    setVideoDialogOpen(false);
    return;
  };

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, #3498db, #2ecc71)",
        color: "white",
        textAlign: "center",
      }}
      id="travelExpert"
    >
      <Typography
        variant="h2"
        sx={{
          color: "white",
          mb: 4,
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: 80,
            height: 4,
            background: "white",
            margin: "15px auto",
            borderRadius: 2,
          },
        }}
      >
        Talk to a Travel Expert
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          p: 4,
          maxWidth: 600,
          mx: "auto",
          boxShadow: 3,
          color: "text.primary",
        }}
      >
        <Avatar
          src="/expert-avatar.jpg"
          sx={{
            width: 150,
            height: 150,
            mx: "auto",
            mb: 3,
            border: "5px solid #ecf0f1",
          }}
        />
        <Typography variant="h3" sx={{ mb: 1 }}>
          Agent
        </Typography>
        <Typography color="primary" sx={{ mb: 3, fontWeight: 600 }}>
          Senior Travel Consultant
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          With over 15 years of experience in the travel industry, agent has
          helped thousands of clients plan their perfect vacations.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* <Button
            variant="contained"
            color="success"
            startIcon={<Chat />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              "&:hover": { transform: "translateY(-3px)" },
            }}
          >
            Chat Now
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<VideoCall />}
            onClick={() => setVideoDialogOpen(true)}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              "&:hover": { transform: "translateY(-3px)" },
            }}
          >
            Video Call
          </Button>
        </Box>
      </Box>

      <VideoCallDialog open={videoDialogOpen} onClose={handleClose} />
    </Box>
  );
};

export default TravelExpert;
