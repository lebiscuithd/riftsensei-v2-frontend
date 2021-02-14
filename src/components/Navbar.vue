<template>
    <v-app-bar
      app
      color="blue-grey darken-4"
      flat
      dark
    >
      <v-container class="py-0 fill-height">
        <v-spacer></v-spacer>
            <template v-if="authenticated">
                <v-btn
                    text
                    color="white"
                    class="mx-2"
                    small
                    @click="signOut"
                >
                    signout
                </v-btn>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    color="white"
                    class="mx-2"
                    small
                    to="/dashboard"
                >
                    dashboard
                </v-btn>
                    <p class="my-auto ml-10">
                        Hi, {{ authuser.username }} !
                    </p>
                <v-avatar
                    class="ml-3"
                    color="teal darken-1"
                    size="32"
                >
                    <span class="white--text headline">{{ authuser.username[0]}}</span>
                </v-avatar>
            </template>
            <template v-else>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    color="white"
                    to="/login"
                    class="mx-2"
                    small
                >
                    login
                </v-btn>
                <v-btn
                    active-class="teal--text text--accent-2"
                    text
                    color="white"
                    to="/register"
                    class="mx-2"
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
</style>
