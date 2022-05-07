<template>
<div class="list-group">
    <div>
        <div
            class="list-group-item list-group-item-action"
            v-for="attachment in attachments"
            :key="attachment"
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
export default {
    props: {
        attachments: Array,
        allowEdit: Boolean,
    }
}
</script>

<style>

</style>