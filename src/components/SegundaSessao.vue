<template>
  <section class="about section-shell">
    <div class="container about-grid fade-up">
      <div class="about-copy">
        <div class="section-header">
          <span class="eyebrow">Quem somos</span>
          <h2>Uma loja pensada para simplificar o cuidado com seu companheiro.</h2>
          <p>
            A PetMania nasceu para unir carinho, qualidade e praticidade.
            Trabalhamos com produtos selecionados e servicos de bem-estar para
            cada fase da vida do pet.
          </p>
        </div>

        <div class="about-highlights">
          <article v-for="item in highlights" :key="item.title" class="card info-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>

      <div class="about-media">
        <div class="media-grid">
          <img
            src="@/assets/assertsInicio/sessao2/img2Gato.png"
            alt="Gato em ambiente de cuidado"
          />
          <img
            src="@/assets/assertsInicio/sessao2/img2DogModelo.png"
            alt="Cachorro usando acessorio"
          />
        </div>

        <img
          class="side-paw"
          src="@/assets/assertsInicio/sessao2/img2PegadasLaterais.png"
          alt="Ilustracao de patas"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const highlights = [
  {
    title: "Equipe preparada",
    description:
      "Profissionais com experiencia em comportamento, higiene e rotina preventiva.",
  },
  {
    title: "Produtos confiaveis",
    description:
      "Curadoria de itens com foco em conforto, seguranca e durabilidade.",
  },
  {
    title: "Atendimento consultivo",
    description:
      "Ajudamos voce a montar o plano ideal conforme perfil e necessidades do seu pet.",
  },
];
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.6rem;
  align-items: center;
}

.about-copy {
  display: grid;
  gap: 1.2rem;
}

.about-highlights {
  display: grid;
  gap: 0.85rem;
}

.info-card {
  padding: 1rem 1.1rem;
}

.info-card h3 {
  font-size: 1.02rem;
  color: var(--color-primary);
  margin-bottom: 0.3rem;
}

.info-card p {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.about-media {
  position: relative;
}

.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.media-grid img {
  border-radius: var(--radius-lg);
  height: 280px;
  object-fit: cover;
  box-shadow: var(--shadow-card);
}

.side-paw {
  position: absolute;
  right: -1.3rem;
  bottom: -1.1rem;
  width: 115px;
  opacity: 0.78;
}

@media (max-width: 980px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .side-paw {
    right: 0.2rem;
    bottom: -1.4rem;
  }
}

@media (max-width: 620px) {
  .media-grid {
    grid-template-columns: 1fr;
  }

  .media-grid img {
    height: 220px;
  }
}
</style>
