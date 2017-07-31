<template>
  <div class="block" v-if="online">
    <a class="button large expanded footer" @click.prevent="show">Proposer une question</a>

    <transition-group name="fade">
      <div class="questions" v-for="question in questions" :key="question.id">
        <div class="row">
          <div class="large-12 columns">
            <div class="name">
              <div class="question">
                {{ question.question }}
              </div>
            </div>
          </div>
        </div>
        <div class="small button-group align-center">
          <a class="button" @click="sendQuestionVote(question, true)"><i class="fa fa-check" aria-hidden="true"></i></a>
          <a class="button skip" @click="removeQuestion(question)">Skip</a>
          <a class="button alert" @click="sendQuestionVote(question, false)"><i class="fa fa-times" aria-hidden="true"></i></a>
        </div>
      </div>
    </transition-group>

    <modal name="PostQuestion">
      <div class="box">
        <h3>Poser votre question : </h3>
        <div class="row">
          <div class="small-12 columns">
            <textarea v-model="edit.question" cols="2" rows="4" style="resize: none" placeholder="question ..."></textarea>
          </div>
        </div>
        <a href="#" class="button float-right" @click="sendQuestion">Envoyer</a>
      </div>
    </modal>
  </div>

  <div class="block" v-else>
    <div class="offline">
      Vous ne pouvez pas soumettre de question pour le moment
    </div>
  </div>
</template>

<script>
  export default {
    name: 'question',
    mounted () {
      this.$socket.emit('moduleOnline', 'sondage');
    },
    data () {
      return {
        edit : {
          question: ''
        },
        questions: [],
        online: false
      }
    },
    sockets: {
      moduleOnline (modules){
        this.online = modules.question
      },
      sendQuestion(rep) {
        if (!rep.status){
          this.$toasted.error('temps restant : ' + rep.timeleft + ' s')
        } else {
          this.$modal.hide('PostQuestion')
          this.edit = {
            question : '',

          }
          this.$toasted.success('Votre question a bien été envoyé.')
        }
      },
      newQuestion(question){
        this.questions.push(question)
      }
    },
    methods: {
      show () {
        this.$modal.show('PostQuestion');
      },
      sendQuestion(){
        console.log('send')
        this.$socket.emit('sendQuestion', this.edit.question)
      },
      removeQuestion(n){
        this.questions = this.questions.filter((sondage) => {
          return sondage !== n
        })
      },
      sendQuestionVote(n, resultat){
        this.$socket.emit('approveQuestion', {id : n.id, rep: resultat})
        this.removeQuestion(n)
      }
    }
  }
</script>
