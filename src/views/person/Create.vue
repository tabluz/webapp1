<script setup>
import { useRoute, useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import { useResponse } from "../../composables/useResponse";
import { reactive, onMounted, computed } from "vue";
import { createPerson, updatePerson } from "../../api";

const router = useRouter();

const person_id = ref(null);

const is_edit = computed(() => typeof person_id !== "undefined");

const person = reactive({
  name: "",
  last_name: "",
  dni: "",
  number: "",
  email: "",
  address: "",
});

onMounted(() => {
  person_id.value = useRoute().params.id;
});

const handleSubmit = async (payload) => {
  try {
    let value = null;
    if (is_edit) {
      value = await updatePerson(person_id, payload);
    } else {
      value = await createPerson(payload);
    }
    useResponse().showNotify(value);
    router.push({ name: "person_list" });
  } catch (error) {
    useResponse().showNotify(error);
  }
};
</script>
<template>
  <main id="main-container">
    <!-- Hero Content -->
    <div class="bg-primary-dark">
      <div class="content content-full text-center pt-7 pb-5">
        <h1 class="h2 text-white mb-2">
          {{ is_edit ? "Modificar" : "Crear" }} usuario
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
            <Form @submit="handleSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label">Nombre: </label>
                    <Field
                      id="name"
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="Ingrese su nombre ..."
                      v-model="person.name"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label" for="lastname">Apellido </label>
                    <Field
                      id="last_name"
                      type="text"
                      class="form-control"
                      name="last_name"
                      v-model="person.last_name"
                      placeholder="Ingrese su apellido.."
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label">Teléfono: </label>
                    <Field
                      id="number"
                      type="number"
                      class="form-control"
                      name="number"
                      placeholder="Ingrese su número telefónico ..."
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label" for="lastname">DNI</label>
                    <Field
                      id="dni"
                      type="number"
                      class="form-control"
                      name="dni"
                      placeholder="Enter your DNI ..."
                    />
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label" for="email">Correo</label>
                <Field
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Ingrese su correo .."
                />
              </div>
              <div class="mb-4">
                <label class="form-label">Fecha de Nacimiento</label>
                <Field
                  id="date_born_at"
                  type="date"
                  class="form-control"
                  name="date_born_at"
                  placeholder="Ingrese su fecha de nacimiento ..."
                />
              </div>
              <div class="mb-4">
                <label class="form-label">Dirección</label>
                <Field
                  id="address"
                  type="text"
                  class="form-control"
                  name="address"
                  placeholder="Ingrese su dirección .."
                />
              </div>
              <div class="mb-4">
                <label class="form-label" for="subject">Tipo de usuario</label>
                <Field
                  as="select"
                  id="subject"
                  class="form-select"
                  name="subject"
                  size="1"
                >
                  <option selected="">Seleccione un tipo de usuario</option>
                  <option value="1">Alumno</option>
                  <option value="2">Profesor</option>
                  <option value="3">Administrador</option>
                </Field>
              </div>
              <div class="mb-4">
                <button type="submit" class="btn btn-alt-primary">
                  <i class="fa fa-paper-plane me-1 opacity-50" /> Enviar datos
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Page Content -->
  </main>
</template>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
