const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getAllProductDetails } = require("../controllers/productController");


const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getAllProductDetails)
// router.route("/product/delete/:id").delete(deleteProduct)
// router.route("/product/update/:id").delete(updateProduct)
// router.route("/product/getProductById/:id").delete(getAllProductDetails)

module.exports = router