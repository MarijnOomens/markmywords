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
          <v-btn large color="secondary" @click="createList()">Create</v-btn>
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
      rules: [v => v.length <= 20 || "Max 20 characters"]
    };
  },
  methods: {
    createList() {
      const title = this.title;
      const firstLanguage = this.firstLanguage;
      const secondLanguage = this.secondLanguage;
      if (title && firstLanguage && secondLanguage) {
        let lists = JSON.parse(localStorage.getItem("lists"));
        let id = 0;
        if(lists[0]) {
          id = lists.length;
        } else {
          lists = [];
        }

        const newList = {
          id: id,
          title: title,
          lang1: { code: firstLanguage, words: [] },
          lang2: { code: secondLanguage, words: [] }
        };

        lists.push(newList);

        localStorage.setItem("lists", JSON.stringify(lists));
        this.$router.push({ name: "manage-id", params: { id: newList.id } });
      }
    }
  }
};
</script>