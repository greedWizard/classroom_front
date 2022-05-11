<template>
<div>
    <h2>Create new room post </h2>
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
                        v-model="roomPost.type"
                        class="form-control mb-2"
                        id="roompostSelect"
                    >
                        <option>material</option>
                        <option>homework</option>
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
                            v-model="roomPost.title"
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
                            v-model="roomPost.description"
                        >
                    </div>
                    <div class="mb-4">
                        <label for="textArea" class="mb-2">Text</label>
                        <textarea
                            v-model="roomPost.text"
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
                            :disabled="!roomPost.type"
                        >{{ roomPost.id ? 'Update' : 'Create' }} room post</button>
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
    data() {
        return {
            queryType: this.$route.query.type || 'material'
        }
    },
    components: {
        AttachmentsList
    },
    created() {
        store.commit('attachments/SET_ITEMS', this.roomPost.attachments || [])
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
                title: this.roomPost.title,
                text: this.roomPost.text,
                description: this.roomPost.description,
                room_id: this.$route.params.roomId,
                type: this.roomPost.type.toLowerCase(),
            }

            if(!this.roomPost.id) {
                await this.createRoomPost(requestBody)
                alert('Create success')
                store.commit(
                    'roomPosts/SET_ITEM',
                    { type: this.queryType }
                )
            }

            if(Object.keys(this.errors).length === 0) {
                if(this.attachments.length > 0) {
                    const attachmentRequest = {
                        roomPostId: this.roomPost.id,
                        requestBody: {
                            attachments: this.attachments.filter(attachment => !attachment.id),
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