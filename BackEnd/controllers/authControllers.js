const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const normalizeRole = (role) => {
  if (!role) return "customer";

  const normalized = String(role).trim().toLowerCase();
  const validRoles = ["customer", "seller", "admin", "super_admin", "user"];

  if (normalized === "user") return "customer";
  if (normalized === "admin") return "admin";
  if (normalized === "seller") return "seller";
  if (normalized === "super_admin") return "super_admin";
  if (normalized === "customer") return "customer";

  return "customer";
};

// TEST ROUTE
const testAuth = (req, res) => {
  res.json({
    success: true,
    message: "Auth Controller Working"
  });
};

// REGISTER
const register = (req, res) => {

  const { name, email, password, phone, role } = req.body;
  const userRole = normalizeRole(role);

  const checkEmail =
    "SELECT * FROM users WHERE email = ?";

  db.query(checkEmail, [email], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email sudah digunakan"
      });
    }

    const hashedPassword =
      bcrypt.hashSync(password, 10);

    const sqlWithRole = `
      INSERT INTO users(name,email,password,phone,role)
      VALUES(?,?,?,?,?)
    `;

    const sqlWithoutRole = `
      INSERT INTO users(name,email,password,phone)
      VALUES(?,?,?,?)
    `;

    db.query(
      sqlWithRole,
      [name, email, hashedPassword, phone, userRole],
      (err) => {

        if (err && err.code === "ER_BAD_FIELD_ERROR") {
          return db.query(
            sqlWithoutRole,
            [name, email, hashedPassword, phone],
            (fallbackErr) => {
              if (fallbackErr) {
                return res.status(500).json({
                  success: false,
                  error: fallbackErr.message
                });
              }

              return res.status(201).json({
                success: true,
                message: "User berhasil dibuat"
              });
            }
          );
        }

        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message
          });
        }

        res.status(201).json({
          success: true,
          message: "User berhasil dibuat"
        });

      }
    );

  });

};

const login = (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan"
      });
    }

    const user = result[0];
    const userRole = normalizeRole(user.role);

    const isMatch =
      bcrypt.compareSync(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password salah"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: userRole
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: userRole
      }
    });

  });

};

const profile = (req, res) => {
  const userIdentifier = req.user?.id ?? req.user?.email;

  if (!userIdentifier) {
    return res.status(400).json({
      success: false,
      message: "Identitas user tidak valid"
    });
  }

  const sql = "SELECT id, name, email, phone, role FROM users WHERE id = ? OR email = ? LIMIT 1";

  db.query(sql, [userIdentifier, req.user?.email], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan"
      });
    }

    const user = result[0];

    res.json({
      success: true,
      message: "Profile berhasil diambil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: normalizeRole(user.role)
      }
    });
  });
};

module.exports = {
  testAuth,
  register,
  login,
  profile
};