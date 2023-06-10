import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddOrder from "../Components/AddOrder";
import ClientOrdersList from "../Components/ClientOrdersList";
import NavBar from "../Components/NavBar";
import { RestaurantsContext } from "../context/RestaurantsContext";

const OrderPage = ({ setAuth }) => {
  const { clientOrders, setClientOrders } = useContext(RestaurantsContext);
  const { clients } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await RestaurantFinder.get("/api/v1/client_orders", {
          headers: { token: localStorage.token },
        });

        //    console.log("new json: " ,responce.data.data.orders.length !== 0 )

        if (responce.data.data.orders.length !== 0) {
          setClientOrders(responce.data.data.orders);
        }
        //    console.log("first value orders ", clientOrders);
      } catch (err) {
        localStorage.removeItem("token");
        setAuth(false);
        setClientOrders([]);
        console.log(err);
      }
    };

    fetchData();
  }, [setClientOrders, setAuth]);

  return (
    <div>
      <NavBar />
      <div className="main">
        <h1 className="font-weight-light display-4 text-center">
          Client Orders
        </h1>
        <AddOrder clients={clients} />
        <ClientOrdersList clientOrders={clientOrders} />
      </div>
    </div>
  );
};

export default OrderPage;
