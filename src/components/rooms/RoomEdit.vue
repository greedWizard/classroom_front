<template>
  <div>
        <section class="vh-100">
        <div class="mb-4">
            <p>
                Author: {{ room.author.first_name }} {{ room.author.last_name }}
            </p>
            <p>
                Created time: {{ room.created_at }}
            </p>
            <p>
                Updated at: {{ room.updated_at }}
            </p>
        </div>
        <hr>
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
                    @click="updateRoomById(room.id)"
                >Save</button>
            </div>
          </div>
        </div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        room: Object,
    },
    data() {
        return {
            name: this.room.name,
            description: this.room.description,
        }
    },
    computed: {
        ...mapGetters({
            errors: 'rooms/errors',
        })
    },
    methods: {
        ...mapActions({
            updateRoom: 'rooms/updateRoom'
        }),
        async updateRoomById(roomId) {
            const requestBody = {
                name: this.name,
                description: this.description,
            }
            await this.updateRoom({roomId: roomId, requestBody: requestBody})

            if(Object.keys(this.errors).length == 0) {
                alert('Room updated')
            }
        }
    },
}
</script>

<style>

</style>