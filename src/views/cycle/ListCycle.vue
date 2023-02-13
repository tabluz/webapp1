<script setup>
import { reactive, onMounted } from "vue";
import { useResponse } from "../../composables/useResponse";
import { fetchCycles, deleteCycle } from "../../api";

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

function showAlert(id) {
  const response = useResponse();
  response.confirm("¿Está seguro?", async () => {
    const value = await deleteCycle(id);
    response.showAlert(value);
    fetchData();
  });
}
</script>

<template>
  <BasePageHeading
    title="CICLOS ACADÉMICOS"
    subtitle="Se muestran todos los ciclos académicos aperturados"
  />

  <div class="content">
    <BaseBlock title="LISTA DE CICLOS">
      <template #options>
        <RouterLink
          :to="{ name: 'cycle_create' }"
          class="btn btn-alt-primary"
          style="font-size: 80%"
        >
          + APERTURAR
        </RouterLink>
      </template>
      <p class="fs-sm text-muted">
        A continuación se muestran los ciclos disponibles:
      </p>

      <div class="table-responsive">
        <table class="table table-bordered table-striped table-vcenter">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de inicio</th>
              <th>Fecha de finalizacion</th>
              <th class="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cycle in state.cycles"
              :key="cycle.id"
            >
              <td class="fw-semibold fs-sm">
                {{ cycle.id }}
              </td>

              <td class="fw-semibold fs-sm">
                {{ cycle.name }}
              </td>
              <td
                style="font-size: 80%"
                class="text-muted"
              >
                <i>{{ cycle.description }}</i>
              </td>
              <td>
                {{
                  cycle.start_date
                    .replace(/T.*/, "")
                    .split("-")
                    .reverse()
                    .join("-")
                }}
              </td>
              <td>
                {{
                  cycle.finish_date
                    .replace(/T.*/, "")
                    .split("-")
                    .reverse()
                    .join("-")
                }}
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <RouterLink
                    :to="{ name: 'cycle_create', params: { id: cycle.id } }"
                  >
                    <button
                      type="button"
                      class="btn btn-sm btn-alt-secondary"
                    >
                      <i class="fa fa-fw fa-pencil-alt" />
                    </button>
                  </RouterLink>
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-secondary"
                    @click="showAlert(cycle.id)"
                  >
                    <i class="fa fa-fw fa-times" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseBlock>
  </div>
</template>
