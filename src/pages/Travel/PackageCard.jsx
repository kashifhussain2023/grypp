import { Paper, Typography, Box, IconButton, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import CardComp from "./CardComp";

const PackageCard = ({ title, packageData }) => {
  const theme = useTheme();
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState({
    left: false,
    right: true,
  });

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1; // Account for rounding errors

      setShowArrows({
        left: !isAtStart,
        right: !isAtEnd,
      });
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400; // You can adjust this value
      const newPosition =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;

    // Initial check
    checkScrollPosition();

    // Add event listener
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollPosition);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [packageData]);

  return (
    <Paper
      elevation={4}
      sx={{
        py: 4,
        px: 2,
        mb: 4,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, px: 3 }}>
        {title}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {showArrows.left && (
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "background.paper",
              "&:hover": { backgroundColor: "background.default" },
              boxShadow: theme.shadows[4],
              width: 48,
              height: 48,
              display: { xs: "none", md: "flex" }, // Hide on mobile
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
        )}

        {showArrows.right && (
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "background.paper",
              "&:hover": { backgroundColor: "background.default" },
              boxShadow: theme.shadows[4],
              width: 48,
              height: 48,
              display: { xs: "none", md: "flex" }, // Hide on mobile
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        )}

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 3,
            px: 2,
            py: 1,
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            // Prevent vertical scrolling
            overflowY: "hidden",
            // Add padding to ensure content isn't hidden behind arrows
            ml: { md: 4 },
            mr: { md: 4 },
            willChange: "transform", // 🆕 Add this
          }}
        >
          {packageData.map((pkg, index) => (
            <CardComp key={index} pkg={pkg} />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default PackageCard;
