<template>
  <div class="bloc">
    <a class="button large expanded footer" @click.prevent="show">Proposer une question</a>

    <modal name="PostQuestion">
      <div class="box">

        <h3>Poser votre question : </h3>
        <div class="row">
          <div class="small-12 columns">
            <textarea v-model="edit.question" cols="2" rows="4" style="resize: none"></textarea>
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
        }
      }
    },
    methods: {
      show () {
        this.$modal.show('PostQuestion');
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
