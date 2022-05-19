<template>
<div>
    <h2>{{ roomPost.id ? 'Update' : 'Create' }} room post </h2>
    <button
        class="btn btn-outline-secondary btn-sm"
        @click="$router.push({name: 'room-detail', params: { id: $route.params.roomId }})"
    >Return to room</button>
    {{ errors }}
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
                            Description {{ errors.description }}
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
                    <AttachmentControl :multiple="false"/>
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
import AttachmentControl from '@/components/attachments/AttachmentControl.vue'
import store from '@/store'


export default {
    data() {
        return {
            queryType: this.$route.query.type || 'material'
        }
    },
    components: {
        AttachmentsList,
        AttachmentControl,
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
            updateRoomPost: 'roomPosts/update',
        }),
        async handlePostCreate() {
            const attachmentsToUpload = this.attachments.filter(attachment => !attachment.id)
            var isCreated = false;

            if(this.roomPost.id) {
                await this.updateRoomPost({
                    roomPostId: this.roomPost.id,
                    requestBody: {
                        title: this.roomPost.title,
                        text: this.roomPost.text,
                        description: this.roomPost.description,
                        type: this.roomPost.type,
                    }
                })
            } else {
                await this.createRoomPost({
                    title: this.roomPost.title,
                    text: this.roomPost.text,
                    description: this.roomPost.description,
                    room_id: this.$route.params.roomId,
                    type: this.roomPost.type.toLowerCase(),
                })
                if(this.roomPost.id) {
                    alert('Create success')
                    isCreated = true
                }
            }

            if(this.roomPost.id) {
                if(attachmentsToUpload.length > 0) {
                    const attachmentRequest = {
                        roomPostId: this.roomPost.id,
                        requestBody: {
                            attachments: attachmentsToUpload,
                        },
                    }

                    await this.attachFiles(attachmentRequest)
                }
            }

            if(isCreated) {
                store.commit(
                    'roomPosts/SET_ITEM',
                    { type: this.queryType }
                )
                store.commit(
                    'attachments/SET_ITEMS',
                    [],
                )
            }
        },
    }
}
</script>

<style>

</style>