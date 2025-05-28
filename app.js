

const express = require('express');
const app = express();
const path = require("path");
const http = require("http"); 
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Set EJS as the view engine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));



io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send-location", ({ latitude, longitude }) => {
        io.emit("receive-location", {
            id: socket.id,
            latitude,
            longitude
        });
    });
    
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    });
});


// Render index.ejs on root route
app.get("/", function(req, res){
    res.render("index");
});


server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
