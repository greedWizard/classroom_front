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
                                name: 'roomPost-create',
                                params: { roomId: room.id }
                            })"
                        >+</button>
                    </h4>
                </a>
                <div class="list-group">
                    <div v-for="roomPost in roomPosts.items" :key="roomPost.id">
                        <RoomPostItem
                            :roomPost="roomPost" :canModerate="canModerate"
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
                        <RoomPostItem :homework="homework" />
                    </div>
                </div>
            </div>
    </div>
</div>
</template>

<script>
import RoomPostItem from '@/components/posts/RoomPostItem.vue'

export default {
    components: {
        RoomPostItem,
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
        roomPosts: Object,
        currentUser: Object,
    },
}
</script>

<style>

</style>