<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/">
        <img src="@/assets/logo.png" alt="Logo PetMania" />
        <div>
          <strong>PetMania</strong>
          <p>Cuidado premium para seu pet</p>
        </div>
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Abrir menu"
      >
        {{ isMenuOpen ? "Fechar" : "Menu" }}
      </button>

      <div class="header-menu" :class="{ open: isMenuOpen }">
        <nav class="nav-list">
          <button
            v-for="item in navigationItems"
            :key="item.id"
            type="button"
            class="nav-item"
            :class="{ active: activeSection === item.id && isHomePage }"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>

        <RouterLink
          v-if="isHomePage"
          class="button button-primary action-button"
          to="/agendamento"
          @click="isMenuOpen = false"
        >
          Agendar horario
        </RouterLink>

        <RouterLink
          v-else
          class="button button-secondary action-button"
          to="/"
          @click="isMenuOpen = false"
        >
          Voltar para inicio
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const navigationItems = [
  { id: "inicio", label: "Inicio" },
  { id: "quem-somos", label: "Quem somos" },
  { id: "loja-pet", label: "Loja pet" },
  { id: "avaliacoes", label: "Avaliacoes" },
  { id: "venha-ser-pet-mania", label: "Comunidade" },
];

const activeSection = ref("inicio");
const isMenuOpen = ref(false);
const isHomePage = computed(() => route.name === "inicio");
let observer = null;

function stopObservingSections() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

function observeSections() {
  stopObservingSections();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-35% 0px -55% 0px",
    }
  );

  navigationItems.forEach((item) => {
    const section = document.getElementById(item.id);
    if (section) {
      observer.observe(section);
    }
  });
}

function scrollToSection(sectionId) {
  isMenuOpen.value = false;

  const runScroll = () => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      activeSection.value = sectionId;
    }
  };

  if (!isHomePage.value) {
    router.push({ name: "inicio" }).then(() => {
      setTimeout(runScroll, 100);
    });
    return;
  }

  runScroll();
}

watch(
  () => route.name,
  (newRouteName) => {
    isMenuOpen.value = false;

    if (newRouteName === "inicio") {
      setTimeout(observeSections, 120);
      return;
    }

    stopObservingSections();
  }
);

onMounted(() => {
  if (isHomePage.value) {
    setTimeout(observeSections, 120);
  }
});

onBeforeUnmount(() => {
  stopObservingSections();
});
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(244, 247, 245, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(215, 226, 220, 0.9);
}

.header-inner {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.brand img {
  width: 46px;
  height: 46px;
  border-radius: 12px;
}

.brand strong {
  display: block;
  font-size: 1.15rem;
  color: var(--color-primary);
  line-height: 1.05;
}

.brand p {
  font-size: 0.78rem;
  color: var(--color-muted);
}

.menu-toggle {
  display: none;
  border: none;
  background: var(--color-primary);
  color: #ffffff;
  border-radius: 999px;
  padding: 0.55rem 0.95rem;
  font: inherit;
  font-weight: 600;
}

.header-menu {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.nav-item {
  border: none;
  background: transparent;
  color: var(--color-muted);
  font: inherit;
  font-size: 0.93rem;
  font-weight: 500;
  border-radius: 999px;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-item:hover {
  background: rgba(36, 92, 83, 0.08);
  color: var(--color-primary);
}

.nav-item.active {
  color: var(--color-primary);
  background: rgba(36, 92, 83, 0.14);
  font-weight: 600;
}

.action-button {
  padding-inline: 1rem;
  font-size: 0.88rem;
}

@media (max-width: 980px) {
  .menu-toggle {
    display: inline-flex;
  }

  .header-menu {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    right: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
    padding: 0.9rem 1rem 1rem;
  }

  .header-menu.open {
    display: flex;
  }

  .nav-list {
    display: grid;
    gap: 0.35rem;
  }

  .nav-item {
    text-align: left;
    width: 100%;
  }

  .action-button {
    width: 100%;
    text-align: center;
  }
}
</style>
