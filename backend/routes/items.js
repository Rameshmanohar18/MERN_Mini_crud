


const express = require("express");
const router = express.Router();
const db = require("../db");

const handleDbError = (res, action, err) => {
  console.error(`Database error while ${action}:`, err.message);

  return res.status(500).json({
    message: `Database error while ${action}`,
    code: err.code,
    sqlMessage: err.sqlMessage || err.message,
  });
};

/*
==================================
CREATE PURCHASE WITH MANY ITEMS
==================================
*/

router.post("/", (req, res) => {
  const { purchase_date, items } = req.body;

  if (!purchase_date) {
    return res.status(400).json({
      message: "Purchase date is required",
    });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: "At least one item required",
    });
  }

  db.query(
    "INSERT INTO purchases (purchase_date) VALUES (?)",
    [purchase_date],
    (err, purchaseResult) => {
      if (err) {
        return handleDbError(res, "creating purchase", err);
      }

      const purchaseId = purchaseResult.insertId;

      const values = [];

      for (let item of items) {
        if (!item.name || !item.item_type_id) {
          return res.status(400).json({
            message: "Item name and type required",
          });
        }

        values.push([
          purchaseId,
          item.name,
          item.stock_available || false,
          item.item_type_id,
        ]);
      }

      const sql = `
        INSERT INTO items
        (purchase_id, name, stock_available, item_type_id)
        VALUES ?
      `;

      db.query(sql, [values], (err2, result2) => {
        if (err2) {
          return handleDbError(res, "adding items", err2);
        }

        res.status(201).json({
          message: "Purchase and items added successfully",
        });
      });
    }
  );
});

/*
==================================
GET ITEMS WITH JOIN
==================================
*/

router.get("/", (req, res) => {
  const sql = `
    SELECT
      items.id,
      items.name,
      purchases.purchase_date,
      items.stock_available,
      items.item_type_id,
      item_types.type_name
    FROM items
    JOIN purchases
      ON items.purchase_id = purchases.id
    JOIN item_types
      ON items.item_type_id = item_types.id
    ORDER BY items.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return handleDbError(res, "fetching items", err);
    }

    res.json(result);
  });
});

/*
==================================
UPDATE ITEM
==================================
*/

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    name,
    stock_available,
    item_type_id,
  } = req.body;

  if (!name || !item_type_id) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  const sql = `
    UPDATE items
    SET
      name=?,
      stock_available=?,
      item_type_id=?
    WHERE id=?
  `;

  db.query(
    sql,
    [name, stock_available, item_type_id, id],
    (err, result) => {
      if (err) {
        return handleDbError(res, "updating item", err);
      }

      res.json({
        message: "Item updated successfully",
      });
    }
  );
});

/*
==================================
DELETE ITEM
==================================
*/

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM items WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return handleDbError(res, "deleting item", err);
      }

      res.json({
        message: "Item deleted successfully",
      });
    }
  );
});

module.exports = router;
