import { createContext, useContext, useReducer } from "react";
import { Auth } from "aws-amplify";
import toast, { Toaster } from "react-hot-toast";
import { sleep } from "../utils/utils";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isReadOnly: true,
};

const toastStyle = { fontSize: "20px" };

function toastError(message) {
  toast.error(message, {
    style: toastStyle,
  });
  sleep(2500);
}

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, isReadOnly: true };
    case "user/approved":
      return { ...state, isReadOnly: false };
    default:
      throw new Error("Unknown action");
  }
}

/* eslint react/prop-types: 0 */
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isReadOnly }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    try {
      const user = await Auth.signIn(email, password);

      if (user) {
        dispatch({ type: "login", payload: user });
      }
    } catch (error) {
      switch (error.name) {
        case "NotAuthorizedException":
          toastError("Invalid login credentials.");
          break;

        default:
          toastError("Error signing in");
          console.log(error);
          throw error;
      }
    }
  }

  async function logout() {
    try {
      await Auth.signOut();
      dispatch({ type: "logout" });
    } catch (error) {
      toastError("Error signing out");
      console.log("Error signing out: ", error);
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{ user, isAuthenticated, isReadOnly, login, logout, dispatch }}
      >
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

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
