import styles from "./Logo.module.css";

function Logo() {
  return (
    <img
      // src="/assets/img/logo.png"
      src="/WorldWise/assets/img/logo.png"
      alt="GeoNotes logo"
      className={styles.logo}
    />
  );
}

export default Logo;
