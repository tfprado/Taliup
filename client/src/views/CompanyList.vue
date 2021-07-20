<template>
  <div>
    <h1 class="text-center">Company List</h1>
    <div class="alert alert-success" role="alert" v-if="successMessage">
        <h2>{{ successMessage }}</h2>
        <ul v-if="company">
            <li>
                Name: {{ company.name }}
            </li>
        </ul>
      </div>
    <button class="btn btn-primary" @click.prevent="this.$router.replace({ name: 'createcompany'})">Create</button>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Add Users</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(company, index) in companies" :key="company.id">
          <th scope="row">{{ company.id }}</th>
          <td>{{ company.name }}</td>
          <td><button
              class="btn btn-primary"
              @click.prevent="redirectToRelationPage(company.id)"
            >
                Add Users
            </button></td>
          <td>
            <button
              class="btn btn-warning"
              @click.prevent="redirectToEditPage(company.id)"
            >
              Edit
            </button>
          </td>
          <td><button class="btn btn-danger" @click.prevent="deleteCompany(company.id, index)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "companydashboard",
  components: {},
  computed: {
    ...mapGetters({
      companies: "company/companies",
      company: "company/editCompany",
      successMessage: "company/successMessage",
      errorMessage: "company/errorMessage",
      errors: "company/errors",
    }),
  },
  methods: {
    ...mapActions({
      getCompaniesAction: "company/getCompanies",
      getEditCompanyAction: "company/getEditCompany",
      deleteCompanyAction: "company/deleteCompany",
      clearMessages: "company/clearMessages"
    }),
    redirectToEditPage(companyId) {
      this.getEditCompanyAction(companyId).then(() => {
        this.$router.replace({ name: "editcompany"});
      });
    },
    redirectToRelationPage(companyId) {
      this.getEditCompanyAction(companyId).then(() => {
        this.$router.replace({ name: "addcompanyuser"});
      });
    },
    deleteCompany(id, index) {
      if(confirm("Do you really want to delete this company?")) {
        this.deleteCompanyAction(id)
        this.companies.splice(index, 1)
      }
    }
  },
  created() {
    this.clearMessages();
    this.getCompaniesAction();
  },
};
</script>
