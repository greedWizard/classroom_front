<template>
  <div>
      <LogIn />
  </div>
</template>

<script>
import LogIn from '@/components/users/LogIn.vue'
import { mapActions } from 'vuex'

export default {
    components: {
        LogIn,
    },
    methods: {
      ...mapActions({
        setTab: 'tabs/setTab'
      })
    },
    async beforeMount() {
      this.setTab('login')
    }
}
</script>

<style>

</style>