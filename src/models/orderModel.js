const db = require("../../db/config.js");

const orderModel = {};

// create order
orderModel.createOrder = (data, callback) => {
  db.run(
    `INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES(
        '${data.customer_id}','${data.menu_id}','${data.qty}', '${data.orderDate}'
    )`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

// get all
orderModel.getAll = (callback) => {
  return db.all(`SELECT * FROM orders`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// reset order
orderModel.reset = (callback) => {
  return db.run(`DELETE FROM orders`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// order history
orderModel.history = (callback) => {
  return db.all(
    `SELECT customer.name AS customerName, 
            menu.item AS menu, 
            menu.price, 
            orders.qty, 
            orders.created AS orderDate
     FROM orders
     INNER JOIN customer ON orders.customer_id = customer.id
     INNER JOIN menu ON orders.menu_id = menu.id`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

module.exports = orderModel;
