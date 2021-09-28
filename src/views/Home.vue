<template>
  <div class="home">
    <header>
      <div class="patient">
        <div>
          <img src="@/assets/icons/card.svg" />
        </div>
        <div class="patient-options">
          <h1>Listado de pacientes</h1>
          <p>Visualización de pacientes</p>
          <div class="patient-buttons">
            <button>Nuevo Paciente</button>
            <button>Descargar CSV</button>
          </div>
        </div>
      </div>
      <label for="search">
        <input type="text" id="search" />
      </label>
    </header>
    <section>
      <div class="show">
        <img src="@/assets/icons/menu.svg" />
        <img src="@/assets/icons/grid.svg" />
        <p>5</p>
        <p>10</p>
        <p>15</p>
      </div>
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
              <select name="" id="">
                <option value="" disabled>Acciones</option>
                <option value="edit">Editar</option>
                <option value="finish">Finalizar</option>
                <option value="delete">Borrar</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import patients from "@/data/patients.json";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      patients: patients,
    };
  },
};
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home {
  width: 70%;
  padding: 2rem;
  margin: 0 auto;
  background-color: pink;
}

.patient {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.patient-options {
  display: flex;
  flex-direction: column;
}
.patient-button {
  width: 100%;
  padding: 1rem;
  background-color: green;
  display: flex;
  justify-content: space-between;
}
.show {
  display: flex;
  flex-direction: row;
}
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
tbody {
  border-left: 1px solid #6666;
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
  background-color: #4d4d4d;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
}
th {
  width: 100%;
  padding: 0.8rem;
  border-bottom: 1px solid #6666;
}
td {
  width: 100%;
  padding: 0.4rem 0;
  border-bottom: 2px solid #6666;
}
</style>
