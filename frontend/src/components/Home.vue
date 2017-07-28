<template>
  <div class="row-100 large-collapse">
    <div class="waiting-screen"></div>
    <div class="large-7 columns">
      <div class="header header-title">
        Accropolis
      </div>
      <iframe
        id="player"
        src="http://player.twitch.tv/?channel=accropolis"
        width="100%"
        frameborder="0"
        allowfullscreen="true">
      </iframe>
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
  name: 'hello',
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
      }
    }
  },
  sockets: {
    connect () {
      this.$router.push('/login');
    }
  },
  mounted () {
    this.$nextTick(function() {
      window.addEventListener('resize', this.resizePlayer);
      window.addEventListener('resize', this.resizeChat);

      this.resizePlayer()
      this.resizeChat()
     })
    this.tabSelected('chat')
  },
  methods: {
    resizePlayer (){
      let player = $("#player")
      let height = player.width() * 9 / 16
      player.height(height)
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
  }
};
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
      width: 24.5%;
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

    .waiting-screen{
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      height: 100% !important;
      width: 100%;
      /*opacity: 0.8 !important;*/
      background-color: #1a252f !important;
      z-index: 1000;
    }
  }
</style>
