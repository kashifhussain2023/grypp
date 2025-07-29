import React from "react";
import { Box, Typography } from "@mui/material";
import { Flight } from "@mui/icons-material";

const AnimatedLogo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Flight
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
            transform: "rotate(35deg)",
            color: "#0066ff",
            mr: 1,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Pacifico", cursive',
            fontWeight: 400,
            letterSpacing: "0.3px",
            background: "linear-gradient(90deg, #0066ff, #88b2f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            fontSize: { xs: "1.2rem", sm: "1.6rem" },
            whiteSpace: "nowrap",
          }}
        >
          The Travel Planner
        </Typography>
      </Box>
    </Box>
  );
};

export default AnimatedLogo;
