import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Admin from "./models/Admin.js";

dotenv.config();
const app = express();

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// ------------------- USER ROUTES -------------------

// Register user
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login user
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ------------------- ADMIN ROUTES -------------------

// Register admin (optional)
app.post("/api/admin/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.json({ message: "Admin registered successfully", admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login admin
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Admin login successful", admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ------------------- PRODUCT ROUTES -------------------

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  deposit: Number,
  description: String,
  image: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", productSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Add product (only logged-in user)
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, deposit, description, userId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "You must be logged in to add a product" });
    }

    const product = new Product({
      name,
      category,
      price,
      deposit,
      description,
      image: req.file ? req.file.filename : null,
      userId,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

// Delete product (user or admin)
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const userHeader = req.headers.user; // logged-in user
    const adminHeader = req.headers.admin; // logged-in admin

    // Admin can delete any product
    if (adminHeader) {
      await product.deleteOne();
      return res.json({ message: "Product deleted by admin successfully" });
    }

    // Regular user can delete only their own product
    if (userHeader) {
      const user = JSON.parse(userHeader);
      if (product.userId.toString() !== user._id)
        return res.status(403).json({ message: "You can only delete your own products" });

      await product.deleteOne();
      return res.json({ message: "Product deleted successfully" });
    }

    res.status(401).json({ message: "Unauthorized: user or admin required" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
