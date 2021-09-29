<template>
  <div class="modal">
    <header>
      <h1>Nuevo Paciente</h1>
    </header>
    <form enctype="multipart/form-data" @submit.prevent="submit">
      <div class="form-section row">
        <label for="first_name" class="title">Nombre:</label>
        <input id="nombre" type="text" placeholder="Nombre" tabindex="1" v-model="nombre" ref="autofocus" />
      </div>
      <div class="form-section row">
        <label for="last_name" class="title">Apellidos:</label>
        <input id="apellidos" type="text" placeholder="Apellidos" tabindex="2" v-model="apellidos" />
      </div>
      <div class="form-section row">
        <label for="fecha_nacimiento" class="title">Fecha de nacimiento:</label>
        <input id="fecha_nacimiento" type="date" class="date" tabindex="3" v-model="fecha_nacimiento" />
      </div>
      <div class="form-section row">
        <label class="title">Sexo: </label>
        <select v-model="sexo" tabindex="4">
          <option value="" disabled>Selecciona una opción</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>
      <div class="form-section row">
        <label for="clinica" class="title">Clínica:</label>
        <input id="clinica" type="text" placeholder="Clínica" tabindex="5" v-model="clinica" />
      </div>
      <div>
        <p for="type" class="title"> Recorte alineadores: </p>
        <ul>
          <li>
            <input
              id="cuellos"
              value="Recortar a nivel de los cuellos"
              name="otros_datos"
              type="checkbox"
              class="check"
              v-model="otros_datos.recorte_alineadores"
              tabindex="6"
            />
            <label for="cuellos" class=""> Recortar a nivel de los cuellos </label>
          </li>
          <li>
            <input
              id="encia"
              value="Recortar dejando 1-3mm de encía"
              name="otros_datos"
              type="checkbox"
              class="check"
              v-model="otros_datos.recorte_alineadores"
              tabindex="7"
            />
            <label for="encia" class=""> Recortar dejando 1-3mm de encía </label>
          </li>
        </ul>
      </div>
      <div>
        <p for="type" class="title"> Secret Retainer: </p>
        <ul>
          <li>
            <input
              id="secretretainer"
              name="secretretainer"
              type="checkbox"
              class="check"
              v-model="otros_datos.secretretainer"
              tabindex="8"
            />
            <label for="secretretainer" class="">Secret Retainer</label>
          </li>
          <li>
            <input
              id="alineadores_pasivos"
              name="alineadores_pasivos"
              type="checkbox"
              class="check"
              v-model="otros_datos.alineadores_pasivos"
              tabindex="9"
            />
            <label for="alineadores_pasivos" class="">Alineadores pasivos</label>
          </li>
        </ul>
      </div>

      <footer>
        <button type="submit" class="green">Guardar</button>
        <button class="red" @click="cancel">Cancelar</button>
        <button class="blue" @click="clear">Limpiar</button>
      </footer>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewPatient",
  data() {
    return {
      nombre: "",
      apellidos: "",
      fecha_nacimiento: "",
      sexo: "",
      clínica: "",
      otros_datos: {
        recorte_alineadores: [],
        alineadores_pasivos: "",
        secretretainer: ""
      }
    };
  },
  methods: {
    submit() {},
    cancel() {
      this.$emit("close");
    },
    clear() {
      this.nombre = "";
      this.apellidos = "";
      this.fecha_nacimiento = "";
      this.sexo = "";
      this.clinica = "";
      this.otros_datos.recorte_alineadores = [];
      this.otros_datos.alineadores_pasivos = "";
      this.otros_datos.secretretainer = "";
    }
  }
};
</script>

<style scoped>
* {
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}
.modal {
  position: fixed;
  top: 13%;
  left: 37.5%;
  margin-top: -50px;
  margin-left: -50px;
  width: 25%;
  padding: 2rem;
  background-color: white;
  border-radius: 30px;
}
header {
  margin: 0;
  padding: 0;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-section {
  width: 100%;
  padding: 0.4rem 0;
}
.row {
  display: flex;
  flex-direction: column;
}
.date {
  width: 95%;
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid black;
}
select {
  width: 100%;
  padding: 0.6rem;
  border-radius: 10px;
}
#nombre,
#apellidos,
#clinica {
  width: 95%;
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 1rem;
}
.title {
  font-weight: 700;
  font-size: 1rem;
  padding: 0.6rem 0;
}
li {
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.check {
  width: fit-content;
  margin: 0.4rem 1rem 0.4rem 0;
}
footer {
  width: 80%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  width: 100px;
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  color: white;
  cursor: pointer;
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
</style>
