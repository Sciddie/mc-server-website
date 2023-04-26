<template>
  <div class="h-full p-5">
    <div class="bg-gray-300 p-8 rounded-lg">
      <div id="console" v-html="latestlog" class="p-2.5 bg-gray-800 rounded-lg overflow-auto text-[14px] bg-black border border-solid text-green-400 break-words mb-8 h-[60vh]">
      </div>
        <div class="flex">
          <input v-model="command" id="cmd-input" class="outline-none w-full pl-3 rounded-l-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6 h-10" placeholder="Command">
          <button class="rounded-r-md bg-blue-600 h-10 w-10" @click="rconCommand"><i class="bi bi-send-fill"></i></button>
        </div>
        <p class="text-red-600 p-3">{{infomsg}}</p>
      <div class="bg-white rounded-md text-sm p-3 break-words">
        <p class="text-gray-400">Output:</p>
        <p v-for="item in rconAns">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {supabase} from "../clients/supabase";
import axios from "axios";

export default {
  name: "ConsoleView",
  data() {
    return {
      account: null,
      latestlog: null,
      infomsg: "",
      command: "",
      rconAns: ""
    }
  },
  methods: {
    fetchData: function () {
      axios.get('http://' + this.account.data.session.user.user_metadata.server + ":8080/latestlog", {auth:{
        username: "mc-server-frontend",
        password: this.account.data.session.user.user_metadata.server_key
        }})
          .then(response => {
            let latestlog = '';
            for (let item of response.data) {
              if (item.includes("ERROR")) {
                latestlog += '<span class="text-red-600">' + item +'</span><br><br>'
              } else if (item.includes("WARN")) {
                latestlog += '<span class="text-yellow-400">' + item +'</span><br><br>'
              } else {
                latestlog += '<span class="">' + item + '</span><br><br>'
              }
            }
            this.latestlog = latestlog
          })
    },
    rconCommand: async function () {
      if (this.command !== "") {
        axios.post('http://' + this.account.data.session.user.user_metadata.server + ":8080/rcon", {command: this.command}, {
          auth: {
            username: "mc-server-frontend",
            password: this.account.data.session.user.user_metadata.server_key
          }
        }).then(response => {
          if (!response.data.success) {
            this.infomsg = "Es gab einen fehler beim Verbingungsaufbau. Der Server ist offline, oder Rcon ist falsch konfiguriert."
          } else {
            this.infomsg = ""
            this.rconAns =response.data.response;
            console.log("Command issued: /" + this.command)
            this.fetchData()
          }
        })
      }
    }
  },
  async mounted() {
    this.account = await supabase.auth.getSession();
    this.fetchData();
    let consoleElement = document.getElementById("console");
    consoleElement.scrollTop = consoleElement.scrollHeight;
    this.serverfetch = setInterval(() => {
      this.fetchData()
    }, 10000)
  },
  unmounted() {
    clearInterval(this.serverfetch)
  }
}
</script>

<script setup>


</script>

<style>

</style>