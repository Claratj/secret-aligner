<template>
  <div class="modal">
    <header>
      <h1>Nuevo Paciente</h1>
    </header>
    <form enctype="multipart/form-data" @submit.prevent="submit">
      <div class="form-section">
        <label for="first_name" class="">Nombre</label>
        <input id="nombre" type="text" class="" tabindex="1" v-model="nombre" ref="autofocus" />
      </div>
      <div class="form-section">
        <label for="last_name" class="">*Apellidos</label>
        <input id="apellidos" type="text" class="" tabindex="2" v-model="apellidos" />
      </div>
      <div class="form-section">
        <label class="">{{ Sexo }}</label>
        <select class="" v-model="sexo" tabindex="3">
          <option value="" disabled>Selecciona una opción</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>
      <div class="form-section">
        <label for="clinica" class="">Clínica</label>
        <input id="clinica" type="text" class="" tabindex="5" v-model="clinica" />
      </div>
      <div class="form-section">
        <h2 for="type" class=""> Recorte alineadores </h2>
        <ul class="">
          <li class="">
            <input
              id="cuellos"
              value="Recortar a nivel de los cuellos"
              name="otros_datos"
              type="checkbox"
              class=""
              v-model="otros_datos.recorte_alineadores"
              tabindex="6"
            />
            <label for="cuellos" class=""> Recortar a nivel de los cuellos </label>
          </li>
          <li class="">
            <input
              id="encia"
              value="Recortar dejando 1-3mm de encía"
              name="otros_datos"
              type="checkbox"
              class=""
              v-model="otros_datos.recorte_alineadores"
              tabindex="7"
            />
            <label for="encia" class=""> Recortar dejando 1-3mm de encía </label>
          </li>
        </ul>
      </div>
      <div class="form-section">
        <h2 for="type" class=""> Secret Retainer </h2>
        <ul class="">
          <li class="">
            <input
              id="secretretainer"
              name="secretretainer"
              type="checkbox"
              class=""
              v-model="otros_datos.secretretainer"
              tabindex="8"
            />
            <label for="secretretainer" class="">Secret Retainer</label>
          </li>
          <li class="">
            <input
              id="alineadores_pasivos"
              name="alineadores_pasivos"
              type="checkbox"
              class=""
              v-model="otros_datos.alineadores_pasivos"
              tabindex="9"
            />
            <label for="alineadores_pasivos" class="">Alineadores pasivos</label>
          </li>
        </ul>
      </div>

      <footer>
        <button type="submit" class="green">Guardar</button>
        <button class="red">Cancelar</button>
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
    clear() {
      this.nombre = "";
      this.apellidos = "";
      this.fecha_nacimiento = "";
      this.sexo = "";
      this.clínica = "";
      this.otros_datos.recorte_alineadores = [];
      this.otros_datos.alineadores_pasivos = "";
      this.otros_datos.secretretainer = "";
    }
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 25%;
  left: 35%;
  margin-top: -50px;
  margin-left: -50px;
  width: 30%;
  padding: 3rem;
  background-color: white;
  border-radius: 40px;
}
header {
  width: 100%;
  text-align: center;
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-section {
  width: 70%;
  margin: 0 auto;
  background-color: blue;
}
footer {
  width: 70%;
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
