const { Server } = require("socket.io");

let io;

/**
 * Initialize Socket.IO server
 */
function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });

    // Handle custom events if needed
    socket.on("join-emergency", (emergencyId) => {
      socket.join(emergencyId);
      console.log(`🔗 Socket ${socket.id} joined emergency ${emergencyId}`);
    });
  });

  return io;
}

/**
 * Emit emergency update to all connected clients
 */
function emitEmergencyUpdate(data) {
  if (io) {
    io.emit("emergency-update", data);
    console.log("📡 Emergency update sent to clients:", data.id || "unknown");
  } else {
    console.warn("⚠️ Socket.IO not initialized");
  }
}

/**
 * Emit to specific emergency room
 */
function emitToEmergency(emergencyId, event, data) {
  if (io) {
    io.to(emergencyId).emit(event, data);
    console.log(`📡 Event '${event}' sent to emergency ${emergencyId}`);
  }
}

module.exports = {
  initSocket,
  emitEmergencyUpdate,
  emitToEmergency,
};