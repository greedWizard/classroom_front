<template>
<div class="card mb-4 border border-dark shadow">
  <div class="card-body h-100 row align-items-center">
    <div class="materialHeader mb-4">
      <h5 class="card-title mb-2 ">{{ material.title || 'Untitled'}}</h5>
      <span class="card-subtitle mb-4 text-muted">
        {{ moment(material.created_at).format('LLLL') }}
      </span>
      <p class="card-text mb-4">{{ material.description || 'No description' }}</p>
      <template v-if="material.text">
        <p v-if="material.text.length <= 100">{{ material.text }}</p>
        <p v-else-if="material.text.length > 100">{{ material.text.substring(0, 50) }}...</p>
      </template>
    </div>
    <template v-if="canModerate">
      <button class="btn btn-outline-success btn-sm mb-2 shadow-sm">Edit</button>
      <button
        @click="deleteMaterial(material)"
        class="btn btn-outline-danger btn-sm shadow-sm"
      >Delete</button>
    </template>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
    props: {
        material: Object,
        canModerate: Boolean,
    },
    data() {
      return {
        moment: moment,
      }
    },
    methods: {
      ...mapActions({
        deleteMaterial: 'materials/delete'
      }),
    }
}
</script>

<style>
.materialHeader {
  cursor: pointer;
}
</style>