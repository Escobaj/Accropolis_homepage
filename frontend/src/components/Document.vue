<template>
  <div style="height: 100%;">
    <div style="height: 100%;" id="documents" :style="{display : (online)? 'block' : 'none'}"></div>
    <div class="block" :style="{display : (!online)? 'block' : 'none'}">
      <div class="offline">
        Aucun document n'est en cours d'edition
      </div>
    </div>
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
          if (this.online){
            this.$socket.emit('getFile')
          }
        },
        updateNewFile(src){
          this.src = src
          let docs = $("#documents")
          docs.empty()
          docs.append('<iframe src="' + this.src + '" height="100%" width="100%" frameborder="0" id="doc_embed"></iframe>')
        }
    },
    mounted () {
      this.$socket.emit('moduleOnline')
    }
  };
</script>



<style lang="scss">
</style>
