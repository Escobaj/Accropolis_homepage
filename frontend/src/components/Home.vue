<template>
  <div class="row-100 large-collapse">
    <div class="waiting-screen"></div>
    <div class="large-7 columns">
      <div class="header header-title">
        Accropolis
      </div>
      <iframe
        id="player"
        src="http://player.twitch.tv/?channel=accropolis&autoplay=false"
        width="100%"
        frameborder="0"
        allowfullscreen="true">
      </iframe>
      <div class="offset-player" id="sondageDisplay">
        <div class="vertical-center" v-if="sondage === null">
          Aucun sondage n'est actuellement en cours.
          Vous pouvez proposer vos sondages, ou voter pour les prochaines sondages
        </div>
        <div class="vertical-center" v-else-if="voting === true">
          <div class="questions">
            <div class="name">
              <div class="question">
                {{ sondage.question }}
                <span class="author"> @{{ sondage.author }}</span>
              </div>
              <div class="row">
                <div v-for="reponse in sondage.reponses" class="large-6 columns end">
                  <div class="responses text-center" @click="reponseSondage(reponse)">{{ reponse.reponse }}</div>
                </div>
              </div>
              <div class="small button-group align-center">
                <a class="button skip" @click="endVote">s'abstenir</a>
              </div>
            </div>
          </div>
        </div>
        <div class="vertical-center" v-else>
          <div class="questions">
            <div class="name">
              <div class="question">
                {{sondage.question}}
                  <div v-for="reponse in sondage.reponses">
                    <div class="reponse text-left" @click="reponseSondage(reponse)">{{ reponse.reponse }}</div>
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <span class="progress-meter accropolis" :style="{width: reponse.percent}">
                      <p class="progress-meter-text">{{ reponse.percent }} ({{ reponse.vote }})</p>
                    </span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="large-5 columns" id="tools">
      <div class="header">
        <a class="onglet"  @click.prevent="tabSelected('chat')" :class="{active : actives.chat}">
          <i class="fa fa-comments"></i>
          Chat
        </a>
        <a class="onglet" @click.prevent="tabSelected('document')" :class="{active : actives.document}">
          <i class="fa fa-file-text" aria-hidden="true"></i>
          Document
        </a>
        <a class="onglet" @click.prevent="tabSelected('sondage')" :class="{active : actives.sondage}">
          <i class="fa fa-pie-chart" aria-hidden="true"></i>
          Sondage
        </a>
        <a class="onglet" @click.prevent="tabSelected('question')" :class="{active : actives.question}">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          Question
        </a>
      </div>
      <Chat :style="{display : modules.chat}"></Chat>
      <Document :style="{display : modules.document}"></Document>
      <Sondage :style="{display : modules.sondage}"></Sondage>
      <Question :style="{display : modules.question}"></Question>
    </div>
  </div>
</template>

<script>
  import Chat from './Chat'
  import Document from './Document'
  import Sondage from './Sondage'
  import Question from './Question'

export default {
  components : {
    Chat,
    Document,
    Sondage,
    Question
  },
  name: 'home',
  data() {
    return {
      modules : {
        chat: 'block',
        document: 'block',
        sondage: 'block',
        question: 'block'
      },
      actives : {
        chat: 'false',
        document: 'false',
        sondage: 'false',
        question: 'false'
      },
      sondage: null,
      voting: true
    }
  },
  sockets: {
    connect () {
      this.$router.push('/login')
    },
    newSondageVote (sondage) {
        this.sondage = sondage
        this.voting = true
    },
    updateResult(reponses){
      if (this.sondages !== null) {
        this.sondage.reponses = reponses
      }
    }
  },
  mounted () {
    this.$nextTick(function() {
      window.addEventListener('resize', this.resizePlayer)
      window.addEventListener('resize', this.resizeChat)

      this.resizePlayer()
      this.resizeChat()
     })
    this.tabSelected('chat')
    this.$socket.emit('ready')
  },
  methods: {
    resizePlayer (){
      let player = $("#player")
      let height = player.width() * 9 / 16
      player.height(height)
      $("#sondageDisplay").height(jQuery(window).height() - $(".header").height() - height - 7)
    },
    resizeChat(){
      $("#tools").height(jQuery(window).height() - $(".header").height() - 7)

    },
    tabSelected(tab) {
      for (let n in this.modules){
        this.modules[n] = 'none'
        this.actives[n] = false
      }
      this.modules[tab] = 'block'
      this.actives[tab] = true
    },
    reponseSondage(reponse) {
        if (this.sondages !== null) {
          this.$socket.emit('addReponse', this.sondage.reponses.indexOf(reponse));
          this.endVote();
        }
    },
    endVote(){
      this.voting = false
    }
  }
}
</script>

<style lang="scss">
  .header{
    background-color: #E6077E;
    height: 50px;
    line-height: 50px;
    color: white;

    &-title {
      font-size: 25px;
      font-weight: bold;
      font-family: arial, serif;
      padding-left: 10px;
    }
    .onglet{
      background-color: darken(#E6077E, 1%);
      user-select: none;
      display: inline-block;
      color: white;
      width: 24%;
      height: 100%;
      margin-top: 0;
      margin-bottom: 0;
      text-align: center;
      line-height: 50px;
      font-size: 18px;

      &:hover{
        background-color: darken(#E6077E, 10%);
      }

      &.active {
        background-color: white;
        color: darken(#E6077E, 10%);
        box-shadow: 2px 0px 1px 0px darken(#E6077E, 10%);
      }
    }

    .hidden{
      visibility: hidden;
    }
  }

  .offset-player{
    background-color: #f6f6f6;
    display: table;
    width: 100%;
  }

  .vertical-center{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 100%;
  }
  div.responses{
    cursor: pointer;
  }

  .author{
    font-size: 20px;
    color: #bbbbbb;
  }

  .reponse {
    font-size: 15px;
  }

  .accropolis{
    background-color: #E6077E;
  }

  .flip-list-move {
    transition: transform 1s;
  }

</style>
