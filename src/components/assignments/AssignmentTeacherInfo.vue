<template>
<div>
    <div class="container">
        <div class="mb-4">
            <h3 v-if="assignment.status === 'assigned'">
                <template v-if="assignment.id">
                    {{ assignment.author.first_name }} {{ assignment.author.middle_name }} {{ assignment.author.last_name }}
                </template>
                has assigned the homework
            </h3>
            <h3 v-if="assignment.status === 'changes requested'">
                <template v-if="assignment.id">
                    {{ assignment.author.first_name }} {{ assignment.author.middle_name }} {{ assignment.author.last_name }}
                </template>
                is still making changes in their homework
            </h3>
            <h3 v-if="assignment.status === 'done'">
                <template v-if="assignment.id">
                    {{ assignment.author.first_name }} {{ assignment.author.middle_name }} {{ assignment.author.last_name }}
                </template>
                has done their homework and got {{ assignment.rate }} / 5
            </h3>
            <span v-if="assignment.status === 'assigned'">
                Checkout the files with homework and rate or reject the work
            </span>
            <span v-else-if="assignment.status === 'changes requested'">
                Changes have been requested
            </span>
            <span v-else-if="assignment.status === 'done'">
                The homework has been rated with {{ assignment.rate }}
            </span> <br>
            <span
                v-if="assignment.comment"
                class="link-primary"
            >Your last remark was: "{{ assignment.comment }}"</span>
        </div>
        
        <div class="mb-4">
            <AttachmentsList :allowEdit="false" />
        </div>
        <div>
            <div class="row mb-4" v-if="assignment.status === 'assigned'">
                <div class="col">
                    <input
                        type="text"
                        class="form-control"
                        id="title"
                        :placeholder="'Explain why are you rejecting'"
                        v-model="comment"
                    >
                </div>
                <div class="col d-grid gap-2">
                    <button
                        class="btn btn-danger btn-sm"
                        @click="rejectHomework"
                    >
                        Reject
                    </button>
                </div>
            </div>
            <div class="row" v-if="assignment.status !== 'done'">
                <div class="col">
                    <input
                        type="number"
                        class="form-control"
                        id="title"
                        placeholder="Rate this work (0-5)"
                        max="5"
                        min="0"
                        v-model="rate"
                    >
                </div>
                <div class="col d-grid gap-2">
                    <button
                        class="btn btn-primary btn-sm"
                        @click="rateHomework"
                    >
                        Rate
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AttachmentsList from '@/components/roomposts/AttachmentsList.vue'
import store from '@/store'


export default {
    components: {
        AttachmentsList
    },
    data() {
        return {
            comment: '',
            rate: 3,
        }
    },
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
            roomPost: 'roomPosts/item',
        }),
    },
    methods: {
        async rejectHomework() {
            await store.dispatch('assignments/requestChanges', {
                assignmentId: this.assignment.id,
                requestBody: { comment: this.comment }
            })
        },
        async rateHomework() {
            await store.dispatch(
                'assignments/rateHomework', {
                assignmentId: this.assignment.id,
                requestBody: { rate: this.rate }
            })
        }
    }
}
</script>

<style>

</style>