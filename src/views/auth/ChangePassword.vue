<script setup>
import { reactive } from "vue";
import { Form, Field } from "vee-validate";
import Auth from "../components/Auth.vue";
import { changePassword } from "../../api/index";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
// Input state variables
const state = reactive({
  smscode: "",
  newpassword: "",
  res: {},
});

async function onSubmit() {
  try {
    const id = route.params.id;
    const data = await changePassword(id, {
      temporal_code: state.smscode,
      password: state.newpassword,
    });
    state.res = data;
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    state.res = error;
  }
}
</script>

<template>
  <!-- Page Content -->
  <Auth
    title="Cambiar clave"
    description="Ingresa el codigo sms que te hemos enviado a tu celular"
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
            > Codigo SMS </label>
            <Field
              id="fi-uname"
              v-model="state.smscode"
              name="smscode"
              type="text"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.smscode }"
              placeholder="Por ejemplo 1548"
            />

            <div
              v-show="errors.smscode"
              class="invalid-feedback animated fadeIn"
            >
              {{ errors.smscode }}
            </div>
          </div>
          <div class="mb-4">
            <label
              class="form-label"
              for="fi-number"
            > Nueva contraseña </label>
            <Field
              id="fi-newpassword"
              v-model="state.newpassword"
              name="newpassword"
              type="text"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.newpassword }"
              placeholder="********"
            />
            <div
              v-show="errors.newpassword"
              class="invalid-feedback animated fadeIn"
            >
              {{ errors.newpassword }}
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
                Enviar
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </Auth>
  <!-- END Page Content -->
</template>
