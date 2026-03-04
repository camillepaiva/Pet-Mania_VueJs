<template>
  <section class="community section-shell">
    <div class="container">
      <div class="card cta-banner fade-up">
        <div class="cta-copy">
          <span class="eyebrow">Comunidade PetMania</span>
          <h2>Entre para o clube de tutores que cuidam com estrategia.</h2>
          <p>
            Receba dicas de rotina, avisos de campanhas sazonais e novidades da
            loja para manter seu pet sempre bem.
          </p>
          <RouterLink class="button button-primary" to="/agendamento">
            Quero entrar
          </RouterLink>
        </div>

        <img
          class="cta-image"
          src="@/assets/assertsInicio/sessao5/img5Final.png"
          alt="Pets posando para campanha da PetMania"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.community {
  padding-top: 1.2rem;
  padding-bottom: 5.5rem;
}

.cta-banner {
  overflow: hidden;
  border-radius: var(--radius-xl);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
}

.cta-copy {
  padding: 0.3rem 0.4rem 0.3rem 0.5rem;
  display: grid;
  gap: 0.9rem;
}

.cta-copy h2 {
  font-size: clamp(1.55rem, 2.4vw, 2rem);
}

.cta-copy p {
  color: var(--color-muted);
  max-width: 500px;
}

.cta-image {
  width: 100%;
  min-height: 330px;
  object-fit: cover;
  border-radius: calc(var(--radius-xl) - 8px);
}

@media (max-width: 900px) {
  .cta-banner {
    grid-template-columns: 1fr;
  }

  .cta-image {
    min-height: 230px;
  }
}
</style>
