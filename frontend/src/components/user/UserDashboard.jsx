// UserDashboard.jsx
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAuth } from "../auth/authContext.jsx";
import { useNavigate } from "react-router-dom";
import WordPairsList from "./WordPairList.jsx";

const defaultTheme = createTheme();

export default function UserDashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { user, role, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleLogin = () => {
    login();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <MuiAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {user
              ? `Welcome, ${user && user.username}! (User Dashboard)`
              : "Welcome, Guest!"}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            Logout
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      {/* Include WordPairsList component here */}
      <WordPairsList />
    </ThemeProvider>
  );
}
