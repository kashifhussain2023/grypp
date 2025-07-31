import React, { useState } from "react";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import FeaturedPackageCard from "./FeaturedPackageCard.jsx"; // Corrected import path
import PackageCard from "./PackageCard"; // Corrected import path
import {
  adventureData,
  featuredPackage,
  luxuryData,
  popularTravelData,
} from "../../constants/packagesData"; // Verify this path

const PackageSection = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Helper component for TabPanel content
  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3, px: 0 }}>{children}</Box>}
      </div>
    );
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 }, fontFamily: "Inter, sans-serif" }}
    >
      {/* Define the fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <FeaturedPackageCard packageData={featuredPackage} />
      {/* Popular Packages Section */}
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4, color: "#222" }}
      >
        Explore Our Amazing Travel Packages
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="travel packages tabs"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#FF8E53",
            },
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "1rem" },
              color: "#555",
              "&.Mui-selected": {
                color: "#FF8E53",
              },
            },
          }}
        >
          <Tab label="Popular Packages" value="1" />
          <Tab label="Adventure Packages" value="2" />
          <Tab label="Luxury Packages" value="3" />
        </Tabs>
      </Box>
      <TabPanel value={value} index="1">
        <Grid container spacing={4}>
          {popularTravelData.map((pkg, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkg.id}>
              <PackageCard packageData={pkg} index={index} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index="2">
        <Grid container spacing={4}>
          {adventureData.map((pkg, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkg.id}>
              <PackageCard packageData={pkg} index={index} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index="3">
        <Grid container spacing={4}>
          {luxuryData.map((pkg, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkg.id}>
              <PackageCard packageData={pkg} index={index} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default PackageSection;
