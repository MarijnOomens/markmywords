<template>
  <v-container>
    <v-row justify="center">
      <h1>Create new list</h1>
    </v-row>
    <form>
      <v-row class="mt-4" justify="center">
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
          <v-btn large color="primary" @click="createList()">Create</v-btn>
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      title: "",
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
      rules: [v => v.length <= 30 || "Max 30 characters"]
    };
  },
  methods: {
    createList() {
      const title = this.title;
      const firstLanguage = this.firstLanguage;
      const secondLanguage = this.secondLanguage;
      if (title && firstLanguage && secondLanguage) {
        const newList = {
          title: title,
          lang1: firstLanguage,
          lang2: secondLanguage
        };

        localStorage.setItem("lists", JSON.stringify(newList));
        this.$router.push({ name: "manage" });
      }
    }
  }
};
</script>