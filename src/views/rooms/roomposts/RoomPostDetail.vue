<template>
    <div>
        <RoomPost 
            :post="roomPost"
            :user="user"
        />
    </div>
</template>

<script>
import RoomPost from '@/components/roomposts/RoomPostDetail.vue'
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
            user: 'users/currentUser',
        })
    },
    async setup(){
        const route = useRoute()
        await store.dispatch('roomPosts/get', route.params.roomPostId)

        if(!store.getters['participations/my']) {
            await store.dispatch('participations/my', route.params.roomId)
        }
    },
}
</script>

<style>

</style>