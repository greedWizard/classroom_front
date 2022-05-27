<template>
  <div>
      <hr>
      <h3>Your profile info</h3>
      <div>
        <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex align-items-center  h-100">

            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form>
                <span>Credentials</span>
                <hr>

                <div class="form-outline mb-4">
                    <input
                        v-model="currentUser.phone_number"
                        type="tel" id="phone_number"
                        class="form-control form-control-lg"
                        pattern="\+7[0-9]{10}"
                    />
                    <label class="form-label" for="phone_number">*Phone number 
                        <span class="regError">
                            {{ updateErrors.phone_number }}
                        </span>
                    </label>
                </div>

                <div class="form-outline mb-4">
                    <input v-model="currentUser.email" type="email" id="email" class="form-control form-control-lg" />
                    <label class="form-label" for="email">*Email address 
                        <span class="regError">
                            {{ updateErrors.email }}
                        </span>
                    </label>
                </div>

                <span>Personal Info</span>
                <hr>

                <div class="form-outline mb-4">
                    <input
                        v-model="currentUser.first_name"
                        type="text" id="first_name"
                        class="form-control form-control-lg"
                    />
                    <label class="form-label" for="first_name">*First Name 
                        <span class="regError">
                            {{ updateErrors.first_name }}
                        </span>
                    </label>
                </div>

                <div class="form-outline mb-4">
                    <input
                        v-model="currentUser.last_name"
                        type="text" id="last_name"
                        class="form-control form-control-lg"
                    />
                    <label class="form-label" for="last_name">*Last Name 
                        <span class="regError">
                            {{ updateErrors.last_name }}
                        </span>
                    </label>
                </div>

                <div class="form-outline mb-4">
                    <input
                        v-model="currentUser.middle_name"
                        id="middle_name"
                        class="form-control form-control-lg"
                    />
                    <label class="form-label" for="middle_name">Middle Name 
                        <span class="regError">
                            {{ updateErrors.middle_name }}
                        </span>
                    </label>
                </div>

                <span>Password and EULA</span>
                <hr>

                <div class="form-outline mb-4">
                    <input v-model="currentUser.password" type="password" id="password" class="form-control form-control-lg" />
                    <label class="form-label" for="password">*Password 
                        <span class="regError">
                            {{ updateErrors.password }}
                        </span>
                    </label>
                </div>

                <div class="form-outline mb-4">
                    <input
                        v-model="currentUser.repeat_password"
                        type="password" id="repeat_password"
                        class="form-control form-control-lg"
                        :disabled="!currentUser.password"
                    />
                    <label class="form-label" for="repeat_password">*Repeat Password
                        <span class="regError">
                            {{ updateErrors.password }}
                        </span>
                    </label>
                </div>

                <hr>
                <div>
                    <p>
                        Registration Date: {{ currentUser.created_at }}
                    </p>
                    <p>
                        Last Update: {{ currentUser.updated_at }}
                    </p>
                </div>

                <div class="form-outline mb-4">
                    <input v-model="currentUser.confirm_password" type="password" id="confirm_password" class="form-control form-control-lg" />
                    <label class="form-label" for="confirm_password">*Confirm Password 
                        <span class="regError">
                            {{ updateErrors.confirm_password }}
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    class="btn btn-primary btn-lg btn-block ml-4 mb-4"
                    @click="updateProfile"
                    :disabled="disableAccept"
                >Accept</button>
                </form>
            </div>
          </div>
        </div>
        </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    methods: {
        ...mapActions({
            updateUser: 'users/updateUser',
        }),
        async updateProfile(e) {
            e.preventDefault()

            var requestBody = {}

            if(this.currentUser.password && this.currentUser.password) {
                Object.assign(requestBody, {
                    password: this.currentUser.password,
                    repeat_password: this.currentUser.repeat_password,
                })
                console.log(requestBody)
            }

            Object.assign(requestBody, {
                first_name: this.currentUser.first_name,
                last_name: this.currentUser.last_name,
                middle_name: this.currentUser.middle_name,
                phone_number: this.currentUser.phone_number,
                email: this.currentUser.email,
                confirm_password: this.currentUser.confirm_password,
            })
            await this.updateUser(requestBody)
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'users/currentUser',
            updateErrors: 'users/registrationErrors',
        }),
        disableAccept() {
            return !this.currentUser.confirm_password || (
                !this.currentUser.repeat_password && this.currentUser.password
            )
        },
    },
}
</script>

<style>

</style>