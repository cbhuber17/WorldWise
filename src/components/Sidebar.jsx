import { Outlet, Link } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import Title from "./Title";
import AppFooter from "./AppFooter";
import styles from "./Sidebar.module.css";

/* eslint react/prop-types: 0 */
function Sidebar({ markersRef }) {
  return (
    <div className={styles.sidebar}>
      <Link
        to="/app/cities"
        style={{ display: "flex", textDecoration: "none" }}
      >
        <Logo />
        <Title />
      </Link>
      <AppNav />
      {/* Similar to children prop of the router, see App component */}
      <Outlet context={markersRef} />
      <AppFooter />
    </div>
  );
}

export default Sidebar;
