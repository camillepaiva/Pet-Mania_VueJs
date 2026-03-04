<template>
  <div class="booking-page">
    <CabecalhoPrincipal />

    <section class="section-shell">
      <div class="container booking-wrapper">
        <div class="section-header fade-up">
          <span class="eyebrow">Agendamento</span>
          <h1>Marque o atendimento ideal para o seu pet.</h1>
          <p>
            Escolha servico, data e horario. O sistema guarda os agendamentos no
            navegador para facilitar o acompanhamento.
          </p>
        </div>

        <div class="booking-grid">
          <form class="card booking-form fade-up" @submit.prevent="handleSubmit">
            <h2>Dados do atendimento</h2>

            <div class="form-grid">
              <label>
                Nome do tutor
                <input v-model.trim="form.tutorName" type="text" />
                <small v-if="errors.tutorName">{{ errors.tutorName }}</small>
              </label>

              <label>
                Telefone (WhatsApp)
                <input
                  v-model.trim="form.phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                />
                <small v-if="errors.phone">{{ errors.phone }}</small>
              </label>

              <label>
                Nome do pet
                <input v-model.trim="form.petName" type="text" />
                <small v-if="errors.petName">{{ errors.petName }}</small>
              </label>

              <label>
                Tipo do pet
                <select v-model="form.petType">
                  <option v-for="type in petTypes" :key="type.value" :value="type.value">
                    {{ type.label }}
                  </option>
                </select>
              </label>

              <label>
                Servico
                <select v-model="form.service">
                  <option
                    v-for="service in services"
                    :key="service.value"
                    :value="service.value"
                  >
                    {{ service.label }}
                  </option>
                </select>
                <small v-if="errors.service">{{ errors.service }}</small>
              </label>

              <label>
                Data
                <input v-model="form.date" type="date" :min="minimumDate" />
                <small v-if="errors.date">{{ errors.date }}</small>
              </label>

              <label>
                Horario
                <input v-model="form.time" type="time" />
                <small v-if="errors.time">{{ errors.time }}</small>
              </label>

              <label class="full-width">
                Observacoes
                <textarea
                  v-model.trim="form.notes"
                  placeholder="Ex: pet ansioso, alergias, preferencia de tosa."
                />
              </label>
            </div>

            <button class="button button-primary submit-button" type="submit">
              Confirmar agendamento
            </button>

            <p v-if="feedbackMessage" class="feedback success">{{ feedbackMessage }}</p>
            <p v-if="errors.form" class="feedback error">{{ errors.form }}</p>
          </form>

          <aside class="card appointments-card fade-up">
            <div class="appointments-header">
              <h2>Proximos atendimentos</h2>
              <button
                v-if="appointments.length"
                type="button"
                class="button button-danger clear-button"
                @click="clearAllAppointments"
              >
                Limpar agenda
              </button>
            </div>

            <p v-if="!appointments.length" class="empty-message">
              Nenhum atendimento agendado ainda.
            </p>

            <ul v-else class="appointments-list">
              <li v-for="appointment in appointments" :key="appointment.id">
                <div class="appointment-top">
                  <h3>{{ appointment.petName }} - {{ getServiceLabel(appointment.service) }}</h3>
                  <span class="status-pill">{{ getStatus(appointment) }}</span>
                </div>
                <p>{{ formatDateTime(appointment.date, appointment.time) }}</p>
                <p>Tutor: {{ appointment.tutorName }} ({{ appointment.phone }})</p>
                <p class="notes" v-if="appointment.notes">
                  Obs: {{ appointment.notes }}
                </p>
                <button
                  type="button"
                  class="cancel-link"
                  @click="removeAppointment(appointment.id)"
                >
                  Cancelar
                </button>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import CabecalhoPrincipal from "@/components/CabecalhoPrincipal.vue";

const STORAGE_KEY = "petmania-appointments";

const services = [
  { value: "banho", label: "Banho" },
  { value: "banho-tosa", label: "Banho e tosa" },
  { value: "consulta", label: "Consulta basica" },
  { value: "vacinacao", label: "Vacinacao" },
];

const petTypes = [
  { value: "cachorro", label: "Cachorro" },
  { value: "gato", label: "Gato" },
  { value: "outro", label: "Outro" },
];

const form = reactive({
  tutorName: "",
  phone: "",
  petName: "",
  petType: "cachorro",
  service: "banho",
  date: "",
  time: "",
  notes: "",
});

const feedbackMessage = ref("");
const errors = reactive({
  tutorName: "",
  phone: "",
  petName: "",
  service: "",
  date: "",
  time: "",
  form: "",
});

const appointments = ref(loadAppointments());
const minimumDate = computed(() => new Date().toISOString().slice(0, 10));

function loadAppointments() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.id === "number" &&
          typeof item.tutorName === "string" &&
          typeof item.petName === "string" &&
          typeof item.phone === "string" &&
          typeof item.service === "string" &&
          typeof item.date === "string" &&
          typeof item.time === "string"
      )
      .sort(sortAppointments);
  } catch {
    return [];
  }
}

function saveAppointments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments.value));
}

function clearErrors() {
  errors.tutorName = "";
  errors.phone = "";
  errors.petName = "";
  errors.service = "";
  errors.date = "";
  errors.time = "";
  errors.form = "";
}

