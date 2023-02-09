<script setup>
import { reactive, onMounted } from "vue";
import { fetchSection, fetchCycles} from "../../api";

/////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////

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
<template>
  <table>
<body>

  <div class="container mt-5 ">
        
        <div class="row mt-1 shadow-lg rounded-4 bg-light">
          <br>
          <div class="d-flex justify-content-between">
            <strong><h2 class="d-inline">Matriculas</h2></strong>
            <button type="submit" class="btn btn-lg btn-alt-primary"> Aperturar </button>
          </div>
          <p class="ml-3">Registre una nueva matricula</p>
        </div>
        

<form>
  <div class="search-container mt-5">
    <input type="text" placeholder="DNI">
    <button type="submit">Buscar</button>
  </div>
</form>


<div class="container">
      <form id="formulario" class="d-flex justify-content-center">
          <div class="row  col-4 shadow d-flex justify-content-center">
              <div class="row-cols-10 m-auto">
  
  
                  <div class="form-group my-2">
                      <h4>Ciclo</h4>
                      <select class="form-control" id="grado">
                        <option v-for="item in stateCycle.cycles">{{ item.name }}</option>
                      </select> 
                  </div>
  
                  <div class="form-group my-4">
                      <h4>Grado/Seccion</h4>
                      <select class="form-control" id="grado">
                        <option v-for="item in stateSection.sections">{{ item.section }}</option>
                      </select>
                  </div>
  
                  <div style="float: right">
                      <button type="submit" class="btn btn-dark mb-4" style="width: 100px">Guardar</button>
                  </div>

                  <br>
              </div>
          </div>
      </form>
</div>






</div>
 
</body> 
  </table>

</template>