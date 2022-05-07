<template>
<div>
    <div>
        <h3>{{ room.name }}</h3> <br>
        <h5 class="mb-4 text-muted">
            {{ room.description }}
            <button
                href="#"
                class="btn btn-info btn-sm mb-4"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#participationsModal"
                @click="getParticipations($route.params.id)"
            >
                Show Members &#128101; {{ room.participations_count }}
            </button>
        </h5>
        <ParticipationsList :participations="participations"/>
    <div>
    <div v-if="canModerate">
        <a>Link to join:
            <input type="text" disabled :value="join_link">
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
                </a> <hr>
                <div class="list-group">
                    <div v-for="material in materials" :key="material.id">
                        <RoomPostItem
                            :roomPost="material" :canModerate="canModerate"
                        />
                    </div>
                </div>
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
                </a> <hr>
                <div class="list-group">
                    <div v-for="homework in homeworks" :key="homework.id">
                        <RoomPostItem
                            :roomPost="homework" :canModerate="canModerate"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import RoomPostItem from '@/components/posts/RoomPostItem.vue'
import ParticipationsList from '@/components/participations/ParticipationsList.vue'
import { mapActions, mapGetters } from 'vuex'


export default {
    components: {
        RoomPostItem,
        ParticipationsList,
    },
    data() {
        return {
            join_link: window.location.host + this.$router.resolve(
                { name: 'room-join', params: { join_slug: this.room.join_slug } }
            ).fullPath,
            copied: false,
        }
    },
    computed: {
        canModerate() {
            return this.room.author.id === this.currentUser.id
        },
        ...mapGetters({
            participations: 'participations/items',
        })
    },
    methods: {
        async copyJoinLink() {
            try {
                await navigator.clipboard.writeText(this.join_link)
                this.copied = true
            } catch(e) {
                console.error(e)
            }
        },
        ...mapActions({
            getParticipations: 'participations/getParticipations',
        })
    },
    props: {
        room: Object,
        homeworks: Array,
        materials: Object,
        currentUser: Object,
    },
}
</script>

<style>

</style>