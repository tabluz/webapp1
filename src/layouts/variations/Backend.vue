<script setup>
import { useTemplateStore } from "@/stores/template";
import BaseLayout from "@/layouts/BaseLayout.vue";

const store = useTemplateStore();

store.setLayout({
  header: true,
  sidebar: true,
  sideOverlay: true,
  footer: true,
});

store.headerStyle({ mode: "light" });
store.mainContent({ mode: "narrow" });
</script>

<template>
  <BaseLayout />
</template>
