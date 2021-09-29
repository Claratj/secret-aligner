<template>
  <div class="home">
    <div class="subnav">Listado de Pacientes</div>
    <header>
      <div class="header-title">
        <div class="header-card">
          <img src="@/assets/icons/card.svg" />
          <div class="patient-options">
            <h1>Listado de pacientes</h1>
            <p>Visualización de Pacientes</p>
          </div>
        </div>
        <div class="header-buttons">
          <button @click="create">
            <img src="@/assets/icons/plus.svg" />
            Nuevo Paciente
          </button>

          <button @click="downloadCSV" id="a2" download="file.csv">
            <img src="@/assets/icons/file.svg" />
            Descargar CSV
          </button>
        </div>
      </div>

      <label for="search" class="search">
        <img src="@/assets/icons/search.svg" />
        <input type="text" name="search" id="search" placeholder="Buscar..." v-model="search" />
      </label>
    </header>
    <section>
      <div class="show">
        <img src="@/assets/icons/menu.svg" @click="show('table')" />
        <img src="@/assets/icons/grid.svg" @click="show('grid')" />
        <p @click="show(5)">5</p>
        <p @click="show(10)">10</p>
        <p @click="show(15)">15</p>
      </div>
      <span v-if="table">
        <TableClients :search="search" :number="number" />
      </span>
      <span v-if="grid">
        <ClientCard />
      </span>
    </section>
    <div v-if="isOpen" @close="close">
      <div class="modal-bg" />
      <NewClient />
    </div>
  </div>
</template>

<script>
import patients from "@/data/patients.json";
import TableClients from "@/components/TableClients.vue";
import ClientCard from "@/components/ClientCard.vue";
import NewClient from "@/components/NewClient.vue";

export default {
  name: "Home",
  components: {
    TableClients,
    ClientCard,
    NewClient
  },
  data() {
    return {
      search: "",
      table: true,
      grid: false,
      isOpen: false,
      number: "",
      patients: patients
    };
  },

  methods: {
    create() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    convertToCSV(obj) {
      const newObject = typeof obj != "object" ? JSON.parse(obj) : obj;
      const newArray = [];

      for (const key in newObject) {
        if (Object.hasOwnProperty.call(newObject, key)) {
          newArray.push(newObject[key]);
        }
      }
      const csvString = [
        [
          "Nombre",
          "Apellidos",
          "Fecha de nacimiento",
          "Sexo",
          "Acadas tratamiento",
          "Dientes no mover",
          "Estado",
          "Clínica",
          "Objetivo tratamiento",
          "Recorte alineadores",
          "Alineadores pasivos",
          "Secret retainer"
        ],
        ...newArray.map((item) => [
          item.datos_paciente.nombre,
          item.datos_paciente.apellidos,
          item.datos_paciente.fecha_nacimiento,
          item.datos_paciente.sexo,
          item.ficha_dental.acadas_tratamiento,
          item.ficha_dental.dientes_no_mover,
          item.ficha_dental.estado,
          item.ficha_dental.clinica,
          item.ficha_dental.objetivo_tratamiento,
          item.ficha_dental.otros_datos.recorte_alineadores,
          item.ficha_dental.otros_datos.alineadores_pasivos,
          item.ficha_dental.otros_datos.secretretainer
        ])
      ]
        .map((e) => e.join(","))
        .join("\n");

      return csvString;
    },
    downloadCSV() {
      const obj = JSON.stringify(this.patients);
      const csv = this.convertToCSV(obj);
      const exportedFileName = "pacientes.csv" || "export.csv";
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, exportedFileName);
      } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFileName);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    show(display) {
      if (display === "table") {
        this.table = true;
        this.grid = false;
      }
      if (display === "grid") {
        this.grid = true;
        this.table = false;
      }
      if (display === 5) {
        this.number = 5;
      }
      if (display === 10) {
        this.number = 10;
      }
      if (display === 15) {
        this.number = 15;
      }
    }
  }
};
</script>

<style scoped>
.subnav {
  width: 100%;
  height: 60px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  background-color: #d9d9d9;
}
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
h1 {
  margin: 0;
}
p {
  margin: 0;
  padding: 0.4rem 0;
}
.header-title {
  display: flex;
  flex-direction: column;
}
.header-card {
  padding: 1.6rem 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
}
.header-card img {
  width: 2rem;
  padding-right: 1rem;
}
.header-buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
}
.header-buttons button {
  width: 12rem;
  padding: 0.8rem 1rem;
  margin: 1rem 1rem 1rem 0;
  background-color: white;
  color: #339dff;
  border: 2px solid #339dff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}
.header-buttons button img {
  padding-right: 0.2rem;
  height: 1rem;
  filter: invert(49%) sepia(53%) saturate(740%) hue-rotate(170deg) brightness(102%) contrast(102%);
}
.header-buttons button:hover {
  background-color: #339dff;
  color: white;
}
.header-buttons button:hover img {
  filter: invert(93%) sepia(100%) saturate(1%) hue-rotate(183deg) brightness(109%) contrast(101%);
}
.home {
  width: 70%;
  padding: 0 4rem 2rem 4rem;
  margin: 0 auto;
}

.patient {
  background-color: whitesmoke;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.patient-options {
  display: flex;
  flex-direction: column;
}

.search {
  width: 40%;
  margin: 1rem;
  padding: 1rem 0 1rem;
  height: 1rem;
  position: relative;
}
.search img {
  position: absolute;
  margin: 0.8rem 0.6rem;
}
.search input {
  width: 100%;
  padding: 1rem 0 1rem 2.6rem;
  border-radius: 10px;
  background-color: #d9d9d9;
  border: none;
  font-size: 1rem;
}

.show {
  margin: 1rem 0;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.show img {
  padding: 0 0.4rem;
  cursor: pointer;
}
.show p {
  padding: 0 0.4rem;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
}
.modal-bg {
  width: 100%;
  position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.3;
}
</style>
