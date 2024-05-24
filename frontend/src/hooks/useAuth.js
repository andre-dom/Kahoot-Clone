import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";

/*
 * removes the need to import AuthContext and useContext hook
 * we can make the code cleaner by just making our own hook that returns
 * the context.
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
