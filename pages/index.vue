<template>
<v-container fluid>
  <v-row justify="center">
    <v-col cols="6">
      <v-card
          color="#385F73"
          dark
          v-for="list in lists" :key="list.id" class="mb-4">
          <v-list-item-content>
            <v-card-title class="pl-3">{{list.title}}</v-card-title>
            <v-list-item-subtitle class="pl-3">{{list.lang1.code}} >> {{list.lang2.code}} - {{list.lang1.words.length}} words</v-list-item-subtitle>

            <v-card-actions>
              <v-btn text @click="goToList(list.id)">Start now</v-btn>
            </v-card-actions>
          </v-list-item-content>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

const getLists = () => import('~/data/lists.json').then(m => m.default || m);

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async asyncData({ req }) {
    const lists = await getLists();

    return { lists };
  },
  methods: {
    goToList(id) {
      this.$router.push({ name: 'lists-id', params: { id: id } });
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  padding: 0;
}
</style>