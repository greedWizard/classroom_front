<template>
    <CurrentUser />
</template>

<script>
import CurrentUser from '@/components/users/profile/CurrentUser.vue'
import store  from '@/store'
import { mapActions, mapGetters } from 'vuex'


export default {
    components: {
        CurrentUser,
    },
    computed: {
      ...mapGetters({
        currentUser: 'users/currentUser'
      })
    },
    async setup() {
      await store.dispatch('users/getCurrentUser')
      return {}
    },
    methods: {
      ...mapActions({
        setTab: 'tabs/setTab',
      })
    },
    async beforeMount() {
      this.setTab('currentUser')
    },
}
</script>

<style>

</style>