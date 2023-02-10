<script setup>
import { useResponse } from "../../composables/useResponse";
import { reactive, onMounted } from "vue";
import { fetchUsers, deletePerson } from "../../api";

const state = reactive({
  users: [],
  loading: false,
});
async function fetchData() {
  state.loading = true;
  const value = await fetchUsers();
  state.users = value.data;
  state.loading = false;
}
onMounted(() => {
  fetchData();
});
function showAlert(id) {
  const response = useResponse();
  response.confirm("¿Estás de seguro?", async () => {
    const value = await deletePerson(id);
    response.showAlert(value);
    fetchData();
  });
}
</script>
<template>
  <BasePageHeading
    title="Lista de usuarios"
    subtitle="A continuación se mostrarán todos los usuarios registrados en la
          plataforma hasta el día de hoy."
  />
  <!-- List table -->
  <div class="content">
    <!-- Full Table -->
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">
          Lista de usuarios registrados
        </h3>
        <div class="block-options">
          <router-link
            :to="{ name: 'createPerson' }"
            class="btn btn-alt-success me-1 mb-3"
          >
            Agregar nuevo usuario
          </router-link>
        </div>
      </div>
      <div class="block-content">
        <p class="fs-sm text-muted">
          A continuación se mostrarán todos los usuarios registrados en la
          plataforma hasta el día de hoy.
        </p>
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-vcenter">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>DNI</th>
                <th>CORREO</th>
                <th
                  class="text-center"
                  style="width: 100px"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="item in state.users"
                :key="item.id"
              >
                <tr>
                  <td>
                    {{ item.name }}
                  </td>
                  <td>
                    {{ item.last_name }}
                  </td>
                  <td>
                    {{ item.dni }}
                  </td>
                  <td>
                    {{ item.email }}
                  </td>
                  <td>
                    <div class="btn-group">
                      <router-link
                        class="btn btn-sm btn-alt-success"
                        data-bs-toggle="tooltip"
                        title="Editar"
                        :to="{ name: 'createPerson', params: { id: item.id } }"
                      >
                        <i class="fa fa-fw fa-pencil-alt" />
                      </router-link>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="showAlert(item.id)"
                      >
                        <i class="fa fa-fw fa-times" />
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- END Full Table -->
    <!-- END Partial Table -->
  </div>
</template>
