import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import PocketBase from "pocketbase";

const db = new PocketBase(import.meta.env.VITE_POCKETHOST_DB_URL);

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  dbUser: null,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "db/load":
      return { ...state, dbUser: `cities_${action.payload}` };

    default:
      throw new Error("Unknown action type");
  }
}

/* eslint react/prop-types: 0 */
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, dbUser, error }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchCities() {
        dispatch({ type: "loading" });

        try {
          const data = await db.collection(dbUser).getFullList({
            sort: "-date",
            requestKey: "getCities",
          });
          dispatch({ type: "cities/loaded", payload: data });
        } catch (error) {
          console.error(error);
          dispatch({
            type: "rejected",
            payload: "There was an error loading cities...",
          });
        }
      }
      if (dbUser) fetchCities();
    },
    [dbUser]
  );

  // useCallback Allows getCity() to be used in a useEffect dependency array,
  // without it being called constantly resulting in many re-renderings
  // i.e. not have this function get re-created on each render, have it memoitized.
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const data = await db.collection(dbUser).getOne(id);
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id, dbUser]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const data = await db.collection(dbUser).create(JSON.stringify(newCity));

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await db.collection(dbUser).delete(id);

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        dbUser,
        error,
        getCity,
        createCity,
        deleteCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
