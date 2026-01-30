const express = require("express");
const router = express.Router();
const {
  triggerEmergency,
  getEmergency,
  getAllEmergencies,
} = require("../controllers/emergencyController");

// POST /api/emergency - Trigger new emergency
router.post("/", triggerEmergency);

// GET /api/emergency/:id - Get specific emergency
router.get("/:id", getEmergency);

// GET /api/emergency - Get all active emergencies
router.get("/", getAllEmergencies);

module.exports = router;