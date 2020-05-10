<template>
  <v-layout justify-center align-center>
    <v-container justify-center align-center>
      <v-row justify="center">
        <h1>{{ list.title }}</h1>
      </v-row>
      <v-row justify="center">
        <p>Amount of words: {{ list.lang1.words.length }}</p>
      </v-row>
      <v-row justify="center">
        <v-btn large color="secondary" @click="goToWord()">Start</v-btn>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ route, params }) {
    const id = route.params.id;

    return { id: id };
  },
  created() {
    const lists = JSON.parse(localStorage.getItem("lists"));
    if (lists) {
      this.list = lists.find(l => l.id === this.id);
    }
  },
  methods: {
    goToWord() {
      this.$router.push({ name: "lists-id-words-word", params: { word: 0, id: this.list.id } });
    }
  },
  data: () => {
    return {
      list: {}
    }
  }
};
</script>
