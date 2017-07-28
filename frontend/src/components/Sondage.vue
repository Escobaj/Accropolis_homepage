<template>
  <div class="bloc">
    <a class="button large expanded footer" @click.prevent="show">Proposer une question</a>

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
        sondages: {

        }
      }
    },
    mounted () {
      this.show()
    },
    methods: {
      show() {
        this.$modal.show('PostSondage');
      },
      increaseAnswer() {
        if (this.edit.nb <= 6){
          this.edit.nb += 1;
        } else {
          this.$toasted.error('Notre maximun de réponse atteinte.');
        }
      },
      send() {
        this.$toasted.info(JSON.stringify(this.edit))
      }
    }
  }
</script>



<style lang="scss">
  .block{
    height: 100%;
    position: relative;
  }

  .footer{
    position: absolute;
    bottom: 0;
    max-width: 100% / 12 * 5;
  }

  .box{
    padding: 50px;
  }
</style>
