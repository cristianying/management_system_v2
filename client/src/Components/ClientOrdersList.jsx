import React from "react";
// import { useNavigate } from "react-router-dom";

const ClientList = ({ClientOrders}) => {
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

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">order ID</th>
            <th scope="col">client name</th>
            <th scope="col">created at</th>
            <th scope="col">updated at</th>
            <th scope="col">status name</th>
          </tr>
        </thead>
        <tbody>
          {/* restaurants && check if restaurants exist, then run code */}
          {ClientOrders &&
            ClientOrders.map((orders) => {
              return (
                <tr key={orders.order_id }> 
                  <td>{orders.order_id}</td>
                  <td>{orders.client_name}</td>
                  <td>{orders.created_at}</td>
                  <td>{orders.updated_at}</td>
                  <td>{orders.status_name}</td>
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

export default ClientList;
