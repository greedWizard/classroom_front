<template>
<div class="main-wrapper">
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

            <div v-if="!isCapchaValid" class="capcha-container">
                <VueClientRecaptcha
                :value="capchaInputValue"
                @isValid="checkValidCaptcha"
                @getCode="getCaptchaCode" 
                />
                <input v-model="capchaInputValue" type="text" class="form-control form-control-lg" />
            </div>

            <button
                :disabled="isDisabled"
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
import VueClientRecaptcha from 'vue-client-recaptcha'
import store from '@/store'
import { ref } from "vue";

export default {
    components: {
        VueClientRecaptcha,
    },
    data() {
        return {
            name: '',
            description: '',
            isDisabled: false,
        }
    },
    setup() {
        const capchaInputValue = ref(null)
        const checkValidCaptcha = (value) => {
            store.commit('rooms/SET_CAPCHA_VALIDATION', value)
        };
        return {
            capchaInputValue,
            checkValidCaptcha,
        };
    },
    computed: {
        ...mapGetters({
            errors: 'rooms/errors',
            isCapchaValid: 'rooms/capchaValid'
        })
    },
    methods: {
        ...mapActions({
            createRoom: 'rooms/createRoom'
        }),
        async createNewRoom() {
            
            this.isDisabled = true
            setTimeout(() => this.isDisabled = false, 500);

            if (this.isCapchaValid){
                const requestBody = {
                name: this.name,
                description: this.description,
                }
                await this.createRoom(requestBody)

                if(Object.keys(this.errors).length == 0) {
                    alert('Room created')
                    this.$router.push({ name: 'room-list' })
                }
            }else{
                alert("Неправильно введена reCapcha")
            }
        }
    }
}
</script>

<style>
.capcha-container {
    margin-bottom: 20px;
}
</style>