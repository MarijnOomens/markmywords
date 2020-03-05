<template>
    <div>
        <v-app-bar dense >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
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