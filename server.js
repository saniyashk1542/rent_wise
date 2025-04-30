// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch(err => {
    console.error("❌ Database Connection Error:", err.message);
    process.exit(1);
  });

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const visitRoutes = require("./routes/visitRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const listingRoutes = require("./routes/listingRoutes");
const leaseRoutes = require("./routes/leaseRoutes");
const rentRoutes = require("./routes/rentRoutes");
const supportRoutes = require("./routes/supportRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/lease", leaseRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/admin", adminRoutes); // ✅ Properly linked admin routes

// Base API Route
app.get("/", (req, res) => {
  res.send("🚀 Rental Management API is running...");
});

// Handle 404 Errors
app.use((req, res, next) => {
  res.status(404).json({ error: "❌ Route Not Found" });
});

// Handle Internal Server Errors
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: "❌ Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});