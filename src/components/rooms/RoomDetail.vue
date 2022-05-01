<template>
  <div>
      <div>
        <h3>{{ room.name }}</h3> <br>
        <h5 class="mb-4 text-muted">{{ room.description }}</h5>
      <div>
    <div v-if="canModerate">
        <a>Link to join:
            <input type="text" disabled :value="join_link">
            <button class="btn btn-secondary btn-sm mr-4" @click="copyJoinLink">Copy</button>
            <template v-if="copied" class="mr-4" >Copied!</template>
        </a>
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
                    <div v-for="material in materials.items" :key="material.id">
                        <MaterialItem
                            :material="material" :canModerate="canModerate"
                        />
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
            copied: false,
        }
    },
    computed: {
        canModerate() {
            return this.room.author.id === this.currentUser.id
        }
    },
    methods: {
        async copyJoinLink() {
            try {
                await navigator.clipboard.writeText(this.join_link)
                this.copied = true
            } catch(e) {
                console.error(e)
            }
        },
    },
    props: {
        room: Object,
        homeworks: Array,
        materials: Object,
        currentUser: Object,
    },
}
</script>

<style>

</style>