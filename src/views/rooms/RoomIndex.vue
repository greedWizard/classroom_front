<template>
  <RouterView name="default" v-slot="{ Component, route }">
      <transition :name="route.meta.transition" mode="out-in" :duration="1" :key="route.path">
        <Suspense >
          <template #default>
            <component :is="Component" :key="route.path"/>
          </template>
          <template #fallback>
            <div class="spinner-border text-info centered" role="status">
              <span class="sr-only"></span>
            </div>
          </template>
        </Suspense>
      </transition>
    </RouterView>
</template>

<script>
import store  from '@/store'


export default {
    async beforeMount() {
      store.dispatch('tabs/setTab', 'rooms')
      if(!store.getters['users/currentUser']){
            await store.dispatch('users/getCurrentUser')
        }
    },
}
</script>

<style>

</style>