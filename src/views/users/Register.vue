<template>
  <div>
    <Register />
  </div>
</template>

<script>
import Register from '@/components/users/Register.vue' 
import { mapActions } from 'vuex'

export default {
    components: {
        Register,
    },
    name: 'registration',
    methods: {
      ...mapActions({
        setTab: 'tabs/setTab'
      })
    },
    async beforeMount() {
      this.setTab('registration')
    }
}
</script>

<style>

</style>