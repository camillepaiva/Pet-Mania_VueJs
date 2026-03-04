<template>
  <div class="home-page">
    <CabecalhoPrincipal />

    <main>
      <SessaoInicial id="inicio" />
      <SegundaSessao id="quem-somos" />
      <TerceiraSessao id="loja-pet" />
      <QuartaSessao id="avaliacoes" />
      <QuintaSessao id="venha-ser-pet-mania" />
    </main>
  </div>
</template>

<script setup>
import CabecalhoPrincipal from "@/components/CabecalhoPrincipal.vue";
import SessaoInicial from "@/components/SessaoInicial.vue";
import SegundaSessao from "@/components/SegundaSessao.vue";
import TerceiraSessao from "@/components/TerceiraSessao.vue";
import QuartaSessao from "@/components/QuartaSessao.vue";
import QuintaSessao from "@/components/QuintaSessao.vue";
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
