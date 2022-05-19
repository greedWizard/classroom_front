<template>
<div>
    <div class="container">
        <div v-if="assignment.status === 'assigned'" class="mb-4">
            <h3>
                {{ assignment.author.first_name }} {{ assignment.author.middle_name }} {{ assignment.author.last_name }}
                has assigned the homework
            </h3>
            <span>Checkout the files with homework and make your decision</span>
        </div>
        
        <div class="mb-4">
            <AttachmentsList :allowEdit="false" />
        </div>
        <div class="row mb-4">
            <div class="col">
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    :placeholder="'A few words why you reject the homework'"
                >
            </div>
            <div class="col d-grid gap-2">
                <button
                    class="btn btn-danger btn-sm"
                >
                    Reject
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input
                    type="number"
                    class="form-control"
                    id="title"
                    placeholder="Rate this work (0-5)"
                    max="5"
                    min="0"
                >
            </div>
            <div class="col d-grid gap-2">
                <button class="btn btn-primary btn-sm">Rate homework and mark as done</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AttachmentsList from '@/components/roomposts/AttachmentsList.vue'


export default {
    components: {
        AttachmentsList
    },
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
            roomPost: 'roomPosts/item',
        }),
    }
}
</script>

<style>

</style>