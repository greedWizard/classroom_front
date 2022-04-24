<template>
  <div>
      <h1>You've been log out!</h1>
  </div>
</template>

<script>
export default {
    async created() {
        localStorage.removeItem('accessToken')
        this.$router.push({name: 'Home'})
    }
}
</script>

<style>

</style>