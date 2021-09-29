<template>
  <div class="card-container">
    <div class="card" v-for="(patient, index) in patients" :key="index">
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
          {{ patient.ficha_dental.clinica }}
        </span>
        <span>
          {{ patient.ficha_dental.objetivo_tratamiento }}
        </span>
        <span>
          <div v-if="patient.ficha_dental.estado === 'solicitado'" class="status-solicitado"> Solicitado </div>
          <div v-if="patient.ficha_dental.estado === 'facturado'" class="status-facturado"> Facturado </div>
          <div v-if="patient.ficha_dental.estado === 'planificando'" class="status-planificado"> Planificando </div>
          <div v-if="patient.ficha_dental.estado === 'fabricando'" class="status-fabricado"> Fabricando </div>
          <div v-if="patient.ficha_dental.estado === 'enviado'" class="status-enviado"> Enviado </div>
          <div v-if="patient.ficha_dental.estado === 'aceptado'" class="status-aceptado"> Aceptado </div>
        </span>
        <select name="" id="">
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
  width: 29%;
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.card-profile {
  padding-right: 1rem;
}
figure {
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  flex: 1;
}
.avatar {
  width: 3.2rem;
  height: 3.2rem;
}

figcaption {
  flex-shrink: 0;
  flex: 1;
}
.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 2;
}
.card select {
  max-width: 6.2rem;
  border-radius: 5px;
  padding: 0.4rem;
  font-size: 1rem;
}
.status-solicitado {
  width: 100px;
  padding: 0.8rem;
  margin: 0.4rem 0;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
  background-color: #b6b8c9;
}
.status-enviado {
  width: 100px;
  padding: 0.8rem;
  margin: 0.4rem 0;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
  background-color: #f9c846;
}
.status-facturado {
  width: 100px;
  padding: 0.8rem;
  margin: 0.4rem 0;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
  background-color: #02a9ea;
}

.status-fabricado {
  width: 100px;
  padding: 0.8rem;
  margin: 0.4rem 0;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
  background-color: #541388;
}
.status-planificado {
  width: 100px;
  padding: 0.8rem;
  margin: 0.4rem 0;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
  background-color: #fc7a57;
}
.status-aceptado {
  width: 100px;
  padding: 0.8rem;
  margin: 0.4rem 0;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
  background-color: #00c49a;
}
</style>
