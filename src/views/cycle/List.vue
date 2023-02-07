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
    <BasePageHeading title="CICLOS ACADEMICOS" subtitle="Se muestran todos los ciclos academicos aperturados">
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

    <div class="table-responsive">

        <table class="table table-bordered table-striped table-vcenter">
        <thead>
            <tr>
            <th>NOMBRE</th>
            <th style="width: 30%;">INICIO</th>
            <th style="width: 30%;">FIN</th>
            <th class="text-center" style="width: 100px;">Actions</th>
            </tr>
        </thead>

        <tbody>
            <template v-for="item in state.cycles">
            <tr>
                <td class="text-center">
                {{ item.name }}
                </td>
                <td class="text-center">
                {{ item.start_date }}
                </td>
                <td class="text-center">
                {{ item.finish_date }}
                </td>
                <td class="text-center">
                Actions
                </td>
            </tr>
            </template>
        </tbody>
        </table>
        </div>
        </template>