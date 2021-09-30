<template>
  <div class="card-container">
    <div class="card" v-for="(patient, index) in patients" :key="index" @click="openFile">
      <div class="card-main">
        <div class="card-profile">
          <figure>
            <img src="@/assets/icons/avatar.svg" class="avatar" />
          </figure>
          <figcaption>
            <span>
              {{ patient.datos_paciente.nombre }},
              {{ patient.datos_paciente.apellidos }}
            </span>
            <span class="birthday">
              <img src="@/assets/icons/calendar.svg" />
              {{ patient.datos_paciente.fecha_nacimiento }}
            </span>
          </figcaption>
        </div>
        <div class="card-info">
          <span>
            <h4>Clínica:</h4><p>{{ patient.ficha_dental.clinica }}</p>
          </span>
          <span>
            <h4>Tratamiento: </h4><p>{{ patient.ficha_dental.objetivo_tratamiento }} </p></span
          >
          <span>
            <div v-if="patient.ficha_dental.estado === 'solicitado'" class="status-solicitado"> Solicitado </div>
            <div v-if="patient.ficha_dental.estado === 'facturado'" class="status-facturado"> Facturado </div>
            <div v-if="patient.ficha_dental.estado === 'planificando'" class="status-planificado"> Planificando </div>
            <div v-if="patient.ficha_dental.estado === 'fabricando'" class="status-fabricado"> Fabricando </div>
            <div v-if="patient.ficha_dental.estado === 'enviado'" class="status-enviado"> Enviado </div>
            <div v-if="patient.ficha_dental.estado === 'aceptado'" class="status-aceptado"> Aceptado </div>
          </span>
        </div>
      </div>
      <div class="actions">
        <button value="edit" class="blue">Editar</button>
        <button value="finish" class="green">Finalizar</button>
        <button value="delete" class="red">Borrar</button>
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: 0.3s;
}
.card-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.card-profile {
  padding-right: 1rem;
  flex: 1;
}

figcaption {
  flex-shrink: 0;
  flex: 1;
}
.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 0.5rem;
  flex: 1;
}
h4 {
  margin: 0;
}
p {
  padding: 0;
  margin: 0.4rem 0;
}
.card select {
  margin: 0.4rem 0;
  border-radius: 5px;
  padding: 0.4rem;
  font-size: 1rem;
}
.actions {
  width: 100%;
  margin-top: 0.6rem;
  display: flex;
  justify-content: space-between;
}
button {
  width: 100px;
  padding: 0.6rem;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  cursor: pointer;
}
.red {
  background-color: white;
  color: #d7263d;
  border: 2px solid #d7263d;
}
.blue:hover {
  background-color: #339dff;
  color: white;
}
.blue {
  background-color: white;
  color: #339dff;
  border: 2px solid #339dff;
}
.green:hover {
  background-color: #00c49a;
  color: white;
}
.green {
  background-color: white;
  color: #00c49a;
  border: 2px solid #00c49a;
}
.red:hover {
  background-color: #d7263d;
  color: white;
}
</style>
