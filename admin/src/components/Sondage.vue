<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <toggle-button class="float-right" :labels="{checked: 'On', unchecked: 'Off'}" @change="updateModule" :value="state.modules.sondage"></toggle-button>
          <h4 class="title">Sondage</h4>
        </div>
        <div class="content">
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <div class="header">
          <a class="float-right" href="#" @click.prevent="emptySondage">Vider la liste</a>
          <h4 class="title">Sondages en cours de vote</h4>
        </div>
        <div class="content" style="height: 690px;overflow-y: scroll">
          <table class="table">
            <thead>
            <tr>
              <th>Question</th>
              <th>Reponses</th>
              <th><i class="fa fa-thumbs-up text-success" aria-hidden="true"></i></th>
              <th><i class="fa fa-thumbs-down text-danger" aria-hidden="true"></i></th>
              <th>File d'attente</th>
              <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="n in state.sondages.list">
                <td>{{ n.question }}</td>
                <td>
                  <ol>
                    <li v-for="a in n.reponses">{{ a }}</li>
                  </ol>
                </td>
                <td>{{ n.yes }}</td>
                <td>{{ n.no }}</td>
                <td><a href="#" class="btn" @click.prevent="addToQueue(n)">Ajouter</a></td>
                <td><a href="#" class="btn btn-danger" @click.prevent="removeSondage(n)">Supprimer</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card">
        <div class="header">
          <div class="float-right">
            <a type="button" class="btn btn-primary" @click="$modal.show('sendSondage')"><i class="fa fa-plus"></i></a>
          </div>
          <h4 class="title">File d'attente</h4>
          <p class="category">prochain sondage </p>
        </div>
        <div class="content">
          <table class="table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="n in state.sondages.queue">
              <td>{{ n.question }}</td>
              <td><a href="" class="btn btn-danger" @click.prevent="removeFromQueue(n)">Supprimer</a></td>
            </tr>
            </tbody>
          </table>
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
  name: 'sondage',
  data () {
    return {
      add: {
        nb: 2,
        question: '',
        reponses: []
      },
      state: store.state
    }
  },
  methods: {
    updateModule(state){
      this.$socket.emit('changeModuleState', {name: 'sondage', state : state.value})
    },
    emptySondage() {
      this.$socket.emit('emptySondage')
    },
    addToQueue(sondage) {
      this.$socket.emit('addToQueue', sondage.id)
    },
    removeSondage (sondage) {
      this.$socket.emit('removeSondage', sondage.id)
    },
    removeFromQueue(sondage) {
      this.$socket.emit('removeSondageFromQueue', sondage.id)
    },
    addSondageToQueue(){
      this.$socket.emit('addSondageToQueue', this.add)
      this.$modal.hide('sendSondage')
      this.add = {
        nb: 2,
        question: '',
        reponses: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .float-right {
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
