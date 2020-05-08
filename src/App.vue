<template>
  <div id="app" :style="{height: '100%'}">
    <div class="main" :style="{height: '100%'}">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
        <!-- <keep-alive> -->
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        <!-- </keep-alive> -->
      </transition>
      <!-- <router-view></router-view> -->
    </div>
    <footer-nav :show="showFootTab"></footer-nav>
  </div>
</template>

<script>
import footerNav from '@/components/footer-nav.vue'

export default {
  name: 'app',
  components: {
    footerNav
  },
  data(){
    return {
      showFootTab:true
    }
  },
  watch: {
    '$route': function() {
      this.routeChange()
    }
  },
  created () {
    this.routeChange()
  },
  mounted () {

  },
  methods: {
    routeChange () {
      let path = this.$route.path
      if (path === '/' || path === '/index' || path === '/myCourse'|| path === '/message'|| path === '/me') {
        this.showFootTab = true
      } else {
        this.showFootTab = false
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-regular-text;
  //margin-top: 60px;

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }

  .main{
    margin-bottom:160px;
  }
}
</style>
