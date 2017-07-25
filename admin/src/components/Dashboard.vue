<template>
  <div>
    <h1>Dashboard</h1>
    <ul>
      <li v-for="message in messages">
        {{ message }}
      </li>
    </ul>
    <textarea type="text" v-model="content"></textarea>
    <br>
    <button @click="notify">tests</button>


    <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="login">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <label>pseudo</label>
          <input type="text" v-model="login">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      content : '',
      login: '',
      messages : []
    }
  },

  mounted: () => {

    sleep(2)
    $("#login").modal('show')

  },

  sockets: {
    chatMessage (val) {
      this.messages.push(val)
    }
  },
  methods : {
    notify: function(event){
      this.$socket.emit('chatMessage', this.content)
      this.content = '';
    }
  }
}
</script>

<style scoped>
</style>
