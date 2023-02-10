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
    entry_time: "19:23",
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

const readyy = computed(() => state.persent > 0 && !current.value);

function loadData() {
  const { entry_time: entry, tolerance } = state.configData;
  const from = dparseFromFormat(entry, "HH:mm");
  const progress = diffToNow(from, "s");
  if (isAfterFromNow(from)) {
    const progressOnMin = progress / 60;
    if (!current.value && progressOnMin < tolerance) {
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
      if (current.value) {
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
        <span class="text-warning">Hora de ingreso: </span>
        <span> {{ state.configData.entry_time }} </span>
      </div>
      <div class="fw-medium">
        <span class="text-warning">Tolerancia </span>
        <span> {{ state.configData.tolerance }} minutos</span>
      </div>
      <div class="p-2 bg-light fw-medium rounded mt-4">
        <i class="fas fa-circle-check" />
        Hoy {{ state.currentText }} la asistencia está habilitado
      </div>
    </BaseBlock>
    <BaseBlock class="text-center align-items-center mt-4">
      <template v-if="readyy">
        <div :class="`c100 p${state.persent} green`">
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
<style lang="scss">
$circle-width: 0.08em;
$circle-width-hover: 0.04em;
$primary: #0059df;
$light: #f2f4f8;
$warning: #ea580c;
// mixins

@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

@mixin rotate($rotation) {
  -webkit-transform: rotate($rotation);
  -moz-transform: rotate($rotation);
  -ms-transform: rotate($rotation);
  -o-transform: rotate($rotation);
  transform: rotate($rotation);
}

@mixin box-sizing($box-sizing) {
  -webkit-box-sizing: $box-sizing;
  -moz-box-sizing: $box-sizing;
  box-sizing: $box-sizing;
}

@mixin transition-property($transition) {
  -webkit-transition-property: $transition;
  -moz-transition-property: $transition;
  -o-transition-property: $transition;
  transition-property: $transition;
}

@mixin transition-duration($duration) {
  -webkit-transition-duration: $duration;
  -moz-transition-duration: $duration;
  -o-transition-duration: $duration;
  transition-duration: $duration;
}

@mixin transition-timing-function($timing) {
  -webkit-transition-timing-function: $timing;
  -moz-transition-timing-function: $timing;
  -o-transition-timing-function: $timing;
  transition-timing-function: $timing;
}

//yup
.rect-auto {
  clip: rect(auto, auto, auto, auto);
}

.pie {
  position: absolute;
  border: $circle-width solid rgba(var($primary), 1);
  width: 1 - (2 * $circle-width);
  height: 1 - (2 * $circle-width);
  clip: rect(0em, 0.5em, 1em, 0em);
  border-radius: 50%;
  @include rotate(0deg);
}

.pie-fill {
  @include rotate(180deg);
}

// main
.c100 {
  *,
  *:before,
  *:after {
    @include box-sizing(content-box);
  }

  position: relative;
  font-size: 120px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  float: left;
  margin: 0 0.1em 0.1em 0;
  background-color: rgba(var($light), 1);

  // center circle to its parent
  &.center {
    float: none;
    margin: 0 auto;
  }

  // bigger size
  &.big {
    font-size: 240px;
  }

  // smaller size
  &.small {
    font-size: 80px;
  }

  // centered value inside circle
  > span {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 35%;
    line-height: 1.2em;
    font-size: 0.12em;
    display: block;
    text-align: center;
    @include transition-property(all);
    @include transition-duration(0.2s);
    @include transition-timing-function(ease-out);
  }

  // background inside the circle
  &:after {
    position: absolute;
    top: $circle-width;
    left: $circle-width;
    display: block;
    content: " ";
    border-radius: 50%;
    background-color: rgba(var($warning), 0.1);
    width: 1 - (2 * $circle-width);
    height: 1 - (2 * $circle-width);
    @include transition-property(all);
    @include transition-duration(0.2s);
    @include transition-timing-function(ease-in);
  }

  // the slice (mask)
  .slice {
    position: absolute;
    width: 1em;
    height: 1em;
    clip: rect(0em, 1em, 1em, 0.5em);
  }

  // circle to show the status
  .bar {
    @extend .pie;
  }

  // loop to create all needed elements automatically
  @for $i from 51 through 100 {
    &.p#{$i} {
      & .slice {
        @extend .rect-auto;
      }

      &.bar:after {
        @extend .pie-fill;
      }

      & .fill {
        @extend .pie;
        @extend .pie-fill;
      }
    }
  }

  // loop to rotate all 100 circles
  @for $i from 1 through 100 {
    &.p#{$i} .bar {
      $degs: calc(360 / 100 * $i);
      @include rotate(#{$degs}deg);
    }
  }

  // hover styles
  &:hover {
    cursor: default;

    > span {
      font-weight: bold;
      color: rgba(var($primary), 1);
    }

    &:after {
      top: $circle-width-hover;
      left: $circle-width-hover;
      width: 1 - (2 * $circle-width-hover);
      height: 1 - (2 * $circle-width-hover);
    }
  }

  &.grantext {
    > span {
      font-size: 0.22em;
    }
  }

  &.green {
    .bar,
    .fill {
      border-color: rgba(var(--vs-success), 1) !important;
    }

    &:hover {
      > span {
        color: rgba(var($warning), 1);
      }
    }
  }

  &.orange {
    .bar,
    .fill {
      border-color: rgba(var($warning), 1) !important;
    }

    &:hover {
      > span {
        color: rgba(var($primary), 1);
      }
    }
  }
}
</style>
