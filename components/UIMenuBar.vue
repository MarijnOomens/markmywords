<template>
    <div>
        <v-app-bar dense >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title><nuxt-link to="/">MarkMyWords</nuxt-link></v-toolbar-title>
            <v-spacer />
            <v-switch
                v-model="$vuetify.theme.dark"
                hide-details
                inset
                label="Dark theme">
            </v-switch>
        </v-app-bar>
    </div>
</template>

<style>
a, a:active, a:visited, a:hover {
    text-decoration: none;
    color: black;
}
</style>