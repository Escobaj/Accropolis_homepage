<template>
  <div class="block">

    <a class="button large expanded footer" @click.prevent="show">Proposer un sondage</a>
      <div class="questions" v-for="sondage in sondages">
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
          <a class="button" @click="sendResponse(sondage, true)"><i class="fa fa-check" aria-hidden="true"></i></a>
          <a class="button skip" @click="removeSondage(sondage)">Skip</a>
          <a class="button alert" @click="sendResponse(sondage, false)"><i class="fa fa-times" aria-hidden="true"></i></a>
        </div>
      </div>

    <modal name="PostSondage" height="60%">
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
        sondages: [
          {
            question : 'Avez vous etez convaincu par le discourt de Benoit Hamon?',
            reponses : ['Oui', 'Non', 'C\'est mieux que d\'habitude']
          },
          {
            question : 'Doit on augmenter le nombre de parlementaire?',
            reponses : ['Oui', 'Non', 'Non au contraire', 'Oui mais en reduisant leurs salaires']
          },
          {
            question : 'Serez vous présent a l\'Aperopolis de Montpellier',
            reponses : ['Oui', 'Non', 'Je voudrais bien, mais je peux point']
          },
          {
            question : 'Quel âge avez vous?',
            reponses : ['moins de 18 ans', '18 - 25 ans', '25 - 35 ans', '35 - 50 ans', 'plus de 50 ans']
          }
        ]
      }
    },
    methods: {
      show() {
        this.$modal.show('PostSondage');
      },
      increaseAnswer() {
        if (this.edit.nb <= 4){
          this.edit.nb += 1;
        } else {
          this.$toasted.error('Notre maximun de réponse atteinte.');
        }
      },
      send() {
        this.sondages.push(JSON.parse((JSON.stringify(this.edit))))
        console.log("test");
      },
      removeSondage(n){
        this.sondages = this.sondages.filter((sondage) => {
          return sondage !== n
        })
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

</style>
