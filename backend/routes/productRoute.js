const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getAllProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUsed, authorizeRoles } = require("../middleware/auth");


const router = express.Router();

router.route("/products").get(isAuthenticatedUsed, getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUsed, authorizeRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUsed, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUsed, authorizeRoles("admin"), deleteProduct)
.get(getAllProductDetails)
router.route("/review").put(isAuthenticatedUsed, createProductReview)
router.route("reviews").get(getProductReviews).delete(isAuthenticatedUsed,deleteReview)


// router.route("/product/delete/:id").delete(deleteProduct)
// router.route("/product/update/:id").delete(updateProduct)
// router.route("/product/getProductById/:id").delete(getAllProductDetails)

module.exports = router