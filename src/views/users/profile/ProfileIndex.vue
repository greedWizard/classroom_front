<template>
  <div>
      <h2>Profile</h2>
      <router-view></router-view>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import store  from '@/store'
// import router from '@/router'

export default {
    beforeRouteEnter (to, from, next) {
      store.dispatch('users/getCurrentUser').then(
        () => {
          next()
        }
      ).catch(error => { console.error(error); next('users/login') })
    },
}
</script>

<style>

</style>