<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="header">
                <h4 class="title">Utilisateur connecté</h4>
                <p class="category">sur l'interface</p>
              </div>
              <div class="content text-center user-score">
                {{ state.user.nb }}
                <i class="fa fa-user fa-6" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card">
              <div class="header">
                <h4 class="title">Module en ligne</h4>
              </div>
              <table class="table">
                <thead>
                <tr>
                  <th>Module</th>
                  <th>etat</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sondage</td>
                    <td><i class="fa fa-circle" :class="{'text-success': state.modules.sondage, 'text-danger': !state.modules.sondage}"></i></td>
                  </tr>
                  <tr>
                    <td>Question</td>
                    <td><i class="fa fa-circle" :class="{'text-success': state.modules.question, 'text-danger': !state.modules.question}"></i></td>
                  </tr>
                  <tr>
                    <td>Document</td>
                    <td><i class="fa fa-circle" :class="{'text-success': state.modules.document, 'text-danger': !state.modules.document}"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card">
              <div class="header">
                <div class="float-right">
                  <a type="button" class="btn btn-primary" @click="$modal.show('sendSondage')"><i class="fa fa-plus"></i></a>
                </div>
                <h4 class="title">Sondage</h4>
                <p class="category">Sondage en cours</p>
              </div>
              <div class="content" >
                <div class="sondage" v-if="state.sondages.active !== null">
                  <div class="question">{{ state.sondages.active.question }}</div>
                  <div class="reponse" v-for="n in state.sondages.active.reponses">
                    <div class="name">{{ n.reponse }}</div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" :style="{width: n.percent}">
                        {{ n.percent }} ({{ n.vote }})
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else style="text-align: center">
                  Aucun sondage en cours
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card">
              <div class="header">
                <h4 class="title">Question</h4>
                <p class="category">par ordre croissante de popularité</p>
              </div>
              <div class="content">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>auteur</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="n in limit">
                      <td>{{ state.questions.noted[n - 1].question }}</td>
                      <td>{{ state.questions.noted[n - 1].author }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="content">
            <iframe frameborder="0" scrolling="no" id="chat_embed" src="http://www.twitch.tv/accropolis/chat" height="800px" width="100%"></iframe>
          </div>
        </div>
      </div>
    </div>
    <modal name="sendSondage" height="98%">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 form-modal">
            <div class="form-group">
              <textarea class="form-control" rows="5" placeholder="question ..." v-model="add.question"></textarea>
            </div>
            <div class="form-group" v-for="n in add.nb">
              <input type="text" class="form-control" placeholder="reponse" v-model="add.reponses[n - 1]">
            </div>
            <a href="#" @click.prevent="add.nb += 1"><i class="fa fa-plus text-primary"></i></a>
            <br>
            <br>
            <a href="#" class="btn btn-primary" @click.prevent="addSondageToQueue">Envoyer</a>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'dashboard',
  data () {
    return {
      state: store.state,
      add: {
        nb: 2,
        question: '',
        reponses: []
      },
    }
  },
  methods: {
    addSondageToQueue(){
      this.$socket.emit('addSondageToQueue', this.add)
      this.$modal.hide('sendSondage')
      this.add = {
        nb: 2,
        question: '',
        reponses: []
      }
    }
  },
  computed : {
    limit(){
      if (this.state.questions.noted.length < 5) {
        return this.state.questions.noted.length
      } else {
        return 5
      }
    }
  }
}
</script>

<style lang="scss">
  .user-score{
    font-size: 50px;
  }

  .sondage{
    .question{
      font-size: 25px;
    }
    .name{
      font-size: 13px;
      color: dimgrey;
    }
  }

  .progress{
    margin-bottom: 5px !important;
  }

  .float-right{
    float: right;
  }

  .form-modal{
    margin: 50px;
    width: 80%;

    input, textarea{
      resize: none;
      width: 50%;
    }
  }
</style>
