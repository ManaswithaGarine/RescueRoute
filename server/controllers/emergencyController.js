const { emitEmergencyUpdate } = require("../sockets/rescueSocket");

// In-memory storage for demo
const emergencies = [];

/**
 * POST /api/emergency
 * Trigger a new emergency
 */
async function triggerEmergency(req, res) {
  try {
    const { location, patientInfo, severity } = req.body;

    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({
        error: "Location (lat, lng) is required",
      });
    }

    const emergency = {
      id: `EMG-${Date.now()}`,
      location,
      patientInfo: patientInfo || {},
      severity: severity || "MEDIUM",
      status: "ACTIVE",
      timestamp: new Date().toISOString(),
      ambulanceId: null,
      hospitalId: null,
    };

    emergencies.push(emergency);

    // Emit to all connected clients via Socket.IO
    emitEmergencyUpdate(emergency);

    console.log(`🚨 Emergency triggered: ${emergency.id}`);

    res.status(201).json({
      success: true,
      emergency,
      message: "Emergency triggered successfully",
    });
  } catch (error) {
    console.error("Error triggering emergency:", error);
    res.status(500).json({
      error: "Failed to trigger emergency",
      details: error.message,
    });
  }
}

/**
 * GET /api/emergency/:id
 * Get emergency details
 */
async function getEmergency(req, res) {
  try {
    const { id } = req.params;
    const emergency = emergencies.find((e) => e.id === id);

    if (!emergency) {
      return res.status(404).json({ error: "Emergency not found" });
    }

    res.json(emergency);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch emergency",
      details: error.message,
    });
  }
}

/**
 * GET /api/emergency
 * Get all active emergencies
 */
async function getAllEmergencies(req, res) {
  try {
    const activeEmergencies = emergencies.filter((e) => e.status === "ACTIVE");
    res.json({
      count: activeEmergencies.length,
      emergencies: activeEmergencies,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch emergencies",
      details: error.message,
    });
  }
}

module.exports = {
  triggerEmergency,
  getEmergency,
  getAllEmergencies,
};