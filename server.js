const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

//Connect Database

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});
// io.on("connection", client => {
//   client.on("subscribeToTimer", interval => {
//     console.log("client is subscribing to timer with interval ", interval);
//     setInterval(() => {
//       client.emit("timer");
//     }, interval);
//   });
// });

app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;
io.listen(5001);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
