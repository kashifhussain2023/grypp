import {
  Paper,
  Typography,
  Box,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Rating,
  CardActions,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";

const PackageCard = ({ packageData, index }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    console.log("card ref", cardRef);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(cardRef.current); // Stop observing once it's in view
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  const theme = useTheme();

  const StyledCardMedia = styled(CardMedia)(() => ({
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));
  return (
    <Card
      ref={cardRef}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        boxShadow: theme.shadows[2],
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
        },
        // Animation styles
        opacity: inView ? 1 : 0, // Start invisible, become visible when in view
        transform: inView ? "translateY(0)" : "translateY(10px)", // Move up when in view
        animation: inView
          ? `fadeIn 0.6s ease-out forwards ${index * 0.1}s`
          : "none", // Staggered animation only when in view
      }}
    >
      <StyledCardMedia
        component="img"
        height="200"
        image={packageData.image}
        alt={packageData.title}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, color: "#333" }}
        >
          {packageData.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: "#555", mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {packageData.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 18, color: "#555", mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {packageData.duration}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          color="primary"
          sx={{ fontWeight: 700, mt: 2, mb: 1 }}
        >
          {packageData.price}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            name="package-rating"
            value={packageData.rating}
            precision={0.1}
            readOnly
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({packageData.reviews} reviews)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {packageData.activities
            ? `Activities: ${packageData.activities.join(", ")}`
            : `Highlights: ${packageData.highlights.join(", ")}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: "8px",
            py: 1.5,
            fontWeight: 600,
            background: theme.palette.primary.main,
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default PackageCard;
