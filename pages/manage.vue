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
                <v-list-item-content>
                  <v-list-item-title>{{list.title}}</v-list-item-title>
                  <v-list-item-subtitle>{{list.lang1.words.length}} words</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon @click="showModal()">mdi-delete</v-icon>
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

        <v-card-text>Are you sure you want to delete this word list? It will be gone permanently and cannot be used again.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text>No</v-btn>

          <v-btn color="green darken-1" text>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn color="primary" class="mb-12" small dark absolute bottom right fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
const getLists = () => import("~/data/lists.json").then(m => m.default || m);
export default {
  async asyncData({ req, route }) {
    const lists = await getLists();

    return { lists };
  },
  data: () => {
    return {
      deletePopup: false
    };
  },
  methods: {
    showModal() {
      this.deletePopup = true;
    }
  }
};
</script>