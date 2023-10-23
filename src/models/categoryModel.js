const db = require("../../db/config.js");

const categoryModel = {};

categoryModel.getAllCategory = (callback) => {
  return db.all(`SELECT * FROM categories`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

categoryModel.getById = (id, callback) => {
  return db.all(`SELECT * FROM categories WHERE id ='${id}'`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

categoryModel.create = (data, callback) => {
  db.run(
    `INSERT INTO categories (name) VALUES('${data.name}')`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

categoryModel.updateCategory = (id, data, callback) => {
  db.run(
    `UPDATE categories SET name ='${data.name}', updated_at = CURRENT_TIMESTAMP WHERE id= '${id}'`,
    (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

categoryModel.deleteCategoryById = (id, callback) => {
  db.run(`DELETE FROM categories WHERE id ='${id}'`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

module.exports = categoryModel;
