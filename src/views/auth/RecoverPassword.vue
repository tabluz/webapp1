<script setup>
import { reactive } from "vue";
import { Form, Field } from "vee-validate";
import Auth from "../components/Auth.vue";
import { sendToMeSms } from "../../api/index";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
// Input state variables
const state = reactive({
  dni: "",
  number: "",
  res: {},
});

async function onSubmit(e) {
  try {
    const res = await sendToMeSms({
      dni: state.dni,
      number: state.number,
    });
    state.res = res;
    setTimeout(() => {
      router.push({ name: "changepassword", params: { id: res.data } });
    }, 2000);
  } catch (error) {
    state.res = error;
  }
}
</script>

<template>
  <!-- Page Content -->
  <Auth
    title="Recuperar clave"
    description="Te vamos a enviar un sms si tu celular coincide con nuestros registros"
  >
    <div class="row g-0 justify-content-center">
      <div class="col-sm-8 col-xl-4">
        <Form
          v-slot="{ errors }"
          @submit="onSubmit"
        >
          <div class="mb-4">
            <label
              class="form-label"
              for="fi-uname"
            > DNI </label>
            <Field
              id="fi-uname"
              v-model="state.dni"
              name="dni"
              type="text"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.dni }"
              placeholder="Por ejemplo 15481548"
            />

            <div
              v-show="errors.dni"
              class="invalid-feedback animated fadeIn"
            >
              {{ errors.dni }}
            </div>
          </div>
          <div class="mb-4">
            <label
              class="form-label"
              for="fi-number"
            >Numero de celular</label>
            <Field
              id="fi-number"
              v-model="state.number"
              name="number"
              type="text"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.number }"
              placeholder="+51"
            />
            <div
              v-show="errors.number"
              class="invalid-feedback animated fadeIn"
            >
              {{ errors.number }}
            </div>
          </div>
          <div
            v-show="state.res.message"
            class="alert-dismissible"
            :class="state.res.ok ? 'alert alert-success' : 'alert alert-danger'"
            role="alert"
          >
            {{ state.res.message }}
          </div>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <RouterLink
                :to="{ name: 'login' }"
                class="btn btn-lg btn-alt-primary"
              >
                Volver
              </RouterLink>
            </div>
            <div>
              <button
                type="submit"
                class="btn btn-lg btn-alt-success"
              >
                Solicitar
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </Auth>
  <!-- END Page Content -->
</template>
