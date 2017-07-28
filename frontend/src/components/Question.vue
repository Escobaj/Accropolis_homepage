<template>
  <div class="block">
    <a class="button large expanded footer" @click.prevent="show">Proposer une question</a>

    <div class="questions" v-for="question in questions">
      <div class="row">
        <div class="large-12 columns">
          <div class="name">
            <div class="question">
              {{ question }}
            </div>
          </div>
        </div>
      </div>
      <div class="small button-group align-center">
        <a class="button"><i class="fa fa-check" aria-hidden="true"></i></a>
        <a class="button skip">Skip</a>
        <a class="button alert"><i class="fa fa-times" aria-hidden="true"></i></a>
      </div>
    </div>

    <modal name="PostQuestion">
      <div class="box">

        <h3>Poser votre question : </h3>
        <div class="row">
          <div class="small-12 columns">
            <textarea v-model="edit.question" cols="2" rows="4" style="resize: none" placeholder="question ..."></textarea>
          </div>
        </div>
        <a href="#" class="button float-right">Envoyer</a>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'question',
    data () {
      return {
        edit : {
          question: ''
        },
        questions: [
          'L’électorat et les médias sont-ils sexistes ?',
          'Que se passe t-il au moyen orient ?',
          'Que fait le gouvernement pour l\'ecologie ?',
          'Quand reprend Accropolis a la rentré ?',
          'En cas de 1v1 Mélenchon - Macron, qui gagnerai?',
          'Mélenchon est il un poid pour son parti?',
          'Le parti de Benoit Hamon va t-il remplacer le ps?',
        ]
      }
    },
    methods: {
      show () {
        this.$modal.show('PostQuestion');
      }
    }
  }
</script>
