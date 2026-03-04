<template>
  <section class="hero section-shell">
    <div class="container hero-grid fade-up">
      <div class="hero-copy">
        <span class="eyebrow">Pet care em um so lugar</span>
        <h1>
          Mais bem-estar para o seu pet com atendimento humano e ambiente
          acolhedor.
        </h1>
        <p>
          Banho, tosa, consultas e produtos selecionados para facilitar a rotina
          de quem ama cuidar bem.
        </p>

        <div class="hero-actions">
          <RouterLink to="/agendamento" class="button button-primary">
            Agendar atendimento
          </RouterLink>
          <a href="#loja-pet" class="button button-secondary">Ver produtos</a>
        </div>

        <ul class="hero-highlights">
          <li>+3.000 pets atendidos</li>
          <li>Equipe especializada</li>
          <li>Atendimento personalizado</li>
        </ul>
      </div>

      <div class="hero-media card">
        <img
          class="hero-main-image"
          src="@/assets/assertsInicio/sessao1/img1Dog.png"
          alt="Cachorro feliz com roupa da PetMania"
        />
        <img
          class="hero-paw"
          src="@/assets/assertsInicio/sessao1/img1Umapegada.png"
          alt="Ilustracao de pata"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 2.8rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 1.5rem;
}

.hero-copy {
  display: grid;
  gap: 1rem;
}

.hero-copy h1 {
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.1;
}

.hero-copy p {
  color: var(--color-muted);
  max-width: 560px;
  font-size: 1.03rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.hero-highlights {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.hero-highlights li {
  font-size: 0.88rem;
  color: #2f453f;
  background: rgba(36, 92, 83, 0.1);
  border-radius: 999px;
  padding: 0.34rem 0.65rem;
}

.hero-media {
  position: relative;
  border-radius: var(--radius-xl);
  padding: 1rem;
  overflow: hidden;
}

.hero-main-image {
  width: 100%;
  border-radius: calc(var(--radius-xl) - 8px);
  object-fit: cover;
  aspect-ratio: 4 / 4.2;
}

.hero-paw {
  position: absolute;
  width: 78px;
  right: 0.9rem;
  top: 0.7rem;
  opacity: 0.92;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-media {
    max-width: 560px;
  }
}

@media (max-width: 580px) {
  .hero {
    padding-top: 2rem;
  }
}
</style>
