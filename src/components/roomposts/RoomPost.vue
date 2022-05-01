<template>
  <div>
      <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        posts: Array,
    }
}
</script>

<style>

</style>