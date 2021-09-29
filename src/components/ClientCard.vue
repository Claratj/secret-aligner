<template>
  <div class="card-container">
    <div class="card" v-for="(patient, index) in patients" :key="index">
      <figure>
        <img src="@/assets/icons/avatar.svg" />
        <figcaption>
          <span>
            {{ patient.datos_paciente.nombre }},
            {{ patient.datos_paciente.apellidos }}
          </span>
        </figcaption>
      </figure>
      <div class="card-info">
        <span class="birthday">
          <img src="@/assets/icons/calendar.svg" />
          {{ patient.datos_paciente.fecha_nacimiento }}
        </span>
        <span>
          {{ patient.ficha_dental.clinica }}
        </span>
        <span>
          {{ patient.ficha_dental.objetivo_tratamiento }}
        </span>
        <span>
          <div v-if="patient.ficha_dental.estado === 'solicitado'" class="status-gray"> Solicitado </div>
          <div v-if="patient.ficha_dental.estado === 'facturado'" class="status-green"> Facturado </div>

          <div v-if="patient.ficha_dental.estado === 'planificando'" class="status-orange"> Planificando </div>
          <div v-if="patient.ficha_dental.estado === 'fabricando'" class="status-blue"> Fabricando </div>
          <div v-if="patient.ficha_dental.estado === 'enviado'" class="status-green"> Enviado </div>
          <div v-if="patient.ficha_dental.estado === 'aceptado'" class="status-green"> Aceptado </div>
        </span>
        <select name="" id="" class="actions">
          <option value="" disabled>Acciones</option>
          <option value="edit">Editar</option>
          <option value="finish">Finalizar</option>
          <option value="delete">Borrar</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import patients from "@/data/patients.json";

export default {
  name: "ClientCard",
  data() {
    return {
      patients: patients
    };
  }
};
</script>


<style scoped>
.card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card {
  width: 30%;
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  display: flex;
}
figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
.card-info {
  display: flex;
  flex-direction: column;
}
</style>
