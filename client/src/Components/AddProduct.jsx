import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddProduct = () => {
  const { addProducts } = useContext(RestaurantsContext);
  const [ProductReferenceId, setProductReferenceId] = useState("");
  const [productName, setProductName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [subTypeId, setSubTypeId] = useState("");
  const [FactoryId, setFactoryId] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [currentBoxQuantity, setCurrentBoxQuantity] = useState("");
  const [packPerBox, setPackPerBox] = useState("");
  const [piecesPerPack, setPiecesPerPack] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(
        "/api/v1/products",
        {
          product_reference_id: ProductReferenceId,
          product_name: productName,
          type_id: typeId,
          sub_type_id: subTypeId,
          factory_id: FactoryId,
          unit_cost: unitCost,
          current_box_quantity: currentBoxQuantity,
          pack_per_box: packPerBox,
          pieces_per_pack: piecesPerPack,
        },
        {
          headers: { token: localStorage.token },
        }
      );
      // console.log(response.data.data);
      addProducts(response.data.data.product);
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
            <input
              value={ProductReferenceId}
              onChange={(e) => setProductReferenceId(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Product Reference ID"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-envelope-at"></i>
            </span>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Product Name"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-phone"></i>
            </span>
            <input
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Type ID"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-signpost"></i>
            </span>
            <input
              value={subTypeId}
              onChange={(e) => setSubTypeId(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Sub Type ID"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-globe-americas"></i>
            </span>
            <input
              value={FactoryId}
              onChange={(e) => setFactoryId(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Factory ID"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-globe-americas"></i>
            </span>
            <input
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Unit Cost"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-globe-americas"></i>
            </span>
            <input
              value={currentBoxQuantity}
              onChange={(e) => setCurrentBoxQuantity(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Current Box Quantity"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-globe-americas"></i>
            </span>
            <input
              value={packPerBox}
              onChange={(e) => setPackPerBox(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Pack per Box"
            />
          </div>
          <div className="col-4 input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-globe-americas"></i>
            </span>
            <input
              value={piecesPerPack}
              onChange={(e) => setPiecesPerPack(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Pieces per Pack"
            />
          </div>
          <div className="col-11 text-right">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
              style={{ width: 100 }}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
