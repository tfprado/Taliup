<template>
  <div>
    <h1 class="text-center">User Edit</h1>
    <form @submit.prevent="editUser()">
      <div class="alert alert-success" role="alert" v-if="successMessage">
        {{ successMessage }}
      </div>
      <div class="alert alert-danger" role="alert" v-if="errors">
        {{ errorMessage }}
        <ul>
          <li v-for="(error, index) in errors" :key="`error-${index}`">
            {{ error[0] }}
          </li>
        </ul>
      </div>
      <input type="hidden" id="id" name="id" v-model="form.id">
      <div class="form-row">
        <div class="col col-md-6">
          <label for="exampleInputEmail1">Name</label>
          <input
            class="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            v-model="form.name"
          />
        </div>
        <div class="col col-md-6">
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
      </div>
      <div class="form-row">
        <div class="col col-md-6">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
         <div class="col col-md-6">
          <label for="passwordConfirmation">Password confirmation</label>
          <input
            type="password"
            class="form-control"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Password"
            v-model="form.passwordConfirmation"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-5">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "edituser",
  components: {},
  data() {
    return {
      form: {
        id: "",
        name: "",
        email: "",
        password: "",
        paswwordConfirmation: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      successMessage: "users/successMessage",
      errorMessage: "users/errorMessage",
      errors: "users/errors",
      user: "users/editUser"
    }),
  },
  methods: {
     ...mapActions({
      editUserAction: "users/editUser",
      clearMessages: "users/clearMessages"
    }),
    editUser() {
      this.editUserAction(this.form)
    },
  },
  mounted () {
    this.clearMessages();
    if (this.user != null){
      this.form.name = this.user.name
      this.form.id = this.user.id
      this.form.email = this.user.email
    }
  },
  watch: {
    user() {
      this.form.name = this.user.name
      this.form.id = this.user.id
      this.form.email = this.user.email
    }
  }
};
</script>