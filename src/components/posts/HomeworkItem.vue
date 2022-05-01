<template>
  <div>
    <a
        href="#"
        class="list-group-item list-group-item-action"
        v-for="homework in homeworks"
        :key="homework.id"
    >
        {{ homework.title }}
    </a>
  </div>
</template>

<script>
export default {
    props: {
        homework: Object,
    }
}
</script>

<style>

</style>