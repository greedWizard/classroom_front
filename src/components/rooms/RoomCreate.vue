<template>
<div>
    <section class="vh-100">
    <div class="container">
        <div class="row d-flex align-items-center">
        <div class="col-md-7 col-lg-5 col-xl-5 ">
            <div class="form-outline mb-4">
                {{ errors.name }}
                <input
                    v-model="name"
                    type="text" id="name"
                    class="form-control form-control-lg"
                    placeholder="Name"
                />
                <hr>
                <input
                    v-model="description"
                    type="text" id="description"
                    class="form-control form-control-lg"
                    placeholder="Description"
                />
            </div>

            <button
                type="submit"
                class="btn btn-primary btn-lg btn-block ml-4 mb-4"
                @click="createNewRoom"
            >Create</button>
        </div>
        </div>
    </div>
    </section>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            name: '',
            description: '',
        }
    },
    computed: {
        ...mapGetters({
            errors: 'rooms/errors'
        })
    },
    methods: {
        ...mapActions({
            createRoom: 'rooms/createRoom'
        }),
        async createNewRoom() {
            const requestBody = {
                name: this.name,
                description: this.description,
            }
            await this.createRoom(requestBody)

            if(Object.keys(this.errors).length == 0) {
                alert('Room created')
                this.$router.push({ name: 'room-list' })
            }
        }
    }
}
</script>

<style>

</style>