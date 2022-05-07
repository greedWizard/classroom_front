<template>
<div>
    <h2>Create new room post</h2>
    <button
        class="btn btn-outline-secondary btn-sm"
        @click="$router.push({name: 'room-detail', params: { id: $route.params.roomId }})"
    >Return to room</button>
    <hr>
    <section class="vh-100">
        <div class="container">
            <div class="row d-flex align-items-center">
                <div class="col-md-7 col-lg-5 col-xl-5 ">
                    <label for="exampleFormControlSelect1" class="mb-2">Post type </label>
                    <select v-model="postType" class="form-control mb-2" id="exampleFormControlSelect1">
                        <option>Material</option>
                        <option>Homework</option>
                    </select>
                    <div class="mb-3">
                        <label
                            for="exampleFormControlInput1"
                            class="form-label"
                        >
                            *Title <span>{{ errors.title }}</span>
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            :placeholder="'Enter your title'"
                            v-model="title"
                        >
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleFormControlInput1"
                            class="form-label"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            :placeholder="'Enter your description'"
                            v-model="description"
                        >
                    </div>
                    <div class="mb-4">
                        <label for="textArea" class="mb-2">Text</label>
                        <textarea
                            v-model="text"
                            class="form-control"
                            id="textArea"
                            rows="15"
                            placeholder="Text"
                        ></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="formFileSm" class="form-label">Add attachments</label>
                        <input
                            class="form-control form-control-sm"
                            id="formFileSm"
                            type="file"
                            ref="attachments"
                            @change="handleFiles"
                            multiple
                        >
                    </div>
                    <div class="mb-3">
                        <AttachmentsList
                            :attachments="attachments"
                            :allowEdit="true"
                            @remove="removeAttachment"
                        />
                    </div>
                    <div class="mb-4">
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="handlePostCreate"
                            :disabled="!postType"
                        >Create post</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AttachmentsList from '@/components/roomposts/AttachmentsList'


export default {
    components: {
        AttachmentsList
    },
    data() {
        return {
            postType: '',
            title: '',
            text: '',
            description: '',
            attachments: [],
        }
    },
    computed: {
        ...mapGetters({
            errors: 'roomPosts/errors',
            roomPost: 'roomPosts/item',
        })
    },
    methods: {
        ...mapActions({
            createRoomPost: 'roomPosts/create',
            attachFiles: 'roomPosts/attachFilesToRoomPost',
        }),
        async handlePostCreate() {
            if(this.postType === 'Material') {
                const requestBody = {
                    title: this.title,
                    text: this.text,
                    description: this.description,
                    room_id: this.$route.params.roomId
                }
                await this.createRoomPost(requestBody)
                
                if(Object.keys(this.errors).length == 0) {
                    const attachmentRequest = {
                        roomPostId: this.roomPost.id,
                        requestBody: {
                            attachments: this.attachments,
                        },
                    }
                    this.attachFiles(attachmentRequest)
                    alert('Create success')
                }
            }
        },
        async removeAttachment(attachment) {
            this.attachments = this.attachments.filter(e => e != attachment)
        },
        async handleFiles() {
            this.attachments = this.attachments.concat(Array.from(this.$refs.attachments.files))
            console.log(this.attachments)
        }
    }
}
</script>

<style>

</style>