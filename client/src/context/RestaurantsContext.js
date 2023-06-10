import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientOrders, setClientOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  const addClients = (client) => {
    setClients([...clients, client]);
  };
  const addClientOrders = (clientOrder) => {
    setClientOrders([...clientOrders, clientOrder]);
  };
  const addProducts = (product) => {
    setProducts([...products, product]);
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
        addClients,
        setClientOrders,
        clientOrders,
        addClientOrders,
        setProducts,
        products,
        addProducts,
        setOrderProducts,
        orderProducts,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
