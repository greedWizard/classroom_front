<template>
  <div id="nav">
    <Header />
  </div>
  <div class="content-container">

  <div class="container-fluid">
      <!-- Main component for a primary marketing message or call to action -->
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
}
</script>

<style>
.content-container {
  padding-left: 220px;
}
</style>
