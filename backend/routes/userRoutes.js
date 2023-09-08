const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/usreController");
const router = express.Router();
const { isAuthenticatedUsed, authorizeRoles } = require("../middleware/auth");


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticatedUsed, getUserDetails)
router.route("/password/update").put(isAuthenticatedUsed, updatePassword)
router.route("/me/update").put(isAuthenticatedUsed, updateProfile)
router.route("/admin/users").get(isAuthenticatedUsed, authorizeRoles("admin","user"), getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUsed, authorizeRoles("admin"), getSingleUser)
router.route("/admin/update/:id").put(isAuthenticatedUsed, authorizeRoles("admin"), updateUserRole)
router.route("/admin/delete/:id").delete(isAuthenticatedUsed, authorizeRoles("admin"), deleteUser)

module.exports = router;