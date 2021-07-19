<template>
  <div>
    <h1 class="text-center">Create Company</h1>
    <form @submit.prevent="createCompany()">
      <div class="alert alert-success" role="alert" v-if="successMessage">
        <h2>{{ successMessage }}</h2>
        <ul v-if="company">
            <li>
                Name: {{company.name }}
            </li>
        </ul>
      </div>
      <div class="alert alert-danger" role="alert" v-if="errors">
        {{ errorMessage }}
        <ul>
          <li v-for="(error, index) in errors" :key="`error-${index}`">
            {{ error[0] }}
          </li>
        </ul>
      </div>
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
  name: "createcompany",
  components: {},
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        paswwordConfirmation: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      successMessage: "company/successMessage",
      errorMessage: "company/errorMessage",
      errors: "company/errors",
      company: "company/editCompany"
    }),
  },
  methods: {
     ...mapActions({
      createCompanyAction: "company/createCompany",
      clearMessages: "company/clearMessages"
    }),
    createCompany() {
      this.createCompanyAction(this.form)
    },
  },
  created() {
    this.clearMessages();
    this.getCompaniesAction();
  },
};
</script>