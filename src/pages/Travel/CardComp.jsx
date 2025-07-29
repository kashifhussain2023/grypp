import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  Divider,
  Rating,
  Skeleton,
} from "@mui/material";
import { LocationOn, Star } from "@mui/icons-material";
import React, { useState } from "react";

const CardComp = ({ pkg, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      key={index}
      sx={{
        minWidth: 280,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        flexShrink: 0,
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
        },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            animation="wave"
          />
        )}
        <CardMedia
          component="img"
          height="180"
          image={pkg.image}
          alt={pkg.destination}
          onLoad={() => setImageLoaded(true)}
          sx={{
            objectFit: "cover",
            display: imageLoaded ? "block" : "none",
          }}
        />
        {pkg.isNew && (
          <Chip
            label="NEW"
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              fontWeight: "bold",
            }}
          />
        )}
        {pkg.discount && (
          <Chip
            label={pkg.discount}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              fontWeight: "bold",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <LocationOn fontSize="small" color="primary" sx={{ opacity: 0.8 }} />
          <Typography variant="subtitle2" color="text.secondary">
            {pkg.location}
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 600, my: 1 }}>
          {pkg.destination}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={pkg.rating}
            precision={0.5}
            readOnly
            size="small"
            emptyIcon={
              <Star
                style={{ opacity: 0.55 }}
                fontSize="inherit"
                color="disabled"
              />
            }
          />
          <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
            ({pkg.reviews} reviews)
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Starting from
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {pkg.price}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {pkg.duration}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            href={"#travelExpert"}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            View Deal
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default React.memo(CardComp);
