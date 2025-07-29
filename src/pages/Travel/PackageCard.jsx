import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Grow,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { CalendarToday, Close } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import PackageDetailsModal from "../../components/PackageDetailsModal";
import { samplePackageData } from "../../data/samplePackageData";
import PaymentSection from "./PaymentSection";

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

const PackageCard = ({ destination, duration, price, description, image }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Grow in timeout={300}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease",
            "&:hover": {
              animation: `${floatAnimation} 2s ease-in-out infinite`,
              boxShadow: 3,
            },
          }}
        >
          {/* Fixed height image container */}
          <Box sx={{ height: 200, overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={destination}
              sx={{
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>

          {/* Card content with fixed structure */}
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            {/* Destination title - fixed 2 lines */}
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 600,
                minHeight: "2.5em", // 2 lines of text
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {destination}
            </Typography>

            {/* Duration with icon - fixed height */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.main",
                mb: 1.5,
                height: "24px", // Fixed height for alignment
              }}
            >
              <CalendarToday sx={{ mr: 1, fontSize: "1rem" }} />
              <Typography variant="body1">{duration}</Typography>
            </Box>

            {/* Price section - fixed height */}
            <Box sx={{ mb: 2, height: "42px" }}>
              <Typography
                variant="h5"
                component="span"
                sx={{
                  color: "error.main",
                  fontWeight: 700,
                  mr: 1,
                }}
              >
                {price}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  color: "text.secondary",
                }}
              >
                per person
              </Typography>
            </Box>

            {/* Description - fixed 3 lines */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 3,
                flexGrow: 1,
                minHeight: "5em", // 3 lines of text
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>

            {/* Button - fixed at bottom */}
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleOpenModal}
              sx={{
                fontWeight: 600,
                py: 1,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              VIEW DETAILS
            </Button>

            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={() => setOpen(true)}
              sx={{
                fontWeight: 600,
                py: 1,
                marginTop: 1,
                "&:hover": {
                  bgcolor: "error.dark",
                  color: "white",
                },
              }}
            >
              BOOK NOW
            </Button>
          </CardContent>
        </Card>
      </Grow>

      {/* Package Details Modal */}
      {modalOpen && (
        <PackageDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          packageData={samplePackageData}
        />
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ position: "relative", p: 3 }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <Close />
          </IconButton>
          <PaymentSection onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PackageCard;
