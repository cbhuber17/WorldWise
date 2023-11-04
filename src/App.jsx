import { lazy, Suspense } from "react";
import {
  // BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// Components for lazy loading
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import SignUp from "./pages/SignUp";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// Backend config
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

// Lazy loading
// Suspense API will load each chunk as needed
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Confirm = lazy(() => import("./pages/Confirm"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));

// function App({ signOut, user }) {
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        {/* <BrowserRouter> */}
        <HashRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="confirm" element={<Confirm />} />
              <Route path="login" element={<Login />} />
              <Route path="update-profile" element={<UpdateProfile />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* INDEX is the default child route */}
                {/* React-Router-Dom <Outlet /> from SideBar is rendered below */}
                <Route index replace element={<Navigate to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          {/* </BrowserRouter> */}
        </HashRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
