<script>
import {AuthenticationService} from "../services/authentication.service.js";

export default {
  name: "sign-in",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      submitted: false,
      authenticationService: new AuthenticationService(),
    }
  },
  methods: {
    resetForm() {
      this.form = {
        username: "",
        password: "",
      }
      this.submitted = false;
    },
    validateForm() {
      return (
          this.form.username &&
              this.form.password
      );
    },
    async submitForm() {
      this.submitted = true;

      if (this.validateForm()) {
        console.log(this.form);
        try {
          const response = await this.authenticationService.signIn(this.form.username, this.form.password);
          if (response.status === 200) {
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Logged in successfully.",
              life: 2000,
            });
            this.resetForm();
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("username", response.data.username);
            setTimeout(() => {
              this.$router.push("/home");
            }, 2000);
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Invalid credentials.",
              life: 2000,
            });
          }
        } catch (error) {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Invalid credentials.",
            life: 2000,
          });
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-3 min-h-screen p-2 mx-4">
    <img src="../../assets/images/bontech_logo.png" alt="Bondtech Logo" class="h-[250px] object-fill" />
    <div class="w-sm md:w-full max-w-lg p-3 lg:p-5 border-2 rounded-sm border-gray-200 border-solid shadow-md bg-white">
      <h1 class="text-center text-2xl font-bold text-primary !mb-8">Log In</h1>

      <form @submit.prevent="submitForm" class="flex flex-col gap-4">

        <div class="w-full mb-4">
          <pv-float-label>
            <pv-input-text id="username" v-model="form.username" class="w-full"/>
            <label for="username">Username</label>
          </pv-float-label>
          <small v-if="submitted && !form.username" class="text-red-500">Username is required.</small>
        </div>

        <div class="w-full mb-4">
          <pv-float-label>
            <pv-input-text id="password" type="password" v-model="form.password" class="w-full"/>
            <label for="password">Password</label>
          </pv-float-label>
          <small v-if="submitted && !form.password" class="text-red-500">Password is required.</small>
        </div>

        <!-- Submit -->
        <pv-button label="Sign In" type="submit"
                   class="w-full bg-primary hover:bg-primary-emphasis text-white uppercase font-bold" raised/>

        <p class="text-center mt-4 bg-none">
          Don't have an account?
          <router-link to="/sign-up" class="text-primary font-bold">Sign Up</router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<style scoped>

</style>