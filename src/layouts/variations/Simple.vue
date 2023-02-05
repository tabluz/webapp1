<script setup>
import { useTemplateStore } from "@/stores/template";

import BaseLayout from "@/layouts/BaseLayout.vue";

const store = useTemplateStore();

store.setLayout({
  header: false,
  sidebar: false,
  sideOverlay: false,
  footer: false,
});

store.mainContent({ mode: "full" });
</script>

<template>
  <BaseLayout />
</template>
