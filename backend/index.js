var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 4000
var redis = new require('ioredis')()

redis.del('members');


io.on('connection', function (socket) {
    var pseudo = null;

    /**
     * Permet a l'utilisateur de se log avec un pseudo
     *
     * @param pseudo
     * @return true si le pseudo est libre, false sinon
     */

    socket.on('login', function (name) {

        if (pseudo === null) {
            redis.sismember('members', name.toLowerCase()).then(function(rep){
                if (rep) {
                    socket.emit('login', false)
                } else {
                    redis.sadd('members', name.toLowerCase())
                    pseudo = name.toLowerCase();
                    socket.emit('login', true)
                }
            })
        } else {
            socket.emit('login', null);
        }
    })

    /**
     * Supprime l'utilisateur de la base redis
     */
    socket.on('disconnect', function (socket) {
        console.log("out");
        if (pseudo !== null){
            redis.srem('members', pseudo);
            pseudo = null;
        }
    })

})

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

setInterval(function(){
    console.log(guid())
}, 1000);

http.listen(port, function () {
    console.log('listening on *:' + port)
})
