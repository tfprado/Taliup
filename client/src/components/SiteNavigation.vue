<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="nav-link">
            Home
          </router-link>
        </li>

        <template v-if="authenticated">
          <li class="nav-item">
            <router-link :to="{ name: 'dashboard' }" class="nav-link">
              Dashboard
            </router-link>
          </li>

          <li class="navbar-text">
            {{ user.name }}
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="signOut">Sign Out</a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),

    signOut () {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: 'home'
        })
      })
    },
  }
};
</script>