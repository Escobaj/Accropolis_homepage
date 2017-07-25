var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 4000
var client = new require('ioredis')()


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
    console.log('in');


    var pseudo = null;

    /**
     * Permet a l'utilisateur de se log avec un pseudo
     *
     * @param pseudo
     * @return true si le pseudo est libre, false sinon
     */

    socket.on('login', function (name) {

        console.log(name.toLowerCase());

        if (pseudo === null) {
            client.sismember('members', name.toLowerCase()).then(function(rep){
                console.log(rep);
                if (rep) {
                    console.log(false);
                    socket.emit('login', false)
                } else {
                    client.sadd('members', name.toLowerCase())
                    pseudo = name.toLowerCase();
                    socket.emit('login', true)
                }
            })
        } else {
            socket.emit('login', null);
        }
    })


    socket.on('chatMessage', function (msg) {
        io.emit('chatMessage', msg)
    })


    /**
     * Supprime l'utilisateur de la base redis
     */
    socket.on('disconnect', function (socket) {
        console.log("out");
        if (pseudo !== null){
            client.srem('members', pseudo);
            pseudo = null;
        }
    })

})

setInterval(function () {
    io.emit('serverAlert', "Yolo bitch!2");
}, 5000)

http.listen(port, function () {
    console.log('listening on *:' + port)
})
