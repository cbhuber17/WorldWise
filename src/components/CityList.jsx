import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useOutletContext } from "react-router-dom";

function CityList() {
  const { cities, isLoading } = useCities();
  const markersRef = useOutletContext();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} markersRef={markersRef} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
