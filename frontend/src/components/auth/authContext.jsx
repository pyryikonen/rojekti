// authContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored Token:", storedToken);

    if (storedToken) {
      // Fetch user or admin data from the database using the stored token
      axios
        .get("http://localhost:3001/users/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          const { user } = response.data;
          dispatch({
            type: "LOGIN",
            payload: { user, token: storedToken },
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // If there's an error fetching user data, proceed with the stored token only
          dispatch({
            type: "LOGIN",
            payload: { user: null, token: storedToken },
          });
        });
    }
  }, []); // Run the effect only once on initial load

  const login = async (username, token, role) => {
    // Store the token in localStorage
    localStorage.setItem("token", token);

    // Fetch user or admin data from the database
    const userOrAdmin = await axios.get(
      "http://localhost:3001/users/" + username
    );

    console.log("User or Admin data:", userOrAdmin);

    dispatch({
      type: "LOGIN",
      payload: { user: userOrAdmin.data, token, role },
    });
  };

  const logout = () => {
    // Remove the token from localStorage on logout
    localStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
