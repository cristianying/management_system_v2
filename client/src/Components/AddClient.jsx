import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddClient = () => {
  const { addClients } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(
        "/api/v1/clients",
        {
          name,
          email,
          telephone,
          address,
          country,
          note,
        },
        {
          headers: { token: localStorage.token },
        }
      );
      console.log(response.data.data);
      addClients(response.data.data.client);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-column container col-5">
          <div className="col input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-envelope-at"></i>
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              type="text"
              placeholder="email"
            />
          </div>
          <div className="col input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-phone"></i>
            </span>
            <input
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="form-control"
              type="text"
              placeholder="telephone"
            />
          </div>
          <div className="col input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-signpost"></i>
            </span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              type="text"
              placeholder="address"
            />
          </div>
          <div className="col input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-globe-americas"></i>
            </span>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
              type="text"
              placeholder="country"
            />
          </div>
          <div className="col mb-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="form-control"
              type="text"
              placeholder="note"
              style={{ height: 100 }}
            ></textarea>
          </div>
          <div className="col text-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
