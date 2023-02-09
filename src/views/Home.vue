<script setup>
import { reactive, onMounted } from "vue";
import { getCount } from "../api";

const state = reactive({
  student_count: "",
  admin_count: "",
  teacher_count: "",
});

onMounted(async () => {
  const student = await getCount("student");
  const admin = await getCount("admin");
  const teacher = await getCount("teacher");
  state.student_count = student.data;
  state.admin_count = admin.data;
  state.teacher_count = teacher.data;
});
</script>

<template>
  <BasePageHeading title="Aula Virtual" subtitle="Bienvenido querido usuario! ">
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

  <div class="content">
    <!-- Overview -->
    <div class="row items-push">
      <div class="col-sm-6 col-xxl-3">
        <!-- Pending Orders -->
        <div class="block block-rounded d-flex flex-column h-100 mb-0">
          <div
            class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
          >
            <dl class="mb-0">
              <dt class="fs-3 fw-bold">{{ state.student_count }}</dt>
              <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                Alumnos Registrados
              </dd>
            </dl>
            <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-gem fs-3 text-primary"></i>
            </div>
          </div>
          <div class="bg-body-light rounded-bottom"></div>
        </div>
        <!-- END Pending Orders -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- New Customers -->
        <div class="block block-rounded d-flex flex-column h-100 mb-0">
          <div
            class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
          >
            <dl class="mb-0">
              <dt class="fs-3 fw-bold">{{ state.teacher_count }}</dt>
              <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                Profesores Registrados
              </dd>
            </dl>
            <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-user-circle fs-3 text-primary"></i>
            </div>
          </div>
          <div class="bg-body-light rounded-bottom"></div>
        </div>
        <!-- END New Customers -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Messages -->
        <div class="block block-rounded d-flex flex-column h-100 mb-0">
          <div
            class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
          >
            <dl class="mb-0">
              <dt class="fs-3 fw-bold">{{ state.admin_count }}</dt>
              <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                Administradores
              </dd>
            </dl>
            <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-paper-plane fs-3 text-primary"></i>
            </div>
          </div>
          <div class="bg-body-light rounded-bottom"></div>
        </div>
        <!-- END Messages -->
      </div>
    </div>
  </div>
</template>
