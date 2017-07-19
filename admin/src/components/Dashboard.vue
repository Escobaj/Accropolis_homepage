<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="notify">tests</button>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods : {
    notify: function(event){

      $(document).ready(() => {

        $.notify({
          icon: 'pe-7s-like2',
          message: this.msg
        }, {
          type: 'success',
          timer: 1000
        });
      });

    }
  }
}
</script>

<style scoped>
</style>
