<template>
  <div>
    <div class="card-container">
      <div class="card" v-for="patient in displayedPatients" :key="patient" @click="openFile(patient)">
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
      <div v-if="showFile">
        <div class="modal-bg" />
        <ClientFile :client="client" @close-file="showFile = false" :key="client" />
      </div>
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
  name: "ClientCard",
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
      pageRange: 6,
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
  cursor: pointer;
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