function validateForm() {
  clearErrors();
  let isValid = true;

  if (!form.tutorName) {
    errors.tutorName = "Informe o nome do tutor.";
    isValid = false;
  }

  if (!form.phone) {
    errors.phone = "Informe o telefone para contato.";
    isValid = false;
  } else if (form.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Use um telefone valido com DDD.";
    isValid = false;
  }

  if (!form.petName) {
    errors.petName = "Informe o nome do pet.";
    isValid = false;
  }

  if (!form.service) {
    errors.service = "Escolha um servico.";
    isValid = false;
  }

  if (!form.date) {
    errors.date = "Escolha uma data.";
    isValid = false;
  }

  if (!form.time) {
    errors.time = "Escolha um horario.";
    isValid = false;
  }

  if (form.date && form.time) {
    const selectedDate = new Date(`${form.date}T${form.time}:00`);
    if (Number.isNaN(selectedDate.getTime())) {
      errors.form = "Data ou horario invalidos.";
      isValid = false;
    } else if (selectedDate.getTime() < Date.now()) {
      errors.form = "Escolha um horario futuro.";
      isValid = false;
    }
  }

  return isValid;
}

function sortAppointments(a, b) {
  const first = new Date(`${a.date}T${a.time}:00`).getTime();
  const second = new Date(`${b.date}T${b.time}:00`).getTime();
  return first - second;
}

function handleSubmit() {
  feedbackMessage.value = "";

  if (!validateForm()) {
    return;
  }

  appointments.value.push({
    id: Date.now(),
    tutorName: form.tutorName,
    phone: form.phone,
    petName: form.petName,
    petType: form.petType,
    service: form.service,
    date: form.date,
    time: form.time,
    notes: form.notes,
  });

  appointments.value.sort(sortAppointments);
  saveAppointments();
  feedbackMessage.value = "Agendamento realizado com sucesso!";
  resetForm();
}

function resetForm() {
  form.tutorName = "";
  form.phone = "";
  form.petName = "";
  form.petType = "cachorro";
  form.service = "banho";
  form.date = "";
  form.time = "";
  form.notes = "";
}

function removeAppointment(appointmentId) {
  appointments.value = appointments.value.filter((item) => item.id !== appointmentId);
  saveAppointments();
}

function clearAllAppointments() {
  appointments.value = [];
  saveAppointments();
}

function getServiceLabel(value) {
  const service = services.find((item) => item.value === value);
  return service ? service.label : "Servico";
}

function formatDateTime(dateValue, timeValue) {
  const date = new Date(`${dateValue}T${timeValue}:00`);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatus(appointment) {
  const now = Date.now();
  const scheduleTime = new Date(`${appointment.date}T${appointment.time}:00`).getTime();
  const diffDays = (scheduleTime - now) / (1000 * 60 * 60 * 24);

  if (scheduleTime < now) {
    return "Concluido";
  }

  if (diffDays < 1) {
    return "Hoje";
  }

  if (diffDays < 2) {
    return "Amanha";
  }

  return "Agendado";
}
</script>

<style scoped>
.booking-wrapper h1 {
  font-size: clamp(1.7rem, 2.8vw, 2.3rem);
}

.booking-grid {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 1.1rem;
  align-items: start;
}

.booking-form {
  padding: 1.15rem;
  display: grid;
  gap: 1rem;
}

.booking-form h2 {
  font-size: 1.15rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

label {
  display: grid;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: #3f4958;
}

label small {
  color: var(--color-danger);
  font-size: 0.77rem;
}

.full-width {
  grid-column: 1 / -1;
}

.submit-button {
  width: fit-content;
}

.feedback {
  border-radius: 10px;
  padding: 0.55rem 0.7rem;
  font-size: 0.88rem;
}

.feedback.success {
  color: #235f3f;
  background: #e6f6ed;
}

.feedback.error {
  color: #8f2f2f;
  background: #fdeaea;
}

.appointments-card {
  padding: 1.1rem;
  display: grid;
  gap: 0.9rem;
  position: sticky;
  top: 95px;
}

.appointments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.appointments-header h2 {
  font-size: 1.1rem;
}

.clear-button {
  padding: 0.45rem 0.75rem;
  font-size: 0.8rem;
}

.empty-message {
  color: var(--color-muted);
  font-size: 0.92rem;
}

.appointments-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.8rem;
}

.appointments-list li {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.8rem;
  display: grid;
  gap: 0.32rem;
}

.appointment-top {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
}

.appointment-top h3 {
  font-size: 0.95rem;
}

.appointments-list p {
  font-size: 0.85rem;
  color: #4f5d6f;
}

.status-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: #2d654f;
  background: #dff3e9;
  border-radius: 999px;
  padding: 0.24rem 0.46rem;
  height: fit-content;
}

.notes {
  font-style: italic;
}

.cancel-link {
  width: fit-content;
  border: none;
  background: transparent;
  color: var(--color-danger);
  text-decoration: underline;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
}

@media (max-width: 980px) {
  .booking-grid {
    grid-template-columns: 1fr;
  }

  .appointments-card {
    position: static;
  }
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .submit-button {
    width: 100%;
  }

  .appointment-top {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
