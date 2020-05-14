<template>
  <v-container>
    <v-row dense justify="center">
      <v-col md="6">
        <div v-if="lists[0]">
          <v-card
            color="#385F73"
            dark
            v-for="list in lists"
            :key="list.id"
            class="mb-4"
          >
            <v-card-title class="headline"
              >{{ list.title
              }}<v-checkbox
                v-model="random[list.id]"
                class="ml-auto mr-3"
                label="Random"
              ></v-checkbox
            ></v-card-title>

            <v-card-subtitle
              >{{ list.lang1.words.length }} words
              <span style="font-weight: bold"
                >- {{ list.lang1.code.toUpperCase() }} >
                {{ list.lang2.code.toUpperCase() }}</span
              ></v-card-subtitle
            >

            <v-card-actions>
              <v-btn text @click="goToList(list.id)">Start</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="mt-5" v-else>
          <p class="text-center">
            You do not have any word lists, go to the "manage" tab in the menu
            to create one.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" bottom right :timeout="3000">{{
      snackbarText
    }}</v-snackbar>
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

import { mapActions } from "vuex";
export default {
  components: {
    Logo,
    VuetifyLogo
  },
  mounted() {
    let listsFromStorage = localStorage.getItem("lists");
    if (listsFromStorage) {
      this.lists = JSON.parse(listsFromStorage);
    } else {
      localStorage.setItem("lists", JSON.stringify([]));
      this.lists = JSON.parse(localStorage.getItem("lists"));
    }
    this.lists.forEach(list => {
      this.random.push(true);
    });
  },
  methods: {
    ...mapActions({
      changeList: "list/changeList"
    }),
    goToList(id) {
      const list = this.lists.find(l => l.id === id);
      if (list.lang1.words.length <= 0) {
        this.snackbarText = "This list doesn't have any words yet!";
        this.snackbar = true;
        return;
      }
      if (this.random[id]) {
        this.shuffle(list.lang1.words, list.lang2.words);
      }
      this.changeList(list);
      this.$router.push({ name: "lists-id", params: { id: id } });
    },
    shuffle(array, array2) {
      let currentIndex = array.length,
        temporaryValue,
        temporaryValue2,
        randomIndex;

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
  data: () => {
    return {
      random: [],
      lists: [],
      snackbar: false,
      snackbarText: ""
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  padding: 0;
}
</style>
