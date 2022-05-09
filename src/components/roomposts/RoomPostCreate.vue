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
                    <label for="roompostSelect" class="mb-2">Post type </label>
                    <select
                        v-model="postType"
                        class="form-control mb-2"
                        id="roompostSelect"
                    >
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
                            :allowEdit="true"
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
import store from '@/store'


export default {
    props: {
        initialPost: Object,
    },
    components: {
        AttachmentsList
    },
    created() {
        store.commit('attachments/SET_ITEMS', this.initialPost.attachments || [])
    },
    data() {
        const queryType = this.$route.query.type || 'material'

        return {
            postType: queryType.charAt(0).toUpperCase() + queryType.slice(1),
            title: this.initialPost.title,
            text: this.initialPost.text,
            description: this.initialPost.description,
        }
    },
    computed: {
        ...mapGetters({
            errors: 'roomPosts/errors',
            roomPost: 'roomPosts/item',
            attachments: 'attachments/items',
        })
    },
    methods: {
        ...mapActions({
            createRoomPost: 'roomPosts/create',
            attachFiles: 'roomPosts/attachFilesToRoomPost',
        }),
        async handlePostCreate() {
            const requestBody = {
                title: this.title || '',
                text: this.text,
                description: this.description,
                room_id: this.$route.params.roomId,
                type: this.postType.toLowerCase(),
            }

            await this.createRoomPost(requestBody)

            if(Object.keys(this.errors).length === 0) {
                alert('Create success')
                if(this.attachments.length > 0) {
                    const attachmentRequest = {
                        roomPostId: this.roomPost.id,
                        requestBody: {
                            attachments: this.attachments,
                        },
                    }
                    await this.attachFiles(attachmentRequest)
                }
            }
        },
        async handleFiles() {
            store.commit(
                'attachments/SET_ITEMS',
                this.attachments.concat(Array.from(this.$refs.attachments.files))
            )
        },
    }
}
</script>

<style>

</style>