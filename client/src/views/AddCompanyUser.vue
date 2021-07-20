<template>
  <div>
    <h1 v-if="company">Add users to {{ company.name }}</h1>
    <form v-if="users" id="relation-form">
      <input type="hidden" name="id" id="id" v-model="company.id" />
      <div class="form-check" v-for="user in users" :key="user.id">
        <input
          type="checkbox"
          class="form-check-input"
          id="{{ user.id }}"
          name="{{ user.id }}"
           @click="addUser(user)"
        />
        <label class="form-check-label" for="{{ user.id }}">{{
          user.name
        }}</label>
      </div>
      <button type="submit" class="btn btn-primary"  @click.prevent="editRelation()">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "addcompanyuser",
  components: {},
  data() {
    return {
      checkedUsers: [],
    };
  },
  computed: {
    ...mapGetters({
      company: "company/editCompany",
      users: "users/users",
      successMessage: "company/successMessage",
      errorMessage: "company/errorMessage",
      errors: "company/errors",
    }),
  },
  methods: {
    ...mapActions({
      getUsersAction: "users/getUsers",
      getEditCompanyAction: "company/getEditCompany",
      editCompanyRelationAction: "company/editRelation",
      clearMessages: "company/clearMessages",
    }),
    editRelation() {
      this.editCompanyRelationAction(this.checkedUsers)
    },
     addUser(user) {
      this.checkedUsers.push(user.id);
    },
  },
  created() {
    this.clearMessages();
    this.getUsersAction();
  },
};
</script>
