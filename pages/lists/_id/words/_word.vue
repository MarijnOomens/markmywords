<template>
<v-layout justify-center align-center>
    <v-container justify-center align-center>
        <v-row justify="center">
            <h1>{{this.capitalise(word.word)}}</h1>
        </v-row>
        <v-row class="mt-4" justify="center">
            <v-col cols="10" md="4">
                <v-text-field outlined clearable autofocus :error-count="100" :readonly="trueAnswer" label="Translation" id="input" v-model="input" :error="falseAnswer" :success="trueAnswer"></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-btn v-if="!trueAnswer" large color="primary" @click="checkAnswer()">Submit</v-btn>
            <v-btn v-if="trueAnswer" large color="primary" @click="next(1)">Next</v-btn>
            <v-btn v-if="falseAnswer" class="ml-2" large color="secondary" @click="next(0)">Skip</v-btn>
            <v-btn v-if="falseAnswer" class="ml-2" color="green" large @click="next(1)">Mark correct</v-btn>
        </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" bottom right :timeout="3000">{{snackbarText}}</v-snackbar>
</v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    async asyncData({ req, route }) {
        const counter = route.params.word;

        return { counter };
    },
    created() {
        this.list = this.getList.list;
        this.word = this.list.lang1.words[this.counter];
    },
    methods: {
        ...mapActions({
            addWordsToStack: 'list/addWordsToStack'
        }),
        capitalise(word) {
            console.log(this.word);
            return word.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
        },
        checkAnswer() {
            if (!this.input) {
                this.snackbarText = 'Please fill in a translation!';
                this.snackbar = true;
                return;
            }
            if (this.input.toLowerCase() === this.list.lang2.words[this.counter].word) {
                if (this.falseAnswer) {
                    this.falseAnswer = false;
                }
                this.trueAnswer = true;
                this.snackbarText = 'That was the correct answer!';
            } else {
                this.snackbarText = 'That was the wrong answer!';
                this.tries++;
                this.falseAnswer = true;
            }
            this.snackbar = true;
        },
        next(points) {
            if (points === 0) {
                this.addWordsToStack({ word1: this.word, word2: this.list.lang2.words[this.word.id] });
            }
            if (this.getList.list.lang1.words[this.counter + 1]) {
                this.$router.push({ name: "lists-id-words-word", params: { word: this.counter + 1, id: this.list.id } });
            } else {
                this.$router.push({ name: "lists-id-completed", params: { id: this.list.id } });
            }
            
        }
    },
    data: () => {
        return {
            word: '',
            list: {},
            input: '',
            falseAnswer: false,
            trueAnswer: false,
            snackbar: false,
            snackbarText: '',
            tries: 0
        }
    },
  computed: {
    ...mapGetters({
      getList: 'list/getList'
    })
  }
}
</script>