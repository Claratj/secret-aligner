<template>
  <div>
    <table>
      {{ this.search }}
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
            <div v-if="patient.ficha_dental.estado === 'solicitado'" class="status-solicitado"> Solicitado </div>
            <div v-if="patient.ficha_dental.estado === 'facturado'" class="status-facturado"> Facturado </div>
            <div v-if="patient.ficha_dental.estado === 'planificando'" class="status-planificado"> Planificando </div>
            <div v-if="patient.ficha_dental.estado === 'fabricando'" class="status-fabricado"> Fabricando </div>
            <div v-if="patient.ficha_dental.estado === 'enviado'" class="status-enviado"> Enviado </div>
            <div v-if="patient.ficha_dental.estado === 'aceptado'" class="status-aceptado"> Aceptado </div>
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

    <nav class="pagination">
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link" @click="page--">
            <img src="@/assets/icons/chevron-left.svg" />
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            @click="page = pageNumber"
            :key="pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link">
            <img src="@/assets/icons/chevron-right.svg" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import patients from "@/data/patients.json";

export default {
  name: "TableClient",
  props: {
    search: String,
    number: Number
  },
  data() {
    return {
      patients: patients,
      page: 1,
      perPage: this.number,
      pages: []
    };
  },
  computed: {
    displayedPatients: function () {
      return this.paginate(this.patients);
    }
  },
  watch: {
    posts() {
      this.setPages();
    }
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.patients.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(patients) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return patients.slice(from, to);
    }
  }
};
</script>

<style >
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
.pagination {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
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
