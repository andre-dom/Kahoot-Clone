import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // * Note that auth is an object
  const [auth, setAuth] = useState(() => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : {};
  });

  useEffect(() => {
    const { user, token } = auth;
    const data = { user, token }; // no password 😁

    localStorage.setItem("user", JSON.stringify(data));
  }, [auth]);

  const values = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;

/**
 * We're returning the AuthContext Provider with the state being auth.
 * the children represent the nested components
 * because authProvider will be wrapping around our components.
 */
