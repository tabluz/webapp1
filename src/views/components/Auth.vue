<script>
import { computed } from "vue";
import { useTemplateStore } from "../../stores/template";
import ApiFoot from "../components/ApiFoot.vue";
export default {
  name: "Auth",
  components: {
    ApiFoot,
  },
  props: {
    title: String,
    description: String,
  },
  setup() {
    const templateStore = useTemplateStore();
    const app_d = computed(() => templateStore.app);
    return { app_d };
  },
};
</script>
<template>
  <BaseBackground image="/assets/media/images/bg.png">
    <div class="row g-0">
      <!-- Meta Info Section -->
      <div
        class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center"
      >
        <div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <RouterLink
              :to="{ name: 'home' }"
              class="link-fx fw-semibold fs-2 text-white"
            >
              {{ app_d.name }}
            </RouterLink>
            <p class="text-white-75 me-xl-8 mt-2">
              Aula virtual moderno e interactivo
            </p>
          </div>
        </div>
        <div
          class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"
        >
          <p class="fw-medium text-white-50 mb-0">
            <strong>{{ app_d.name + " " + app_d.version }}</strong>
            &copy; {{ app_d.copyright }}
          </p>
          <!-- here component -->
          <ApiFoot />
          <!-- here component -->
        </div>
      </div>
      <!-- END Meta Info Section -->

      <!-- Main Section -->
      <div
        class="hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light"
      >
        <div class="p-3 w-100 d-lg-none text-center">
          <RouterLink
            :to="{ name: 'home' }"
            class="link-fx fw-semibold fs-3 text-dark"
          >
            {{ app_d.name }}
          </RouterLink>
        </div>
        <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <!-- Header -->
            <div class="text-center mb-5">
              <p class="mb-3">
                <img src="/assets/media/images/logo.png" width="100" alt="" />
              </p>
              <h1 class="fw-bold mb-2">
                {{ title }}
              </h1>
              <p class="fw-medium text-muted">
                {{ description }}
              </p>
            </div>
            <!-- END Header -->

            <!-- Sign login -->
            <slot />
            <!-- END login -->
          </div>
        </div>
        <div
          class="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start"
        >
          <p class="fw-medium text-black-50 py-2 mb-0">
            <strong>{{ app_d.name + " " + app_d.version }}</strong>
            &copy; {{ app_d.copyright }}
          </p>
          <!-- here component -->
          <ApiFoot />
          <!-- here component -->
        </div>
      </div>
      <!-- END Main Section -->
    </div>
  </BaseBackground>
</template>
