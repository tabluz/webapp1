<script setup>
import { reactive, onMounted } from "vue";
import { useResponse } from "../../composables/useResponse";
import { paymentsAll, deletePayment } from "../../api";

const state = reactive({
  payments: [],
  loading: false,
});
async function fetchData() {
  state.loading = true;
  const value = await paymentsAll();
  state.payments = value.data;
  state.loading = false;
}

onMounted(() => {
  fetchData();
});

function showAlert(id) {
  const response = useResponse();
  response.confirm("¿Está seguro?", async () => {
    const value = await deletePayment(id);
    response.showAlert(value);
    fetchData();
  });
}
</script>

<template>
  <div class="content">
    <BaseBlock title="PAGOS">
      <template #options>
        <RouterLink
          :to="{ name: 'newpayment' }"
          class="btn btn-lg btn-alt-success"
          style="font-size: 80%"
        >
          Agregar nuevo pago
        </RouterLink>
      </template>
      <p class="fs-sm text-muted">
        A continuación se muestran los pagos creados:
      </p>

      <div class="table-responsive">
        <table class="table table-bordered table-striped table-vcenter">
          <thead>
            <tr>
              <th style="width: 0%">ID</th>
              <th style="width: 4%">Tipo de pago</th>
              <th style="width: 25%">Descripción</th>
              <th style="width: 5%">Fecha de pago</th>
              <th class="text-center" style="width: 0%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in state.payments" :key="payment.id">
              <td class="fw-semibold fs-sm">
                {{ payment.id }}
              </td>

              <td class="fw-semibold fs-sm">
                {{ payment.payment_type }}
              </td>
              <td style="font-size: 80%" class="text-muted">
                <i>{{ payment.description }}</i>
              </td>
              <td>
                {{
                  payment.expiration_date
                    .replace(/T.*/, "")
                    .split("-")
                    .reverse()
                    .join("-")
                }}
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <RouterLink
                    :to="{ name: 'editpayments', params: { id: payment.id } }"
                  >
                    <button type="button" class="btn btn-sm btn-alt-secondary">
                      <i class="fa fa-fw fa-pencil-alt" />
                    </button>
                  </RouterLink>
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-secondary"
                    @click="showAlert(payment.id)"
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
