const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus
} = require("../controllers/orderControllers");

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
