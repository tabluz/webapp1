<script setup>
import { reactive, onMounted } from "vue";
import { createPayment, editPayment, paymentById } from "../../api";
import { Form } from "vee-validate";
import FlatPickr from "vue-flatpickr-component";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const state = reactive({
  paymenttype: "",
  descriptionpayment: "",
  fechadepago: "",
  res: {},
});

async function onSubmit() {
  const save = (id, payload) => {
    if (!id) {
      return createPayment(payload);
    }
    return editPayment(id, payload);
  };

  const data = await save(route.params.id, {
    payment_type: state.paymenttype,
    description: state.descriptionpayment,
    expiration_date: state.fechadepago,
  });

  state.res = data;
  setTimeout(() => {
    router.push({ name: "payments" });
  }, 1000);
}

onMounted(async () => {
  if (route.params.id) {
    const value = await paymentById(route.params.id);
    state.paymenttype = value.data.payment_type;
    state.descriptionpayment = value.data.description;
    state.fechadepago = value.data.expiration_date;
  }
});
</script>

<template>
  <!-- Hero Content -->
  <div class="bg-primary-dark">
    <div class="content content-full text-center pt-7 pb-5">
      <h1 class="h2 text-white mb-2">
        {{ !route.params.id ? "Crear" : "Modificar" }} pago
      </h1>
      <h2 class="h4 fw-normal text-white-75" />
    </div>
  </div>
  <!-- END Hero Content -->

  <!-- Page Content -->
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
            <div class="mb-5">
              <select
                v-model="state.paymenttype"
                class="form-select"
              >
                <option
                  value=""
                  disabled
                >
                  Tipo de pago
                </option>
                <option value="Inscripción">
                  Inscripción
                </option>
                <option value="Matrícula">
                  Matrícula
                </option>
                <option value="Mensualidad">
                  Mensualidad
                </option>
                <option value="Saldo pendiente">
                  Saldo pendiente
                </option>
                <option value="Libros">
                  Libros
                </option>
              </select>
            </div>

            <div class="mb-4">
              <textarea
                id="fi-des"
                v-model="state.descriptionpayment"
                name="descriptionpayment"
                type="text"
                placeholder="Descripción"
                class="form-control form-control-lg form-control-alt py-3"
              />
            </div>
            <div class="col-x2-7">
              <FlatPickr
                id="example-flatpickr-default"
                v-model="state.fechadepago"
                class="form-control"
                placeholder="Fecha de expiración"
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
