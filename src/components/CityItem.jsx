import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useAuth } from "../contexts/AuthContext";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

/* eslint react/prop-types: 0 */
function CityItem({ city, markersRef }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const { isReadOnly } = useAuth();

  function handleClick(e) {
    e.preventDefault();

    // Disable deleting cities when viewing read-only
    if (!isReadOnly) deleteCity(id);
  }

  function handleListItem(markersRef, id) {
    markersRef.current[id].openPopup();
  }

  return (
    <li onClick={() => handleListItem(markersRef, id)}>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>

        {isReadOnly ? null : (
          <button className={styles.deleteBtn} onClick={handleClick}>
            &times;
          </button>
        )}
      </Link>
    </li>
  );
}

export default CityItem;
