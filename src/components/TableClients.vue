import TableClient from '@/components/TableClients.vue';
import patients from '@/data/patients.json';
<template>
  <table>
    <thead>
      <tr>
        <th class="table-title">
          Nombre y Apellidos
          <span class="sort-buttons">
            <img src="@/assets/icons/chevron-up.svg" />
            <img src="@/assets/icons/chevron-down.svg" />
          </span>
        </th>
        <th class="table-title">Clínica</th>
        <th class="table-title">
          Objetivo Tratamiento
          <span class="sort-buttons">
            <img src="@/assets/icons/chevron-up.svg" />
            <img src="@/assets/icons/chevron-down.svg" />
          </span>
        </th>

        <th class="table-title">
          Estado
          <span class="sort-buttons">
            <img src="@/assets/icons/chevron-up.svg" />
            <img src="@/assets/icons/chevron-down.svg" />
          </span>
        </th>
        <th class="table-title">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(patient, index) in patients" :key="index">
        <td>
          <span class="table-card">
            <figure class="avatar">
              <img src="@/assets/icons/avatar.svg" />
            </figure>
            <figcaption class="table-content-name">
              <span>
                {{ patient.datos_paciente.nombre }},
                {{ patient.datos_paciente.apellidos }}
              </span>
              <span class="birthday">
                <img src="@/assets/icons/calendar.svg" />
                {{ patient.datos_paciente.fecha_nacimiento }}
              </span>
            </figcaption>
          </span>
        </td>
        <td class="table-content">
          {{ patient.ficha_dental.clinica }}
        </td>
        <td class="table-content">
          {{ patient.ficha_dental.objetivo_tratamiento }}
        </td>
        <td class="table-content">
          <div
            v-if="patient.ficha_dental.estado === 'solicitado'"
            class="status-gray"
          >
            Solicitado
          </div>
          <div
            v-if="patient.ficha_dental.estado === 'facturado'"
            class="status-green"
          >
            Facturado
          </div>

          <div
            v-if="patient.ficha_dental.estado === 'planificando'"
            class="status-orange"
          >
            Planificando
          </div>
          <div
            v-if="patient.ficha_dental.estado === 'fabricando'"
            class="status-blue"
          >
            Fabricando
          </div>
          <div
            v-if="patient.ficha_dental.estado === 'enviado'"
            class="status-green"
          >
            Enviado
          </div>
          <div
            v-if="patient.ficha_dental.estado === 'aceptado'"
            class="status-green"
          >
            Aceptado
          </div>
        </td>
        <td class="table-content table-actions">
          <select name="" id="" class="actions">
            <option value="" disabled>Acciones</option>
            <option value="edit">Editar</option>
            <option value="finish">Finalizar</option>
            <option value="delete">Borrar</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableClient",
  props: {

  },
  data() {
    return {
      patients: "",
    };
  },
};
</script>

<style>
table {
  width: 100%;
  margin: 0 auto;
  border: none;
}
table tr {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.table-title {
  padding: 3 0;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.sort-buttons {
  padding: 0 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sort-buttons img {
  height: 1rem;
}

.table-content {
  display: flex;
  flex-direction: flex-row;
  align-items: center;
  justify-content: center;
}
.table-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: flex-start;
}
.table-content-name {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.birthday {
  color: #6666;
  display: flex;
  align-items: center;
}

figure {
  flex-shrink: 0;
  background-color: #6666;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
th {
  width: 100%;
  padding: 0.8rem;
  border-bottom: 2px solid #6666;
}
td {
  width: 100%;
  padding: 0.4rem 0;
  border-bottom: 2px solid #6666;
}
.actions {
  border-radius: 5px;
  padding: 0.4rem;
  font-size: 1rem;
}
</style>
