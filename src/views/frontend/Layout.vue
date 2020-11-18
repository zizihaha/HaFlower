<template>
  <div class="wrap">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';
export default {
  name: 'Layout',
  data() {
    return {};
  },
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss">
.wrap {
  position: relative;
  min-height: 100vh;
  padding-bottom: 290px;
}
</style>
