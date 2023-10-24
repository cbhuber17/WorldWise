import styles from "./Sidebar.module.css";

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} by GeoNotes
      </p>
    </footer>
  );
}
