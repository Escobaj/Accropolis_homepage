import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import io from 'socket.io-client'

const connection = io('http://192.168.0.7:4000')
Vue.use(VueSocketio, connection)

class accropolisStore{

  constructor() {
    this.state = {
      modules: {
        document : false,
        sondage  : false,
        question : false,
      },
      document : '',
      user: {
        nb: 0
      },
      questions :{
        noted: [],
        timed : []
      },
      sondages: {
        list: [],
        queue: [],
        active : null
      }
    }
  }

}

let store = new accropolisStore()

export default store
