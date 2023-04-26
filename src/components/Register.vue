<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-12 w-auto" src="/console.png" alt="McServer" />
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onsubmit="return false;" @submit="register">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Adresse</label>
        <div class="mt-2">
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Passwort</label>
        </div>
        <div class="mt-2">
          <input v-model="password" pattern=".{6,}" title="6 characters minimum" id="password" name="password" type="password" autocomplete="current-password" required=""
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password-confirm" class="block text-sm font-medium leading-6 text-gray-900">Passwort wiederholen</label>
        </div>
        <div class="mt-2">
          <input v-model="password_confirm" id="password-confirm" name="password-confirm" type="password" autocomplete="current-password" required=""
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                 :class="[isPasswordIdentical() ? 'focus:ring-blue-600 ring-gray-300' : 'focus:ring-red-600 ring-red-600']"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="server" class="block text-sm font-medium leading-6 text-gray-900">Server IP:</label>
        </div>
        <div class="mt-2">
          <input v-model="server" id="server" name="server" required=""
                 class="outline-none block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="server-key" class="block text-sm font-medium leading-6 text-gray-900">Server Key:</label>
        </div>
        <div class="mt-2">
          <input v-model="server_key" id="server-key" name="server-key" required=""
                 class="outline-none block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold
         leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2
         focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {supabase} from "../clients/supabase";
import router from "../router";
import axios from "axios";

//connect inputs
let email = ref("");
let password = ref("");
let password_confirm = ref("")
let server = ref("")
let server_key = ref("")

async function register() {
  if (isPasswordIdentical()) {
    let url = "http://" + server.value + ":8080"
    await axios.get(url, {
      auth: {
        username: "mc-server-frontend",
        password: server_key.value
      }
    }).then(async response => {
      if (response.data === true) {
        const {data, error} = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
          options: {
            data: {
              server: server.value,
              server_key: server_key.value
            }
          }
        })
        if (error) {
          console.log(error)
        } else {
          console.log(data)
          await router.push("/confirmemail")
          router.go(0)
        }
      } else {
        console.log("Server ceds incorrect")
      }
    })
  }
}

function isPasswordIdentical() {
  return password.value === password_confirm.value;
}
</script>

<script>
export default {
  name: "RegistrateView",
}
</script>

<style scoped>

</style>