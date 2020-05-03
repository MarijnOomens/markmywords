<template>
<v-layout justify-center align-center>
    <v-container justify-center align-center>
        <v-row justify="center">
            <h1>{{this.capitalise(word.word)}}</h1>
        </v-row>
        <v-row class="mt-4" justify="center">
            <v-col cols="4">
                <v-text-field outlined clearable autofocus :readonly="trueAnswer" label="Translation" id="input" v-model="input" :error="falseAnswer" :error-messages="errors" :success="trueAnswer"></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-btn v-if="!trueAnswer" large color="primary" @click="checkAnswer()">Submit</v-btn>
            <v-btn v-if="trueAnswer" large color="primary" @click="next(1)">Next</v-btn>
            <v-btn v-if="falseAnswer" class="ml-2" large color="secondary" @click="next(0)">Skip</v-btn>
        </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" bottom right :timeout="3000">{{snackbarText}}</v-snackbar>
</v-layout>
</template>

<script>
const getLists = () => import('~/data/lists.json').then(m => m.default || m);

export default {
    async asyncData({ req, route }) {
        const lists = await getLists();
        const list = lists.find(l => l.id === route.params.id);
        const word = list.lang1.words[route.params.word];

        return { list, word };
    },
    methods: {
        capitalise(word) {
            return word.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
        },
        checkAnswer() {
            if (this.input.toLowerCase() === this.list.lang2.words[this.word.id].word) {
                if (this.falseAnswer) {
                    this.falseAnswer = false;
                }
                this.trueAnswer = true;
                this.snackbarText = 'That was the correct answer!';
            } else {
                this.falseAnswer = true;
                this.snackbarText = 'That was the wrong answer!';
                this.tries++;
                if (this.errors[0]) {
                    this.errors[0] = 'Tries: ' + this.tries;
                } else {
                    this.errors.push('Tries: ' + this.tries);
                }
            }
            this.snackbar = true;
        },
        next(points) {
            this.$router.push({ name: "lists-id-words-word", params: { word: this.word.id + 1, id: this.list.id } });
        }
    },
    data: () => {
        return {
            input: '',
            falseAnswer: false,
            trueAnswer: false,
            snackbar: false,
            snackbarText: '',
            tries: 0,
            errors: []
        }
    }
}
</script>