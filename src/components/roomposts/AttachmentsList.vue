<template>
<div class="list-group">
    <div>
        <div
            class="list-group-item list-group-item-action"
            v-for="attachment in attachments"
            :key="attachment"
            @click="startDownload(attachment)"
        >
            <div class="d-flex justify-content-start">
                <img src="@/images/icons/file.svg"> {{ attachment.name || attachment.filename }}
            </div>
            <div class="d-flex justify-content-end" v-if="allowEdit">
                <button
                    class="btn btn-dark btn-sm"
                    @click="$emit('remove', attachment)"
                >Remove</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { downloadFromBlob } from '@/logic/utils.js'


export default {
    props: {
        attachments: Array,
        allowEdit: Boolean,
    },
    computed: {
        ...mapGetters({
            attachment: 'attachments/item',
        })
    },
    methods: {
        ...mapActions({
            getAttachment: 'attachments/get'
        }),
        async startDownload(attachment) {
            if(attachment.id) {
                await this.getAttachment(attachment.id)
                console.log(this.attachment)
                await downloadFromBlob(this.attachment, attachment.filename)
            }
        },
    }
}
</script>

<style>

</style>