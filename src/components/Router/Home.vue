<template>
  <div class="home">
    <Logo />
    <Loading />
  </div>
</template>

<script>
import Logo from '@/components/Views/Logo.vue';
import Loading from '@/components/Utils/Loading.vue';

export default {
  name: 'Home',

  components: {
    Logo,
    Loading,
  },

  mounted() {
    this.$store.dispatch('utils/TEST_ACTION');
  },
};
</script>

<style scoped>
  .home {
    min-height: 100vh;
  }
</style>
