<script setup>
import { useTemplateStore } from "@/stores/template";
import { useAuthStore } from "../../stores/auth";

const store = useTemplateStore();
const { getEsential, logout } = useAuthStore();
</script>

<template>
  <!-- Header -->
  <header id="page-header">
    <slot>
      <!-- Header Content -->
      <div class="content-header">
        <slot name="content">
          <!-- Left Section -->
          <div class="d-flex align-items-center">
            <slot name="content-left">
              <!-- Toggle Sidebar -->
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
                @click="store.sidebar({ mode: 'toggle' })"
              >
                <i class="fa fa-fw fa-bars" />
              </button>
              <!-- END Toggle Sidebar -->

              <!-- Toggle Mini Sidebar -->
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-2 d-none d-lg-inline-block"
                @click="store.sidebarMini({ mode: 'toggle' })"
              >
                <i class="fa fa-fw fa-bars" />
              </button>
              <strong class="text-warning">
                Hoy es {{ new Date().toLocaleDateString() }}</strong
              >
              <!-- END Toggle Mini Sidebar -->
            </slot>
          </div>
          <!-- END Left Section -->

          <!-- Right Section -->
          <div class="d-flex align-items-center">
            <slot name="content-right">
              <!-- User Dropdown -->
              <div class="dropdown d-inline-block ms-2">
                <button
                  id="page-header-user-dropdown"
                  type="button"
                  class="btn btn-sm btn-alt-secondary d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    class="rounded-circle"
                    :src="`${getEsential.image}`"
                    alt="Header Avatar"
                    style="width: 21px"
                  />
                  <span class="d-none d-sm-inline-block ms-2">{{
                    getEsential.username
                  }}</span>
                  <i
                    class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"
                  />
                </button>
                <div
                  class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                  aria-labelledby="page-header-user-dropdown"
                >
                  <div
                    class="p-3 text-center bg-body-light border-bottom rounded-top"
                  >
                    <img
                      class="img-avatar img-avatar48 img-avatar-thumb"
                      :src="`${getEsential.image}`"
                      alt="Header Avatar"
                    />
                    <p class="mt-2 mb-0 fw-medium">
                      {{ getEsential.username }}
                    </p>
                    <p class="mb-0 text-muted fs-sm fw-medium">
                      {{ getEsential.is_staff }}
                    </p>
                  </div>
                  <div class="p-2">
                    <RouterLink
                      :to="{ name: 'home' }"
                      class="dropdown-item d-flex align-items-center justify-content-between"
                    >
                      <span class="fs-sm fw-medium">Mi Perfil</span>
                      <span class="badge rounded-pill bg-primary ms-2">1</span>
                    </RouterLink>
                    <a
                      class="dropdown-item d-flex align-items-center justify-content-between"
                      href="javascript:void(0)"
                    >
                      <span class="fs-sm fw-medium">Chat</span>
                    </a>
                  </div>
                  <div role="separator" class="dropdown-divider m-0" />
                  <div class="p-2">
                    <button
                      class="dropdown-item d-flex align-items-center justify-content-between"
                      @click="logout"
                    >
                      <span class="fs-sm fw-medium">Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              </div>
              <!-- END User Dropdown -->
            </slot>
          </div>
          <!-- END Right Section -->
        </slot>
      </div>
      <!-- END Header Content -->

      <!-- Header Loader -->
      <div
        id="page-header-loader"
        class="overlay-header bg-body-extra-light"
        :class="{ show: store.settings.headerLoader }"
      >
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-circle-notch fa-spin" />
          </div>
        </div>
      </div>
      <!-- END Header Loader -->
    </slot>
  </header>
  <!-- END Header -->
</template>
