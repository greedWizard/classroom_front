<template>
<div class="list-group">
    <div>
        <div
            class="list-group-item list-group-item-action"
            v-for="attachment in attachments"
            :key="attachment"
        >
            <div 
                class="d-flex justify-content-start"
                @click="startDownload(attachment)"
            >
                <img src="@/images/icons/file.svg"> {{ attachment.name || attachment.filename }}
            </div>
            <div class="d-flex justify-content-end" v-if="allowEdit">
                <button
                    class="btn btn-dark btn-sm"
                    @click="removeAttachment(attachment)"
                >Remove</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { downloadFromBlob } from '@/logic/utils.js'
import store  from '@/store'


export default {
    props: {
        allowEdit: Boolean,
    },
    computed: {
        ...mapGetters({
            attachmentBlob: 'attachments/item',
            attachments: 'attachments/items',
        })
    },
    methods: {
        ...mapActions({
            getAttachment: 'attachments/get',
            deleteAttachment: 'attachments/delete',
        }),
        async startDownload(attachment) {
            if(attachment.id) {
                await this.getAttachment(attachment.id)
                await downloadFromBlob(this.attachmentBlob, attachment.filename)
            }
        },
        async removeAttachment(attachment) {
            if(attachment.id) {
                await this.deleteAttachment(attachment.id)
            } 
            store.commit('attachments/SET_ITEMS', this.attachments.filter(e => e != attachment))
        }
    }
}
</script>

<style>

</style>