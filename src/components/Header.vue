<template>
  <div class="sidebar-container">
    <div class="sidebar-logo">
      Classroom
    </div>
    <ul class="sidebar-navigation">
      <li class="header">Navigation</li>
      <li>
        <a
          href="#"
          @click="$router.push({ name: 'Home' })"
          :class="{ current: currentTab === 'home' }"
        >
          <i class="fa fa-home" aria-hidden="true"></i> Homepage
        </a>
      </li>
      <!-- <li>
        <a href="#">
          <i class="fa fa-tachometer" aria-hidden="true"></i> About
        </a>
      </li> -->
      <template v-if="accessToken">
        <li class="header">Education</li>
        <li>
          <a
          href="#"
          @click="$router.push({name: 'room-list'})"
          :class="{ current: currentTab === 'rooms' }"
        >
            <i class="fa fa-users" aria-hidden="true"></i> Rooms
          </a>
        </li>
        <!-- <li>
          <a href="#">
            <i class="fa fa-cog" aria-hidden="true"></i> Homeworks
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-info-circle" aria-hidden="true"></i> Statistic
          </a>
        </li> -->
      </template>
      <li class="header">Profile</li>
      <!-- TODO: проверка на логин -->
      <template v-if="!accessToken">
        <li>
          <a
            href="#"
            :class="{ current: currentTab === 'registration' }"
            @click="$router.push({ name: 'registration' })"
          >
            <i
              class="fa fa-info-circle"
              aria-hidden="true"
            ></i> Registration
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="{ current: currentTab === 'login' }"
            @click="$router.push({ name: 'login' })"
          >
            <i
              class="fa fa-info-circle"
              aria-hidden="true"
            ></i>Log In
          </a>
        </li>
      </template>
      <template v-else>
        <li>
          <a
            href="#"
            :class="{ current: currentTab === 'currentUser' }"
            @click="$router.push({ name: 'currentUser' })"
          >
            <i
              class="fa fa-info-circle"
              aria-hidden="true"
            ></i>My Profile
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="logout"
          >
            <i
              class="fa fa-info-circle"
              aria-hidden="true"
            ></i>Log out
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Header',
    computed: {
      ...mapGetters({
        currentTab: 'tabs/currentTab',
        currentUser: 'users/currentUser',
        accessToken: 'users/accessToken',
      }),
      loggedIn() {
        return Boolean(localStorage.getItem('accessToken'))
      }
    },
    methods: {
      async logout() {
        this.$store.dispatch('users/logout')
        alert('home')
        this.$router.push({name: 'Home'})
      }
    },
    async mounted() {
      this.$forceUpdate()
    },
}
</script>

<style>
.sidebar-container {
  position: fixed;
  width: 220px;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #1a1a1a;
  color: #fff;
}

.content-container {
  padding-top: 20px;
}

.sidebar-logo {
  padding: 10px 15px 10px 30px;
  font-size: 20px;
  background-color: #2574A9;
}

.sidebar-navigation {
  padding: 0;
  margin: 0;
  list-style-type: none;
  position: relative;
}

.sidebar-navigation li {
  background-color: transparent;
  position: relative;
  display: inline-block;
  width: 100%;
  line-height: 20px;
}

.sidebar-navigation li a {
  padding: 10px 15px 10px 30px;
  display: block;
  color: #fff;
  text-decoration: none;
}

.sidebar-navigation li a.current {
  text-decoration: none;
  outline: none;
  background-color: #2574A9;
}

.sidebar-navigation li .fa {
  margin-right: 10px;
}

.sidebar-navigation li a:active,
.sidebar-navigation li a:hover,
.sidebar-navigation li a:focus {
  text-decoration: none;
  outline: none;
}

.sidebar-navigation li::before {
  background-color: #2574A9;
  position: absolute;
  content: '';
  height: 100%;
  left: 0;
  top: 0;
  -webkit-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
  width: 3px;
  z-index: -1;
}

.sidebar-navigation li:hover::before {
  width: 100%;
}

.sidebar-navigation .header {
  font-size: 12px;
  text-transform: uppercase;
  background-color: #151515;
  padding: 10px 15px 10px 30px;
}

.sidebar-navigation .header::before {
  background-color: transparent;
}
</style>