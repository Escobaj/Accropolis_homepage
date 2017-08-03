<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="header">
        <toggle-button class="float-right" :labels="{checked: 'On', unchecked: 'Off'}" @change="updateModule" :value="state.modules.question"></toggle-button>
        <h4 class="title">Question</h4>
        <p class="category"></p>
      </div>
      <div class="content"  style="height: 750px;overflow-y: scroll">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#favorable" aria-controls="favorable" role="tab" data-toggle="tab">Question les mieux noté</a></li>
            <li role="presentation"><a href="#chronologique" aria-controls="chronologique" role="tab" data-toggle="tab">Question par ordre chronologique</a></li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="favorable">
              <table class="table">
                <thead>
                <tr>
                  <th>Question</th>
                  <th>auteur</th>
                  <th><i class="fa fa-thumbs-up text-success" aria-hidden="true"></i></th>
                  <th><i class="fa fa-thumbs-down text-danger" aria-hidden="true"></i></th>
                </tr>
                </thead>
                <transition-group name="flip" tag="tbody">
                  <tr v-for="n in state.questions.noted" :key="n.id">
                    <td>{{ n.question }}</td>
                    <td>{{ n.author }}</td>
                    <td>{{ n.yes }}</td>
                    <td>{{ n.no }}</td>
                  </tr>
                </transition-group>
              </table>
            </div>
            <div role="tabpanel" class="tab-pane" id="chronologique">
              <table class="table">
                <thead>
                <tr>
                  <th>Question</th>
                  <th>auteur</th>
                  <th><i class="fa fa-thumbs-up text-success" aria-hidden="true"></i></th>
                  <th><i class="fa fa-thumbs-down text-danger" aria-hidden="true"></i></th>
                </tr>
                </thead>
                <transition-group name="flip" tag="tbody">
                  <tr v-for="n in state.questions.timed" :key="n.id">
                    <td>{{ n.question }}</td>
                    <td>{{ n.author }}</td>
                    <td>{{ n.yes }}</td>
                    <td>{{ n.no }}</td>
                  </tr>
                </transition-group>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'question',
  data () {
    return {
      state : store.state
    }
  },
  methods : {
    updateModule(state){
      this.$socket.emit('changeModuleState', {name: 'question', state : state.value})
    }
  }
}
</script>

<style scoped>
  .float-right{
    float: right;
  }

  .flip-list-move {
    transition: transform 1s;
  }
</style>
