import {createRouter, createWebHistory} from "vue-router";
import {supabase} from "../clients/supabase";

import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import BackupsView from "../views/BackupsView.vue";
import ConfigsView from "../views/ConfigsView.vue";
import ConsoleView from "../views/ConsoleView.vue";
import LogsView from "../views/LogsView.vue";
import PlayerView from "../views/PlayerView.vue";
import StatsView from "../views/StatsView.vue";
import HomeView from "../views/HomeView.vue";
import Unauthorized from "../views/Unauthorized.vue";
import ConfirmEmail from "../views/ConfirmEmail.vue";

let localUser;

const routes = [
    {path: '/', name: 'Home', component: HomeView},
    {path: '/login', name: 'Login', component: LoginView},
    {path: '/unauthorized', name: 'Unauthorized', component: Unauthorized},
    {path: '/confirmemail', name: 'ConfirmEmail', component: ConfirmEmail},

    {path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: {requiresAuth: true}},
    {path: '/backups', name: 'Backups', component: BackupsView, meta: {requiresAuth: true}},
    {path: '/configs', name: 'Configs', component: ConfigsView, meta: {requiresAuth: true}},
    {path: '/console', name: 'Console', component: ConsoleView, meta: {requiresAuth: true}},
    {path: '/logs', name: 'Logs', component: LogsView, meta: {requiresAuth: true}},
    {path: '/player', name: 'Player', component: PlayerView, meta: {requiresAuth: true}},
    {path: '/stats', name: 'Stats', component: StatsView, meta: {requiresAuth: true}}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//getUser
async function getUser(next) {
    localUser = await supabase.auth.getSession()
    if (localUser.data.session == null) {
        next("/unauthorized")
    } else {
        next();
    }
}

async function login(next) {
    localUser = await supabase.auth.getSession()
    if (localUser.data.session == null) {
        next()
    } else {
        next("dashboard");
    }
}

//auth requirements
router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        login(next)
        return
    }
    if (to.meta.requiresAuth) {
        getUser(next)
    } else {
        next();
    }
})

export default router
