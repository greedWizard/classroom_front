<template>
  <div>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        teacherMode: Boolean
    },
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
        })
    }
}
</script>

<style>

</style>