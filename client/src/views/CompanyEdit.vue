<template>
  <div>
    <h1 class="text-center">Company Edit</h1>
    <form @submit.prevent="editCompany()">
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
      </div>
      <button type="submit" class="btn btn-primary mt-5">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "editcompany",
  components: {},
  data() {
    return {
      form: {
        id: "",
        name: "",
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
      editCompanyAction: "company/editCompany",
      clearMessages: "company/clearMessages"
    }),
    editCompany() {
      this.editCompanyAction(this.form)
    },
  },
  mounted () {
    this.clearMessages();
    if (this.company != null){
      this.form.name = this.company.name
      this.form.id = this.company.id
    }
  },
  watch: {
    company() {
      this.form.name = this.company.name
      this.form.id = this.company.id
    }
  }
};
</script>