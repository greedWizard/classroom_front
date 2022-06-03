<template>
  <section class="vh-100">

    <div class="container py-5 h-100">

        <div class="row d-flex align-items-center justify-content-center h-100">
        <h2 class="mb-4 ml-4">Log in to your account and start cooperating right now!</h2>

        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
            <span>Credentials</span>
            <hr>

            <div class="form-outline mb-4">
                <input v-model="email" type="email" id="email" class="form-control form-control-lg" />
                <label class="form-label" for="email">*Email address 
                    
                </label>
            </div>
            
            <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
            </div>

            <div class="form-outline mb-4">
                <input
                    v-model="phone_number"
                    type="tel" id="phone_number"
                    class="form-control form-control-lg"
                    pattern="\+7[0-9]{10}"
                />
                <label class="form-label" for="phone_number">*Phone number 
                </label>
            </div>

            <span>Password and EULA</span>
            <hr>

            <div class="form-outline mb-4">
                <input v-model="password" type="password" id="password" class="form-control form-control-lg" />
                <label class="form-label" for="password">*Password 
                </label> <br>
                <a href="#" class="mb-4">Reset password</a> <br>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="remember_me">
                <label class="form-label" for="accept_eula">Stay Logged In</label>
            </div>
            <hr>

            <!-- Submit button -->
            <p class="loginError">{{ error }}</p>

            <button
                type="submit"
                class="btn btn-primary btn-lg btn-block ml-4 mb-4"
                @click="loginUser"
            >Log In</button>
            </form>
        </div>

        <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="@/images/users/login.svg"
            class="img-fluid" alt="Phone image">
        </div>
        </div>
    </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            phone_number: '',
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters({
            user: 'users/currentUser',
            error: 'users/loginError',
            authenticationToken: 'users/authenticationToken'
        })
    },
    methods: {
        ...mapActions(
            {authenticateUser: 'users/authenticateUser'}
        ),
        async loginUser(e) {
            e.preventDefault()
            const requestBody = {
                phone_number: this.phone_number,
                email: this.email,
                password: this.password,
            }
            await this.authenticateUser(requestBody)

            if(!this.error) {
                this.$router.push({ 'name': 'currentUser' })
            }
        } 
    }
}
</script>

<style>
.loginError {
    color: #2e4ce6;
}
</style>