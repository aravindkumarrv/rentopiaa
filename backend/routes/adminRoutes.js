const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Admin = require("../models/Admin");

// Admin registration (optional, you can run once to create admin)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.json({ message: "Admin registered successfully", admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Admin login successful", admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
