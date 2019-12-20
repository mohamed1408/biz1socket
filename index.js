// Import packages
const express = require("express");
const socketIO = require("socket.io");
const path = require("path");
const bodyParser = require('body-parser');
const app1 = express();
// const APIPORT = process.env.PORT;
// app1.use(bodyParser.json({strict: false}));

// app1.get('/', (request, response) =>  response.send(`hello!`));

// app1.listen();

app1.get('/api/data', function (request, response) {
  // var postBody = request.body;
  response.send("data received");
  // postBody.order.details.accept = 0
  // var json = postBody;
  // documents[postBody.order.details.id] = json;
  // console.log(documents);
  // io.emit("documents", Object.values(documents));
  });
//   var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
//  })
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
  socket.on("join", function (room) {
    // join channel provided by client
    console.log("room")
    socket.join(room)
    // Register "image" events, sent by the client
    socket.on("image", function (msg) {
      // Broadcast the "image" event to all other clients in the room
      socket.broadcast.to(room).emit("image", msg);
    });
  })



  // socket.on("getDoc", function (docId) {
  //   safeJoin(docId);
  //   socket.emit("document", documents[docId]);
  // })
});