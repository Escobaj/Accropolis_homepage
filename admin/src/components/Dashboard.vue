<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="header">
                <h4 class="title">Utilisateur connecté</h4>
                <p class="category">sur l'interface</p>
              </div>
              <div class="content text-center user-score">
                {{ score }}
                <i class="fa fa-user fa-6" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card">
              <div class="header">
                <h4 class="title">Module en ligne</h4>
              </div>
              <table class="table">
                <thead>
                <tr>
                  <th>Module</th>
                  <th>etat</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sondage</td>
                    <td><i class="fa fa-circle text-success"></i></td>
                  </tr>
                  <tr>
                    <td>Question</td>
                    <td><i class="fa fa-circle text-success"></i></td>
                  </tr>
                  <tr>
                    <td>Document</td>
                    <td><i class="fa fa-circle text-success"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card">
              <div class="header"><h4 class="title">Sondage</h4> <p class="category">en cours</p></div>
              <div class="content">
                <div class="sondage">
                  <div class="question">Comment s'appelle Melenchon?</div>
                  <div class="reponse">
                    <div class="name">Jean Luc</div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 66.6%;">
                        66.6% (20)
                      </div>
                    </div>
                  </div>
                  <div class="reponse">
                    <div class="name">Jean Claude</div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 33.3%;">
                        33.3% (10)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card">
              <div class="header">
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="content">
            <iframe frameborder="0" scrolling="no" id="chat_embed" src="http://www.twitch.tv/accropolis/chat" height="800px" width="100%"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
        score: 15
    }
  },

  methods : {
  }
}
</script>

<style lang="scss">
  .user-score{
    font-size: 50px;
  }

  .sondage{
    .question{
      font-size: 25px;
    }
    .name{
      font-size: 13px;
      color: dimgrey;
    }
  }

  .progress{
    margin-bottom: 5px !important;
  }
</style>
