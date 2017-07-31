<template>
  <div class="block" v-if="online">

    <a class="button large expanded footer" @click.prevent="show">Proposer un sondage</a>
      <transition-group name="fade" tag="div">
        <div class="questions" v-for="sondage in sondages" :key="sondage.id">
          <div class="row">
            <div class="large-12 columns">
              <div class="name">
                <div class="question">
                  {{ sondage.question }}
                </div>
                <div class="row">
                  <div v-for="n in sondage.reponses.length" class="large-6 columns end">
                      <div class="responses text-center">{{ sondage.reponses[n - 1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="small button-group align-center">
            <a class="button" @click="sendSondage(sondage, true)"><i class="fa fa-check" aria-hidden="true"></i></a>
            <a class="button skip" @click="removeSondage(sondage)">Skip</a>
            <a class="button alert" @click="sendSondage(sondage, false)"><i class="fa fa-times" aria-hidden="true"></i></a>
          </div>
        </div>
      </transition-group>
    <modal name="PostSondage" height="80%">
      <div class="box">

        <h3>Proposer le prochain sondage : </h3>
        <div class="row">
          <div class="large-12 columns">
            <textarea v-model="edit.question" cols="2" rows="4" style="resize: none" placeholder="Votre question ..."></textarea>
          </div>

          <div class="row" v-for="n in edit.nb">
            <div>
              <div class="large-12 columns">
                <input type="text" placeholder="Réponse" v-model="edit.reponses[n - 1]">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="large-1 columns end">
              <a @click="increaseAnswer"><i class="fa fa-plus" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
        <a href="#" class="button float-right" @click="send">Envoyer</a>
      </div>
    </modal>
  </div>
  <div class="block" v-else>
    <div class="offline">
      Vous ne pouvez pas soumettre de sondage pour le moment
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sondage',
    data () {
      return {
        edit: {
          nb: 2,
          question : '',
          reponses : []
        },
        sondages: [],
        online: true
      }
    },
    sockets: {
      sendSondage (rep){
        if (!rep.status){
          this.$toasted.error('temps restant : ' + rep.time + ' s')
        } else {
          this.$modal.hide('PostSondage')
          this.edit = {
            nb: 2,
            question : '',
            reponses : []
          }
          this.$toasted.success('Votre sondage a bien été envoyé.')
        }
      },
      newSondage (sondage){
        this.sondages.push(sondage)
        console.log(sondage)
      },
      moduleOnline (modules){
        this.online = modules.sondage
      }
    },
    mounted () {
      this.$socket.emit('moduleOnline')
    },
    methods: {
      show() {
        this.$modal.show('PostSondage')
      },
      increaseAnswer() {
        if (this.edit.nb <= 3){
          this.edit.nb += 1
        } else {
          this.$toasted.error('Notre maximun de réponse atteinte.')
        }
      },
      send() {
        if (this.edit.question.length >= 10 && this.edit.reponses[0].length >= 1 && this.edit.reponses[1].length >= 1){
          this.$socket.emit('sendSondage', this.edit)
        } else {
          this.$toasted.error('Votre sondage ne remplis pas les criteres minimuns')
        }
      },
      removeSondage(n){
        this.sondages = this.sondages.filter((sondage) => {
          return sondage !== n
        })
      },
      sendSondage(n, resultat){
        this.$socket.emit('approveSondage', {id : n.id, rep: resultat})
        this.removeSondage(n)
      }
    }
  }
</script>



<style lang="scss">
  .block{
    background-color: #f6f6f6;
    height: 100%;
    position: relative;
    overflow-y: hidden;
  }

  .footer{
    margin: 5px;
  }

  .box{
    padding: 50px;
  }
  .questions{
    display: block;
    margin: 10px;
    padding: 20px;
    background-color: white;

    .question{
      text-align: center;
      font-size: 25px;
    }

    .responses{
      background-color: #E6077E;
      color: white;
      padding: 2px;
      margin: 5px;
      border-radius: 2px;
      box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.52);
    }

    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.52);

    .button-group{
      margin-top: 20px;
      margin-bottom: 0px;
    }
  }

  .skip{
    background-color: #BBB !important;
  }

  .offline{
    background-color: white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
</style>
