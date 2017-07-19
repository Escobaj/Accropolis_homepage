<template>
  <div>
    <div class="sidebar" data-color="blue">
      <div class="sidebar-wrapper">
        <div class="logo">
          <a href="/" class="simple-text">
            Accropolis
          </a>
        </div>

        <ul class="nav">
          <li>
            <router-link :to="{name : 'Dashboard'}">
              <i class="pe-7s-graph"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'Sondage'}">
              <i class="pe-7s-note2"></i>
              <p>Sondage</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'Question'}">
              <i class="pe-7s-help1"></i>
              <p>Question</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'Tendance'}">
              <i class="pe-7s-graph2"></i>
              <p>Courbe de tendance</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="main-panel">
      <nav class="navbar navbar-default navbar-fixed">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#">
                  <p>Deconnecter</p>
                </a>
              </li>
              <li class="separator hidden-lg hidden-md"></li>
            </ul>
          </div>
        </div>
      </nav>


      <div class="content">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style scoped>

  a.router-link-exact-active{
    background-color: #4e87f7 !important;
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .5s;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
</style>
