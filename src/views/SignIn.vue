<template>
  <div class="form-container">
    <span id="form-logo">
      <img src="Images/logo.png" style="width: 325px;">
    </span>
    <form class="connection-form">
      <div class="input-wrap mb-5">
        <input
          class="form-input"
          type="text"
          name="username"
          v-model="user"
          :class="{hasVal: user.length > 0}"
        >
        <span class="form-input-label" label="USERNAME"></span>
      </div>

      <div class="input-wrap mb-5">
        <input
          class="form-input"
          type="password"
          name="password"
          v-model="pass"
          :class="{hasVal: pass.length > 0}"
        >
        <span class="form-input-label" label="PASSWORD"></span>
      </div>

      <div class="container-form-btn">
        <div class="form-btn-wrap">
          <div class="form-btn-bg"></div>
          <button class="con-form-btn" style="font-size: 23px;" @click.prevent="signinCheck">Sign in<i class="fas fa-sign-in-alt fa-lg" style="margin-left: 20px; margin-top:3px; font-size: 26px;"></i></button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Marketo from "../store/marketo";
import Store from "../store/store";

export default {
  data() {
    return {
      user: "",
      pass: "",
      state: Store,
      tokenSuccesful: false
    };
  },
  methods: {
    signinCheck() {
      if (this.user == this.state.credentials.username && this.pass == this.state.credentials.password) {
        this.$router.push("/dashboard");
      } 
      else {
        alert("Incorrect login details. Please try again.");
      }
    }
  }
};7
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  margin-top: 7%;
}
</style>
