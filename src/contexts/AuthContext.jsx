import { createContext, useContext, useReducer } from "react";
import { Auth } from "aws-amplify";
import toast, { Toaster } from "react-hot-toast";
import { sleep } from "../utils/utils";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

/* eslint react/prop-types: 0 */
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    try {
      const user = await Auth.signIn(email, password);

      if (user) {
        dispatch({ type: "login", payload: user });
      }
    } catch (e) {
      if (e.name === "NotAuthorizedException") {
        toast.error("Invalid login credentials.", {
          style: { fontSize: "20px" },
        });
        sleep(2500);
        console.log("Invalid login credentials.");
      } else {
        console.log("error signing in", e);
        throw e;
      }
    }
  }

  async function logout() {
    try {
      await Auth.signOut();
      dispatch({ type: "logout" });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <>
      <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
      <Toaster />
    </>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
