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
                <nuxt-link to="/"><v-btn color="primary">Home</v-btn></nuxt-link>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
const getLists = () => import('~/data/lists.json').then(m => m.default || m);
export default {
    async asyncData({ req, route }) {
        const lists = await getLists();
        const list = lists.find(l => l.id === route.params.id);

        return { list };
    }
}
</script>