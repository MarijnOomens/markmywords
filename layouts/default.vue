<template>
  <v-app>
    <UIMenuBar />
    <nuxt class="mb-5"/>
    <UIFooter />
  </v-app>
</template>

<script>
import UIFooter from '~/components/UIFooter.vue';
import UIMenuBar from '~/components/UIMenuBar.vue';
export default {
  components: {
    UIFooter,
    UIMenuBar
  }
}
</script>