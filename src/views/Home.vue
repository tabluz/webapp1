<script setup></script>

<template>
  <BasePageHeading title="Aula Virtual" subtitle="Bienvenido querido usuario!">
    <template #extra>
      <button
        v-click-ripple
        type="button"
        class="btn btn-alt-primary"
        @click="store.sideOverlay({ mode: 'toggle' })"
      >
        <i class="fa fa-plus opacity-50 me-1" />
        MI perfil
      </button>
    </template>
  </BasePageHeading>

  <div class="content">
    <div>hello world</div>
  </div>
</template>
