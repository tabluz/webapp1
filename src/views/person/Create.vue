<script setup>
import { ref, onMounted,reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Form } from "vee-validate";
import { useResponse } from "../../composables/useResponse";

const route = useRoute()

function showAlert(){
  useResponse().showAlert(()=>{
  })
}
</script>
<template>
    <main id="main-container">
        <!-- Hero Content -->
        <div class="bg-primary-dark">
            <div class="content content-full text-center pt-7 pb-5">
                <h1 class="h2 text-white mb-2">
                    Datos del Usuario
                </h1>
                <h2 class="h4 fw-normal text-white-75">
                </h2>
            </div>
        </div>
        <!-- END Hero Content -->

        <!-- Page Content -->
        <div class="bg-body-extra-light">
            <div class="content">
                <div class="row items-push justify-content-center">
                    <div class="col-md-10 col-xl-5">
                        <Form>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <label class="form-label">Nombre: </label>
                                        <input type="text" class="form-control" id="name" name="name"
                                            placeholder="Ingrese su nombre ...">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <label class="form-label" for="lastname">Apellido</label>
                                        <input type="text" class="form-control" id="lastname" name="lastname"
                                            placeholder="Enter your lastname..">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <label class="form-label">Teléfono: </label>
                                        <input type="number" class="form-control" id="number" name="number"
                                            placeholder="Ingrese su número telefónico ...">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <label class="form-label" for="lastname">DNI</label>
                                        <input type="number" class="form-control" id="dni" name="dni"
                                            placeholder="Enter your DNI ...">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="email">Correo</label>
                                <input type="email" class="form-control" id="email" name="email"
                                    placeholder="Ingrese su correo ..">
                            </div>
                            <div class="mb-4">
                                <label class="form-label">Fecha de Nacimiento</label>
                                <input type="date" class="form-control" id="date_born_at" name="date_born_at"
                                    placeholder="Ingrese su fecha de nacimiento ...">
                            </div>
                            <div class="mb-4">
                                <label class="form-label">Dirección</label>
                                <input type="text" class="form-control" id="address" name="address"
                                    placeholder="Ingrese su dirección ..">
                            </div>
                            <div class="mb-4">
                                <label class="form-label">Foto (opcional)</label>
                                <input class="form-control" type="file" id="photo">
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="subject">Tipo de usuario</label>
                                <select class="form-select" id="subject" name="subject" size="1">
                                    <option selected="">Seleccione un tipo de usuario</option>
                                    <option value="1">Alumno</option>
                                    <option value="2">Profesor</option>
                                    <option value="3">Administrador</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <button @click="showAlert()" type="submit" class="btn btn-alt-primary">
                                    <i class="fa fa-paper-plane me-1 opacity-50"></i> Enviar datos
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        <!-- END Page Content -->
    </main>
</template>
<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>