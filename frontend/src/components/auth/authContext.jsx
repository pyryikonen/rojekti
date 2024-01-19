import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

// Define action types for reducer
const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { user: action.payload.user };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (username) => {
    dispatch({ type: actionTypes.LOGIN, payload: { user: { username } } });
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
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
