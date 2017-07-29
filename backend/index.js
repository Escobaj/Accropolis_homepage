var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 4000
var redis = new require('ioredis')()
redis.del('members')

var config = {
    sondageDelay: 120,      // delay minimun entre deux soumissions de sondages
    questionDelay: 120,     // delay minimun entre deux soumissions de questions
    newSondageDelay: 300    // delay entre deux sondages soumis aux votes
}
var sondages = []

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4()
}

io.on('connection', function (socket) {
    var me = {
        pseudo:         null,
        lastSondage:    null,
        lastQuestion:   null
    }

    /**
     * Permet a l'utilisateur de se log avec un pseudo
     *
     * @param pseudo
     * @return true si le pseudo est libre, false sinon
     */

    socket.on('login', function (name) {
        if (me.pseudo === null) {
            redis.sismember('members', name.toLowerCase()).then(function(rep){
                if (rep) {
                    socket.emit('login', false)
                } else {
                    redis.sadd('members', name.toLowerCase())
                    me.pseudo = name.toLowerCase()
                    socket.emit('login', true)
                }
            })
        } else {
            socket.emit('login', null)
        }
    })

    /**
     * Supprime l'utilisateur de la base redis
     */
    socket.on('disconnect', function (socket) {
        if (me.pseudo !== null){
            redis.srem('members', me.pseudo)
            me.pseudo = null
        }
    })

    socket.on('sendSondage', function (sondage) {
        console.log(this.sondages)
        var date = Math.floor(Date.now() / 1000)
        if (me.lastSondage === null || date - me.lastSondage >= config.sondageDelay) {
            me.lastSondage = date
            sondage.author = me.pseudo
            sondage.timestamp = date
            sondage.id = guid()
            delete sondage.nb
            socket.broadcast.emit('newSondage', sondage)
            socket.emit('sendSondage', {status: true})
            sondage.yes = 0
            sondage.no = 0
            sondages.push(sondage)
        } else {
            socket.emit('sendSondage', {status: false, time: -(date - me.lastSondage - config.sondageDelay)})
        }
    })
})

http.listen(port, function () {
    console.log('listening on *:' + port)
})
