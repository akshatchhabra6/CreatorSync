require("dotenv").config();

// DNS Fix
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const creatorRoutes = require("./routes/creatorRoutes");
const brandRoutes = require("./routes/brandRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/creators", creatorRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/applications", applicationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

// Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });

module.exports = app;