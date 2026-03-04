import { createRouter, createWebHistory } from "vue-router";

import InicioPage from "@/components/InicioPage.vue";
import AgendamentoPet from "@/components/AgendamentoPet.vue";

const routes = [
  {
    path: "/",
    name: "inicio",
    component: InicioPage,
  },
  {
    path: "/agendamento",
    alias: "/AgendamentoPet",
    name: "agendamento",
    component: AgendamentoPet,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
