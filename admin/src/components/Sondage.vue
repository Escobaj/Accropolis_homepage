<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <toggle-button class="float-right" :labels="{checked: 'On', unchecked: 'Off'}"></toggle-button>
          <h4 class="title">Question</h4>
        </div>
        <div class="content">
        </div>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="card">
        <div class="header">
          <a class="btn btn-primary float-right">Vider la liste</a>
          <h4 class="title">Sondages en cours de vote</h4>
        </div>
        <div class="content">
          <table class="table">
            <thead>
            <tr>
              <th>Question</th>
              <th>Reponses</th>
              <th><i class="fa fa-thumbs-up text-success" aria-hidden="true"></i></th>
              <th><i class="fa fa-thumbs-down text-danger" aria-hidden="true"></i></th>
              <th>action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Que vas faire Melenchon une fois que son mandat sera terminé?</td>
              <td>
                <ol>
                  <li>Smicard</li>
                  <li>Député</li>
                  <li>Retraité</li>
                </ol>
              </td>
              <td>27</td>
              <td>5</td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-primary">Apple</button>
                  <button type="button" class="btn btn-primary">Samsung</button>
                  <button type="button" class="btn btn-primary">Sony</button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-lg-3">

    </div>
  </div>
</template>
<script>
export default {
  name: 'sondage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
  .float-right{
    float: right;
  }
  .text-center{
    text-align: center;
  }
</style>
