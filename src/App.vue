<template>
  <Sidebar></Sidebar>
  <div class="lg:pl-[300px] h-screen">
    <router-view></router-view>
  </div>
</template>

<script setup>

import Sidebar from "./components/Sidebar.vue";
</script>

<style scoped>
</style>