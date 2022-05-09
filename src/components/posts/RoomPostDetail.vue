<template>
<section class="vh-100">
    <div class="mb-4">
        <h3>{{ post.title }}</h3>
        <button
            class="btn btn-outline-secondary btn-sm"
            @click="$router.push({name: 'room-detail', params: { id: $route.params.roomId }})"
        >
            Return to room
        </button>
    </div> <hr>
    <hr>
    <div class="container">
        <div class="row d-flex align-items-center" >
            <div class="col-md-7 col-lg-5 col-xl-5 ">
                <div class="form-outline mb-4">
                    <h4>{{ post.description }}</h4>
                </div>
                <hr>

                <div v-if="post.text" class="row d-flex align-items-center">
                    <p>{{ post.text }}</p>
                </div>
                <div v-if="post.attachments.length">
                    <p>{{ post.attachments.length }} attached files</p>
                    <div class="form-outline mb-4">
                        <AttachmentsList 
                            :attachments="post.attachments" 
                            :allowEdit="user.id === post.author_id"
                        />
                    </div>
                </div>
                <div v-else>
                    <p>No files attached</p>
                </div>
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 ">
            </div>
        </div>
    </div>
</section>
</template>

<script>
import AttachmentsList from '@/components/roomposts/AttachmentsList'


export default {
    components: {
        AttachmentsList
    },
    props: {
        post: Object,
        type: String,
        user: Object,
    }
}
</script>

<style>

</style>