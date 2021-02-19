<template>
    <v-app-bar
      app
      color="backgroundDark"
      flat
      dark
    >
      <v-container class="py-0 fill-height">
        <router-link to="/">
          <img src="../assets/proto logo RIFT sensei.png" class="d-none d-md-flex" height="50px" alt="LogoRiftSensei">
        </router-link>
        <v-spacer></v-spacer>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    color="white"
                    class="mx-1"
                    small
                    to="/ads"
                >
                    ads
                </v-btn>
            <template v-if="authenticated">
                <v-btn
                active-class="teal--text text--accent-2"
                text
                color="white"
                class="mx-1 d-none d-md-flex"
                small
                to="/createAd"
                ><v-icon small class="mr-2">mdi-plus-circle</v-icon>
                create ad
                </v-btn>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    color="white"
                    class="mx-1 d-none d-md-flex"
                    small
                    to="/dashboard"
                >
                    dashboard
                </v-btn>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    outlined
                    color="white"
                    class="ml-5"
                    small
                    to="/market"
                >
                    <img class="my-auto mr-2" src="../assets/gem.svg" height="15px" alt=""> {{ authuser.wallet }}
                    <v-icon small class="ml-2">mdi-plus-circle</v-icon>
                </v-btn>
                    <p class="my-auto ml-5 text-overline d-none d-md-flex ">
                        Hi, {{ authuser.username }} !
                    </p>
                    <v-badge
                    bordered
                    bottom
                    color="primary"
                    dot
                    offset-x="10"
                    offset-y="10"
                  >
                <v-avatar
                    class="ml-3"
                    color="teal darken-1"
                    size="32"
                >
                    <span class="white--text headline">{{ authuser.username[0].toUpperCase()}}</span>
                </v-avatar>
                    </v-badge>
                <v-btn
                    text
                    color="white"
                    class="ml-1"
                    small
                    @click="signOut"
                >
                    <v-icon dense>mdi-logout</v-icon>
                </v-btn>
            </template>
            <template v-else>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    color="white"
                    to="/login"
                    class="mx-1"
                    small
                >
                    login
                </v-btn>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    color="white"
                    to="/register"
                    class="mx-1"
                    small
                >
                    register
                </v-btn>
            </template>
      </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),
    signOut () {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: 'Home'
        })
      })
    }
  }
}
</script>

<style scoped>
.disable-events {
  pointer-events: none
}
</style>
