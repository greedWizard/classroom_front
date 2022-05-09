<template>
<div class="list-group mb-4">
    <div v-for="roomPost in typedPosts" :key="roomPost.id">
        <RoomPostItem
            :roomPost="roomPost"
        />
    </div>
</div>
</template>

<script>
import RoomPostItem from '@/components/roomposts/RoomPostItem.vue'
import { mapGetters } from 'vuex'


export default {
    components: {
        RoomPostItem,
    },
    data() {
        return {
            filtered: [],
        }
    },
    computed: {
        ...mapGetters({
            roomPosts: 'roomPosts/items'
        }),
        typedPosts() {
            return this.roomPosts.filter(e => e.type === this.type)
        },
    },
    props: {
        type: String,
    },
}
</script>

<style>

</style>