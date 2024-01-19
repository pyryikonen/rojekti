// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./components/auth/authContext.jsx";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { UserDashboard } from "./components/user/UserDashboard";
import SignIn from "./components/shared/SignIn";
import SignUp from "./components/shared/SignUp";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const LandingPage = () => {
  return (
    <div>
      <h2>Welcome to our App!</h2>
      <p>Choose an option:</p>
      <ul>
        <li>
          <a href="/signin">Sign In</a>
        </li>
        <li>
          <a href="/signup">Sign Up</a>
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* Apply centering styles to the body */}
      <style>
        {`
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
        `}
      </style>

      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
