const express=require("express");
const router = express.Router();
const { isAuthenticatedUsed, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, getMyOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");



router.route("/order/new").post(isAuthenticatedUsed,newOrder);
router.route("/order/:id").get(isAuthenticatedUsed,authorizeRoles("admin"),getSingleOrder);
router.route("/orders").get(isAuthenticatedUsed,getMyOrder);
router.route("/admin/orders").get(isAuthenticatedUsed,authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUsed,authorizeRoles("admin"),updateOrder);
router.route("/admin/order/:id").delete(isAuthenticatedUsed,authorizeRoles("admin"),deleteOrder);

module.exports = router;