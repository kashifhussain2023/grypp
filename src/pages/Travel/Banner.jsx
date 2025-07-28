// src/components/Travel/Banner.jsx
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import "./travel-styles.css";

const Banner = () => {
  return (
    <Box className="travel-banner">
      <Box
        sx={{
          maxWidth: 800,
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Discover Your Dream Vacation
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
          }}
        >
          Explore breathtaking destinations with our expertly crafted travel
          packages.
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          href="#packages"
          sx={{
            px: 4,
            py: 2,
            fontWeight: 600,
            "&:hover": { transform: "translateY(-2px)" },
          }}
        >
          Explore Packages
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
