<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="header">
        <toggle-button class="float-right" :labels="{checked: 'On', unchecked: 'Off'}" :value="state.modules.document"  @change="updateModule"></toggle-button>
        <h4 class="title">Document</h4>
      </div>
      <div class="content">
        <div class="form-group">
          <label for="comment">URL:</label>
          <textarea class="form-control" rows="5" id="comment" style="resize: none;" v-model="url"></textarea>
          Document en cours d'edition: {{ state.document }}
          <br>
          <br>
          <a href="#" class="btn btn-block" @click.prevent="newUrl">Valider</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'Document',
  data () {
    return {
      state : store.state,
      url : ''
    }
  },
  methods : {
    newUrl(){
      this.$socket.emit('addNewFile', this.url)
      this.url = ''
    },
    updateModule(state){
      this.$socket.emit('changeModuleState', {name: 'document', state : state.value})
    }
  }
}
</script>

<style scoped>
  .float-right{
    float: right;
  }
</style>
