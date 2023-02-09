<script setup>
import { useAuthStore } from "../stores/auth";
const { user } = useAuthStore();
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
                  type="text"
                  class="form-control"
                  name="phonec"
                  :value="user.number"
                >
              </div>
              <div class="mb-4">
                <label
                  class="form-label"
                  for="emailc"
                >Correo</label>
                <input
                  id="emailc"
                  type="email"
                  class="form-control"
                  name="emailc"
                  :value="user.email"
                >
              </div>
              <div class="mb-4">
                <label
                  class="form-label"
                  for="address"
                >Dirección</label>
                <input
                  id="address"
                  type="text"
                  class="form-control"
                  name="address"
                  :value="user.address"
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
                  >elegir una imagen</label>
                  <input
                    id="one-profile-edit-avatar"
                    class="form-control"
                    type="file"
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
            <div class="col-lg-8 col-xl-5">
              <div class="mb-4">
                <label
                  class="form-label"
                  for="current_password"
                >Tu contraseña actual</label>
                <input
                  id="current_password"
                  type="password"
                  class="form-control"
                  name="current_password"
                >
              </div>
              <div class="row mb-4">
                <div class="col-12">
                  <label
                    class="form-label"
                    for="new_password"
                  >Tu nueva contraseña</label>
                  <input
                    id="new_password"
                    type="password"
                    class="form-control"
                    name="new_password"
                  >
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-12">
                  <label
                    class="form-label"
                    for="confirm_password"
                  >Confirmar contraseña</label>
                  <input
                    id="confirm_password"
                    type="password"
                    class="form-control"
                    name="confirm_password"
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
      <!-- END Change -->
    </div>
  </div>
  <!-- END Page Content -->
</template>
