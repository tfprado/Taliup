<template>
  <div class="container mt-3">
    <template v-if="authenticated">
      <h1 class="text-center">Welcome {{ user.name }}</h1>
    </template>
    <template v-else>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="form.email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  } from "vuex";
export default {
  name: "singin",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
    submit() {
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: "dashboard",
        })
      }).catch(() => {
        console.log('failed')
      })
    },
  },
};
</script>
