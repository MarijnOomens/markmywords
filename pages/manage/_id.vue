<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          autofocus
          counter="30"
          required
          v-model="title"
          :rules="rules"
          label="Title"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" md="2">
        <v-select
          outlined
          v-model="firstLanguage"
          hide-details="true"
          :items="languages"
          label="From"
          required
        ></v-select>
      </v-col>
      <v-col cols="6" md="2">
        <v-select
          outlined
          v-model="secondLanguage"
          hide-details="true"
          :items="languages"
          label="To"
          required
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-divider class="mt-3 mb-3" />
      </v-col>
    </v-row>
    <div v-for="word in words.lang1" :key="word.id">
      <v-row justify="center">
        <v-col cols="6" md="2">
          <v-text-field
            v-model="word.word"
            outlined
            hide-details="true"
            :label="firstLanguage"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model="words.lang2[word.id].word"
            outlined
            hide-details="true"
            :label="secondLanguage"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-btn large color="secondary" @click="addWord()">Add word</v-btn>
        <v-btn class="ml-2" large color="green" @click="save()">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ route, params }) {
    const id = route.params.id;

    return { id };
  },
  mounted() {
    const lists = JSON.parse(localStorage.getItem("lists"));
    const list = lists[this.id];
    this.lists = lists;
    this.list = list;
    this.words.lang1 = list.lang1.words;
    this.words.lang2 = list.lang2.words;

    this.title = list.title;
    this.firstLanguage = list.lang1.code;
    this.secondLanguage = list.lang2.code;
  },
  methods: {
    addWord() {
      if (this.words.lang1[0]) {
        this.words.lang2.push({ id: this.words.lang2.length, word: "" });
        this.words.lang1.push({ id: this.words.lang1.length, word: "" });
      } else {
        this.words.lang2.push({ id: 0, word: "" });
        this.words.lang1.push({ id: 0, word: "" });
      }
    },
    save() {
      const lists = this.lists;
      let list = this.list;

      list.title = this.title;
      list.lang1.code = this.firstLanguage;
      list.lang2.code = this.secondLanguage;

      list.lang1.words = this.words.lang1;
      list.lang2.words = this.words.lang2;

      lists[list.id] = list;

      localStorage.setItem("lists", JSON.stringify(lists));

      this.$router.push({ name: "manage" });
    }
  },
  data: () => {
    return {
      lists: [],
      list: {},
      title: "",
      rules: [v => v.length <= 20 || "Max 20 characters"],
      firstLanguage: "",
      secondLanguage: "",
      languages: [
        "English",
        "French",
        "Spanish",
        "Arabic",
        "Mandarin",
        "Russian",
        "Portuguese",
        "German",
        "Japanese",
        "Hindi",
        "Malay",
        "Persian",
        "Swahili",
        "Tamil",
        "Italian",
        "Dutch",
        "Bengali",
        "Turkish",
        "Vietnamese",
        "Polish",
        "Javaense",
        "Punjabi",
        "Thai",
        "Korean"
      ],
      words: { lang1: [], lang2: [] }
    };
  }
};
</script>
