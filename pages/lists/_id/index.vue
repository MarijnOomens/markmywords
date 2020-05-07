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
        <v-btn large color="primary" @click="goToWord()">Start</v-btn>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    const lists = localStorage.getItem("lists");
    if (lists) {
      this.list = lists.find(l => l.id === route.params.id);
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
