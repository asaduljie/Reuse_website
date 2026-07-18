const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  updateProductImage,
  getLatestProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsBySellerRoute,
  searchProducts
} = require("../controllers/productControllers");

// Specific routes MUST come before /:id to avoid being swallowed
router.get("/latest", getLatestProducts);
router.get("/featured", getFeaturedProducts);
router.get("/search", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/seller/:sellerId", getProductsBySellerRoute);

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", createProduct);

router.put(
  "/:id/image",
  upload.single("image"),
  updateProductImage
);

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.post(
  "/upload",
  upload.single("image"),
  uploadProductImage
);

module.exports = router;