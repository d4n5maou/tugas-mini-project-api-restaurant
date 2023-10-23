const customerModel = require("../models/customerModel.js");

const customerController = {};

customerController.getAllCustomer = (req, res) => {
  customerModel.getAllCustomer((error, customer) => {
    if (error) {
      console.log("Error message: ", error);
      return res.json({
        message: "terjadi kesalahan saat mengambil data customer!",
      });
    }
    res.json({
      status: "OK",
      data: customer,
    });
  });
};

customerController.getCustomerById = (req, res) => {
  customerModel.getCustomerById(req.params.id, (error, customer) => {
    if (error) {
      console.log("Error message: ", error);
      return res.json({
        message: `terjadi kesalahan saat mengambil data customer dengan id ${req.params.id}`,
      });
    }
    res.json({
      status: "OK",
      data: customer,
    });
  });
};

customerController.create = (req, res) => {
  const { name, email } = req.body;

  if (typeof name === "string" && typeof email === "string") {
    if (name.length > 0 && email.length > 0) {
      customerModel.create(req.body, (error, customer) => {
        if (error) {
          console.log("Error message: ", error);
          return res.json({
            message: `terjadi kesalahan saat menambah data customer dengan!`,
          });
        }
        res.json({
          status: "OK",
          message: "Data Berhasil Ditambahkan",
        });
      });
    } else {
      res.json({
        status: "Error",
        message: "Data Gagal Ditambahkan",
      });
    }
  } else {
    res.json({
      status: "Error",
      message: "Data Gagal Ditambahkan",
    });
  }
};

customerController.deleteById = (req, res) => {
  customerModel.deleteById(req.params.id, (error, customer) => {
    if (error) {
      console.log("Error message: ", error);
      return res.json({
        message: `terjadi kesalahan saat menghapus data customer dengan id ${req.params.id}!`,
      });
    }
    res.json({
      status: "OK",
      message: `customer dengan id ${req.params.id} berhasil dihapus!`,
    });
  });
};

customerController.updateCustomer = (req, res) => {
  customerModel.updateCustomer(req.params.id, req.body, (error, customer) => {
    if (error) {
      console.log("Error message: ", error);
      return res.json({
        status: "Error",
        message: `terjadi kesalahan saat mengubah data customer dengan id ${req.params.id}!`,
      });
    }
    res.json({
      status: "OK",
      message: `customer dengan id ${req.params.id} berhasil diperbarui!`,
    });
  });
};

module.exports = customerController;
