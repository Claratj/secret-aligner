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
          <button>
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
  </div>
</template>

<script>
import TableClients from "@/components/TableClients.vue";
import ClientCard from "@/components/ClientCard.vue";

export default {
  name: "Home",
  components: {
    TableClients,
    ClientCard
  },
  data() {
    return {
      search: "",
      table: true,
      grid: false,
      number: ""
    };
  },
  methods: {
    create() {
      this.$store.dispatch("drawers/fixed");
      this.$store.dispatch("drawers/open", { component: "modal-new" });
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
  display: relative;
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
</style>
