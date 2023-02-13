<script setup>
import { reactive, onMounted } from "vue";
import { createCycle, cycleById, editCycle } from "../../api";
import { Form } from "vee-validate";
import FlatPickr from "vue-flatpickr-component";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const state = reactive({
  cyclename: "",
  cycledescription: "",
  cyclestart_date: "",
  cyclefinish_date: "",
  res: {},
});

async function onSubmit() {
  const save = (id, payload) => {
    if (!id) {
      return createCycle(payload);
    }
    return editCycle(id, payload);
  };

  const data = await save(route.params.id, {
    name: state.cyclename,
    description: state.cycledescription,
    start_date: state.cyclestart_date,
    finish_date: state.cyclefinish_date,
  });

  state.res = data;
  setTimeout(() => {
    router.push({ name: "cycles" });
  }, 1000);
}

onMounted(async () => {
  if (route.params.id) {
    const value = await cycleById(route.params.id);
    state.cyclename = value.data.name;
    state.cycledescription = value.data.description;
    state.cyclestart_date = value.data.start_date;
    state.cyclefinish_date = value.data.finish_date;
  }
});
</script>

<template>
  <!-- Hero Content -->
  <div class="bg-primary-dark">
    <div class="content content-full text-center pt-7 pb-5">
      <h1 class="h2 text-white mb-2">
        {{ !route.params.id ? "Crear" : "Modificar" }} ciclo
      </h1>
      <h2 class="h4 fw-normal text-white-75" />
    </div>
  </div>
  <!-- END Hero Content -->
  <div class="bg-body-extra-light">
    <div class="content">
      <div class="row items-push justify-content-center">
        <div class="col-md-10 col-xl-5">
          <Form @submit="onSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-4" />
              </div>
              <div class="col-md-6">
                <div class="mb-4" />
              </div>
            </div>
            <div class="mb-4">
              <input
                id="fi-des"
                v-model="state.cyclename"
                name="cyclename"
                type="text"
                placeholder="Nombre"
                class="form-control"
              >
            </div>

            <div class="mb-4">
              <textarea
                id="fi-des"
                v-model="state.cycledescription"
                name="cycledescription"
                type="text"
                placeholder="Descripción"
                class="form-control form-control-lg form-control-alt py-3"
              />
            </div>
            <div class="col-x2-7">
              <FlatPickr
                id="example-flatpickr-default"
                v-model="state.cyclestart_date"
                class="form-control"
                placeholder="Fecha de inicio"
              />
            </div>
            <div class="col-x2-7">
              <FlatPickr
                id="example-flatpickr-default"
                v-model="state.cyclefinish_date"
                class="form-control"
                placeholder="Fecha de finalizacion"
              />
            </div>

            <div class="mb-4" />

            <div
              v-show="state.res.message"
              class="alert-dismissible"
              :class="
                state.res.ok ? 'alert alert-success' : 'alert alert-danger'
              "
              role="alert"
            >
              {{ state.res.message }}
            </div>

            <div class="mb-4" />

            <div class="center">
              <button
                id="buttom"
                type="submit"
                class="btn btn-alt-primary"
              >
                Guardar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>

<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "vue-select/dist/vue-select.css";
@import "@vueform/slider/themes/default.css";

#buttom {
  display: block;
  margin: 0 auto;
}
</style>
