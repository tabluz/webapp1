<script setup>
import { reactive } from "vue";
import { Form, Field } from "vee-validate";
import { object, string } from "yup";
import Auth from "../components/Auth.vue";

// Input state variables
const state = reactive({
  email: "",
  password: "",
  username: "",
  res: {},
});

</script>

<template>
  <!-- Page Content -->
  <Auth
    title="Recuperar clave"
    description="¡Te vamos a enviar un sms si tu celular coincide con nuestros registros!"
  >
    <div class="row g-0 justify-content-center">
      <div class="col-sm-8 col-xl-4">
        <Form v-slot="{ errors }">
          <div class="mb-4">
            <label class="form-label" for="fi-uname"> DNI </label>
            <Field
              id="fi-uname"
              v-model="state.dni"
              name="dni"
              type="text"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.dni }"
              placeholder="Por ejemplo 15481548"
            />

            <div v-show="errors.dni" class="invalid-feedback animated fadeIn">
              {{ errors.dni }}
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label" for="fi-number">Numero de celular</label>
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
            v-show="state.res.color"
            class="alert-dismissible"
            :class="state.res.color"
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
              <button type="submit" class="btn btn-lg btn-alt-success">
                Recuperar
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </Auth>
  <!-- END Page Content -->
</template>
