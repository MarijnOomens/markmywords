<template>
<v-container>
  <v-row dense justify="center">
    <v-col md="6">
      <v-card
            color="#385F73"
            dark
            v-for="list in lists" :key="list.id" class="mb-4"
          >
            <v-card-title class="headline">{{list.title}}<v-checkbox v-model="random[list.id]" class="ml-auto mr-3" label="Random"></v-checkbox></v-card-title>

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
      const list = this.lists.find(l => l.id === id);
      if(this.random[id]) {
        this.shuffle(list.lang1.words, list.lang2.words);
      }
      this.changeList(list);
      this.$router.push({ name: 'lists-id', params: { id: id } });
    },
    shuffle(array, array2) {
      let currentIndex = array.length, temporaryValue, temporaryValue2, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      temporaryValue2 = array2[currentIndex];
      array[currentIndex] = array[randomIndex];
      array2[currentIndex] = array2[randomIndex];
      array[randomIndex] = temporaryValue;
      array2[randomIndex] = temporaryValue2;
  }

  return array;
}
  },
  created() {
    this.lists.forEach(list => {
      this.random.push(true);
    });
  },
  data: () => {
    return {
      random: []
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