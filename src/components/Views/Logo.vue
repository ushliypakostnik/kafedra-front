<template>
  <div class="logo">
    <img
      src="../../assets/logo.png"
      width="60px"
      class="pulse-slow"
      alt="Vue logo">
    <h1>{{ test }}</h1>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('utils');
export default {
  name: 'Logo',

  computed: {
    ...mapGetters({
      test: 'test',
    }),
  },
};
</script>

<style lang="scss" scoped>
  @import "@/styles/_stylebase.scss";

  .logo {
    padding-top: 40px;
    text-align: center;

    h1 {
      margin-top: 0;
    }
  }
</style>
