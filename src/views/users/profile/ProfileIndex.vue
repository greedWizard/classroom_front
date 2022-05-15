<template>
  <RouterView name="default" v-slot="{ Component, route }">
      <transition :name="route.meta.transition" mode="out-in" :duration="1" :key="route.path">
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
export default {
}
</script>

<style>

</style>