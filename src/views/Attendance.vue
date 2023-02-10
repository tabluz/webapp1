<script setup>
import { computed, onMounted, reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import { checkAttendance, fetchAttendance } from "../api";
import { useResponse } from "../composables/useResponse";
import AttendanceCard from "./components/AttendanceCard.vue";
import { isToday, dformat, dcalendar } from "../utils/day";

const state = reactive({
  attendances: [],
  current: null,
  order: 1,
  loading: false,
});

const user_id = computed(() => {
  const {
    user: { id },
  } = useAuthStore();
  return id;
});

async function fetchData() {
  state.loading = true;
  const value = await fetchAttendance(user_id.value);
  if (value.data.length) {
    const _current = value.data[0];
    if (isToday(new Date(_current.created_at))) {
      state.current = _current;
    }
    state.attendances = value.data;
  }
  state.loading = false;
}

onMounted(() => {
  fetchData();
});

const check = async (st = "presente") => {
  const entry = new Date();
  try {
    const value = await checkAttendance({
      id_person: user_id.value,
      entry_time: entry,
      priority: state.order.toString(),
      state: st,
    });

    useResponse().showNotify(value);
    state.current = value;
    if (state.current) {
      state.attendances.unshift(state.current);
    }
  } catch (error) {
    useResponse().showNotify(error);
  }
};

function toDate(date) {
  return dcalendar(date);
}

function toTime(date) {
  return dformat(date, "HH:mm:ss A");
}
</script>

<template>
  <BasePageHeading
    title="Asistencia diaria"
    subtitle="Registra tu asistencia el dia de hoy!"
  />
  <div class="content">
    <div class="row">
      <div class="col-md-4">
        <AttendanceCard
          :current="state.current"
          @check="check"
        />
      </div>
      <div class="col-md-8">
        <BaseBlock title="Reporte">
          <div class="mb-4">
            <div class="input-group">
              <input
                id="one-ecom-products-search"
                type="text"
                class="form-control form-control-alt"
                name="one-ecom-products-search"
                placeholder="Buscar por usuario o servicio"
              >
              <span class="input-group-text bg-body border-0">
                <i class="fa fa-search" />
              </span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-borderless table-striped table-vcenter">
              <thead>
                <tr>
                  <th class="text-center">
                    Id
                  </th>
                  <th class="text-center">
                    ¿Cuando?
                  </th>
                  <th class="d-none d-md-table-cell">
                    Hora de ingreso
                  </th>
                  <th class="d-none d-md-table-cell">
                    Estado
                  </th>
                  <th class="d-none d-sm-table-cell text-center">
                    Justificar
                  </th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-for="item in state.attendances"
                  :key="item.id"
                >
                  <tr>
                    <td>
                      <b>
                        {{ item.id }}
                      </b>
                    </td>
                    <td>
                      <b>
                        {{ toDate(item.created_at) }}
                      </b>
                    </td>
                    <td>
                      <strong>{{ toTime(item.entry_time) }}</strong>
                    </td>
                    <td>
                      <span class="badge bg-info">
                        {{ item.state }}
                      </span>
                    </td>
                    <td class="text-center fs-sm">
                      <a
                        class="btn btn-sm btn-alt-secondary"
                        href="javascript:void(0)"
                        data-bs-toggle="tooltip"
                        title="Justificar"
                      >
                        <i class="fa fa-fw fa-upload" />
                      </a>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
