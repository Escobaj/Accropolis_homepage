<template>
  <div style="height: 100%;" id="docs">

  </div>
</template>

<script>
  export default {
    name: 'document',
    data () {
      return {
        src: 'https://mensuel.framapad.org/p/G9JPyRZEm3'
      }
    },
    mounted () {
      let docs = $("#docs")
      docs.empty()
      docs.append('<iframe src="' + this.src + '" height="100%" width="100%" frameborder="0" id="doc_embed"></iframe>')
    }
  };
</script>



<style lang="scss">
</style>
