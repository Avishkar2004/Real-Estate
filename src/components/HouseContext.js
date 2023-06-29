import React, { createContext, useEffect, useState } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range(any)");
  const [loading, setLoading] = useState(false);

  // return all coutries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    // remove duplicate
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    // set coutries state
    setCountries(uniqueCountries);
  }, []);

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    // remove duplicate
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];
    // set proerty state
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // create a function that checks if the string includes (any)
    const IsDefault = (str) => {
      return str.split("").includes("(any)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouse = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      if (IsDefault(country) && IsDefault(property) && IsDefault(price)) {
        return house;
      }

      if (!IsDefault(country) && IsDefault(property) && IsDefault(price)) {
        return house.country === country;
      }
      if (!IsDefault(property) && IsDefault(country) && IsDefault(price)) {
        return house.type === property;
      }

      if (!IsDefault(price) && IsDefault(country) && IsDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      if (!IsDefault(country) && !IsDefault(property) && IsDefault(price)) {
        return house.country === country && house.type === property;
      }

      if (!IsDefault(country) && IsDefault(property) && !IsDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      if (!IsDefault(country) && !IsDefault(property) && !IsDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });
    setTimeout(() => {
      return (
        newHouse.length < 1 ? setHouses([]) : setHouses(newHouse),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
