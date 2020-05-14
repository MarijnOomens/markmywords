<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-textarea
          outlined
          name="input"
          label="Paste or copy content as json"
          v-model="jsonList"
          hide-details
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-btn color="green save" @click="save()">Save</v-btn>
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

    this.jsonList = JSON.stringify(list);
  },
  data: () => {
    return {
      lists: [],
      list: {},
      jsonList: ""
    };
  },
  methods: {
    save() {
      const lists = this.lists;
      this.list = JSON.parse(this.jsonList);
      lists[this.id] = this.list;
      localStorage.setItem("lists", JSON.stringify(lists));
      this.$router.push({ name: "manage" });
    }
  }
};
</script>

<style scoped>
.save {
  color: white;
}
</style>
