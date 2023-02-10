<script setup>
import { reactive } from "vue";
import { Form, Field } from "vee-validate";
import { object, string } from "yup";
import { useAuthStore } from "../../stores/auth";
import Auth from "../components/Auth.vue";

const store = useAuthStore();
// Input state variables
const state = reactive({
  dni: "",
  password: "",
});

const schema = object().shape({
  dni: string().min(8).max(8).required("DNI es obligatorio"),
  password: string()
    .min(5, "La contraseña debe ser mayor a 5 caracteres")
    .required("Contraseña es requerida"),
});
</script>

<template>
  <!-- Page Content -->
  <Auth
    title="Iniciar Sesion"
    description="Ingrese sus credenciales para acceder"
  >
    <div class="row g-0 justify-content-center">
      <div class="col-sm-8 col-xl-4">
        <Form
          v-slot="{ errors }"
          :validation-schema="schema"
          @submit="store.login"
        >
          <div class="mb-4">
            <label
              class="form-label"
              for="fi-uname"
            >DNI</label>
            <Field
              id="fi-uname"
              v-model="state.dni"
              name="dni"
              type="dni"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.dni }"
              placeholder="Por ejem. 15481548"
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
              for="fi-uname"
            > Contraseña </label>
            <Field
              id="fi-uname"
              v-model="state.password"
              name="password"
              type="password"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.password }"
              placeholder="********"
            />
            <div
              v-show="errors.password"
              class="invalid-feedback animated fadeIn"
            >
              {{ errors.password }}
            </div>
          </div>
          <div
            v-show="store.msg.color"
            class="alert-dismissible"
            :class="store.msg.color"
            role="alert"
          >
            {{ store.msg.message }}
          </div>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <RouterLink
                :to="{ name: 'recover' }"
                class="btn btn-lg btn-alt-success"
              >
                Me olvide
              </RouterLink>
            </div>
            <div>
              <button
                type="submit"
                class="btn btn-lg btn-alt-primary"
              >
                <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50" />
                Login
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </Auth>
  <!-- END Page Content -->
</template>
