const orderModel = require("../models/orderModel.js");
const menuModel = require("../models/menuModel.js");
const customerModel = require("../models/customerModel.js");

const orderController = {};

orderController.createOrder = (req, res) => {
  const { customerId, items } = req.body;
  const customer_id = customerId;

  let totalOrder = 0;
  const orderPromises = [];

  const orderDate = new Date().toISOString().split("T")[0];

  items.forEach((item) => {
    const { menu, price, qty } = item;

    orderPromises.push(
      new Promise((resolve, reject) => {
        menuModel.getMenuIdByName(menu, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const menu_id = data[0].id;
            const itemTotal = price * qty;
            totalOrder += itemTotal;

            orderModel.createOrder(
              { customer_id, menu_id, qty, orderDate },
              (error, result) => {
                if (error) {
                  console.error(error);
                  reject(error);
                } else {
                  resolve({ menu_id, itemTotal });
                }
              }
            );
          }
        });
      })
    );
  });

  Promise.all(orderPromises)
    .then((results) => {
      res.json({
        status: "OK",
        message: "Data berhasil ditambahkan!",
        orders: items,
        totalOrder: totalOrder,
        orderDate: orderDate,
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({
        status: "Error",
        message: "Terjadi kesalahan dalam mengolah pesanan.",
      });
    });
};

orderController.getAll = (req, res) => {
  orderModel.getAll((error, data) => {
    if (error) {
      console.log("Error Message: ", error);
      return res.json({
        message: `terjadi kesalahan saat mengambil data orders`,
      });
    } else if (data.length == 0) {
      res.json({ message: `belum ada data order saat ini!` });
    } else {
      res.json({
        status: "OK",
        data: data,
      });
    }
  });
};

orderController.reset = (req, res) => {
  orderModel.reset((error, data) => {
    if (error) {
      console.log("Error Message: ", error);
      return res.json({
        message: `terjadi kesalahan saat mereset data order`,
      });
    }
    res.json({
      status: "OK",
      message: `berhasil mereset data order!`,
    });
  });
};

orderController.history = (req, res) => {
  orderModel.history((err, data) => {
    if (err) {
      console.log(err);
      return res.json({ message: "error" });
    }

    const response = {
      status: "OK",
      data: [],
    };

    const groupedData = {};

    data.forEach((row) => {
      const { customerName, orderDate, menu, price, qty } = row;

      if (!groupedData[customerName]) {
        groupedData[customerName] = {};
      }

      if (!groupedData[customerName][orderDate]) {
        groupedData[customerName][orderDate] = {
          orders: [],
          totalOrder: 0,
        };
      }

      const order = {
        menu,
        price,
        qty,
      };

      groupedData[customerName][orderDate].orders.push(order);
      groupedData[customerName][orderDate].totalOrder += price * qty;
    });

    for (const customerName in groupedData) {
      for (const orderDate in groupedData[customerName]) {
        response.data.push({
          customerName,
          orders: groupedData[customerName][orderDate].orders,
          totalOrder: groupedData[customerName][orderDate].totalOrder,
        });
      }
    }

    res.json(response);
  });
};

module.exports = orderController;
