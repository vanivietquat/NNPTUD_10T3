const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");

/* ROLE */
router.post("/roles",roleController.createRole);
router.get("/roles",roleController.getAllRole);
router.get("/roles/:id",roleController.getRoleById);
router.put("/roles/:id",roleController.updateRole);
router.delete("/roles/:id",roleController.deleteRole);

/* USER */
router.post("/users",userController.createUser);
router.get("/users",userController.getAllUser);
router.get("/users/:id",userController.getUserById);
router.put("/users/:id",userController.updateUser);
router.delete("/users/:id",userController.deleteUser);

/* enable disable */
router.post("/enable",userController.enableUser);
router.post("/disable",userController.disableUser);

router.get("/roles/:id/users",userController.getUserByRole);

module.exports = router;