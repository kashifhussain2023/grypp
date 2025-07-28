// src/components/Footer.tsx
import { Container, Typography, Box, Grid, Link, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        backgroundColor: "var(--dark)",
        color: "white",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ position: "relative", pb: 1 }}
            >
              About Wanderlust
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 2,
                  backgroundColor: "var(--secondary)",
                }}
              />
            </Typography>
            <Typography variant="body2" color="#bbb" sx={{ mb: 2 }}>
              We're dedicated to creating unforgettable travel experiences that
              go beyond the ordinary. Our expert team crafts personalized
              journeys to the world's most amazing destinations.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "var(--secondary)",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ position: "relative", pb: 1 }}
            >
              Quick Links
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 2,
                  backgroundColor: "var(--secondary)",
                }}
              />
            </Typography>
            {[
              "Home",
              "Destinations",
              "Special Offers",
              "Travel Guides",
              "About Us",
            ].map((item) => (
              <Typography
                key={item}
                component={Link}
                href="#"
                variant="body2"
                color="#bbb"
                display="block"
                sx={{ mb: 1, "&:hover": { color: "var(--secondary)" } }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ position: "relative", pb: 1 }}
            >
              Support
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 2,
                  backgroundColor: "var(--secondary)",
                }}
              />
            </Typography>
            {[
              "FAQs",
              "Contact Us",
              "Booking Conditions",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <Typography
                key={item}
                component={Link}
                href="#"
                variant="body2"
                color="#bbb"
                display="block"
                sx={{ mb: 1, "&:hover": { color: "var(--secondary)" } }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ position: "relative", pb: 1 }}
            >
              Contact Info
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 2,
                  backgroundColor: "var(--secondary)",
                }}
              />
            </Typography>
            <Typography variant="body2" color="#bbb" sx={{ mb: 1 }}>
              <Box component="span" sx={{ mr: 1 }}>
                📍
              </Box>{" "}
              123 Travel Street, Suite 100
              <br />
              New York, NY 10001
            </Typography>
            <Typography variant="body2" color="#bbb" sx={{ mb: 1 }}>
              <Box component="span" sx={{ mr: 1 }}>
                📞
              </Box>{" "}
              +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="#bbb">
              <Box component="span" sx={{ mr: 1 }}>
                ✉️
              </Box>{" "}
              info@wanderlust.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Typography variant="body2" color="#bbb" textAlign="center">
          &copy; {new Date().getFullYear()} Wanderlust Travels. All Rights
          Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
