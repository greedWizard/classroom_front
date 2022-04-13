<template>
  <div class="home">
    <h1>Welcome to ClassRoomMates!</h1>
    <hr>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
      Ut tempore eius asperiores voluptatum est? Consequuntur veniam pariatur 
      omnis eaque. Hic possimus ea facere assumenda alias rem officia, voluptatem aut adipisci!</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'home',
    methods: {
      ...mapActions({
        setTab: 'tabs/setTab'
      })
    },
    async beforeMount() {
      this.setTab('home')
    }
}
</script>
