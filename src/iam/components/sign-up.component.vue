<script>
import {AuthenticationService} from "../services/authentication.service.js";

export default {
  name: "sign-up",
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        dni: "",
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
        confirmPassword: "",
        fullName: "",
        dni: "",
      }
      this.submitted = false;
    },
    validateForm() {
      return (
          this.form.username &&
          this.form.fullName &&
          this.form.password === this.form.confirmPassword &&
          this.form.dni
      );
    },
    async submitForm() {
      this.submitted = true;

      const { confirmPassword, ...signUpRequest } = this.form;

      if (this.validateForm()) {
        try {
          const response = await this.authenticationService.signUp(signUpRequest);
          if (response.status === 201) {
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Account created successfully.",
              life: 2000,
            });
            this.resetForm();
            setTimeout(() => {
              this.$router.push("/sign-in");
            }, 4000);
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: response.data.message,
              life: 3000,
            });
          }
        } catch (error) {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response.data.message,
            life: 3000,
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
    <div class="w-md md:w-full max-w-2xl p-3 lg:p-5 border-2 rounded-sm border-gray-200 border-solid shadow-md bg-white">
      <h1 class="text-center text-2xl font-bold text-primary !mb-6">Create an Account</h1>

      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div class="mb-4">
            <pv-float-label>
              <pv-input-text id="fullName" v-model="form.fullName" class="w-full"/>
              <label for="fullName">Full Name</label>
            </pv-float-label>
            <small v-if="submitted && !form.fullName" class="text-red-500">Full Name is required.</small>
          </div>

          <div class="mb-4">
            <pv-float-label>
              <pv-input-text id="username" v-model="form.username" class="w-full"/>
              <label for="username">Username</label>
            </pv-float-label>
            <small v-if="submitted && !form.username" class="text-red-500">Username is required.</small>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div class="mb-4">
            <pv-float-label>
              <pv-password id="password" v-model="form.password" toggleMask class="w-full" input-class="w-full"/>
              <label for="password">Password</label>
            </pv-float-label>
            <small v-if="submitted && !form.password" class="text-red-500">Password is required.</small>
          </div>

          <div class="mb-4">
            <pv-float-label>
              <pv-password id="confirmPassword" v-model="form.confirmPassword" toggleMask class="w-full" input-class="w-full"/>
              <label for="confirmPassword">Confirm Password</label>
            </pv-float-label>
            <small v-if="submitted && form.confirmPassword !== form.password" class="text-red-500">
              Passwords must match.
            </small>
          </div>
        </div>

        <pv-float-label>
          <pv-input-text id="dni" v-model="form.dni" class="w-full"/>
          <label for="dni">DNI</label>
        </pv-float-label>
        <small v-if="submitted && !form.dni" class="text-red-500">DNI is required.</small>

        <!-- Submit -->
        <pv-button label="Sign Up" type="submit"
                   class="w-full bg-primary hover:bg-primary-emphasis text-white uppercase font-bold" raised/>

        <p class="text-center mt-4 bg-none">
          Have an Account?
          <router-link to="/sign-in" class="text-primary font-bold">Log In</router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<style scoped>

</style>