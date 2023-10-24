import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

import { useRef } from "react";

function AppLayout() {
  const markersRef = useRef([]);

  return (
    <div className={styles.app}>
      <Sidebar markersRef={markersRef} />
      <Map markersRef={markersRef} />
      <User />
    </div>
  );
}

export default AppLayout;
