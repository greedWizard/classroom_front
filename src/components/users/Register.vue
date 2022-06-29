<template>
  <div>
    <section class="vh-100">

    <div class="container py-5 h-100">

        <div class="row d-flex align-items-center justify-content-center h-100">
        <h2 class="mb-4 ml-4">Start your education proccess completely free today!</h2>

        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
            <span>Credentials</span>
            <hr>

            <div class="form-outline mb-4">
                <input
                    v-model="phone_number"
                    type="tel" id="phone_number"
                    class="form-control form-control-lg"
                    pattern="\+7[0-9]{10}"
                />
                <label class="form-label" for="phone_number">*Phone number 
                    <span class="regError">
                        {{ errors.phone_number }}
                    </span>
                </label>
            </div>

            <div class="form-outline mb-4">
                <input v-model="email" type="email" id="email" class="form-control form-control-lg" />
                <label class="form-label" for="email">*Email address 
                    <span class="regError">
                        {{ errors.email }}
                    </span>
                </label>
            </div>

            <span>Personal Info</span>
            <hr>

            <div class="form-outline mb-4">
                <input
                    v-model="first_name"
                    type="text" id="first_name"
                    class="form-control form-control-lg"
                />
                <label class="form-label" for="first_name">*First Name 
                    <span class="regError">
                        {{ errors.first_name }}
                    </span>
                </label>
            </div>

            <div class="form-outline mb-4">
                <input
                    v-model="last_name"
                    type="text" id="last_name"
                    class="form-control form-control-lg"
                />
                <label class="form-label" for="last_name">*Last Name 
                    <span class="regError">
                        {{ errors.last_name }}
                    </span>
                </label>
            </div>

            <div class="form-outline mb-4">
                <input
                    v-model="middle_name"
                    id="middle_name"
                    class="form-control form-control-lg"
                />
                <label class="form-label" for="middle_name">Middle Name 
                    <span class="regError">
                        {{ errors.middle_name }}
                    </span>
                </label>
            </div>

            <span>Password and EULA</span>
            <hr>

            <div class="form-outline mb-4">
                <input v-model="password" type="password" id="password" class="form-control form-control-lg" />
                <label class="form-label" for="password">*Password 
                    <span class="regError">
                        {{ errors.password }}
                    </span>
                </label>
            </div>

            <div class="form-outline mb-4">
                <input v-model="repeat_password" type="password" id="password" class="form-control form-control-lg" />
                <label class="form-label" for="repeat_password">*Repeat Password
                    <span class="regError">
                        {{ errors.password }}
                    </span>
                </label>
            </div>

            <div class="form-check form-check-inline">
                <input v-model="accept_eula" class="form-check-input" type="checkbox" id="accept_eula">
                <label class="form-label" for="accept_eula">Accept <a href="#">EULA </a>
                    <span class="regError">
                        {{ errors.accept_eula }}
                    </span>
                </label>
            </div>
                <VueClientRecaptcha
                    :value="capchaInputValue"
                    @isValid="checkValidCaptcha"
                />
                <input v-model="capchaInputValue" type="text" class="form-control form-control-lg" />
            <hr>

            <!-- Submit button -->
            <button
                type="submit"
                class="btn btn-primary btn-lg btn-block ml-4 mb-4"
                @click="completeRegistration"
            >Sign Up For Free</button>
            </form>
        </div>
        
            <div class="col-md-8 col-lg-7 col-xl-6">
                <img src="@/images/users/registration.svg"
                class="img-fluid" alt="Phone image">
            </div>
        </div>
    </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from "vue";
import VueClientRecaptcha from 'vue-client-recaptcha'
import store from '@/store'

export default {
    components: {
        VueClientRecaptcha
    },
    setup() {
        const capchaInputValue = ref(null)
        const checkValidCaptcha = (value) => {
            store.commit('users/SET_CAPCHA_VALIDATION', value)
        };
        return {
            capchaInputValue,
            checkValidCaptcha,
        };
    },
    data() {
        return {
            first_name: '',
            last_name: '',
            middle_name: '',
            accept_eula: false,
            phone_number: '',
            email: '',
            password: '',
            repeat_password: '',
        }
    },
    methods: {
        ...mapActions({
            registerUser: 'users/registerUser',
        }),
        async completeRegistration(e) {
            const requestBody = {
                first_name: this.first_name,
                last_name: this.last_name,
                password: this.password,
                repeat_password: this.repeat_password,
                phone_number: this.phone_number,
                email: this.email,
                middle_name: this.middle_name,
                accept_eula: this.accept_eula,
            }
            e.preventDefault()

            if (this.isCapchaValid){
                await this.registerUser(requestBody)

                if(Object.keys(this.errors).length == 0) {
                    alert('Registration Success! Check out your email to activate profile!')
                    this.$router.push({ name: 'login' })
                }
            }
            else{
                alert("Неправильно введена reCapcha")
            }
        }
    },
    computed: {
        ...mapGetters({
            user: 'users/currentUser',
            errors: 'users/registrationErrors',
            isCapchaValid: 'users/capchaValid'
        })
    },
}
</script>

<style>
.regError {
    color: #2e4ce6;
}
</style>