var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 4000
var redis = new require('ioredis')()
redis.del('members')

var config = {
    sondageDelay: 120,                          // delay minimun entre deux soumissions de sondages
    questionDelay: 120,                         // delay minimun entre deux soumissions de questions
    newSondageDelay: 1000 * 60 * 0.5,                  // delay entre deux sondages soumis aux votes
    expirationRessource: 15 * 60                //delay avant qu'un sondage ou une question soit considerer comme trop vieux
}

// etat des modules (modifiable)
var modules = {
    sondage:  true,
    document: true,
    question: true
}

// liste de tous les sondages
var sondages = []

// Sondage en cours de vote
var activeSondage = null

//liste de toutes les questions
var questions = [];


/**
 * Permet de generer des ids
 *
 * @returns {string} guid
 */
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
        //todo: Ajouter des régles sur le login et supprimer l'utilisation de redis
        if (me.pseudo === null) {
            redis.sismember('members', name.toLowerCase()).then(function(rep){
                if (rep) {
                    socket.emit('login', false)
                } else {
                    redis.sadd('members', name.toLowerCase())
                    me.pseudo = name.toLowerCase()
                    socket.emit('login', true)
                    //todo: envoyer le sondage en cours, une fois que les components sont mount
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

    /**
     * permet a un utilisateur de soumettre son sondage
     */
    socket.on('sendSondage', function (sondage) {
        var date = Math.floor(Date.now() / 1000)
        if (me.lastSondage === null || date - me.lastSondage >= config.sondageDelay) {
            sondage.reponses = sondage.reponses.filter(function (reponse) {
               return reponse.length >= 1
            })
            me.lastSondage = date
            sondage.author = me.pseudo
            sondage.timestamp = date
            sondage.id = guid()
            delete sondage.nb
            socket.broadcast.emit('newSondage', sondage)
            socket.emit('sendSondage', {status: true} )
            sondage.yes = 0
            sondage.no = 0
            sondages.push(sondage)
        } else {
            socket.emit('sendSondage', {status: false, time: -(date - me.lastSondage - config.sondageDelay)})
        }
    })

    /**
     * permet de voter pour un sondage
     */
    socket.on('approveSondage', function(elem){
        //todo: gerer le multi vote
        var result = sondages.filter(function (sondage) {
            return sondage.id === elem.id
        })

        if (result.length === 1) {
            if (elem.rep) {
                result[0].yes++
            } else {
                result[0].no++
            }
        }
    })

    /**
     * retoune l'etat des modules
     */
    socket.on('moduleOnline', function () {
        socket.emit('moduleOnline', modules)
    })

    /**
     * permet a un utilisateur de vote pour le sondage en cours
     */
    socket.on('addReponse', function (index) {
        //todo: gerer le multi vote
        if (index !== -1 && activeSondage !== null) {
            activeSondage.reponses[index].vote++;
        }
    })

    socket.on('ready', function () {
        io.emit('newSondageVote', activeSondage);
    })

    /**
     * Permet d'ajouter une question a la liste des questions a voter
     */
    socket.on('sendQuestion', function (question) {
        var date = Math.floor(Date.now() / 1000)
        if (me.lastQuestion === null || date - me.lastQuestion >= config.questionDelay) {
            me.lastQuestion = date
            question = {question: question}
            question.author = me.pseudo
            question.id = guid()
            question.yes = 0
            question.no = 0
            questions.push(question)
            socket.emit('sendQuestion', {status: true})
            socket.broadcast.emit('newQuestion', question)
        } else {
            socket.emit('sendQuestion', {status: false, timeleft: -(date - me.lastQuestion - config.questionDelay)})
        }
    })

    /**
     * permet de voter pour une question
     */
    socket.on('approveQuestion', function(elem){
        var result = questions.filter(function (question) {
            return question.id === elem.id
        })

        if (result.length === 1) {
            if (elem.rep) {
                result[0].yes++
            } else {
                result[0].no++
            }
        }
        console.log(questions)
    })
})


/**
 * permet de supprimer les sondages créer au bout d'un certain delay
 */
setInterval(function () {
    sondages = sondages.filter(function (sondage){
        return sondage.timestamp + config.expirationRessource >= Date.now() / 1000
    })
}, 60000)

setInterval(function () {
    if (activeSondage !== null) {
        var total = activeSondage.reponses.reduce(function (carry, elem) {
            return carry + elem.vote
        }, 0);
        activeSondage.reponses.forEach(function (element) {
            element.percent = Math.round(element.vote * 100 / total * 10) / 10 + '%'
        })
        io.emit('updateResult', activeSondage.reponses)
    }
}, 1000)

/**
 * permet de selectionner le sondage a promouvoir
 */
setInterval(function(){
    var nextSondage =  sondages.sort(function(a, b){
        return (b.yes - b.no) - (a.yes - a.no)
    })

    if (nextSondage.length >= 1){
        activeSondage = nextSondage[0];
        sondages = sondages.filter(function(e){
            return e !== activeSondage;
        })
        delete activeSondage.yes
        delete activeSondage.no
        activeSondage.reponses = activeSondage.reponses.reduce(function (carry, element) {
            carry.push({
                reponse : element,
                vote : 0,
                percent : '0%'
            })
            return carry
        }, [])
    } else {
        activeSondage = null;
    }
    io.emit('newSondageVote', activeSondage);
}, config.newSondageDelay)



http.listen(port, function () {
    console.log('listening on *:' + port)
})