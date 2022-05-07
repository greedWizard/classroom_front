<template>
    <div>
        <RoomPost 
            :post="roomPost"
            :type="'roomPost'"
        />
    </div>
</template>

<script>
import RoomPost from '@/components/posts/RoomPostDetail.vue'
import { mapGetters } from 'vuex'

import store  from '@/store'
import { useRoute } from 'vue-router'


export default {
    components: {
        RoomPost,
    },
    methods: {
    },
    computed: {
        ...mapGetters({
            roomPost: 'roomPosts/item',
        })
    },
    async setup(){
        const route = useRoute()
        await store.dispatch('roomPosts/getRoomPost', route.params.roomPostId)
        return {}
    },
    created() {
        console.log(this.roomPost)
    }
}
</script>

<style>

</style>