<template>
  <div>
    <div class="sidebar" data-color="blue">
      <div class="sidebar-wrapper">
        <div class="logo">
          <a href="/" class="simple-text">
            Accropolis
          </a>
        </div>

        <ul class="nav">
          <li>
            <router-link :to="{name : 'Dashboard'}">
              <i class="pe-7s-graph"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'Sondage'}">
              <i class="pe-7s-note2"></i>
              <p>Sondage</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'Question'}">
              <i class="pe-7s-help1"></i>
              <p>Question</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'Document'}">
              <i class="pe-7s-graph2"></i>
              <p>Document</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="main-panel">
      <nav class="navbar navbar-default navbar-fixed">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#">
                  <p>Deconnecter</p>
                </a>
              </li>
              <li class="separator hidden-lg hidden-md"></li>
            </ul>
          </div>
        </div>
      </nav>


      <div class="content">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './store/store'

  export default {
    name: 'app',
    data () {
      return {
        state : store.state
      }
    },
    mounted() {
      this.$socket.emit('moduleOnline')
      this.$socket.emit('getFile')
      this.$socket.emit('userCount')
      this.$socket.emit('getQuestions')
      this.$socket.emit('getSondages')
      this.$socket.emit('getSondageQueue')
      this.$socket.emit('activeSondage')

      setInterval(() => {
        this.$socket.emit('userCount')
        this.$socket.emit('getQuestions')
        this.$socket.emit('getSondages')
        this.$socket.emit('getSondageQueue')
      }, 10000)
      setInterval(() => {
        this.$socket.emit('activeSondage')
      }, 500)
    },
    sockets : {
      moduleOnline(modules){
        this.state.modules = modules
      },
      updateNewFile(url){
        this.state.document = url
      },
      userCount(nb){
        this.state.user.nb = nb
      },
      getQuestions(questions){
        let timed = JSON.parse(JSON.stringify(questions))
        this.state.questions.timed = timed.sort((a, b) => b.timestamp - a.timestamp)
        this.state.questions.noted = questions.sort((a, b) => (b.yes - b.no) - (a.yes - a.no))
      },
      getSondages (sondages){
        this.state.sondages.list = sondages.sort((a, b) => (b.yes - b.no) - (a.yes - a.no))
      },
      getSondageQueue (sondages){
        this.state.sondages.queue = sondages
      },
      activeSondage(sondage){
        sondage.reponses.sort(function(a, b) {
          return b.vote - a.vote
        })
        this.state.sondages.active = sondage
      }
    }
  }
</script>

<style scoped>

  a.router-link-exact-active{
    background-color: #4e87f7 !important;
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .5s;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
</style>
