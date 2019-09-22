<template>
  <div class="home">
    <Loading />
    <footer class="footer layout__footer" role="contentinfo">
      <address>
        <ul class="footer__links">
          <li>
            <a href="https://kafedra.bandcamp.com/" target="_blank">bandcamp</a>
          </li>
          <li>
            <a href="https://vk.com/kafedra_org" target="_blank">vkontakte</a>
          </li>
          <li>
             <a href="https://www.facebook.com/kafedra" target="_blank">facebook</a>
          </li>
          <li>
             <a href="https://www.instagram.com/kafedra_org/" target="_blank">instagram</a>
          </li>
        </ul>
        <div class="footer__copyright">© kafedra since 2007</div>
      </address>
    </footer>
  </div>
</template>

<script>
import Loading from '@/components/Utils/Loading.vue';

export default {
  name: 'Home',

  components: {
    Loading,
  },

  beforeCreate() {
    // this.$store.dispatch('utils/TEST_ACTION');
  },
};
</script>

<style lang="scss" scoped>
  @import "@/styles/_stylebase.scss";

</style>
