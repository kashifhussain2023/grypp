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
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 }, // Responsive padding top/bottom
        minHeight: "100vh",
        background: `url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80) no-repeat center center/cover`,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for readability
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        display: "flex", // Use flexbox for vertical centering
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
      }}
      id="travelExpert"
    >
      {/* Overlay for better text contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: { xs: "90%", sm: 700, md: 800 }, // Responsive max-width
          mx: "auto",
          px: { xs: 2, sm: 4 }, // Responsive horizontal padding
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
            mb: 4,
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adds depth
            position: "relative",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }, // Responsive font size
            "&:after": {
              content: '""',
              display: "block",
              width: { xs: 80, sm: 100 }, // Responsive line width
              height: 5,
              background: "linear-gradient(to right, #ffeb3b, #f44336)", // Travel gradient
              margin: "15px auto",
              borderRadius: 2.5,
            },
          }}
        >
          Talk to a Travel Expert
        </Typography>

        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency
            borderRadius: 16,
            p: { xs: 3, sm: 6 }, // Responsive padding
            maxWidth: { xs: "95%", sm: 500, md: 600 }, // Responsive max-width for the card
            mx: "auto",
            boxShadow: 6,
            color: "#333",
            border: "2px solid rgba(255, 235, 59, 0.5)", // Yellowish border for travel vibe
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <Avatar
            src="/expert-avatar.jpg"
            sx={{
              width: { xs: 120, sm: 180 }, // Responsive avatar size
              height: { xs: 120, sm: 180 }, // Responsive avatar size
              mx: "auto",
              mb: 4,
              border: "6px solid #ffeb3b", // Yellow border for travel theme
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "#2ecc71",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }} // Responsive font size
          >
            Travel Expert
          </Typography>
          <Typography
            color="primary"
            sx={{
              mb: 3,
              fontWeight: 500,
              color: "#3498db",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }} // Responsive font size
          >
            Senior Travel Consultant
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              mb: 5,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              color: "#666",
            }} // Responsive font size
          >
            With over 15 years of experience, our expert has guided thousands of
            travelers to their dream destinations with personalized itineraries.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Uncomment and style Chat button if needed */}
            {/* <Button
              variant="contained"
              color="success"
              startIcon={<Chat />}
              sx={{
                px: { xs: 2, sm: 4 }, // Responsive padding
                py: { xs: 1.5, sm: 2 }, // Responsive padding
                fontWeight: 600,
                backgroundColor: "#2ecc71",
                "&:hover": { backgroundColor: "#27ae60", transform: "translateY(-3px)" },
                fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size
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
                px: { xs: 2, sm: 4 }, // Responsive padding
                py: { xs: 1.5, sm: 2 }, // Responsive padding
                fontWeight: 700,
                backgroundColor: "#3498db",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2980b9",
                  transform: "translateY(-3px)",
                },
                textTransform: "uppercase",
                borderRadius: 5,
                fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive font size
              }}
            >
              Video Call
            </Button>
          </Box>
        </Box>
      </Box>

      <VideoCallDialog open={videoDialogOpen} onClose={handleClose} />
    </Box>
  );
};

export default TravelExpert;
