<script setup>
import { reactive, onMounted } from "vue";
import { fetchUsers } from "../../api";

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
  console.log(state.users);
});
</script>
<template>
  <table>
    
  </table>

</template>
