<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <register v-if="register"></register>
    <login v-else></login>
    <p v-if="!register" class="mt-10 text-center text-sm text-gray-500">
      Noch nicht registriert?
      {{ ' ' }}
      <span class=" cursor-pointer font-semibold leading-6 text-blue-600 hover:text-blue-500" @click="register= !register">Rigister</span>
    </p>
    <p v-else class="mt-10 text-center text-sm text-gray-500">
      Schon registriert?
      {{ ' ' }}
      <span class=" cursor-pointer font-semibold leading-6 text-blue-600 hover:text-blue-500" @click="register= !register">Login</span>
    </p>
  </div>
</template>

<script setup>
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
</script>

<script>
export default {
  name: "LoginView",
  data() {return {
    register: false
  }}
}
</script>

<style scoped>

</style>