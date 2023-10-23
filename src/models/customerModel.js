const db = require("../../db/config.js");

const customerModel = {};

// get all customer
customerModel.getAllCustomer = (callback) => {
  db.all("SELECT * FROM customer", (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
// get customer by id
customerModel.getCustomerById = (id, callback) => {
  db.all(`SELECT * FROM customer WHERE id = '${id}'`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
// create customer
customerModel.create = (data, callback) => {
  return db.run(
    `INSERT INTO customer (name,address,email) VALUES('${data.name}', '${data.address}', '${data.email}')`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};
//delete by id
customerModel.deleteById = (id, callback) => {
  db.run(`DELETE FROM customer WHERE id = '${id}'`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
// update customer
customerModel.updateCustomer = (id, data, callback) => {
  db.run(
    `UPDATE customer 
  SET name = '${data.name}', address = '${data.address}', email = '${data.email}', updated_at = CURRENT_TIMESTAMP
  WHERE id = '${id}'`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

module.exports = customerModel;
