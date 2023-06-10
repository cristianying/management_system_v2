import React from "react";
import { useNavigate } from "react-router-dom";

const ClientList = ({ clients }) => {
  // const {clients, setClients } = useContext(RestaurantsContext);
  let navigate = useNavigate();

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

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    navigate(`/clients/${id}/update`);
    console.log(id);
  };

  // const handleRestaurantSelect = async (id) => {
  //   // console.log('sent id ', restaurants)
  //   navigate(`/restaurants/${id}`)
  // };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Telephone</th>
            <th scope="col">Address</th>
            <th scope="col">Country</th>
            <th scope="col">Note</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* restaurants && check if restaurants exist, then run code */}
          {clients &&
            clients.map((client) => {
              return (
                <tr key={client.client_id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.telephone}</td>
                  <td>{client.address}</td>
                  <td>{client.country}</td>
                  <td>{client.note}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, client.client_id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
