<template>
  <CurrentUser />
</template>

<script>
import CurrentUser from '@/components/users/profile/CurrentUser.vue'
import { mapActions } from 'vuex'

export default {
    components: {
        CurrentUser,
    },
    methods: {
      ...mapActions({
        setTab: 'tabs/setTab'
      })
    },
    async beforeMount() {
      this.setTab('currentUser')
    },
}
</script>

<style>

</style>