<template>
  <div class="h-screen flex justify-center items-center">
    <div class="rounded-lg bg-gray-300 p-8 text-center">
      <p class="text-4xl font-bold mb-10">Confirm Email</p>
      <router-link to="/login" class=" rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmMail"
}
</script>

<style scoped>

</style>