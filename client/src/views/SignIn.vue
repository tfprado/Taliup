<template>
  <div class="container mt-3">
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "singin",
  components: {},
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submit() {
      axios.post('auth/signin', this.form).then((response) => {
        console.log("Reponse");
        console.log(response.data);
      })
    },
  },
};
</script>
