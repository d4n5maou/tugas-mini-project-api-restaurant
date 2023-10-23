const db = require("../../db/config");

const menuModel = {};

//get all menu
menuModel.getAll = (callback) => {
  db.all("SELECT * FROM menu", (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
// lanjutkan disini

//get menu by id
menuModel.getMenuById = (id, callback) => {
  db.all(`SELECT * FROM menu WHERE id=${id}`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// post data menu
menuModel.create = (data, callback) => {
  return db.run(
    `INSERT INTO menu (item,price) VALUES ('${data.item}','${data.price}')`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

// delete data by id
menuModel.deleteMenuById = (id, callback) => {
  db.run(`DELETE FROM menu WHERE id=${id}`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// update menu
menuModel.updateMenu = (id, data, callback) => {
  db.run(
    `UPDATE menu SET item = '${data.item}', price = '${data.price}',updated_at = CURRENT_TIMESTAMP WHERE id = '${id}'`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

menuModel.getMenuIdByName = (menu, callback) => {
  return db.all(`SELECT id FROM menu WHERE item = '${menu}'`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// menuModel.findByName = (menuName, cb) => {
//   return db.all(
//     `SELECT * FROM menu WHERE item IN ('${menuName}')`,
//     (err, rows) => {
//       if (err) {
//         cb(err, null);
//       } else {
//         cb(null, rows);
//       }
//     }
//   );
// };

module.exports = menuModel;
