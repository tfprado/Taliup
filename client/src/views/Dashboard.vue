<template>
  <div>
    <h1 class="text-center">User List</h1>
    <div class="alert alert-success" role="alert" v-if="successMessage">
        <h2>{{ successMessage }}</h2>
        <ul v-if="user">
            <li>
                Name: {{ user.name }}
            </li>
            <li>
                Email: {{ user.email }}
            </li>
        </ul>
      </div>
    <button class="btn btn-primary" @click.prevent="this.$router.replace({ name: 'createuser'})">Create</button>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>
            <button
              class="btn btn-warning"
              @click.prevent="redirectToEditPage(user.id)"
            >
              Edit
            </button>
          </td>
          <td><button class="btn btn-danger" @click.prevent="deleteUser(user.id, index)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "dashboard",
  components: {},
  computed: {
    ...mapGetters({
      users: "users/users",
      user: "users/editUser",
      successMessage: "users/successMessage",
      errorMessage: "users/errorMessage",
      errors: "users/errors",
    }),
  },
  methods: {
    ...mapActions({
      getUsersAction: "users/getUsers",
      getEditUserAction: "users/getEditUser",
      deleteUserAction: "users/deleteUser",
      clearMessages: "users/clearMessages"
    }),
    redirectToEditPage(userId) {
      this.getEditUserAction(userId).then(() => {
        this.$router.replace({ name: "edituser"});
      });
    },
    deleteUser(id, index) {
      if(confirm("Do you really want to delete this user?")) {
        this.deleteUserAction(id)
        this.users.splice(index, 1)
      }
    }
  },
  created() {
    this.clearMessages();
    this.getUsersAction();
  },
};
</script>
