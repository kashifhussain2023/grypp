import "./travel-styles.css";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={(theme) => ({
          backgroundColor: "#ffffff",
          color: "var(--dark)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
          zIndex: theme.zIndex.drawer + 1,
          padding: "0 1rem",
        })}
      >
        <Toolbar sx={{ justifyContent: "center", minHeight: 72 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              userSelect: "none",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: "1.8rem",
                color: "var(--primary)",
                letterSpacing: "0.5px",
              }}
            >
              Trip
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: "1.8rem",
                color: "var(--secondary)",
              }}
            >
              Planner
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer for Fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;
