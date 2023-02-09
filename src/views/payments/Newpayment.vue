<script setup>
import { reactive } from "vue";
import { createPayment } from "../../api";
import { Form } from "vee-validate";
import FlatPickr from "vue-flatpickr-component";

const state = reactive({
  paymenttype: "",
  descriptionpayment: "",
  fechadepago: "",
  res: {},
});

async function onSubmit() {
  const data = await createPayment({
    payment_type: state.paymenttype,
    description: state.descriptionpayment,
    expiration_date: state.fechadepago,
  });
  state.res = data;
}
</script>

<template>
  <!-- Hero Content -->
  <div class="text-center pt-">
    <h2 class="h2 text-white mb-0">
      Crear pago
    </h2>
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
