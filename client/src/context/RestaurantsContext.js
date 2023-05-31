import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [clients,setClients] = useState([]);

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  const addClients = (client) => {
    setClients([...clients, client]);
  };
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        setClients,
        clients,
        addClients
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};