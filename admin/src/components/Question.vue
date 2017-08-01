<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="header">
        <toggle-button class="float-right" @change="onChangeEventHandler" :labels="{checked: 'On', unchecked: 'Off'}"/>
        <h4 class="title">Question</h4>
        <p class="category">par ordre croissante</p>
      </div>
      <div class="content">
        <table class="table">
          <thead>
          <tr>
            <th>Question</th>
            <th><i class="fa fa-thumbs-up text-success" aria-hidden="true"></i></th>
            <th><i class="fa fa-thumbs-down text-danger" aria-hidden="true"></i></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Que vas faire Melenchon une fois que son mandat sera terminé?</td>
            <td>27</td>
            <td>5</td>
          </tr>                    <tr>
            <td>Que vas faire Melenchon une fois que son mandat sera terminé?</td>
            <td>27</td>
            <td>5</td>
          </tr>                    <tr>
            <td>Que vas faire Melenchon une fois que son mandat sera terminé?</td>
            <td>27</td>
            <td>5</td>
          </tr>                    <tr>
            <td>Que vas faire Melenchon une fois que son mandat sera terminé?</td>
            <td>27</td>
            <td>5</td>
          </tr>                    <tr>
            <td>Que vas faire Melenchon une fois que son mandat sera terminé?</td>
            <td>27</td>
            <td>5</td>
          </tr>                    <tr>
            <td>Que vas faire Melenchon une fois que son mandat sera terminé?</td>
            <td>27</td>
            <td>5</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'question',
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
</style>
