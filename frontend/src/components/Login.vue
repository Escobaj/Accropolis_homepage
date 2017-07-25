<template>
  <div class="login-background">
    <div class="box">
      <input type="text" class="login-form" placeholder="Pseudo" v-model="pseudo" id="pseudo" autofocus>
      <a href="#" class="button login-button" @click.prevent="login">Entrer</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        pseudo : ''
      }
    },
    sockets: {
      login (rep) {
        if (rep || rep === null) {
          this.$router.push('/')
        } else {
          this.$toasted.error("Ce pseudo est déjà utilisé!")
        }
      },
      serverAlert (rep) {
        console.log(rep);
      }
    },
    methods : {
      login () {
        if (this.pseudo === ''){
          this.$toasted.show('Veuillez entrer un pseudo')
        } else {
          this.$socket.emit('login', this.pseudo)
        }
      }
    }

  }
</script>

<style lang="scss" scoped>

  .login-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #1a252f;
  }

  .box {
    width:400px;
    height:200px;
    position:absolute;
    left:50%;
    top:50%;
    font-size: 50px;
    text-align: center;
    margin:-100px 0 0 -200px;
  }

  .login-form, .login-form:focus, .login-form:active{
    text-align: center;
    background-color: #1a252f;
    font-size: 50px;
    height: 75px;
    border: none;
    outline: none;
  }

  [contenteditable="true"]:focus {
    outline: none;
  }

  .login-button {
    font-size: 20px;
    background-color: #2c3e50;
    color: lighten(#2c3e50, 20%);
  }
</style>
