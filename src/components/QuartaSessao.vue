<template>
  <section class="reviews section-shell">
    <div class="container fade-up">
      <div class="section-header">
        <span class="eyebrow">Avaliacoes</span>
        <h2>Clientes que voltam e recomendam para outros tutores.</h2>
        <p>
          Feedback real sobre atendimento, cuidado e qualidade dos servicos
          oferecidos na PetMania.
        </p>
      </div>

      <div class="reviews-grid">
        <article v-for="review in reviews" :key="review.name" class="card review-card">
          <img :src="review.avatar" :alt="`Foto de ${review.name}`" />
          <div>
            <h3>{{ review.name }}</h3>
            <p class="review-role">{{ review.role }}</p>
          </div>
          <p class="review-text">{{ review.comment }}</p>
          <span class="review-stars">{{ review.stars }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import personOne from "@/assets/assertsInicio/sessao4/pessoa1.png";
import personTwo from "@/assets/assertsInicio/sessao4/pessoa2.png";
import personThree from "@/assets/assertsInicio/sessao4/pessoa3.png";

const reviews = [
  {
    name: "Juliana Freitas",
    role: "Tutora da Nina",
    comment:
      "Minha cachorra ficou tranquila no banho e saiu super cheirosa. Atendimento excelente do inicio ao fim.",
    stars: "5/5",
    avatar: personOne,
  },
  {
    name: "Joao Augusto",
    role: "Tutor do Thor",
    comment:
      "Agendamento rapido, equipe atenciosa e produtos de boa qualidade. Virou minha loja principal para o Thor.",
    stars: "5/5",
    avatar: personTwo,
  },
  {
    name: "Elen da Silva",
    role: "Tutora da Mel",
    comment:
      "Gostei muito da organizacao e da orientacao que recebi para escolher roupa e acessorios da minha pet.",
    stars: "4/5",
    avatar: personThree,
  },
];
</script>

<style scoped>
.reviews {
  background:
    linear-gradient(180deg, rgba(240, 138, 75, 0.09), rgba(240, 138, 75, 0)),
    var(--color-bg);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.review-card {
  padding: 1.05rem;
  display: grid;
  gap: 0.6rem;
}

.review-card img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.review-card h3 {
  font-size: 1.02rem;
}

.review-role {
  color: var(--color-muted);
  font-size: 0.85rem;
}

.review-text {
  color: #374254;
  line-height: 1.4;
  min-height: 86px;
}

.review-stars {
  color: #d08a2e;
  letter-spacing: 0.08em;
  font-weight: 700;
  font-size: 0.95rem;
}

@media (max-width: 960px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .review-text {
    min-height: 0;
  }
}
</style>
