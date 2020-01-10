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
  // const safeJoin = currentId => {
  //   socket.leave(previousId);
  //   socket.join(currentId);
  //   previousId = currentId;
  // };
  // Register "join" events, requested by a connected client
  socket.on("join", function (room, username) {
    // join channel provided by client
    socket.join(room)
    socket.room = room;
    socket.username = username;
    socket.broadcast.to(socket.room).emit("chat", '🔵 <i>' + socket.username + ' join the chat..</i>');
    // Register "image" events, sent by the client
    // socket.on("image", function (msg) {
    //   console.log(msg)
    //   // Broadcast the "image" event to all other clients in the room
    //   socket.broadcast.to(room).emit("image", msg);
    // });
    // socket.on("text", function (msg) {
    //   console.log(room)
    //   // Broadcast the "image" event to all other clients in the room
    //   socket.broadcast.to(room).emit("text", msg);
    // });
  });
  socket.on("chat", function (msg) {
    // console.log(room)
    // Broadcast the "image" event to all other clients in the room
    socket.broadcast.to(socket.room).emit("chat", '<strong style="text-transform:uppercase">' + socket.username + '</strong>: ' + msg);
  })
  socket.on("image", function (msg) {
    socket.broadcast.to(socket.room).emit("image", msg);
  });
  socket.on('disconnect',function(un){
    socket.broadcast.to(socket.room).emit("chat", '🔴 <i>' + socket.username + ' left the chat..</i>');
  })
  socket.on('leave',function(un){
    socket.leave(socket.username);
  })

  // socket.on("getDoc", function (docId) {
  //   safeJoin(docId);
  //   socket.emit("document", documents[docId]);
  // })
});
/////PEER/////
// const PORT1 = process.env.PORT || 9000;
// const app = express();
// const { ExpressPeerServer } = require('peer');

// app.get('/', (req, res, next) => { res.send('Hello world!'); });

// // =======

// const server1 = app.listen(PORT1);

// const options = {
//   debug: true
// }

// const peerserver = ExpressPeerServer(server1, options);
// peerserver.on('connection', function (id) {
//   console.log(id);
// })
// app.use('/api', peerserver);
