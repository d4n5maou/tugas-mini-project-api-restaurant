const express = require("express");
const menuController = require("../controllers/menuController");
const customerController = require("../controllers/customerController.js");
const categoryController = require("../controllers/categoryController.js");
const orderController = require("../controllers/orderController");
const router = express.Router();

// menu
router.get("/menus", menuController.getAll);
router.get("/menu/:id", menuController.getMenuById);
router.post("/menu/create", menuController.create);
router.delete("/menu/delete/:id", menuController.deleteMenuById);
router.put("/menu/update/:id", menuController.updateMenu);
// pelanggan
router.get("/customers", customerController.getAllCustomer);
router.get("/customer/:id", customerController.getCustomerById);
router.post("/customer/create", customerController.create);
router.delete("/customer/delete/:id", customerController.deleteById);
router.put("/customer/update/:id", customerController.updateCustomer);
// kategori
router.get("/categories", categoryController.getAllCategory);
router.get("/category/:id", categoryController.getById);
router.post("/category/create", categoryController.create);
router.put("/category/update/:id", categoryController.updateCategory);
router.delete("/category/delete/:id", categoryController.deleteById);
// order
router.post("/order/create", orderController.createOrder);
router.delete("/orders/delete", orderController.reset);
router.get("/orders", orderController.getAll);
router.get("/order/history", orderController.history);

module.exports = router;
