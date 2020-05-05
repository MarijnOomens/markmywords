<template>
    <div>
        <v-app-bar dense >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title><nuxt-link to="/">MarkMyWords</nuxt-link></v-toolbar-title>
            <v-spacer />
            <v-switch
                v-model="$vuetify.theme.dark"
                hide-details
                inset
                label="Dark theme">
            </v-switch>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group>
                    <nuxt-link to="/">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>
                    </nuxt-link>

                    <nuxt-link to="/manage">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-view-list</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Manage</v-list-item-title>
                    </v-list-item>
                    </nuxt-link>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            drawer: false
        }
    }
}
</script>

<style>
a, a:active, a:visited, a:hover {
    text-decoration: none;
    color: black;
}
</style>