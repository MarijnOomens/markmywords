<template>
    <v-layout justify-center align-center>
        <v-container justify-center align-center>
            <v-row justify="center">
                <h1>Word list completed!</h1>
            </v-row>
            <v-row justify="center">
                <p>{{ list.title }}</p>
            </v-row>
            <v-row justify="center">
                <nuxt-link to="/"><v-btn color="secondary">Home</v-btn></nuxt-link>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
export default {
    async asyncData({ req, route }) {
        const id = route.params.id;

        return { id };
    },
    created() {
        const lists = JSON.parse(localStorage.getItem("lists"));
        this.list = lists.find(l => l.id === this.id);
    },
    data: () => {
        return {
            list: {}
        }
    }
}
</script>