import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  let navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/api/v1/clients/${id}`);
      console.log(response.data.data.client);
      setName(response.data.data.client.name);
      setEmail(response.data.data.client.email);
      setTelephone(response.data.data.client.telephone);
      setAddress(response.data.data.client.address);
      setCountry(response.data.data.client.country);
      setNote(response.data.data.client.note);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RestaurantFinder.put(`/api/v1/clients/${id}`, {
      name,
      email,
      telephone,
      address,
      country,
      note
    });
    // console.log(updateClient.data.data);
    navigate("/clients");
  };

  return (
    <div className='container'>
      <h1 className="text-center">Update Client</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">telephone</label>
          <input
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            id="telephone"
            className="form-control"
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            id="country"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">note</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            id="note"
            className="form-control"
            type="text"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;