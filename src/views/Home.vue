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
            <th class="table-title"></th>
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
          <tr
            v-for="(patient, index) in patients"
            :key="index"
            class="table-list"
          >
            <td>
              {{ patient.datos_paciente.nombre }},
              {{ patient.datos_paciente.apellidos }}
            </td>
            <td>
              {{ patient.ficha_dental.clinica }}
            </td>
            <td>
              {{ patient.ficha_dental.objetivo_tratamiento }}
            </td>
            <td>
              {{ patient.ficha_dental.estado }}
            </td>
            <td>
              <select name="" id="">
                <option>Acciones</option>
                <option>Editar</option>
                <option>Finalizar</option>
                <option>Borrar</option>
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
  background-color: yellow;
  margin: 0 auto;
  border: none;
}
table tr {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
.table-list {
  display: flex;
  flex-direction: flex-row;
}
</style>
