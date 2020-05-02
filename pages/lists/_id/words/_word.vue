<template>
<v-layout justify-center align-center>
    <v-container justify-center align-center>
        <h1>{{word}}</h1>
    </v-container>
</v-layout>
</template>

<script>
const getLists = () => import('~/data/lists.json').then(m => m.default || m);

export default {
    async asyncData({ req, route }) {
        const lists = await getLists();
        const list = lists.find(l => l.id === route.params.id);
        const word = list.lang1.words[route.params.word].word;

        return { list, word };
    }
}
</script>