<template>
<div>
    <div
        class="container"
        v-if="!isAuthor && assignmentStatus === 'assigned'"
    >
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
                <button class="btn btn-danger btn-sm">Reject</button>
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

export default {
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
            currentUser: 'users/currentUser',
            roomPost: 'roomPosts/item',
        }),
        isAuthor() {
            if(this.currentUser.id === this.roomPost.author.id) {
                return false
            }

            return true
        }
    }
}
</script>

<style>

</style>