// Import packages
const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

// Configuration
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

// Start server
const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log("Listening on localhost:" + PORT));

// Initiatlize SocketIO
const io = socketIO(server);

// Register "connection" events to the WebSocket
io.on("connection", function (socket) {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };
  // Register "join" events, requested by a connected client
  socket.on("getDoc", function (room) {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  })
  socket.on("addDoc", function (room) {
    documents[doc.order.details.id] = doc;
    safeJoin(doc.id);
    socket.emit("document", doc);
  })
  socket.on("editDoc", function (room) {
    documents[doc.order.details.id] = doc;
    socket.to(doc.id).emit("document", doc);
  })
  socket.on("changeSts", function (room) {
    orders[doc.Id] = doc;
    io.emit("Orders", Object.values(orders));
  })
  socket.on("Orders", function (room) {
    orders[doc.Id] = doc;
    io.emit("Orders", Object.values(orders));
  })
  io.emit("Orders", Object.values(orders));
  io.emit("documents", Object.values(documents));
});