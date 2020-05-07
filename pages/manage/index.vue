<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-list two-line subheader>
          <v-subheader>Word lists</v-subheader>
          <v-list-item-group color="primary">
            <v-divider />
            <div v-for="list in lists" :key="list.id">
              <v-list-item>
                <v-list-item-content @click="editList(list.id)">
                  <v-list-item-title>{{ list.title }}</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ list.lang1.words.length }} words</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon @click="showModal(list.id)">mdi-delete</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider />
            </div>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>

    <v-dialog max-width="600" v-model="deletePopup">
      <v-card>
        <v-card-title class="headline">Delete word list?</v-card-title>

        <v-card-text
          >Are you sure you want to delete this word list? It will be gone
          permanently and cannot be used again.</v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deletePopup = false"
            >No</v-btn
          >

          <v-btn color="green darken-1" text @click="deleteList()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn color="primary" class="mb-12" small dark absolute bottom right fab>
      <nuxt-link to="/manage/create"><v-icon>mdi-plus</v-icon></nuxt-link>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  mounted() {
    const rawList = localStorage.getItem("lists");
    if (rawList) {
      this.lists = JSON.parse(rawList);
    } else {
      this.lists = [];
    }
  },
  data: () => {
    return {
      deletePopup: false,
      lists: [],
      selected: null
    };
  },
  methods: {
    showModal(id) {
      this.deletePopup = true;
      this.selected = id;
    },
    deleteList() {
      let lists = this.lists;
      const index = lists.indexOf(lists.find(l => l.id === this.selected));
      if (index > -1) {
        lists.splice(index, 1);
      }

      localStorage.setItem("lists", JSON.stringify(lists));
      this.deletePopup = false;
    },
    editList(id) {
      this.$router.push({ name: "manage-id", params: { id: id } });
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
