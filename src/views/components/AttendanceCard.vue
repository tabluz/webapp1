<script setup>
import {
  diffToNow,
  dparseFromFormat,
  humanizeDuration,
  isAfterFromNow,
  isBeforeFromNow,
} from "../../utils/day";

import { onMounted, computed, onBeforeUnmount, reactive, toRefs } from "vue";

const state = reactive({
  resmsg: null,
  persent: 0,
  currentText: "día",
  configData: {
    order: 1,
    st_att_left: "12345",
    entry_time: "07:45",
    tolerance: 15,
  },
  t: null,
  days: "",
});

function fetchConfigData(callback) {
  callback();
}

function setDays() {
  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const selected = state.configData.st_att_left.split("").map((item) => {
    return days[parseInt(item) - 1];
  });
  state.days = selected.join(", ");
}

function setMsg({ icon, color, mainmsg, message }) {
  state.resmsg = {
    icon,
    color,
    mainmsg,
    message,
  };
}

function getPersentage(progress) {
  return parseInt((100 * progress) / (state.configData.tolerance * 60));
}

const props = defineProps({
  current: {
    type: Object,
    default: null,
  },
});
const { current } = toRefs(props);

const emit = defineEmits(["check"]);

const readyy = computed(() => state.persent > 0 && current.value === null);

function loadData() {
  const { entry_time: entry, tolerance } = state.configData;
  const from = dparseFromFormat(entry, "HH:mm");
  const progress = diffToNow(from, "s");
  if (isAfterFromNow(from)) {
    const progressOnMin = progress / 60;
    if (current.value === null && progressOnMin < tolerance) {
      const res = tolerance - progressOnMin;
      setMsg({
        icon: "schedule",
        color: "warning",
        mainmsg: "Queda",
        message: humanizeDuration(res),
      });
      state.persent = getPersentage(progress);
    } else {
      clearInterval(state.t);
      state.persent = 0;
      if (current.value !== null) {
        const { entry_time } = current.value;
        if (entry_time === null) {
          setMsg({
            icon: "notification_important",
            color: "danger",
            mainmsg: "Hoy",
            message: "Faltaste",
          });
        } else if (current.value.priority === state.configData.order) {
          setMsg({
            icon: "check_circle",
            color: "success",
            mainmsg: "Hoy",
            message: dparseFromFormat(entry_time, "HH:mm").format("h:mm a"),
          });
        }
      } else {
        if (isBeforeFromNow(from.add(1, "h"))) {
          emit("check", "tarde");
        } else {
          emit("check", "falta", "La hora de ingreso ya finalizó");
        }
        setMsg({
          icon: "sentiment_very_dissatisfied",
          color: "warning",
          mainmsg: "Hoy",
          message: "Ya finalizó",
        });
      }
    }
  } else {
    setMsg({
      icon: "alarm",
      color: "info",
      mainmsg: "Comienza en",
      message: humanizeDuration(diffToNow(from, "m")),
    });
  }
}

onMounted(() => {
  fetchConfigData(() => {
    const { st_att_left: days } = state.configData;
    if (days.indexOf(new Date().getDay().toString()) !== -1) {
      state.t = setInterval(() => {
        loadData();
        state.currentText = new Date().toLocaleDateString();
      }, 1000);
    } else {
      setMsg({
        icon: "coffee",
        color: "info",
        mainmsg: "Asistencia diaria",
        message: "Aún no inicia",
      });
    }
    setDays();
  });
});

onBeforeUnmount(() => {
  clearInterval(state.t);
});
</script>

<template>
  <div class="">
    <BaseBlock title="Asistencia diaria">
      <div class="fw-medium">
        <span class="text-warning">Hora de ingreso:</span>
        <span> {{ state.configData.entry_time }} </span>
      </div>
      <div class="fw-medium">
        <span class="text-warning">Tolerancia</span>
        <span> {{ state.configData.tolerance }} minutos</span>
      </div>
      <div class="p-2 bg-light fw-medium rounded mt-4">
        <i class="fas fa-circle-check" />
        Hoy {{ state.currentText }} la asistencia está habilitado
      </div>
    </BaseBlock>
    <BaseBlock class="d-flex flex-column text-center align-items-center mt-4">
      <template v-if="readyy">
        <div :class="`c100 p${persent} green`">
          <span :class="`text-${state.resmsg.color}`">
            {{ `${state.resmsg.mainmsg} ${state.resmsg.message}` }}
          </span>
          <div class="slice">
            <div class="bar" />
            <div class="fill" />
          </div>
        </div>
        <hr>
        <button
          class="btn btn-success"
          @click="emit('check')"
        >
          Presente
        </button>
      </template>
      <template v-else-if="state.resmsg === null">
        <div class="loader" />
      </template>
      <template v-else>
        <i
          :class="[state.resmsg.icon, 'fa-5x', `text-${state.resmsg.color}`]"
        />
        <div class="truncate">
          <h3 class="mb-2">
            {{ state.resmsg.mainmsg }}
          </h3>
          <b class="text-primary">{{ state.resmsg.message }}</b>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>
