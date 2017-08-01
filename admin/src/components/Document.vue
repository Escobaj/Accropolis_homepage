<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="header">
        <toggle-button class="float-right" :labels="{checked: 'On', unchecked: 'Off'}"></toggle-button>
        <h4 class="title">Document</h4>
      </div>
      <div class="content">
        <div class="form-group">
          <label for="comment">URL:</label>
          <textarea class="form-control" rows="5" id="comment" style="resize: none;"></textarea>
          <br>
          <button type="button" class="btn btn-block">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Document',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .float-right{
    float: right;
  }
</style>
