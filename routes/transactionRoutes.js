const express = require("express");
const {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routers

//POST route || add transaction
router.post("/add-transaction", addTransaction);

//EDIT transaction route
router.post("/edit-transaction", editTransaction);

//DELETE transaction route
router.post("/delete-transaction", deleteTransaction);

//GET route || get all transaction
router.post("/get-transaction", getAllTransaction);

module.exports = router;
