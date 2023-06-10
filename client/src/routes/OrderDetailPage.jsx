import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import NavBar from "../Components/NavBar";
import AddProductToOrder from "../Components/AddProductToOrder";
import OrderProducts from "../Components/OrderProducts";
import { RestaurantsContext } from "../context/RestaurantsContext";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [selectedOrder, setSelectedOrder] = useState("");
  const [orderProducts, setOrderProducts] = useState("");
  const { products, setProducts } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      const order = await RestaurantFinder.get(`/api/v1/client_orders/${id}`, {
        headers: { token: localStorage.token },
      });

      const order_details = await RestaurantFinder.get(
        `/api/v1/client_order_details/${id}`,
        {
          headers: { token: localStorage.token },
        }
      );

      const products = await RestaurantFinder.get("/api/v1/products", {
        headers: { token: localStorage.token },
      });

      // console.log(response.data.data.order, 'testing');
      setSelectedOrder(order.data.data.order);
      setOrderProducts(order_details.data.data.order_products);
      setProducts(products.data.data.products);
      console.log(order.data.data.order_products);
    };

    fetchData();
  }, [id, setOrderProducts, setSelectedOrder, setProducts]);

  return (
    <div>
      <NavBar />

      <div className="main">
        {selectedOrder && (
          <>
            <h1 className="text-center display=1">
              Order ID: {selectedOrder.order_id}
            </h1>
            <h2 className="text-center display=1">{selectedOrder.name}</h2>
            <OrderProducts orderProducts={orderProducts} />
            <AddProductToOrder products={products} />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;
