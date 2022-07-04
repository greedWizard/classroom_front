<template>
<div>
    <div>
        <h3>{{ room.name }}</h3> <br>
        <h5 class="mb-4 text-muted">
            {{ room.description }}
        </h5>
        <button
            href="#"
            class="btn btn-info btn-sm mb-4"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#participationsModal"
            @click="getParticipations"
        >
            Показать участников &#128101; {{ room.participations_count }}
        </button>
        <button
        class="btn btn-info btn-sm mb-4 btn-margin"       
        @click="goToHomeworks"
        >
            Показать домашние работы &#128214; {{ room.participations_count }}
        </button>

        <ParticipationsList :participations="participations"/>
    <div>
    <div v-if="canModerate">
        <a>Link to join:
            <input type="text" disabled :value="joinLink">
            <button class="btn btn-secondary btn-sm mr-4" @click="copyJoinLink">Copy</button>
            <template v-if="copied" class="mr-4" >Copied!</template>
        </a>
    </div>
    </div>
    </div>
    <hr>
    <div class="row">
        <div class="d-flex w-50 justify-content-between">
            <div>
                <a>
                    <h4>
                        Materials
                        <button
                            class="btn btn-outline-success"
                            v-if="canModerate"
                            @click="$router.push({
                                name: 'roomPost-create',
                                params: { roomId: room.id },
                                query: { type: 'material' },
                            })"
                        >+</button>
                    </h4>
                </a>
                <RoomPostList 
                    :type="'material'"
                />
            </div>
        </div>
        <div class="d-flex w-50 justify-content-between">
            <div>
                <a>
                    <h4>
                        Homeworks
                        <button
                            class="btn btn-outline-success"
                            v-if="canModerate"
                            @click="$router.push({
                                name: 'roomPost-create',
                                params: { roomId: room.id },
                                query: { type: 'homework' },
                            })"
                        >+</button>
                    </h4>
                </a>
                <RoomPostList 
                    :type="'homework'"
                />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import RoomPostList from '@/components/roomposts/RoomPostList.vue'
import ParticipationsList from '@/components/participations/ParticipationsList.vue'
import { mapGetters } from 'vuex'
import store from '@/store'


export default {
    components: {
        ParticipationsList,
        RoomPostList,
    },
    data() {
        return {
            copied: false,
        }
    },
    computed: {
        ...mapGetters({
            participations: 'participations/items',
            canModerate: 'rooms/canModerate',
            room: 'rooms/item',
            currentUser: 'users/currentUser',
        }),
        joinLink() {
            return window.location.host + this.$router.resolve(
                { name: 'room-join', params: { join_slug: this.room.join_slug } }
            ).fullPath
        }
    },
    methods: {
        async copyJoinLink() {
            try {
                await navigator.clipboard.writeText(this.joinLink)
                this.copied = true
            } catch(e) {
                console.error(e)
            }
        },
        async getParticipations() {
            await store.dispatch('participations/getParticipations', this.$route.params.id)
        },
        goToHomeworks() {
            this.$router.push({ name: 'all-homeworks', params:{roomId: this.$route.params.id}})
        },
    },
}
</script>

<style scoped>
.btn-margin {
    margin-left: 20px;
}
</style>