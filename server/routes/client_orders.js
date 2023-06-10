const router = require("express").Router();
const db = require("../db/index.js");
const authorization = require("../middleware/authorization.js");

let current_date = new Date();
// get all orders
router.get("/", authorization, async (req, res) => {
  try {
    const orders = await db.query(
      "select o.*, c.name as client_name from client_orders o left join clients c on c.client_id = o.client_id where c.user_id=$1;",
      [req.user.id]
    );

    // console.log(restaurant.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        orders: orders.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get an order
router.get("/:id", async (req, res) => {
  try {
    // sql injections protection
    // console.log(req.params.id);
    const results = await db.query(
      "select client_orders.*, clients.name from client_orders left join clients on clients.client_id = client_orders.client_id where order_id = $1;",
      [req.params.id]
    );

    // console.log(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        order: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create a client order
router.post("/", authorization, async (req, res) => {
  try {
    // sql injections protection
    const results = await db.query(
      "INSERT INTO client_orders (user_id, client_id, created_at, updated_at, status_id, status_name ) VALUES ($1, $2, $3, $4, $5, $6) returning *",
      [
        req.user.id,
        req.body.clientId,
        current_date,
        current_date,
        "1",
        "created",
      ]
    );

    // console.log(results.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        client_order: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//   // update client
//   router.put("/:id", async (req, res) => {
//     try {
//       // sql injections protection
//       const results = await db.query(
//         "UPDATE clients SET name = $1, email = $2, telephone = $3, address = $4, country = $5, note = $6 where client_id = $7 returning *",
//         [req.body.name, req.body.email, req.body.telephone, req.body.address, req.body.country, req.body.note, req.params.id]
//       );

//       // console.log(results.rows[0]);
//       res.status(200).json({
//         status: "Success",
//         data: {
//             client: results.rows[0],
//         },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   });

module.exports = router;
