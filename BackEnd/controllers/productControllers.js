const db = require("../config/db");

const getAllProducts = (req, res) => {

  const sql =
    "SELECT * FROM products";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }
    
   const products = result.map(product => {

  return {
    ...product,
    imageUrl: product.image
      ? `http://localhost:${process.env.PORT}/uploads/${product.image}`
      : null
  };

});

    res.json({
      success: true,
      products: products
    });

  });

};

const getProductById = (req, res) => {

  const { id } = req.params;

  const sql =
    "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan"
      });
    }

    const product = {
  ...result[0],
  imageUrl: result[0].image
    ? `http://localhost:${process.env.PORT}/uploads/${result[0].image}`
    : null
};
    res.json({
      success: true,
      product: product
    });

  });

};

const createProduct = (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    image
  } = req.body;

  let imageName = image || null;
  if (image && image.startsWith("data:image/")) {
    try {
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1].split("/")[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `${Date.now()}-uploaded.${ext}`;
        const filepath = require("path").join(__dirname, "../uploads", filename);
        require("fs").writeFileSync(filepath, buffer);
        imageName = filename;
      }
    } catch (err) {
      console.warn("Write to filesystem failed, storing image string directly:", err.message);
      imageName = image;
    }
  }

  const sql = `
    INSERT INTO products
    (
      name,
      description,
      price,
      stock,
      category,
      image
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      description,
      price,
      stock,
      category,
      imageName
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Produk berhasil ditambahkan",
        productId: result.insertId
      });
    }
  );
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    stock,
    category,
    image
  } = req.body;

  let imageName = image !== undefined ? image : null;
  if (image && typeof image === "string" && image.startsWith("data:image/")) {
    try {
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1].split("/")[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `${Date.now()}-uploaded.${ext}`;
        const filepath = require("path").join(__dirname, "../uploads", filename);
        require("fs").writeFileSync(filepath, buffer);
        imageName = filename;
      }
    } catch (err) {
      console.warn("Write to filesystem failed, storing image string directly:", err.message);
      imageName = image;
    }
  }

  let sql;
  let params;

  if (imageName !== undefined && imageName !== null && imageName !== "") {
    sql = `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        category = ?,
        image = ?
      WHERE id = ?
    `;
    params = [name, description, price, stock, category, imageName, id];
  } else {
    sql = `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        category = ?
      WHERE id = ?
    `;
    params = [name, description, price, stock, category, id];
  }

  db.query(
    sql,
    params,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Produk tidak ditemukan"
        });
      }

      res.json({
        success: true,
        message: "Produk berhasil diperbarui"
      });
    }
  );
};

const deleteProduct = (req, res) => {

  const { id } = req.params;

  const sql =
    "DELETE FROM products WHERE id = ?";

  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Produk tidak ditemukan"
        });
      }

      res.json({
        success: true,
        message: "Produk berhasil dihapus"
      });

    }
  );

};

const uploadProductImage = (req, res) => {

  if (!req.file) {

    return res.status(400).json({
      success: false,
      message: "File tidak ditemukan"
    });

  }

  res.json({
    success: true,
    message: "Upload berhasil",
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });

};

const updateProductImage = (req, res) => {

  const { id } = req.params;

  if (!req.file) {

    return res.status(400).json({
      success: false,
      message: "File tidak ditemukan"
    });

  }

  const imageName =
    req.file.filename;

  const sql = `
    UPDATE products
    SET image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [imageName, id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        message:
          "Gambar produk berhasil diperbarui",
        filename: imageName
      });

    }
  );

};

// GET /products/latest - 8 produk terbaru
const getLatestProducts = (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const sql = `SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC LIMIT ?`;

  db.query(sql, [limit], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    const products = result.map(p => ({
      ...p,
      imageUrl: p.image ? `http://localhost:${process.env.PORT}/uploads/${p.image}` : null
    }));

    res.json({ success: true, products });
  });
};

// GET /products/featured - produk terlaris (sold terbanyak)
const getFeaturedProducts = (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const sql = `SELECT * FROM products WHERE status = 'active' ORDER BY sold DESC LIMIT ?`;

  db.query(sql, [limit], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    const products = result.map(p => ({
      ...p,
      imageUrl: p.image ? `http://localhost:${process.env.PORT}/uploads/${p.image}` : null
    }));

    res.json({ success: true, products });
  });
};

// GET /products/category/:category
const getProductsByCategory = (req, res) => {
  const { category } = req.params;
  const sql = `SELECT * FROM products WHERE (category = ? OR category_id = ?) AND status = 'active' ORDER BY created_at DESC`;

  db.query(sql, [category, category], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    const products = result.map(p => ({
      ...p,
      imageUrl: p.image ? `http://localhost:${process.env.PORT}/uploads/${p.image}` : null
    }));

    res.json({ success: true, products });
  });
};

// GET /products/seller/:sellerId
const getProductsBySellerRoute = (req, res) => {
  const { sellerId } = req.params;
  const sql = `SELECT * FROM products WHERE seller_id = ? ORDER BY created_at DESC`;

  db.query(sql, [sellerId], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    const products = result.map(p => ({
      ...p,
      imageUrl: p.image ? `http://localhost:${process.env.PORT}/uploads/${p.image}` : null
    }));

    res.json({ success: true, products });
  });
};

// GET /products/search?q=keyword
const searchProducts = (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ success: true, products: [] });

  const keyword = `%${q}%`;
  const sql = `SELECT * FROM products WHERE (name LIKE ? OR description LIKE ? OR category LIKE ?) AND status = 'active' ORDER BY created_at DESC LIMIT 20`;

  db.query(sql, [keyword, keyword, keyword], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    const products = result.map(p => ({
      ...p,
      imageUrl: p.image ? `http://localhost:${process.env.PORT}/uploads/${p.image}` : null
    }));

    res.json({ success: true, products });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  uploadProductImage,
  updateProduct,
  deleteProduct,
  updateProductImage,
  getLatestProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsBySellerRoute,
  searchProducts
};
