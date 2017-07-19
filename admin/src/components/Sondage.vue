<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <div class="header">
          <h4 class="title">Striped Table with Hover</h4>
          <p class="category">Here is a subtitle for this table</p>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-hover table-striped">
            <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Country</th>
            <th>City</th>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>Dakota Rice</td>
              <td>$36,738</td>
              <td>Niger</td>
              <td>Oud-Turnhout</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Doris Greene</td>
              <td>$63,542</td>
              <td>Malawi</td>
              <td>Feldkirchen in Kärnten</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Mason Porter</td>
              <td>$78,615</td>
              <td>Chile</td>
              <td>Gloucester</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
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
</style>
