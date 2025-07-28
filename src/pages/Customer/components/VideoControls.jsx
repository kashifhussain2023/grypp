import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { Videocam, VideocamOff, Mic, MicOff, CardTravel } from "@mui/icons-material";

const VideoControls = ({
  isVideoEnabled,
  isAudioEnabled,
  sharedPackages,
  publisher,
  sessionRef,
  onToggleVideo,
  onToggleAudio,
  onShowPackages,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 3,
        bgcolor: "rgba(20, 20, 20, 0.95)",
        borderRadius: 6,
        padding: "16px 32px",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        minWidth: 280,
        animation: "slideUp 0.3s ease-out",
        "@keyframes slideUp": {
          "0%": { 
            opacity: 0,
            transform: "translateX(-50%) translateY(20px)",
          },
          "100%": { 
            opacity: 1,
            transform: "translateX(-50%) translateY(0)",
          },
        },
        "@media (max-width: 600px)": {
          minWidth: 240,
          padding: "12px 20px",
          gap: 2,
          bottom: 16,
        },
      }}
    >
      {/* Video Control */}
      <Tooltip title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}>
        <Box
          onClick={onToggleVideo}
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: publisher ? "pointer" : "not-allowed",
            bgcolor: isVideoEnabled ? "rgba(255, 255, 255, 0.1)" : "#f44336",
            border: `2px solid ${isVideoEnabled ? "rgba(255, 255, 255, 0.2)" : "#f44336"}`,
            transition: "all 0.3s ease",
            "&:hover": publisher ? {
              transform: "scale(1.05)",
              bgcolor: isVideoEnabled ? "rgba(255, 255, 255, 0.15)" : "#d32f2f",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            } : {},
            opacity: publisher ? 1 : 0.5,
            "@media (max-width: 600px)": {
              width: 48,
              height: 48,
            },
          }}
        >
          {isVideoEnabled ? (
            <Videocam sx={{ fontSize: 24, color: "white" }} />
          ) : (
            <VideocamOff sx={{ fontSize: 24, color: "white" }} />
          )}
        </Box>
      </Tooltip>

      {/* Audio Control */}
      <Tooltip title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}>
        <Box
          onClick={onToggleAudio}
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: publisher ? "pointer" : "not-allowed",
            bgcolor: isAudioEnabled ? "rgba(255, 255, 255, 0.1)" : "#f44336",
            border: `2px solid ${isAudioEnabled ? "rgba(255, 255, 255, 0.2)" : "#f44336"}`,
            transition: "all 0.3s ease",
            "&:hover": publisher ? {
              transform: "scale(1.05)",
              bgcolor: isAudioEnabled ? "rgba(255, 255, 255, 0.15)" : "#d32f2f",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            } : {},
            opacity: publisher ? 1 : 0.5,
            "@media (max-width: 600px)": {
              width: 48,
              height: 48,
            },
          }}
        >
          {isAudioEnabled ? (
            <Mic sx={{ fontSize: 24, color: "white" }} />
          ) : (
            <MicOff sx={{ fontSize: 24, color: "white" }} />
          )}
        </Box>
      </Tooltip>

      {/* Packages Control */}
      {sharedPackages.length > 0 && (
        <Tooltip title="View Shared Packages">
          <Box
            onClick={onShowPackages}
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              bgcolor: "#4caf50",
              border: "2px solid #4caf50",
              transition: "all 0.3s ease",
              position: "relative",
              "&:hover": {
                transform: "scale(1.05)",
                bgcolor: "#388e3c",
                borderColor: "#388e3c",
                boxShadow: "0 4px 20px rgba(76, 175, 80, 0.4)",
              },
              "&::after": {
                content: `"${sharedPackages.length}"`,
                position: "absolute",
                top: -2,
                right: -2,
                width: 16,
                height: 16,
                bgcolor: "#ff5722",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "white",
                fontWeight: "bold",
              },
              "@media (max-width: 600px)": {
                width: 48,
                height: 48,
              },
            }}
          >
            <CardTravel sx={{ fontSize: 24, color: "white" }} />
          </Box>
        </Tooltip>
      )}

      {/* Connection Status Indicator */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          ml: 2,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: publisher && sessionRef?.current ? "#4caf50" : "#ff9800",
            animation: publisher && sessionRef?.current ? "pulse 2s infinite" : "none",
            "@keyframes pulse": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.5 },
              "100%": { opacity: 1 },
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {publisher && sessionRef?.current ? "Connected" : "Connecting..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default VideoControls; 