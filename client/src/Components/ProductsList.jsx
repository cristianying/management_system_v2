import React from "react";
// import { useNavigate } from "react-router-dom";

const ProductsList = ({ products }) => {
  // const {clients, setClients } = useContext(RestaurantsContext);
  // let navigate = useNavigate()

  // useEffect(() => {
  //   const fetchData = async () => {
  //       try {
  //         const response = await RestaurantFinder.get("/api/v1/clients/");
  //         console.log(response.data.data);
  //         setClients(response.data.data.client);
  //       } catch (err) {}
  //     };
  //   fetchData();
  // }, [setClients]);

  // const handleDelete = async (e, id) => {
  //   e.stopPropagation()
  //   try {
  //     const response = await RestaurantFinder.delete(`/api/v1/clients${id}`);
  //     console.log(response.data.data);
  //     setClients(clients.filter(client =>{
  //       return client.client_id !== id
  //     }));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleUpdate = async (e, id) => {
  //   e.stopPropagation()
  //   navigate(`/clients/${id}/update`)
  //   console.log(id)
  // };

  // const handleRestaurantSelect = async (id) => {
  //   // console.log('sent id ', restaurants)
  //   navigate(`/restaurants/${id}`)
  // };

  // console.log("its me mario: ",ClientOrders)

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Product Reference ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Type ID</th>
            <th scope="col">Sub Type ID</th>
            <th scope="col">Factory ID</th>
            <th scope="col">Unit Cost</th>
            <th scope="col">Current Box Quantity</th>
            <th scope="col">Pack Per Box</th>
            <th scope="col">Pieces Per Pack</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {/* restaurants && check if restaurants exist, then run code */}
          {products &&
            products.map((product) => {
              return (
                <tr key={product.product_id}>
                  <td>{product.product_reference_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.type_id}</td>
                  <td>{product.sub_type_id}</td>
                  <td>{product.factory_id}</td>
                  <td>{product.unit_cost}</td>
                  <td>{product.current_box_quantity}</td>
                  <td>{product.pack_per_box}</td>
                  <td>{product.pieces_per_pack}</td>
                  <td>{product.created_at}</td>
                  <td>{product.updated_at}</td>
                  {/* <td>
                    <button 
                    onClick={(e) =>handleUpdate(e, client.client_id)}
                    className="btn btn-warning">
                      Update
                    </button>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
