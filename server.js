const io = require("socket.io");
const express = require("express");
const http = require("http");
require("dotenv").config();

const Datastore = require('nedb');

const app = express()
const server = http.createServer(app)
const sockets = io(server)

let database = new Datastore("messages.db");
database.loadDatabase();

app.use(express.static('public'))

let index = 0;

sockets.on("connection", socket => {
    database.find({}, (err, data) => {
        socket.emit("database", data);
    })

    console.log("CONECTED");
    socket.emit("chat-message", "Hello Socket!");
    socket.on("send-chat-message", (message) => {
        database.insert({message: socket.id + ": " + message});
        socket.broadcast.emit("chat-message", "Someone: " + message);
    })

    socket.on("destroyDatabase", (data) => {
        database.remove({index: data});
    })
})

server.listen(process.env.PORT || 3000, () => {
    console.log(`> Server listening on port: 3000`)
})