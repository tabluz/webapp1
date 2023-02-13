<script setup>
import { reactive, onMounted } from "vue";
import { fetchUsers, fetchSection , fetchCycles} from '../../api';


const stateCycle = reactive({
    cycles: [],
    res: {}
})

async function fetchCycle() {
  stateCycle.loading = true;
  const value1 = await fetchCycles();
  stateCycle.cycles = value1.data;
  stateCycle.loading = false;
}


onMounted(() => {
  fetchCycle();
});



const state = reactive({
  users: [],
  loading: false,
});

async function fetchData() {
  state.loading = true;
  const response = await fetchUsers();
  state.users = response.data;
  state.loading = false;
}
onMounted(() => {
  fetchData();
})




const stateSection = reactive({
  sections: [],
  loading: false,
});
async function fetchDataSections() {
  stateSection.loading = true;
  const response = await fetchSection();
  stateSection.sections = response.data;
  stateSection.loading = false;
}
onMounted(() => {
  fetchDataSections();
})


</script>


<template>
<BasePageHeading 
title="Matriculas por ciclo y sección"
subtitle="Registre una nueva matricula"
/>



  <div class="d-flex">
    <div class="form-group my-2" style="flex-basis: 50%">
  <h4>Ciclo</h4>
  <select class="form-select">
    <option v-for="cycle in stateCycle.cycles" > {{ cycle.name }} </option>
  </select>
</div>



  <div class="form-group my-2" style="flex-basis: 50%">
        <h4>Grupo y seccion</h4>

        
        <select class="form-control" id="grado">
          <option v-for="item in state.sections">{{ item.section }}</option>
        </select>

      
  </div>
</div>  



<div class="users-container content">


  <div class="table-responsive">
  <table class="table table-bordered table-striped table-vcenter">
  <thead>

      <th>Id </th>
      <th>Nombre </th>
      <th> Apellido </th>

  </thead>
  <tbody>

    <tr v-for="user in state.users" :key="user.id">

       <td class="fw-semibold fs-sm">{{  user.id  }}</td>
      <td class="fw-semibold fs-sm">{{  user.name  }}</td>
      <td class="fw-semibold fs-sm" >{{  user.last_name  }}</td> 
    </tr>
    
  </tbody>
</table>

</div>
</div>



</template>