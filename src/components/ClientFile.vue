<template>
  <div>
    <div class="buttons">
      <button class="red" type="button" @click="download">
        <img src="@/assets/icons/disk.svg" />
      </button>
      <button class="red" type="button" @click="cancel">
        <img src="@/assets/icons/x.svg" />
      </button>
    </div>
    <div class="modal" ref="file">
      <div class="container item">
        <div class="one img">
          <img src="@/assets/icons/avatar.svg" class="client" />
        </div>
        <div class="two info-personal border-right border-left">
          <p class="sub-item text">
            {{ client.clinica }}
          </p>
          <p class="sub-item text">
            {{ client.nombre }}
          </p>
          <p class="sub-item text">
            {{ client.apellidos }}
          </p>
          <div class="sex-birth">
            <span class="border-right text">{{ client.sexo }}</span>
            <span class="text">{{ client.fecha_nacimiento }}</span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="item">
          <p class="sub-item text-title"> Dientes No Mover </p>
          <div>
            <img src="@/assets/maxilar.jpg" class="maxilar" />
          </div>
        </div>
        <div class="item">
          <div class="sub-item">
            <p class="text">{{ client.dientes_no_mover }}</p>
          </div>
          <div class="sub-item">
            <p class="text">{{ client.estado }}</p>
          </div>
          <div class="sub-item">
            <p class="text">{{ client.objetivo_tratamiento }}</p>
          </div>

          <div class="info-dental two">
            <p class="text"
              ><b>Recorte de Alineadores</b> <br />

              {{ client.otros_datos.recorte_alineadores }}
            </p>
            <p class="text"
              ><b>¿Desea alineadores pasivos?</b> <br />
              <span v-if="client.otros_datos.alineadores_pasivos"> Sí</span>
              <span v-else>No</span>
            </p>
            <p class="text"
              ><b>¿Desea SecretRetainer al finalizar?</b> <br />
              <span v-if="client.otros_datos.secretretainer"> Sí</span>
              <span v-else>No</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { jsPDF } from "jspdf";
export default {
  name: "ClientFile",
  props: {
    client: Object
  },
  methods: {
    cancel() {
      this.$emit("close-file");
    },
    download() {
      const doc = new jsPDF();
      doc.text("Ficha paciente", 40, 40);
      doc.save("a4.pdf");
    }
  }
};
</script>

<style scope>
.buttons {
  position: absolute;
  top: 3%;
  right: 5%;
}
.buttons button {
  background-color: transparent;
  width: 3rem;
  margin: 0 0.2rem;
}
.buttons button img {
  transform: scale(1.2);
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(305deg) brightness(103%) contrast(103%);
}
.modal {
  position: fixed;
  top: 13%;
  left: 30%;
  margin-top: -50px;
  margin-left: -50px;
  width: 40%;
  padding: 2rem;
  background-color: white;
  z-index: 10;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2fr;
  column-gap: 1rem;
  row-gap: 0;
  column-gap: 0;
}
.container:last-child {
  margin-top: 2rem;
}
.one {
  grid-column-start: 1;
}
.two {
  grid-column-start: 2;
}
.item {
  border: 1px solid black;
}
.item:nth-child(-n + 2) {
}
.item:nth-child(odd) {
  border-right: none;
}

.sub-item {
  border-bottom: 1px solid black;
}
.border-right {
  border-right: 1px solid black;
}
.border-left {
  border-left: 1px solid black;
}

.img {
  width: 400px;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.client {
  transform: scale(5);
  filter: brightness(0%);
}
.info-personal {
  display: flex;
  flex-direction: column;
}
.maxilar {
  width: 400px;
}
.text,
.text-title {
  padding: 0.8rem 0.4rem;
}
.text-title {
  font-weight: 700;
}
.sex-birth {
  display: flex;
  flex-direction: row;
}
</style>
