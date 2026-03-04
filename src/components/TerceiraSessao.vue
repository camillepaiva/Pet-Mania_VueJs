<template>
  <section class="store section-shell">
    <div class="container fade-up">
      <div class="section-header store-header">
        <div>
          <span class="eyebrow">Loja Pet</span>
          <h2>Itens mais procurados para conforto, passeio e estilo.</h2>
          <p>
            Selecionamos pecas com bom acabamento para aumentar a qualidade de
            vida do seu pet no dia a dia.
          </p>
        </div>
        <RouterLink to="/agendamento" class="button button-secondary">
          Consultar disponibilidade
        </RouterLink>
      </div>

      <div class="products-grid">
        <article v-for="product in products" :key="product.name" class="card product-card">
          <img :src="product.image" :alt="product.name" />
          <div class="product-content">
            <span class="category">{{ product.category }}</span>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="price-row">
              <strong>{{ product.price }}</strong>
              <small>{{ product.highlight }}</small>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import image1 from "@/assets/assertsInicio/sessao3/img1.png";
import image2 from "@/assets/assertsInicio/sessao3/img2.png";
import image3 from "@/assets/assertsInicio/sessao3/img3.png";
import image4 from "@/assets/assertsInicio/sessao3/img4.png";
import image5 from "@/assets/assertsInicio/sessao3/img5.png";

const products = [
  {
    name: "Cachecol Vermelho de Natal",
    category: "Acessorios",
    description: "Tecido macio e ajuste confortavel para passeios em dias frios.",
    price: "R$ 79,90",
    highlight: "Entrega em 24h",
    image: image1,
  },
  {
    name: "Conjunto Jaqueta e Bone",
    category: "Roupas",
    description: "Kit leve com bom caimento para pets de pequeno e medio porte.",
    price: "R$ 129,90",
    highlight: "Mais vendido",
    image: image2,
  },
  {
    name: "Moletom com Touca",
    category: "Inverno",
    description: "Peca termica com toque interno aveludado e boa respiracao.",
    price: "R$ 99,90",
    highlight: "Colecao outono",
    image: image3,
  },
  {
    name: "Cachecol de Pelucia",
    category: "Acessorios",
    description: "Acabamento delicado para fotos e eventos especiais.",
    price: "R$ 69,90",
    highlight: "Edicao limitada",
    image: image4,
  },
  {
    name: "Jaqueta Couro Sport",
    category: "Premium",
    description: "Modelo estiloso com forro interno e fechamento seguro.",
    price: "R$ 149,90",
    highlight: "5 estrelas",
    image: image5,
  },
];
</script>

<style scoped>
.store {
  background:
    linear-gradient(180deg, rgba(36, 92, 83, 0.06), rgba(36, 92, 83, 0)),
    var(--color-bg-soft);
}

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.85rem;
}

.product-card {
  overflow: hidden;
  border-radius: 16px;
}

.product-card img {
  width: 100%;
  height: 145px;
  object-fit: cover;
  background: #eef2f0;
}

.product-content {
  padding: 0.8rem 0.85rem 0.9rem;
  display: grid;
  gap: 0.35rem;
}

.category {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.product-content h3 {
  font-size: 0.95rem;
  line-height: 1.2;
}

.product-content p {
  color: var(--color-muted);
  font-size: 0.84rem;
  line-height: 1.34;
  min-height: 44px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
}

.price-row strong {
  color: var(--color-primary);
}

.price-row small {
  color: #9f5a2a;
  background: var(--color-accent-soft);
  border-radius: 999px;
  padding: 0.18rem 0.46rem;
  font-size: 0.72rem;
  font-weight: 600;
}

@media (max-width: 1100px) {
  .products-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .store-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 700px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
