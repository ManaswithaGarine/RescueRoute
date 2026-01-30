const http = require("http");
const app = require("./app");
const { initSocket } = require("./sockets/rescueSocket");

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 RescueRoute Server running on port ${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🔌 Socket.IO ready for connections`);
});