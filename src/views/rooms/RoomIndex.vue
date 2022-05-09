<template>
  <RouterView name="default" v-slot="{ Component, route }">
      <transition :name="route.meta.transition" mode="out-in" :duration="300" :key="route.path">
        <Suspense >
          <template #default>
            <component :is="Component" :key="route.path"/>
          </template>
          <template #fallback>
            <div>
              Loading...
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
    },
}
</script>

<style>

</style>