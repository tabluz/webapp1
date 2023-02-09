<script setup>
import { reactive, onMounted } from "vue";
import { fetchCycles } from "../../api";
const state = reactive({
  cycles: [],
  loading: false,
});
async function fetchData() {
  state.loading = true;
  const value = await fetchCycles();
  state.cycles = value.data;
  state.loading = false;
}
onMounted(() => {
  fetchData();
});
</script>
<template>
  <BasePageHeading
    title="CICLOS ACADEMICOS"
    subtitle="Se muestran todos los ciclos academicos aperturados"
  >
    <template #extra>
      <button
        v-click-ripple
        type="button"
        class="btn btn-alt-primary"
        @click="store.sideOverlay({ mode: 'toggle' })"
      >
        <i class="fa fa-plus opacity-50 me-1" />
        Aperturar
      </button>
    </template>
  </BasePageHeading>
</template>
