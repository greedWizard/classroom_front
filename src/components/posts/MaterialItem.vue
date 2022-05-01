<template>
  <div>
    <a
        href="#"
        class="list-group-item list-group-item-action"
        v-for="material in materials"
        :key="material.id"
    >
        {{ material.title }}
    </a>
  </div>
</template>

<script>
export default {
    props: {
        material: Object,
    }
}
</script>

<style>

</style>