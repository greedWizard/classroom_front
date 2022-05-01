<template>
  <div>
      <div>
        <h3>{{ room.name }}</h3> <br>
        <p>{{ room.description }}</p>
      <div>
    <div v-if="canModerate">
        <h5>Link to join:
            {{ join_link }}
        </h5>
    </div>
      </div>
      </div>
      <hr>
      <div class="row">
          <div class="d-flex w-50 justify-content-between">
            <div>
                <a>
                    <h4>
                        Materials
                        <button
                            class="btn btn-outline-success"
                            v-if="canModerate"
                            @click="$router.push({
                                name: 'material-create',
                                params: { roomId: room.id }
                            })"
                        >+</button>
                    </h4>
                </a>
                <div class="list-group">
                    <div v-for="material in materials" :key="material.id">
                        <MaterialItem :material="material" />
                    </div>
                </div>
            </div>
          </div>
          <div class="d-flex w-50 justify-content-between">
                <a>
                    <h4>
                        Homeworks
                        <button
                            class="btn btn-outline-success"
                            v-if="canModerate"
                        >+</button>
                    </h4>
                </a>
                <div class="list-group">
                    <div v-for="homework in homeworks" :key="homework.id">
                        <HomeworkItem :homework="homework" />
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import HomeworkItem from '@/components/posts/HomeworkItem.vue'
import MaterialItem from '@/components/posts/MaterialItem.vue'

export default {
    components: {
        HomeworkItem, MaterialItem,
    },
    data() {
        return {
            join_link: window.location.host + this.$router.resolve(
                { name: 'room-join', params: { join_slug: this.room.join_slug } }
            ).fullPath,
        }
    },
    computed: {
        canModerate() {
            return this.room.author.id === this.currentUser.id
        }
    },
    props: {
        room: Object,
        homeworks: Array,
        materials: Array,
        currentUser: Object,
    },
}
</script>

<style>

</style>