const categoryModel = require("../models/categoryModel.js");

const categoryController = {};

categoryController.getAllCategory = (req, res) => {
  categoryModel.getAllCategory((error, category) => {
    if (error) {
      console.log("Error Message: ", error);
      return res.json({
        message: `terjadi kesalahan saat mengambil data kategori!`,
      });
    }
    res.json({
      status: "OK",
      data: category,
    });
  });
};

categoryController.getById = (req, res) => {
  categoryModel.getById(req.params.id, (error, category) => {
    if (error) {
      console.log("Error Message: ", error);
      return res.json({
        message: `terjadi kesalahan saat mengambil data kategori dengan id ${req.params.id}!`,
      });
    }
    res.json({
      status: "OK",
      data: category,
    });
  });
};

categoryController.create = (req, res) => {
  const { name } = req.body;
  if (typeof name === "string" && name.length > 0) {
    categoryModel.create(req.body, (error, category) => {
      if (error) {
        console.log("Error Message: ", error);
        return res.json({
          message: `terjadi kesalahan saat menambah data kategori!`,
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
};

categoryController.updateCategory = (req, res) => {
  categoryModel.updateCategory(req.params.id, req.body, (error, category) => {
    if (error) {
      console.log("Error Message: ", error);
      return res.json({
        message: `terjadi kesalahan saat mengubah data kategori dengan id ${req.params.id}!`,
      });
    }
    res.json({
      status: "OK",
      message: `kategori dengan id ${req.params.id} berhasil diperbarui!`,
    });
  });
};

categoryController.deleteById = (req, res) => {
  categoryModel.deleteCategoryById(req.params.id, (error, category) => {
    if (error) {
      console.log("Error Message: ", error);
      return res.json({
        message: `terjadi kesalahan saat menghapus data kategori dengan id ${req.params.id}!`,
      });
    }
    res.json({
      status: "OK",
      message: `kategori dengan id ${req.params.id} berhasil dihapus!`,
    });
  });
};

module.exports = categoryController;
