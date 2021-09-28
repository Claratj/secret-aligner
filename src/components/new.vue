<template>
  <drawer class="bg-white overflow-y-auto">
    <header class="flex-shrink-0 px-4 py-3 border-b border-yellow-700">
      <div>
        <h1>Nuevo paciente</h1>
      </div>
    </header>
    <form enctype="multipart/form-data" @submit.prevent="submit" class="">
      <div class="">
        <div class="relative flex flex-col space-y-1">
          <label for="first_name" class="font-body font-bold text-xs text-black"
            >Nombre</label
          >
          <input
            id="nombre"
            type="text"
            class="
              py-2
              px-3
              font-body font-medium
              text-base text-black
              border border-gray-300
              rounded-md
              focus:outline-none
              focus:ring-1 focus:ring-pink-700
              focus:border-pink-700
            "
            tabindex="1"
            required
            v-model="nombre"
            ref="autofocus"
          />
        </div>

        <div class="relative flex flex-col space-y-1">
          <label for="last_name" class="font-body font-bold text-xs text-black"
            >*Apellidos</label
          >
          <input
            id="apellidos"
            type="text"
            class="
              py-2
              px-3
              font-body font-medium
              text-base text-black
              border border-gray-300
              rounded-md
              focus:outline-none
              focus:ring-1 focus:ring-pink-700
              focus:border-pink-700
            "
            tabindex="2"
            v-model="apellidos"
            required
          />
        </div>
        <div class="flex flex-row items-center space-x-3">
          <icon-arrow-select class="h-6 fill-current text-gray-300" />
          <div class="w-full ml-6 pt-1 flex flex-col">
            <label class="font-body font-bold text-xs text-black">{{
              Sexo
            }}</label>
            <select
              class="
                py-2
                px-3
                font-body font-medium
                text-base text-black
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring-1 focus:ring-pink-700
                focus:border-pink-700
              "
              v-model="sexo"
              required
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
        </div>

        <div class="relative flex flex-col space-y-1">
          <label for="clinica" class="font-body font-bold text-xs text-black"
            >Clínica</label
          >
          <input
            id="clinica"
            type="text"
            class="
              py-2
              px-3
              font-body font-medium
              text-base text-black
              border border-gray-300
              rounded-md
              focus:outline-none
              focus:ring-1 focus:ring-pink-700
              focus:border-pink-700
            "
            tabindex="7"
            v-model="title"
            required
          />
        </div>
      </div>
      <div class="relative flex flex-col space-y-1">
        <h2 for="type" class="font-body font-bold text-xs text-black">
          Recorte alineadores
        </h2>
        <ul class="grid grid-cols-2 gap-2">
          <li class="flex flex-row items-center">
            <input
              id="cuellos"
              value="Recortar a nivel de los cuellos"
              name="otros_datos"
              type="checkbox"
              class="
                h-4
                w-4
                text-green-700
                border-gray-300
                rounded
                focus:ring-transparent
              "
              v-model="otros_datos.recorte_alineadores"
              tabindex="9"
            />
            <label for="cuellos" class="ml-3 text-sm font-medium text-gray-700">
              Recortar a nivel de los cuellos
            </label>
          </li>
          <li class="flex flex-row items-center">
            <input
              id="encia"
              value="Recortar dejando 1-3mm de encía"
              name="otros_datos"
              type="checkbox"
              class="
                h-4
                w-4
                text-green-700
                border-gray-300
                rounded
                focus:ring-transparent
              "
              v-model="otros_datos.recorte_alineadores"
              tabindex="10"
            />
            <label for="encia" class="ml-3 text-sm font-medium text-gray-700">
              Recortar dejando 1-3mm de encía
            </label>
          </li>
        </ul>
      </div>
      <div class="relative flex flex-col space-y-1">
        <h2 for="type" class="font-body font-bold text-xs text-black">
          Secret Retainer
        </h2>
        <ul class="grid grid-cols-2 gap-2">
          <li class="flex flex-row items-center">
            <input
              id="secretretainer"
              name="secretretainer"
              type="checkbox"
              class="
                h-4
                w-4
                text-green-700
                border-gray-300
                rounded
                focus:ring-transparent
              "
              v-model="otros_datos.secretretainer"
              tabindex="1"
            />
            <label
              for="secretretainer"
              class="ml-3 text-sm font-medium text-gray-700"
              >Secret Retainer</label
            >
          </li>
          <li class="flex flex-row items-center">
            <input
              id="alineadores_pasivos"
              name="alineadores_pasivos"
              type="checkbox"
              class="
                h-4
                w-4
                text-green-700
                border-gray-300
                rounded
                focus:ring-transparent
              "
              v-model="otros_datos.alineadores_pasivos"
              tabindex="2"
            />
            <label
              for="alineadores_pasivos"
              class="ml-3 text-sm font-medium text-gray-700"
              >Alineadores pasivos</label
            >
          </li>
        </ul>
      </div>

      <footer class="w-full border-t border-yellow-700 bg-white">
        <div class="px-4 py-2 flex justify-end">
          <button type="submit">Guardar</button>
          <button>Cancelar</button>
          <button @click="clear">Limpiar</button>
        </div>
      </footer>
    </form>
  </drawer>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      apellidos: '',
      fecha_nacimiento: '',
      sexo: '',
      clínica: '',
      otros_datos: {
        recorte_alineadores: [],
        alineadores_pasivos: '',
        secretretainer: '',
      },
    }
  },
  methods: {
    submit() {},
    clear() {
      this.nombre = ''
      this.apellidos = ''
      this.fecha_nacimiento = ''
      this.sexo = ''
      this.clínica = ''
      this.otros_datos.recorte_alineadores = []
      this.otros_datos.alineadores_pasivos = ''
      this.otros_datos.secretretainer = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  background-color: white;
  max-width: 40%;
  margin: 0 auto;
  border-radius: 50px;
}
button {
  padding: 3px 8px;
  border-radius: 5px;
}
.close {
  background-color: red;
  &:hover {
    background-color: aquamarine;
  }
}
</style>
