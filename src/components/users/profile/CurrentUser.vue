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
                        v-model="phone_number"
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
                    <input v-model="email" type="email" id="email" class="form-control form-control-lg" />
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
                        v-model="first_name"
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
                        v-model="last_name"
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
                        v-model="middleName"
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
                    <input v-model="password" type="password" id="password" class="form-control form-control-lg" />
                    <label class="form-label" for="password">*Password 
                        <span class="regError">
                            {{ updateErrors.password }}
                        </span>
                    </label>
                </div>

                <div class="form-outline mb-4">
                    <input v-model="repeat_password" type="password" id="password" class="form-control form-control-lg" />
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
                    <input v-model="confirm_password" type="password" id="confirm_password" class="form-control form-control-lg" />
                    <label class="form-label" for="confirm_password">*Password 
                        <span class="regError">
                            {{ updateErrors.confirm_password }}
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    class="btn btn-primary btn-lg btn-block ml-4 mb-4"
                    @click="updateProfile"
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
            getCurrentUser: 'users/getCurrentUser',
            updateUser: 'users/updateUser',
        }),
        async updateProfile(e) {
            e.preventDefault()
            const requestBody = {
                first_name: this.first_name,
                last_name: this.last_name,
                middleName: this.middleName,
                phone_number: this.phone_number,
                email: this.email,
                confirm_password: this.confirm_password,
            }
            console.log(requestBody)
            await this.updateUser(requestBody)
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'users/currentUser',
            updateErrors: 'users/registrationErrors',
        })
    },
    data() {
        return {
            first_name: '',
            last_name: '',
            middleName: '',
            confirm_password: '',
            phone_number: '',
            email: '',
            password: '',
            repeat_password: '',
        }
    },
    beforeMount() {
        this.first_name = this.currentUser.first_name;
        this.last_name = this.currentUser.last_name
        this.middleName = this.currentUser.middleName
        this.phone_number = this.currentUser.phone_number
        this.email = this.currentUser.email
    },
}
</script>

<style>

</style>