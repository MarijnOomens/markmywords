<template>
    <v-container fluid>
        <v-row justify="center">
            <h1>{{ list.title }}</h1>
        </v-row>
    </v-container>
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