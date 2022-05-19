<template>
  <div>
    <div class="col-md-7 col-lg-5 col-xl-9">
        <h3>Turn in your homework</h3>
        <p class="mb-4">Attach files with your homework</p>
        <div class="mb-3">
            <AttachmentControl :multiple="true" />
            <AttachmentsList :allowEdit="true" />
        </div>
        <div class="d-grid gap-2">
            <button
                class="btn btn-outline-success btn-sm"
                type="button"
                @click="createAssignment"
            >
                Submit
            </button>
        </div>
    </div>
</div>
</template>

<script>
import AttachmentControl from '@/components/attachments/AttachmentControl.vue'
import AttachmentsList from '@/components/roomposts/AttachmentsList.vue'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
    components: {
        AttachmentControl,
        AttachmentsList,
    },
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
        })
    },
    methods: {
        async createAssignment() {
            await store.dispatch(
                'assignments/create',
                { assigned_room_post_id: this.$route.params.roomPostId }
            )
        }
    }
}
</script>

<style>

</style>