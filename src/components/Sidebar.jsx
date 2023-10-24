import { Outlet, Link } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import Title from "./Title";
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
      <Outlet context={markersRef} />
      {/* Similar to children prop of the router */}
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by GeoNotes Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
