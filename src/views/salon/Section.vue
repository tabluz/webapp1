<script setup>
import { reactive, onMounted } from "vue";
import { fetchUsers, fetchSection , fetchCycles} from '../../api';

const state = reactive({
  users: [],
  loading: false,
});

async function fetchData() {
  state.loading = true;
  const response = await fetchUsers();
  state.users = response.data;
  state.loading = false
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
  stateSection.loading = false
}

onMounted(() => {
  fetchDataSections();
})



const stateCycle = reactive({
  cycles: [],
  loading: false,
});

async function fetchDataCycles() {
  stateCycle.loading = true;
  const value = await fetchCycles();
  stateCycle.cycles = value.data;
  stateCycle.loading = false
}

onMounted(() => {
  fetchDataCycles();
})






</script>

<template >

<body>
<div class="container mt-5 ">
      
      <div class="row mt-1 shadow-lg rounded-4 bg-light">
        
        <div class="d-flex justify-content-between">
          <strong><h2 class="d-inline">Matriculas por ciclo y sección</h2></strong>
          <button type="submit" class="btn btn-lg btn-alt-primary"> Matricular </button>
        </div>
        <p class="ml-3">Registre una nueva matricula</p>
      </div>

</div>




  <div class="d-flex">
    <div class="form-group my-2" style="flex-basis: 50%">
        <h4>Ciclo</h4>

        
        <select class="form-control" id="ciclo">
          <option v-for="item in state.cycles">{{ user.name }}</option>
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
 <div class="user-block" v-for="user in state.users"> 


<table class="table mx-auto" style="width: 50%; margin: auto;">
  <thead class="thead-light">

      <th>Id </th>
      <th>Nombre </th>
      <th> Apellido </th>

  </thead>
  <tbody>

    <tr>

       <td>{{  user.id  }}</td>
      <td>{{  user.name  }}</td>
      <td>{{  user.last_name  }}</td> 
    </tr>
    
  </tbody>
</table>

</div>
</div>

</body>

</template>