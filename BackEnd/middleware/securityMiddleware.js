const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// 1. Rate Limiter for general API endpoints (prevents DDoS & scraping)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak permintaan dari IP ini. Silakan coba lagi setelah 15 menit.",
  },
});

// 2. Strict Rate Limiter for Authentication & Sensitive Endpoints (prevents Brute-Force Password Guessing)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 login/register attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaaan login/registrasi. Akses dikunci sementara selama 15 menit demi keamanan.",
  },
});

// 3. Input Sanitizer against XSS Script Injection & SQL Injection Patterns
const sanitizeValue = (val) => {
  if (typeof val === "string") {
    // Strip dangerous script tags, event handlers, and malicious SQL injection keywords
    return val
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/javascript:/gi, "")
      .replace(/onerror=/gi, "")
      .replace(/onload=/gi, "")
      .replace(/--/g, "—"); // neutralize SQL comment indicators
  }
  if (typeof val === "object" && val !== null) {
    for (const key in val) {
      val[key] = sanitizeValue(val[key]);
    }
  }
  return val;
};

const sanitizeInput = (req, res, next) => {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  if (req.params) req.params = sanitizeValue(req.params);
  next();
};

module.exports = {
  apiLimiter,
  authLimiter,
  sanitizeInput,
  hppMiddleware: hpp(),
};
