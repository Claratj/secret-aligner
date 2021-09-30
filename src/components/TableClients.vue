<template>
  <div>
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
        <tr
          v-for="patient in displayedPatients"
          :key="patient"
          class="modal-patient-pdf"
          title="Ver ficha paciente"
          @click="openFile(patient)"
        >
          <td>
            <span class="table-card">
              <figure>
                <img src="@/assets/icons/avatar.svg" class="avatar" />
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
              <option>Acciones</option>
              <option value="edit">Editar</option>
              <option value="finish">Finalizar</option>
              <option value="delete">Borrar</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showFile">
      <div class="modal-bg" />
      <ClientFile :client="client" @close-file="showFile = false" :key="client" />
    </div>
    <div class="pagination">
      <div class="pagination-box">
        <a @click.prevent="prev" href="#">
          <img src="@/assets/icons/chevron-left.svg" />
        </a>

        <a
          v-for="i in displayPageRange"
          :key="i"
          :class="{ active: i - 1 === currentPage }"
          @click.prevent="pageSelect(i)"
          href="#"
        >
          {{ i }}
        </a>

        <a @click.prevent="next" href="#">
          <img src="@/assets/icons/chevron-right.svg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import patients from "@/data/patients.json";
import ClientFile from "@/components/ClientFile.vue";

export default {
  name: "TableClient",
  components: {
    ClientFile
  },
  props: {
    search: String,
    number: Number
  },
  data() {
    return {
      patients: patients,
      currentPage: 0,
      pageRange: 5,
      showFile: false,
      client: {
        nombre: "",
        apellidos: "",
        fecha_nacimiento: "",
        sexo: "",
        clinica: "",
        dientes_no_mover: "",
        estado: "",
        objetivo_tratamiento: "",
        otros_datos: {
          recorte_alineadores: [],
          alineadores_pasivos: "",
          secretretainer: ""
        }
      }
    };
  },
  computed: {
    filteredPatients: function () {
      const filtered = [];
      for (const key in this.patients) {
        if (Object.hasOwnProperty.call(this.patients, key)) {
          filtered.push(this.patients[key]);
        }
      }
      return filtered.filter((patient) => {
        const nombre = patient.datos_paciente.nombre;
        const apellidos = patient.datos_paciente.apellidos;
        const search = this.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const text = [nombre, apellidos]
          .filter((value) => value)
          .join("")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (!text.match(search.toLowerCase())) {
          return false;
        }
        return true;
      });
    },
    pages() {
      return Math.ceil(this.filteredPatients.length / this.number);
    },
    displayPageRange() {
      const half = Math.ceil(this.pageRange / 2);
      let start, end;

      if (this.pages < this.pageRange) {
        start = 1;
        end = this.pages;
      } else if (this.currentPage < half) {
        start = 1;
        end = start + this.pageRange - 1;
      } else if (this.pages - half < this.currentPage) {
        end = this.pages;
        start = end - this.pageRange + 1;
      } else {
        start = this.currentPage - half + 1;
        end = this.currentPage + half;
      }

      let indexes = [];
      for (let i = start; i <= end; i++) {
        indexes.push(i);
      }
      return indexes;
    },
    displayedPatients: function () {
      const head = this.currentPage * this.number;
      return this.filteredPatients.slice(head, head + this.number);
    }
  },
  methods: {
    prev() {
      if (0 < this.currentPage) {
        this.currentPage--;
      }
    },
    next() {
      if (this.currentPage < this.pages - 1) {
        this.currentPage++;
      }
    },
    pageSelect(index) {
      this.currentPage = index - 1;
    },
    openFile(patient) {
      this.client.nombre = patient.datos_paciente.nombre;
      this.client.apellidos = patient.datos_paciente.apellidos;
      this.client.fecha_nacimiento = patient.datos_paciente.fecha_nacimiento;
      this.client.sexo = patient.datos_paciente.sexo;
      this.client.clinica = patient.ficha_dental.clinica;
      this.client.estado = patient.ficha_dental.estado;
      this.client.dientes_no_mover = patient.ficha_dental.dientes_no_mover;
      this.client.objetivo_tratamiento = patient.ficha_dental.objetivo_tratamiento;
      this.client.otros_datos.recorte_alineadores = patient.ficha_dental.otros_datos.recorte_alineadores;
      this.client.otros_datos.alineadores_pasivos = patient.ficha_dental.otros_datos.alineadores_pasivos;
      this.client.otros_datos.secretretainer = patient.ficha_dental.otros_datos.secretretainer;
      this.showFile = true;
    }
  }
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
table tbody tr:hover {
  background-color: #d9d9d9;
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
  color: rgb(160, 160, 160);
  display: flex;
  align-items: center;
}

figure {
  flex-shrink: 0;
  background-color: #6666;
  width: 3.2rem;
  height: 3.2rem;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 1rem;
}
.avatar {
  width: 3.2rem;
  height: 3.2rem;
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
select {
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
.pagination {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
.pagination-box {
  width: fit-content;
  height: 3rem;
  border: 2px solid #6666;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
  padding: 1rem;
  color: #6666;
  font-weight: 700;
}
a img {
  filter: invert(40%) sepia(6%) saturate(0%) hue-rotate(217deg) brightness(94%) contrast(83%);
}

a:hover {
  background-color: white;
  border: 2px solid #339dff;
  color: #339dff;
  border-radius: 5px;
}
.active {
  background-color: #339dff;
  color: white;
}
.modal-patient-pdf {
  cursor: pointer;
}
</style>
