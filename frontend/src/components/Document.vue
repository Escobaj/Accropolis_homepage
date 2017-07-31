<template>
  <div class="block" v-if="!online">
    <div class="offline">
      Aucun document n'est en cours d'edition
    </div>
  </div>
  <div style="height: 100%;" id="documents" v-else>

  </div>
</template>

<script>
  export default {
    name: 'document',
    data () {
      return {
          online: true,
          src: 'https://mensuel.framapad.org/p/G9JPyRZEm3'
      }
    },
    sockets : {
        moduleOnline (modules){
            this.online = modules.document
        }
    },
    mounted () {
      let docs = $("#documents")
      docs.empty()
      docs.append('<iframe src="' + this.src + '" height="100%" width="100%" frameborder="0" id="doc_embed"></iframe>')
      this.$socket.emit('moduleOnline')
    }
  };
</script>



<style lang="scss">
</style>
