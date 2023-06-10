import React from "react";

const OrderProducts = ({ orderProducts }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {orderProducts.map((orderProduct) => {
        return (
          <div
            key={orderProduct.order_detail_id}
            className="card text-white bg-primary mb-3 mr-4"
            style={{ width: "30%" }}
          >
            <div className="card-header d-flex justify-content-between">
              <span>box quantity: {orderProduct.box_quantity}</span>
              <span>Piece sell price: {orderProduct.piece_sell_price}</span>
            </div>
            <div className="card-body">
              <p className="card-text">product ID: {orderProduct.product_id}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderProducts;
