<template>
  <div>
    <h1 class="text-center">User List</h1>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td><button class="btn btn-warning">Edit</button></td>
          <td><button class="btn btn-danger">Delete</button></td>
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
      users: "auth/users",
    }),
  },
  methods: {
    ...mapActions({
      getUsersAction: "auth/getUsers",
    }),
  },
  created() {
    this.getUsersAction();
  },
};
</script>
