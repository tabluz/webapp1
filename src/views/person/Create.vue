<script setup>
import { useRoute, useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import { useResponse } from "../../composables/useResponse";
import { reactive, onMounted, computed, ref } from "vue";
import { createPerson, updatePerson, getPersonById } from "../../api";
import { object, string } from "yup";


const router = useRouter();

const person_id = ref(null);

const is_edit = computed(() => typeof person_id.value !== "undefined");

const person = reactive({
  name: "",
  last_name: "",
  date_born_at: "",
  dni: "",
  number: "",
  email: "",
  address: "",
  user_type: "",
  password: "",
});

onMounted(async () => {
  person_id.value = useRoute().params.id;
  if (is_edit) {
    const value = await getPersonById(person_id.value);
    person.name = value.data.name;
    person.last_name = value.data.last_name;
    person.date_born_at = value.data.date_born_at;
    person.dni = value.data.dni;
    person.number = value.data.number;
    person.email = value.data.email;
    person.address = value.data.address;
    person.user_type = value.data.user_type;
    person.password = value.data.password;
  }
});

const handleSubmit = async (payload) => {
  try {
    let value = null;
    if (!person_id.value) {
      value = await createPerson(payload);
    } else {
      value = await updatePerson(person_id.value, payload);
    }
    useResponse().showNotify(value);
    router.push({ name: "person_list" });
  } catch (error) {
    useResponse().showNotify(error);
  }
};

const schema = object().shape({
  dni: string().min(8).max(8).required("DNI es obligatorio"),
  number: string().min(12).max(12).required("Número de teléfono obligatorio"),
  password: string()
    .min(5, "La contraseña debe ser mayor a 5 caracteres")
    .required("Contraseña es requerida"),
});

</script>
<template>
  <main id="main-container">
    <!-- Hero Content -->
    <div class="bg-primary-dark">
      <div class="content content-full text-center pt-7 pb-5">
        <h1 class="h2 text-white mb-2">
          {{ is_edit? "Modificar": "Crear" }} usuario
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
            <Form v-slot="{ errors }" :validation-schema="schema" @submit="handleSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label">Nombre: </label>
                    <Field id="name" type="text" class="form-control" name="name" placeholder="Ingrese su nombre ..."
                      v-model="person.name" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label" for="lastname">Apellido </label>
                    <Field id="last_name" type="text" class="form-control" name="last_name" v-model="person.last_name"
                      placeholder="Ingrese su apellido.." />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label">Teléfono: </label>
                    <Field id="number" class="form-control" name="number" placeholder="Ingrese su número telefónico ..."
                      :class="{ 'is-invalid': errors.number }" type="text" maxlength="12" v-model="person.number" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-4">
                    <label class="form-label" for="lastname">DNI</label>
                    <Field id="fi-uname" v-model="person.dni" name="dni" type="dni" class="form-control"
                      :class="{ 'is-invalid': errors.dni }" placeholder="Por ejem. 15481548" maxlength="8" />
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label" for="email">Correo</label>
                <Field id="email" type="email" class="form-control" name="email" placeholder="Ingrese su correo .."
                  v-model="person.email" />
              </div>
              <div class="mb-4">
                <label class="form-label">Fecha de Nacimiento</label>
                <Field id="date_born_at" type="date" class="form-control" name="date_born_at"
                  placeholder="Ingrese su fecha de nacimiento ..." v-model="person.date_born_at" />
              </div>
              <div class="mb-4">
                <label class="form-label">Dirección</label>
                <Field id="address" type="text" class="form-control" name="address"
                  placeholder="Ingrese su dirección .." v-model="person.address" />
              </div>
              <div class="mb-4">
                <label class="form-label" for="subject">Tipo de usuario</label>
                <Field as="select" id="subject" class="form-select" name="user_type" size="1"
                  v-model="person.user_type">
                  <option selected="">Seleccione un tipo de usuario</option>
                  <option value="Alumno">Alumno</option>
                  <option value="Profesor">Profesor</option>
                  <option value="Administrador">Administrador</option>
                </Field>
              </div>
              <div class="mb-4">
                <label class="form-label">Contraseña</label>
                <Field id="password" type="password" class="form-control" name="password"
                  placeholder="Ingrese su password ..." :class="{ 'is-invalid': errors.password }"
                  v-model="person.password" />
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
Field[type="number"]::-webkit-inner-spin-button,
Field[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
