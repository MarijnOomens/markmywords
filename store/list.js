export const strict = false;
export const state = () => ({
    list: {}
})

export const getters = {
    getList(state) {
        return state;
    }
}

export const mutations= {
    changeList(state, newList) {
        state.list = newList;
    },
    addWordsToStack(state, { word1, word2 }) {
        // word1.id = state.list.lang1.words.length + 1;

        // word1.id = state.list.lang2.words.length + 1;

        state.list.lang1.words.push(word1);
        state.list.lang2.words.push(word2);
    }
}

export const actions = {
    changeList({ commit }, newList) {
        commit('changeList', newList);
    },
    addWordsToStack({ commit }, { word1, word2 }) {
        commit('addWordsToStack', { word1, word2 });
    }
}