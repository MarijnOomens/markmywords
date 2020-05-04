<template>
<v-container>
  <v-row dense justify="center">
    <v-col md="6">
      <v-card
            color="#385F73"
            dark
            v-for="list in lists" :key="list.id" class="mb-4"
          >
            <v-card-title class="headline">{{list.title}}</v-card-title>

            <v-card-subtitle>{{list.lang1.words.length}} words  <span style="font-weight: bold">- {{list.lang1.code.toUpperCase()}} > {{list.lang2.code.toUpperCase()}}</span></v-card-subtitle>

            <v-card-actions>
              <v-btn text @click="goToList(list.id)">Start</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

const getLists = () => import('~/data/lists.json').then(m => m.default || m);
import { mapActions } from 'vuex';
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
    ...mapActions({
      changeList: 'list/changeList'
    }),
    goToList(id) {
      this.changeList(this.lists.find(l => l.id === id));
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