const express = require("express")
const app= express()
const cors = require('cors')
const http = require("http").createServer(app)

const PORT = process.env.PORT || 5000

// app.use(cors());0

http.listen(PORT , ()=>{
    console.log("Listening to the port ${PORT}")
})

app.use(express.static(__dirname + '/Public'))

app.get('/' , (req , res) => {
     res.status(200).sendFile(__dirname + '/index.html')
})

// app.listen(PORT, ()=>{
//     console.log(`Listening to the port ${PORT}`);
// })

app.get('/' , (req , res) => {
        res.status(200).sendFile(__dirname + '/index.html')
})

const io = require('socket.io')(http)

io.on('connection' , (socket)=>{
    console.log('Connected...')
    socket.on('message' , (msg)=>{
        socket.broadcast.emit('message' , msg)
    })
})