import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";

const AddProduct = ({ products }) => {
  const { id } = useParams();

  const [productId, setProductId] = useState("");
  const [boxQuantity, setBoxQuantity] = useState("");
  const [pieceSellPrice, setPieceSellPrice] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post(
        `/api/v1/client_order_details/${id}/addProduct`,
        {
          product_id: productId,
          box_quantity: boxQuantity,
          piece_sell_price: pieceSellPrice,
        },
        {
          headers: { token: localStorage.token },
        }
      );

      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="m-5">
      <form action="">
        <div className="form-row">
          <div className="form-group col-4">
            <label htmlFor="productId">Product Ref ID</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              id="productId"
              className="custom-select"
            >
              <option value="" disabled>
                Product Ref ID
              </option>
              {products &&
                products.map((product) => {
                  return (
                    <option key={product.product_id} value={product.product_id}>
                      {product.product_reference_id}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group col-4">
            <label htmlFor="Box Quantity">Box Quantity</label>
            <input
              value={boxQuantity}
              onChange={(e) => setBoxQuantity(e.target.value)}
              id="box_quantity"
              placeholder="> 0"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="product id">Sell Price per Piece</label>
            <input
              value={pieceSellPrice}
              onChange={(e) => setPieceSellPrice(e.target.value)}
              id="piece_sell_price"
              placeholder="> 0"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-12 text-center">
            <label></label>
            <button
              type="submit"
              onClick={handleSubmitReview}
              className="btn btn-primary"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
