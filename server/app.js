const express = require("express");
const cors = require("cors");

// Import routes
const emergencyRoutes = require("./routes/emergencyRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/emergency", emergencyRoutes);
app.use("/api/ambulance", ambulanceRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/traffic", trafficRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "🚑 RescueRoute API is running",
    version: "1.0.0",
    endpoints: {
      emergency: "/api/emergency",
      ambulance: "/api/ambulance",
      hospital: "/api/hospital",
      traffic: "/api/traffic",
      vehicles: "/api/vehicles",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

module.exports = app;