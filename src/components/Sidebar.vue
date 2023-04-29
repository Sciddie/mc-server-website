<template>
  <span class="fixed text-white text-4xl top-5 left-4 cursor-pointer opacity-70" id="open-sidebar" @click="open_close_sidebar()">
    <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
  </span>
  <nav class="sidebar fixed top-0 bottom-0 left-[-300px] lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
    <div class="text-gray-100 text-xl">
      <div class="p-2.5 mt-1 flex items-center">
        <router-link to="/" class="flex items-center">
          <i class="bi bi-hdd-stack-fill px-2 py-1 bg-blue-600 rounded-md"></i>
          <h1 class="font-bold text-gray-200 text-[15px] ml-3">McServer</h1>
        </router-link>
        <i class="bi bi-x ml-20 cursor-pointer lg:hidden" id="close-sidebar" @click="open_close_sidebar()"></i>
      </div>
      <hr class="my-2 bg-gray-600 border-none h-[2px]">
    </div>

    <div v-if="requiresAuth">
      <router-link to="/dashboard" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-house-door-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200">Dashboard</span>
      </router-link>

      <router-link to="/console" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-terminal-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200">Console</span>
      </router-link>

      <router-link to="/logs" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-list-columns-reverse"></i>
        <span class="text-[15px] ml-4 text-gray-200">Log Dateien</span>
      </router-link>

      <router-link to="/stats" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-bar-chart-line-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200">Statistiken</span>
      </router-link>

      <router-link to="/backups" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-arrow-clockwise"></i>
        <span class="text-[15px] ml-4 text-gray-200">Backups</span>
      </router-link>

      <hr class="my-4 bg-gray-600 border-none h-[2px]">

      <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
              cursor-pointer hover:bg-blue-600 text-white" id="sidebar-settings" @click="sidebar_settings_dropdown()">
        <i class="bi bi-gear-fill"></i>
        <div class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200">Settings</span>
          <span class="text-sm" id="sidebar-settings-arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>

      <div class="mt-2 w-4/5 mx-auto hidden" id="sidebar-settings-submenu">
        <router-link to="/player">
          <h1 class="text-left text-sm font-medium text-gray-100 cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1"><i class="bi bi-person-fill mr-2"></i>Player</h1>
        </router-link>
        <router-link to="/configs">
          <h1 class="text-left text-sm font-medium text-gray-100 cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1"><i class="bi bi-file-earmark-code-fill mr-2"></i>Configs</h1>
        </router-link>
      </div>

      <hr class="my-4 bg-gray-600 border-none h-[2px]">

      <router-link to="/" @click="logout" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-box-arrow-left"></i>
        <span class="text-[15px] ml-4 text-gray-200">Logout</span>
      </router-link>
    </div >

    <router-link v-else to="/login" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
      <i class="bi bi-box-arrow-in-right"></i>
      <span class="text-[15px] ml-4 text-gray-200">Login</span>
    </router-link>
  </nav>
</template>

<script setup>
import {supabase} from "../clients/supabase";
async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) {
    console.log(error)
  } else {
    console.log('logout successful')
  }
}
</script>

<script>
import router from '../router/index.js'
export default {
  name: "Sidebar",
  data() {
    return {
      requiresAuth: false
    }
  },
  mounted() {
    router.afterEach(() => {
      this.requiresAuth = router.currentRoute.value.meta.requiresAuth;
    })
  },
  methods: {
    sidebar_settings_dropdown(){
      document.querySelector('#sidebar-settings-submenu').classList.toggle('hidden');
      document.querySelector('#sidebar-settings-arrow').classList.toggle('rotate-180');
    },
    open_close_sidebar() {
      document.querySelector('.sidebar').classList.toggle('left-[-300px]');
    }
  }
}
</script>

<style scoped>

</style>