<template>
  <div class="p-5 flex-wrap flex text-center">
    <div class="p-2.5 w-full">
      <div class="bg-gray-300 rounded-lg p-5 text-gray-700">
        <h2 class="font-bold text-xl">Dashboard</h2>
      </div>
    </div>
    <div class="p-2.5 w-full sm:w-1/2 lg:w-1/3">
      <div class="bg-gray-300 rounded-lg p-5 text-gray-700">
        <i class="bi bi-heart-pulse-fill"></i>
        <h1 class="font-bold">Status</h1>
        <p v-if="serverinfo.online" class="font-bold text-green-600">ONLINE</p>
        <p v-else class="font-bold text-red-600">OFFLINE</p>
      </div>
    </div>
    <div class="p-2.5 w-full sm:w-1/2 lg:w-1/3">
      <div class="bg-gray-300 rounded-lg p-5 text-gray-700">
        <i class="bi bi-hdd-stack-fill"></i>
        <h1 class="font-bold">IP:Port</h1>
        <p class="font-semibold">{{serverinfo.ip}}:{{serverinfo.port}}</p>
      </div>
    </div>
    <div class="p-2.5 w-full sm:w-1/2 lg:w-1/3">
      <div class="bg-gray-300 rounded-lg p-5 text-gray-700">
        <i class="bi bi-person-fill"></i>
        <h1 class="font-bold">Spieler</h1>
        <p class="font-semibold">{{serverinfo.players.online}}/{{serverinfo.players.max}}</p>
      </div>
    </div>
    <div class="p-2.5 w-full sm:w-1/2 lg:w-1/3">
      <div class="bg-gray-300 rounded-lg p-5 text-gray-700">
        <i class="bi bi-card-text"></i>
        <h1 class="font-bold">Beschreibung</h1>
        <div v-for="item in serverinfo.motd.html" class="font-semibold"><p v-html="item"></p></div>
      </div>
    </div>
    <div class="p-2.5 w-full sm:w-1/2 lg:w-1/3">
      <div class="bg-gray-300 rounded-lg p-5 text-gray-700">
        <i class="bi bi-code-square"></i>
        <h1 class="font-bold">Version</h1>
        <p class="font-semibold">{{serverinfo.version}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {supabase} from "../clients/supabase";

export default {
  data() {
    return {
      serverfetch: null,
      account: null,
      serverinfo: {
        "ip": "Loading...",
        "port": "Loading...",
        "motd": {
          "html": [
            "Loading..."
          ]
        },
        "players": {
          "online": "Loading...",
          "max": "Loading..."
        },
        "version": "Loading...",
        "online": false,
      }
    }
  },
  methods: {
    fetchData: function () {
      axios.get('https://api.mcsrvstat.us/2/' + this.account.data.session.user.user_metadata.server)
          .then(response => {
            this.serverinfo = response.data
          })
    }
  },
  name: "App",
  async mounted() {
    this.account = await supabase.auth.getSession();
    this.fetchData();
    this.serverfetch = setInterval(() => {
      this.fetchData()
    }, 30000)
  },
  unmounted() {
    clearInterval(this.serverfetch)
  }
}
</script>

<style>

</style>