const menuModel = require("../models/menuModel");

const menuController = {};

menuController.getAll = (req, res) => {
  menuModel.getAll((error, data) => {
    if (error) {
      console.log("Error Message:", error);
      return res.json({
        message: "terjadi kesalahan saat mengambil data menu!",
      });
    }
    res.json({
      status: "OK",
      data: data,
    });
  });
};

// silahkan buat varian controller lain sesuai fitur masing masing
menuController.getMenuById = (req, res) => {
  menuModel.getMenuById(req.params.id, (error, data) => {
    if (error) {
      console.log("Error Message:", error);
      return res.json({
        message: `terjadi kesalahan saat mengambil data menu dengan id ${req.params.id}!`,
      });
    } else {
      if (data.length == 1) {
        res.json({
          status: "OK",
          data: data,
        });
      } else {
        // data tidak ditemukan
        res.json({
          message: `data dengan id ${req.params.id} tidak ditemukan!`,
        });
      }
    }
  });
};

menuController.create = (req, res) => {
  const { item, price } = req.body;

  if (typeof item === "string" && !isNaN(price)) {
    if (item.length > 0 && price.length == undefined) {
      menuModel.create(req.body, (error, data) => {
        if (error) {
          console.log("Error Message:", error);
          res.json({
            status: "Error",
            message: "Terjadi kesalahan saat menambah data menu!",
          });
        } else {
          res.json({
            status: "OK",
            message: "Data berhasil ditambahkan",
            data: data,
          });
        }
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

menuController.deleteMenuById = (req, res) => {
  menuModel.deleteMenuById(req.params.id, (error, data) => {
    if (error) {
      console.log("Error Message:", error);
      return res.json({
        message: `terjadi kesalahan saat menghapus data menu dengan id ${req.params.id}!`,
      });
    }
    res.json({
      status: "OK",
      message: `Data dengan id ${req.params.id} berhasil dihapus`,
    });
  });
};
menuController.updateMenu = (req, res) => {
  menuModel.updateMenu(req.params.id, req.body, (error, data) => {
    if (error) {
      console.log("Error Message:", error);
      return res.json({
        message: `terjadi kesalahan saat mengubah data menu dengan id ${req.params.id}!`,
      });
    } else {
      res.json({
        status: "OK",
        message: `Data dengan id ${req.params.id} berhasil diperbarui!`,
      });
    }
  });
};
module.exports = menuController;
