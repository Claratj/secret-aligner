<template>
  <div class="modal">
    <div class="container">
      <div class="one item">
        <img src="@/assets/icons/avatar.svg" class="avatar" />
      </div>
      <div class="two info-personal item">
        <span class="sub-item">
          {{ patient.ficha_dental.clinica }}
        </span>
        <span class="sub-item">
          {{ patient.datos_paciente.nombre }}
        </span>
        <span class="sub-item">
          {{ patient.datos_paciente.apellidos }}
        </span>
        <div>
          <span class="border-right">{{ patient.datos_paciente.sexo }}</span>
          <span>{{ patient.datos_paciente.fecha_nacimiento }}</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="item">
        <p class="sub-item"> Dientes no mover </p>
        <div class="img">
          <img src="@/assets/icons/avatar.svg" class="avatar" />
        </div>
      </div>
      <div class="item">
        <div class="sub-item">aqui irian los dientes a no mover</div>
        <div class="sub-item">{{ patient.ficha_dental.estado }}</div>
        <div class="sub-item">{{ patient.ficha_dental.objetivo_tratamiento }}</div>

        <div class="info-dental two">
          <span>Recorte de Alineadores {{ patient.ficha_dental.otros_datos.recorte_alineadores }} </span>
          <span>¿Desea alineadores pasivos? {{ patient.ficha_dental.otros_datos.alineadores_pasivos }} </span>
          <span>¿Desea SecretRetainer al finalizar? {{ patient.ficha_dental.otros_datos.secretretainer }} </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ClientFile",
  props: {
    patient: Object
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 13%;
  left: 37.5%;
  margin-top: -50px;
  margin-left: -50px;
  width: 25%;
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
.img {
}
.avatar {
  filter: invert(40%) sepia(6%) saturate(0%) hue-rotate(217deg) brightness(94%) contrast(83%);
}
.info-personal {
  display: flex;
  flex-direction: column;
}
</style>
