const router = require("express").Router();
const db =require("../db/index.js");
const authorization = require("../middleware/authorization.js");

let current_date = new Date();
// get all orders
router.get("/", authorization, async (req, res) => {
    try {
    
      const products = await db.query("select * from products where user_id=$1;",
      [req.user.id]);
  
      // console.log(restaurant.rows[0]);
      res.status(200).json({
        status: "Success",
        data: {
          products: products.rows
        },
      });
    } catch (err) {
      console.log(err);
    }
  });


// // get a client
// router.get("/:id", async (req, res) => {
//     try {
//         // sql injections protection
//         // console.log(req.params.id);
//         const results = await db.query(
//         "select * from clients where client_id = $1;",
//         [req.params.id]
//         );
    
//         // console.log(req.params.id);
//         res.status(200).json({
//         status: "Success",
//         data: {
//             client: results.rows[0],
//         },
//         });
//     } catch (err) {
//         console.log(err);
//     }
//     });

// create a product
router.post("/", authorization, async (req, res) => {
    try {
    // sql injections protection
    const results = await db.query(
        "INSERT INTO products (user_id, product_reference_id, product_name, type_id, sub_type_id, factory_id, unit_cost, current_box_quantity, pack_per_box, pieces_per_pack, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *",
        [req.user.id, req.body.product_reference_id, req.body.product_name, req.body.type_id, req.body.sub_type_id, req.body.factory_id, req.body.unit_cost, req.body.current_box_quantity, req.body.pack_per_box, req.body.pieces_per_pack, current_date, current_date]
    );

    // console.log(results.rows[0]);
    res.status(200).json({
        status: "Success",
        data: {
        product: results.rows[0],
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

  module.exports= router;
