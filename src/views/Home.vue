<template>
  <div class="home">
    <header>
      <div class="header-title">
        <div class="header-card">
          <img src="@/assets/icons/card.svg" />
          <div class="patient-options">
            <h1>Listado de pacientes</h1>
            <p>Visualización de pacientes</p>
          </div>
        </div>
        <div class="header-buttons">
          <button>
            <img src="@/assets/icons/plus.svg" />
            Nuevo Paciente
          </button>
          <button>
            <img src="@/assets/icons/file.svg" />
            Descargar CSV
          </button>
        </div>
      </div>

      <label for="search" class="search">
        <div class="search-icon">
          <img src="@/assets/icons/search.svg" />
        </div>
        <input
          type="text"
          id="search"
          placeholder="Buscar..."
          v-model="search"
        />
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
      <TableClients />
    </section>
  </div>
</template>

<script>
import patients from "@/data/patients.json";
import TableClients from "@/components/TableClients.vue";

export default {
  name: "Home",
  components: {
    TableClients,
  },
  data() {
    return {
      patients: patients,
      search: "",
    };
  },
  computed: {
    filteredPatients: function () {
      return this.patients.filter((client) => {
        const patient = client.datos_cliente;
        const { nombre, apellidos } = patient;
        console.log(patient);
        const search = this.search
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
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
  padding: 1rem 0;
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
  padding: 0.5rem 1rem;
  margin: 1rem 1rem 1rem 0;
  background-color: white;
  color: blue;
  border: 2px solid blue;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}
.header-buttons button:hover {
  background-color: blue;
  color: white;
}
.home {
  width: 70%;
  padding: 2rem;
  margin: 0 auto;
  background-color: pink;
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
  margin-right: 2rem;
  height: 1rem;
  display: relative;
}
.search input {
  width: 100%;
  padding: 1rem;
  background-image: require("@/assets/icons/search.svg");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: center;
  border-radius: 10px;
  background-color: lightsteelblue;
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
</style>
