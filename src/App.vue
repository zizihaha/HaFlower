<template>
  <div id="app">
    <AlertMessage />
    <router-view />
  </div>
</template>

<script>
import AlertMessage from '@/components/frontend/AlertMessage.vue';

export default {
  name: 'app',
  components: {
    AlertMessage
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import './assets/all';
</style>
