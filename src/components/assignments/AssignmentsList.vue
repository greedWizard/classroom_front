<template>
  <div>
      <div v-if="assignments.length === 0">
          <h3>No assignments</h3>
      </div>
      <div v-for="assignment in assignments" :key="assignment.id">
          <AssignmentListItem :assignment="assignment" />
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AssignmentListItem from '@/components/assignments/AssignmentListItem.vue'

export default {
    components: {
        AssignmentListItem
    },
    computed: {
        ...mapGetters({
            assignments: 'assignments/items',
        })
    }
}
</script>

<style>

</style>