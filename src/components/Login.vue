<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-12 w-auto" src="/console.png" alt="McServer" />
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onsubmit="return false;" @submit="login">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Adresse</label>
        <div class="mt-2">
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Passwort</label>
          <!-- TODO: "Passwort vergessen" hinzufügen
          <div class="text-sm">
            <a href="#" class="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
          </div>
          -->
        </div>
        <div class="mt-2">
          <input v-model="password" pattern=".{6,}" title="6 characters minimum" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <!-- war Button; type="submit" entfernt; Muss noch zurrück geändert werden -->
        <button type="submit" @click="" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {supabase} from "../clients/supabase";
import router from "../router";

//connect inputs
let email = ref("");
let password = ref("");

async function login() {
  const {data,error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log(error)
  } else {
    console.log(data)
    await router.push("/dashboard")
    router.go(0)
  }
}
</script>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>