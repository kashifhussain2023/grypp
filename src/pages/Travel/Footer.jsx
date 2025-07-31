// src/components/Footer.tsx (corrected part)
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  EmojiEvents,
  LocalOffer,
  CompareArrows,
} from "@mui/icons-material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const Footer = () => {
  const theme = useTheme();

  // Define social media icons with their corresponding aria-labels
  const socialIcons = [
    { Icon: Facebook, label: "Facebook link" },
    { Icon: Twitter, label: "Twitter link" },
    { Icon: Instagram, label: "Instagram link" },
    { Icon: LinkedIn, label: "LinkedIn link" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section: Stats */}
        <Grid container spacing={4} sx={{ mb: { xs: 4, md: 6 } }}>
          {[
            {
              icon: (
                <EmojiEvents
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.contrastText,
                  }}
                />
              ),
              title: "India's #1",
              description: "Largest Travel portal",
            },
            {
              icon: (
                <TravelExploreIcon
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.contrastText,
                  }}
                />
              ),
              title: "Explore Plan",
              description: "Every 4 minute",
            },
            {
              icon: (
                <LocalOffer
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.contrastText,
                  }}
                />
              ),
              title: "Offers",
              description: "Stay updated, pay less",
            },
            {
              icon: (
                <CompareArrows
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.contrastText,
                  }}
                />
              ),
              title: "Compare",
              description: "Decode the right plan",
            },
          ].map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.primary.light,
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="inherit">
                    {stat.title}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.grey[400]}>
                    {stat.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider
          sx={{ my: { xs: 4, md: 6 }, borderColor: theme.palette.grey[700] }}
        />

        {/* Main Footer Links Section */}
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* About Trip Planner */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                position: "relative",
                pb: 1.5,
                color: theme.palette.common.white,
              }}
            >
              About Trip Planner
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 1,
                }}
              />
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.grey[400]}
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              We're dedicated to creating unforgettable travel experiences that
              go beyond the ordinary. Our expert team crafts personalized
              journeys to the world's most amazing destinations.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              {socialIcons.map(
                (
                  item,
                  index // Iterate over the new socialIcons array
                ) => (
                  <Link
                    key={index}
                    href="#"
                    aria-label={item.label} // Use the predefined label
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      backgroundColor: theme.palette.grey[800],
                      borderRadius: "50%",
                      color: theme.palette.common.white,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: theme.palette.secondary.main,
                        transform: "translateY(-3px) scale(1.05)",
                      },
                    }}
                  >
                    <item.Icon fontSize="small" />
                    {/* Render the Icon component */}
                  </Link>
                )
              )}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                position: "relative",
                pb: 1.5,
                color: theme.palette.common.white,
              }}
            >
              Quick Links
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 1,
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
              <Link
                key={item}
                href="#"
                underline="none"
                variant="body2"
                color={theme.palette.grey[400]}
                display="block"
                sx={{
                  mb: 1,
                  transition: "color 0.2s ease",
                  "&:hover": { color: theme.palette.secondary.light },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                position: "relative",
                pb: 1.5,
                color: theme.palette.common.white,
              }}
            >
              Support
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 1,
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
              <Link
                key={item}
                href="#"
                underline="none"
                variant="body2"
                color={theme.palette.grey[400]}
                display="block"
                sx={{
                  mb: 1,
                  transition: "color 0.2s ease",
                  "&:hover": { color: theme.palette.secondary.light },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                position: "relative",
                pb: 1.5,
                color: theme.palette.common.white,
              }}
            >
              Contact Info
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 1,
                }}
              />
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.grey[400]}
              sx={{ mb: 1.5 }}
            >
              <Box component="span" sx={{ mr: 1, fontSize: "1.1em" }}>
                📍
              </Box>
              123 Travel Street, Suite 100
              <br />
              New York, NY 10001
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.grey[400]}
              sx={{ mb: 1.5 }}
            >
              <Box component="span" sx={{ mr: 1, fontSize: "1.1em" }}>
                📞
              </Box>
              +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color={theme.palette.grey[400]}>
              <Box component="span" sx={{ mr: 1, fontSize: "1.1em" }}>
                ✉️
              </Box>
              info@tripPlanner.com
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{ my: { xs: 4, md: 6 }, borderColor: theme.palette.grey[700] }}
        />

        {/* Copyright */}
        <Typography
          variant="body2"
          color={theme.palette.grey[500]}
          textAlign="center"
          sx={{ fontSize: "0.9rem" }}
        >
          &copy; {new Date().getFullYear()} Trip Planner. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
