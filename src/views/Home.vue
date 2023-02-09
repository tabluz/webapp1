<script setup>
import { useAuthStore } from "../stores/auth";

const { getEsential } = useAuthStore();
</script>

<template>
  <BasePageHeading title="Aula Virtual" subtitle="Bienvenido querido usuario! " >
    <template #extra>
      <button
        v-click-ripple
        type="button"
        class="btn btn-alt-primary"
        @click="store.sideOverlay({ mode: 'toggle' })"
      >
        <i class="fa fa-plus opacity-50 me-1" />
        MI perfil 
      </button>
    </template>
  </BasePageHeading>
  {{ getEsential.username }}
  <div class="content">
    <!-- Overview -->
    <div class="row items-push">
      <div class="col-sm-6 col-xxl-3">
        <!-- Pending Orders -->
        <div class="block block-rounded d-flex flex-column h-100 mb-0">
          <div class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
            <dl class="mb-0">
              <dt class="fs-3 fw-bold">32</dt>
              <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">Alumnos Registrados</dd>
            </dl>
            <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-gem fs-3 text-primary"></i>
            </div>
          </div>
          <div class="bg-body-light rounded-bottom">
            <a class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)">
              <span>Lista de Alumnos</span>
              <i class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
            </a>
          </div>
        </div>
        <!-- END Pending Orders -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- New Customers -->
        <div class="block block-rounded d-flex flex-column h-100 mb-0">
          <div class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
            <dl class="mb-0">
              <dt class="fs-3 fw-bold">124</dt>
              <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">Profesores Registrados</dd>
            </dl>
            <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-user-circle fs-3 text-primary"></i>
            </div>
          </div>
          <div class="bg-body-light rounded-bottom">
            <a class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)">
              <span>Lista de Profesores</span>
              <i class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
            </a>
          </div>
        </div>
        <!-- END New Customers -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Messages -->
        <div class="block block-rounded d-flex flex-column h-100 mb-0">
          <div class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
            <dl class="mb-0">
              <dt class="fs-3 fw-bold">45</dt>
              <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">Administradores</dd>
            </dl>
            <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-paper-plane fs-3 text-primary"></i>
            </div>
          </div>
          <div class="bg-body-light rounded-bottom">
            <a class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)">
              <span>Lista de Administradores</span>
              <i class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
            </a>
          </div>
        </div>
        <!-- END Messages -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Conversion Rate -->
        <div class="block block-rounded d-flex flex-column h-100 mb-0">
          <div class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
            <dl class="mb-0">
              <dt class="fs-3 fw-bold">4.5%</dt>
              <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">Conversion Rate</dd>
            </dl>
            <div class="item item-rounded-lg bg-body-light">
              <i class="fa fa-chart-bar fs-3 text-primary"></i>
            </div>
          </div>
          <div class="bg-body-light rounded-bottom">
            <a class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)">
              <span>View statistics</span>
              <i class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
            </a>
          </div>
        </div>
        <!-- END Conversion Rate-->
      </div>
    </div>
  </div>
</template>
