const router = require("express").Router();
const db = require("../db/index.js");
const authorization = require("../middleware/authorization.js");

let current_date = new Date();
// get all order products
router.get("/:id", authorization, async (req, res) => {
  try {
    const order_products = await db.query(
      "select * from client_order_details where order_id=$1 and user_id =$2;",
      [req.params.id, req.user.id]
    );

    // console.log(restaurant.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        order_products: order_products.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// add products
router.post("/:id/addProduct", authorization, async (req, res) => {
  console.log(req.body);
  try {
    const newProduct = await db.query(
      "INSERT INTO client_order_details (user_id,order_id, product_id, box_quantity, piece_sell_price) values ($1, $2, $3, $4, $5) returning *",
      [
        req.user.id,
        req.params.id,
        req.body.product_id,
        req.body.box_quantity,
        req.body.piece_sell_price,
      ]
    );

    // console.log(newReview.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        product: newProduct.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
