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
            <v-btn large color="primary">Start</v-btn>
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