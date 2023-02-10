<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { Field, Form } from "vee-validate";
import { string as str, object } from "yup";
import { useResponse } from "../composables/useResponse";
import { changePassword } from "../api";
import { useRouter } from "vue-router";
const { user } = useAuthStore();

const showpassword = ref(false);

const router = useRouter();
const pass = reactive({
  current_password: "",
  password: "",
  confirm_password: "",
});

async function onPass() {
  const res = useResponse();
  if (pass.confirm_password != pass.password) {
    return res.showNotify({
      message: "Las constraseñas nuevas no coinciden",
      ok: false,
    });
  }
  try {
    const value = await changePassword(user.id, { ...pass });
    res.showNotify(value);
    setTimeout(() => {
      router.push({ name: "home" });
    }, 1000);
  } catch (error) {
    res.showNotify(error);
  }
}

const schema = object().shape({
  current_password: str()
    .min(5, "La contraseña debe ser mayor a 5 caracteres")
    .required("Contraseña es requerida"),
  password: str()
    .min(5, "La contraseña debe ser mayor a 5 caracteres")
    .required("Contraseña es requerida"),
  confirm_password: str()
    .min(5, "La contraseña debe ser mayor a 5 caracteres")
    .required("Contraseña es requerida"),
});
</script>

<template>
  <!-- Hero -->
  <BaseBackground
    image="/assets/media/images/head.jpg"
    inner-class="bg-black-50"
  >
    <div class="content content-full text-center">
      <div class="my-3">
        <img
          class="img-avatar img-avatar-thumb"
          src="/assets/media/images/user.png"
          alt="Avatar"
        >
      </div>
      <h1 class="h2 text-white mb-0">
        {{ user.name }}
      </h1>
      <span class="text-white-75">{{ user.last_name }}</span>
    </div>
  </BaseBackground>
  <!-- END Hero -->

  <!-- Stats -->
  <div class="bg-body-extra-light">
    <div class="content content-boxed">
      <div class="row items-push text-center">
        <div class="col-6 col-md-3">
          <div class="fs-sm fw-semibold text-muted text-uppercase">
            Asistencias
          </div>
          <a
            class="link-fx fs-3"
            href="javascript:void(0)"
          >0</a>
        </div>
        <div class="col-6 col-md-3">
          <div class="fs-sm fw-semibold text-muted text-uppercase">
            Cursos
          </div>
          <a
            class="link-fx fs-3"
            href="javascript:void(0)"
          >10</a>
        </div>
        <div class="col-6 col-md-3">
          <div class="fs-sm fw-semibold text-muted text-uppercase">
            Actividades
          </div>
          <a
            class="link-fx fs-3"
            href="javascript:void(0)"
          >5</a>
        </div>
        <div class="col-6 col-md-3">
          <div class="fs-sm fw-semibold text-muted text-uppercase mb-2">
            Likes
          </div>
          <span class="text-danger">
            <i class="fa fa-heart" />
            <i class="fa fa-heart" />
            <i class="fa fa-heart" />
            <i class="fa fa-heart" />
            <i class="fa fa-heart-half" />
          </span>
          <span class="fs-sm text-muted">(4.9)</span>
        </div>
      </div>
    </div>
  </div>
  <!-- END Stats -->

  <!-- Page Content -->
  <div class="content content-boxed">
    <div class="content content-boxed">
      <!-- User Profile -->
      <BaseBlock title="Datos de contacto">
        <form @submit.prevent>
          <div class="row push">
            <div class="col-lg-4">
              <p class="fs-sm text-muted">
                Puedes actualizar tu información de contacto
              </p>
            </div>
            <div class="col-lg-8 col-xl-5">
              <div class="mb-4">
                <label
                  class="form-label"
                  for="phonec"
                >Celular</label>
                <input
                  id="phonec"
                  v-model="user.number"
                  type="text"
                  class="form-control"
                  name="phonec"
                >
              </div>
              <div class="mb-4">
                <label
                  class="form-label"
                  for="emailc"
                >Correo</label>
                <input
                  id="emailc"
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  name="emailc"
                >
              </div>
              <div class="mb-4">
                <label
                  class="form-label"
                  for="address"
                >Dirección</label>
                <input
                  id="address"
                  v-model="user.address"
                  type="text"
                  class="form-control"
                  name="address"
                >
              </div>
              <div class="mb-4">
                <label class="form-label">Foto</label>
                <div class="mb-4">
                  <img
                    class="img-avatar"
                    src="/assets/media/images/user.png"
                    alt=""
                  >
                </div>
                <div class="mb-4">
                  <label
                    for="one-profile-edit-avatar"
                    class="form-label"
                  >
                    Elige una imagen (Wip)
                  </label>
                  <input
                    id="one-profile-edit-avatar"
                    class="form-control"
                    type="file"
                    disabled
                  >
                </div>
              </div>
              <div class="mb-4">
                <button
                  type="submit"
                  class="btn btn-alt-primary"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </form>
      </BaseBlock>
      <!-- END User Profile -->

      <!-- Change Password -->
      <BaseBlock title="Cambiar Contraseña">
        <form @submit.prevent>
          <div class="row push">
            <div class="col-lg-4">
              <p class="fs-sm text-muted">
                Cambiar su contraseña de inicio de sesión es una manera fácil de
                mantener su cuenta seguro.
              </p>
            </div>
            <Form
              v-slot="{ errors }"
              class="col-lg-8 col-xl-5"
              :validation-schema="schema"
              @submit="onPass"
            >
              <div class="mb-4">
                <label
                  class="form-label"
                  for="current_password"
                >
                  Tu contraseña actual
                </label>
                <Field
                  id="current_password"
                  v-model="pass.current_password"
                  :type="showpassword ? 'text' : 'password'"
                  class="form-control"
                  :class="{ 'is-invalid': errors.current_password }"
                  name="current_password"
                />
                <div
                  v-show="errors.current_password"
                  class="invalid-feedback animated fadeIn"
                >
                  {{ errors.current_password }}
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-12">
                  <label
                    class="form-label"
                    for="password"
                  >
                    Tu nueva contraseña
                  </label>
                  <Field
                    id="password"
                    v-model="pass.password"
                    :type="showpassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    name="password"
                  />
                </div>
                <div
                  v-show="errors.password"
                  class="invalid-feedback animated fadeIn"
                >
                  {{ errors.password }}
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-12">
                  <label
                    class="form-label"
                    for="confirm_password"
                  >
                    Confirmar contraseña
                  </label>
                  <Field
                    id="confirm_password"
                    v-model="pass.confirm_password"
                    :type="showpassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{ 'is-invalid': errors.confirm_password }"
                    name="confirm_password"
                  />
                  <div
                    v-show="errors.confirm_password"
                    class="invalid-feedback animated fadeIn"
                  >
                    {{ errors.confirm_password }}
                  </div>
                </div>
              </div>
              <div class="form-check mb-2">
                <input
                  id="showpassword"
                  v-model="showpassword"
                  type="checkbox"
                  class="form-check-input"
                >
                <label for="showpassword">{{ showpassword ? "Ocultar" : "Mostrar" }}
                  Contraseña
                </label>
              </div>
              <div class="mb-4">
                <button
                  type="submit"
                  class="btn btn-alt-primary"
                >
                  Actualizar
                </button>
              </div>
            </Form>
          </div>
        </form>
      </BaseBlock>
      <!-- END Change -->
    </div>
  </div>
  <!-- END Page Content -->
</template>
