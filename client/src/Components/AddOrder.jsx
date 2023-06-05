import React, { useContext, useState} from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddOrder = ({clients}) => {
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const { addClientOrders } = useContext(RestaurantsContext);


  const handleNameChange = (e) => {
    const selectedClient = clients.find(
      (client) => client.client_id === e.target.value
    );
    setName(selectedClient ? selectedClient.name : e.target.value);
    setClientId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(clientId);
    // console.log("im the client id: ",e.target)
    try {
      const response = await RestaurantFinder.post(
        "/api/v1/client_orders",
        {
          clientId
        },
        {
          headers: { token: localStorage.token },
        }
      );
      // add client name since not coming from server
      response.data.data.client_order.client_name = name;
      addClientOrders(response.data.data.client_order);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>

            <input list='browsers'
              value={name}
              onChange={handleNameChange}
              type="text"
              className="form-control"
              placeholder="Client Name"
            />
            <datalist id="browsers">
              {clients &&
              clients.map((client) => {
                return (
                  <option key={client.client_id} value={client.client_id}>
                    {client.name}
                  </option>
                );
              })}
            </datalist>
            
          </div>
          <div className="col-5 ml-3">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
              style={{ width: 100 }}
            >
              Add Order
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddOrder;
