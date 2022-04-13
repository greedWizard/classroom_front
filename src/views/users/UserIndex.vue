<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
</style>