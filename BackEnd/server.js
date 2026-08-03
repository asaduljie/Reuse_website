const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const db = require("./config/db");
const {
  apiLimiter,
  authLimiter,
  sanitizeInput,
  hppMiddleware,
} = require("./middleware/securityMiddleware");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Disable Server Identification Header
app.disable("x-powered-by");

// 1. Helmet HTTP Security Headers (Clickjacking, HSTS, NoSniff, XSS Protection)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // Managed at gateway/frontend level
  })
);

// 2. Strict CORS Configuration
const allowedOrigins = [
  "https://reuse.my.id",
  "https://www.reuse.my.id",
  "http://localhost:3000",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("CORS Policy: Access denied from unauthorized origin."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// 3. Body Parser Limits (Limits payload size to prevent RAM overflow attacks)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// 4. HTTP Parameter Pollution Protection & Input Sanitization
app.use(hppMiddleware);
app.use(sanitizeInput);

// 5. Global API Rate Limiter
app.use("/api/", apiLimiter);

// Static Uploads Serving
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Routes
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "ReUse Secure API Platform Running",
    timestamp: new Date().toISOString(),
  });
});

// Apply strict rate limiting to auth routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Global 404 & Error Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan." });
});

app.use((err, req, res, next) => {
  console.error("Internal Security/Server Error:", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Terjadi kesalahan pada server." : err.message,
  });
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🔒 ReUse Secure Server running on port ${port}`);
  });
}

module.exports = app;