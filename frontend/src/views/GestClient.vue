<template>
   <div class="client">
      <Navbar />
      <Siderbar />
      <!-- clientes -->
      <!-- LLAMAR AL COMPONENTE DE MODAL CARGA -->
      <!-- Mostrar el modal solo si `mostrarModal` es true -->
      <ModalCliente :cliente="selectedItem" :tituloModal="tituloModal" :subtituloModal="subtituloModal"
         v-if="mostrarModal" @cerrar="cerrarModal" @actualizartabla="recargartabla()" />
      <!-- Encabezado de clientes con boton de carga -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 overflow-auto">

         <!-- titulo -->
         <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Clientes</h1>
         </div>

         <!-- SECCION DE BUSQUEDA Y FILTRO -->
         <div class="d-flex flex-wrap align-items-center gap-2 mb-3 pt-3 pb-3 color-div pe-3 ps-3 rounded shadow-sm">
            <!-- Grupo de búsqueda -->
            <div class="d-flex align-items-center gap-2 flex-grow-1">
               <span class="input-group-text">
                  <Icon icon="mdi:search" width="20" height="20" />
               </span>
               <input id="inputSearch" type="text" class="form-control fixed-width-input color-input"
                  placeholder="Seleccione un filtro para buscar el cliente" />

               <!-- BOTON DE FILTRO -->
               <button class="btn btn-outline-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                  Filtros
                  <Icon icon="mdi:filter" width="24" height="24" />
               </button>
               <ul class="dropdown-menu" aria-labelledby="dropdown03" id="filterDropdownUser">
                  <li><a class="dropdown-item" data-col="1">CI/RUC</a></li>
                  <li><a class="dropdown-item" data-col="2">Razon Social</a></li>
                  <li><a class="dropdown-item" data-col="3">Contribuyente</a></li>
                  <li><a class="dropdown-item" data-col="4">Estado</a></li>
               </ul>
            </div>

            <!-- BOTON DE CARGAR NUEVO cliente -->
            <div class="btn-toolbar">
               <div class="btn-group w-100 w-md-auto">
                  <button type="button" class="btn btn-sm btn-secondary" @click="abrirModal('cargar')">Cargar nuevo
                     cliente
                     <Icon icon="mdi:plus" width="24" height="24" />
                  </button>
               </div>
            </div>
         </div>
         <!-- TABLA -->
         <div class="body table-responsive table table-hover table-bordered shadow-sm">
            <div class="table-responsive" style="overflow-x: auto; width: 100%;">
               <DataTable :options="tableOptions" id="tablacliente" :key="datatableKey"
                  class="display table pretty thead th responsive nowrap table-striped table-hover table-bordered"
                  cellspacing="0" width="100%"  style="min-width: 1200px;">
                  <thead>
                     <tr>
                        <th scope="col">ITEM</th>
                        <th scope="col">TIPO DOCUMENTO</th>
                        <th scope="col">N° IDENTIFICACION</th>
                        <th scope="col">TIPO CONTRIBUYENTE</th>
                        <th scope="col">RAZON SOCIAL</th>
                        <th scope="col">DIRECCION</th>
                        <th scope="col">CIUDAD</th>
                        <th scope="col">TELEFONO</th>
                        <th scope="col">CORREO</th>
                        <th scope="col">EMPRESA</th>
                        <th scope="col">CUENTA LOCAL</th>
                        <th scope="col">CUENTA EXTRANJERA</th>
                        <th scope="col">Modificar</th>
                        <th scope="col">Eliminar</th>
                     </tr>
                  </thead>
                  <tbody>
                     <!-- prueb de como mostrar despues los datos de la bd -->
                     <tr v-for="item in clientes" :key="item.idCliente">
                        <!-- cambiar luego el id por como esta en la base de datos -->
                        <td class="number">{{ item.idCliente }}</td>
                        <td>{{ item.tipoDocumento?.descripcion || 'Sin tipo' }}</td>
                        <td  class="number">{{ item.numeroIdentificacion }}</td>
                        <td>{{ item.tipoContribuyente?.descripcion || 'Sin tipo' }}</td>
                        <td>{{ item.razonSocial }}</td>
                        <td>{{ item.direccion }}</td>
                        <td class="number">{{ item.ciudad?.nombre || 'Sin ciudad' }}</td>
                        <td class="number">{{ item.telefono }}</td>
                        <td>{{ item.correo }}</td>
                        <td class="number">{{ item.empresa?.nombre || 'Sin empresa' }}</td>
                        <td>{{ item.cuentaLocal }}</td>
                        <td>{{ item.cuentaExtranjera }}</td>
                        <td>
                           <button class="btn btn-edit" @click="editar(item, 'modificar')">
                              <Icon icon="mdi:pencil" width="20" height="20" />
                           </button>
                        </td>
                        <td>
                           <button class="btn btn-delete" @click="eliminar(item)">
                              <Icon icon="mdi:trash-can" width="20" height="20" />
                           </button>
                        </td>
                     </tr>
                  </tbody>
               </DataTable>
            </div>
         </div>
      </main>
      <!-- Agregar el componente Footer -->
      <!-- <Footer/> -->
   </div>
</template>

<script lang="ts" setup>

// CODIGOS DE cliente
/* ------------IMPORTACIONES----------------- */
import { ref, onMounted } from 'vue'
import ModalCliente from '@/components/ModalNuevoCliente.vue'

// asi se importar
import Navbar from '@/components/NavBar.vue'
// importar el siderbar
import Siderbar from '@/components/SiderBar.vue'

// 1ro importar la libreria de Axios
import axios from 'axios'

import $ from 'jquery'

// Importar libreria de alertas
import Swal from 'sweetalert2'
/* ------------DEL DATATABLE---------------------- */
import jszip from 'jszip'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-autofill-bs5'
import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.html5.mjs'
import 'datatables.net-buttons/js/buttons.print.mjs'
// import DateTime from 'datatables.net-datetime'
import 'datatables.net-responsive-bs5'
import 'datatables.net-select-bs5'

// Codigo para los iconos
import { Icon } from '@iconify/vue'

// --------Estado para controlar la visibilidad del modal----------------
const mostrarModal = ref(false)

// -----------------ABRIR EL MODAL Y EDITAR TEXTOS ------------------

const tituloModal = ref('Cargar Nuevo cliente')
const subtituloModal = ref('Ingrese todos los datos del nuevo cliente')

// Función para abrir el modal
const abrirModal = (accion: string) => {
  if (accion === 'cargar') {
    tituloModal.value = 'Cargar Nuevo cliente'
    subtituloModal.value = 'Ingrese todos los datos del nuevo cliente'
  }
  mostrarModal.value = true
}

// Función para cerrar el modal (se usará dentro del modal)
const cerrarModal = () => {
  mostrarModal.value = false
  selectedItem.value = {
    idCliente: 0,
    tipoDocumento: { descripcion: '' },
    numeroIdentificacion: '',
    tipoContribuyente: { descripcion: '' },
    razonSocial: '',
    direccion: '',
    ciudad: { nombre: '' },
    telefono: '',
    correo: '',
    empresa: { nombre: '' },
    cuentaLocal: '',
    cuentaExtranjera: '',
    estado: ''
  }
}

const recargartabla = () => {
  // Llamar al backend para obtener los clientes actualizados
  axios.get('http://localhost:8080/api/cliente')
    .then(response => {
      clientes.value = response.data.clientes.map((cliente: any) => ({
        // Campos básicos
        idCliente: cliente.id_cliente,
        numeroIdentificacion: cliente.numero_identificacion,
        razonSocial: cliente.razon_social,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo,
        cuentaLocal: cliente.cuenta_local,
        cuentaExtranjera: cliente.cuenta_extranjera,
        // Campos con relaciones
        ciudad: { nombre: cliente.Ciudad?.nombre || 'Sin ciudad' },
        empresa: { nombre: cliente.Empresa?.nombre || 'Sin empresa' },
        tipoDocumento: { descripcion: cliente.TipoDocumento?.descripcion || 'Sin tipo doc' },
        tipoContribuyente: { descripcion: cliente.TipoContribuyente?.descripcion || 'Desconocido' },
        estado: cliente.estado ? 'Activo' : 'Inactivo'
      }))

      console.log('Tabla recargada, primer cliente:', clientes.value[0]) // PARA DEBUGGEAR
      datatableKey.value++
    })
    .catch(error => {
      console.error('Error al obtener los clientes:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la lista de clientes.'
      })
    })
}

/* -----------------hasta acá-------------------------------- */

DataTablesCore.Buttons.jszip(jszip)
DataTable.use(DataTablesCore)

const datatableKey = ref(0)

// Configuración de las opciones del DataTable con idioma en español
const tableOptions = ref({
  scrollX: true,
  dom: '<"top d-flex justify-content-between align-items-center"lB>rt<"bottom d-flex justify-content-between"ip>',
  language: {
    // desabilitia la opcion de buscar en la tabla
    zeroRecords: 'No se encontraron resultados',
    lengthMenu: 'Mostrar _MENU_ registros por página',
    info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
    infoFiltered: '(filtrado de un total de _MAX_ registros)',
    paginate: {
      first: 'Primero',
      previous: 'Anterior',
      next: 'Siguiente',
      last: 'Último'
    },
    buttons: {
      copyTitle: 'Copiado al portapapele',
      copySuccess: {
        1: 'Se ha copiado 1 registro al portapapeles',
        _: 'Se han copiado %d registros al portapapeles'
      }
    }
  },
  buttons: [
    'copy', 'csv', 'excel', 'pdf', 'print' // Botones de exportación
  ]
})

// -----------------CODIGO PARA FILTRAR LA TABLA ------------------|

const columnaFiltro = ref<number | null>(null)

onMounted(() => {
  document.querySelectorAll('#filterDropdownUser .dropdown-item').forEach(item => {
    item.addEventListener('click', (e: any) => {
      const col = parseInt(e.target.getAttribute('data-col'))
      columnaFiltro.value = col
      const placeholder = document.getElementById('inputSearch') as HTMLInputElement
      if (placeholder) {
        placeholder.placeholder = 'Buscar por ' + e.target.textContent
        placeholder.focus()
      }
    })
  })
  const input = document.getElementById('inputSearch') as HTMLInputElement

  if (input) {
    input.addEventListener('keyup', function () {
      const value = (this as HTMLInputElement).value
      const table = $('#tablacliente').DataTable()

      if (columnaFiltro.value !== null) {
        table.column(columnaFiltro.value).search(value).draw()
      } else {
        table.search(value).draw()
      }
    })
  }
})

// -----------------------------TRAER clientes DE LA BASE DE DATOS ---------------------------------------------|

interface Cliente { // definición de la interfaz para los datos de Cliente
   idCliente: number;
   tipoDocumento: { descripcion: string };
   numeroIdentificacion: string;
   tipoContribuyente: { descripcion: string };
   razonSocial: string;
   direccion: string;
   ciudad: { nombre: string };
   telefono: string;
   correo: string;
   empresa: { nombre: string };
   cuentaLocal: string;
   cuentaExtranjera: string;
   estado: string;
}

// declaración de la variable clientes como un array de objetos cliente
const clientes = ref<Cliente[]>([]) // Aquí se almacenarán los clientes desde la base de datos

const getCliente = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cliente')
    clientes.value = response.data.clientes.map((cliente: any) => ({
      // Campos básicos
      idCliente: cliente.id_cliente,
      numeroIdentificacion: cliente.numero_identificacion,
      razonSocial: cliente.razon_social,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      correo: cliente.correo,
      cuentaLocal: cliente.cuenta_local,
      cuentaExtranjera: cliente.cuenta_extranjera,
      // Campos con relaciones - mapear correctamente
      ciudad: { nombre: cliente.Ciudad?.nombre || 'Sin ciudad' },
      empresa: { nombre: cliente.Empresa?.nombre || 'Sin empresa' },
      tipoDocumento: { descripcion: cliente.TipoDocumento?.descripcion || 'Sin tipo doc' },
      tipoContribuyente: { descripcion: cliente.TipoContribuyente?.descripcion || 'Desconocido' },
      estado: cliente.estado ? 'Activo' : 'Inactivo'
    }))
    console.log('clientes cargados111:', response.data)
    console.log('primer cliente mapeado:', clientes.value[0]) // PARA DEBUGGEAR
    datatableKey.value++
  } catch (error) {
    console.error('Error al obtener los clientes:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cargar los clientes.'
    })
  }
}

// montar el componente y cargar los clientes al inicio
onMounted(() => {
  getCliente()
})

// -----------------HASTA ACÁ EL CODIGO DE PETICION PARA OBTENER LOS DATOS DE LA BASE DE DATOS------------------|

// ----------------CODIGO PARA SELECCIONAR UNA FILA DE LA TABLA PARA MODIFICARLA--------------------------------|

const selectedItem = ref<Cliente>({
  idCliente: 0,
  tipoDocumento: { descripcion: '' },
  numeroIdentificacion: '',
  tipoContribuyente: { descripcion: '' },
  razonSocial: '',
  direccion: '',
  ciudad: { nombre: '' },
  telefono: '',
  correo: '',
  empresa: { nombre: '' },
  cuentaLocal: '',
  cuentaExtranjera: '',
  estado: ''
}) // Variable para almacenar el elemento seleccionado

const editar = (item: Cliente, accion: string) => {
  if (accion === 'modificar') {
    tituloModal.value = 'Modificar Cliente'
    subtituloModal.value = 'Edite los datos del Cliente'
  }
  console.log('Datos del item:', item) // Ver los datos que se están pasando

  if (item) {
    selectedItem.value = { ...item } // Asignar el elemento seleccionado a la variable
  } else {
    console.error('El item no contiene datos válidos')
  }
  mostrarModal.value = true // Asegurar que se muestra el modal
}

// ---------------- HASTA ACÁ EL CODIGO PARA SELECCIONAR UNA FILA DE LA TABLA PARA MODIFICARLA------------------------------|

// --------------------------CODIGO PARA ELIMINAR UNA FILA DE LA TABLA  -----------------------------------------|
const eliminar = async (item: Cliente) => {
  console.log('cliente a eliminar:', item.razonSocial) // Depuración: Verificar si item es válido

  // Confirmar eliminación con SweetAlert
  Swal.fire({
    title: `¿Estás seguro de que deseas eliminar al cliente: ${item.razonSocial}?`,
    text: 'No podrás revertir esto!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4F4F75',
    cancelButtonColor: '#FF5733',
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'Cancelar',
    reverseButtons: true // Invierte el orden de los botones (Aceptar primero, Cancelar después)
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Obtener el token del almacenamiento local
        const token = localStorage.getItem('token') // O usa Vuex o cualquier otro método para obtenerlo

        if (!token) {
          Swal.fire('Error', 'Debes iniciar sesión para eliminar clientes.', 'error')
          return
        }

        // Configuración de los encabezados para incluir el token
        const config = {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token al encabezado
          }
        }
        console.log('token:', token)
        // Realizar la solicitud DELETE a la API
        const response = await axios.delete(`http://localhost:8080/api/cliente/${item.idCliente}`, config)
        console.log('Respuesta de la API:', response) // Verificar la respuesta de la API

        // Forzar la actualización de la tabla con DataTable
        recargartabla()
        // Mostrar mensaje de éxito
        Swal.fire(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        )
      } catch (error) {
        console.error('Error al eliminar cliente:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el cliente.'
        })
      }
    }
  })
}

// ---------------------HASTA ACÁ EL CODIGO PARA ELIMINAR UNA FILA DE LA TABLA  -----------------------------------------|
</script>

<style scoped>
/* Estilo del boton de cargar nueva empresa */
.btn-secondary {
   background-color: #7839CD;
   border: none;
   color: #ffffff;
}

.btn-edit {
   background-color: #4F4F75;
   border: none;
   color: #ffffff;
}

.btn-edit:hover {
   background-color: #121236;
   border: none;
   color: #ffffff;
}

.btn-delete {
   background-color: #FF5733;
   border: none;
   color: #ffffff;
}

.btn-delete:hover {
   background-color: #4d1002;
   border: none;
   color: #ffffff;
}

.color-div {
   background-color: #f8f9fa;
}

/* Estilo del input de busqueda y filtro */
.color-input {
   background-color: #e9ecef;
   border: 1px solid #ced4da;
}

.fixed-width-input {
   min-width: 230px;
   /* Tamaño mínimo */
   max-width: 500px;
   /* Tamaño máximo */
   width: 50%;
   /* Opcional, dependiendo del diseño */
}

button {
   max-width: 100%;
   white-space: nowrap;
   /* Evita que el texto dentro del botón haga que crezca */
}

@media (max-width: 768px) {
   button {
      font-size: 14px;
      padding: 5px 10px;
      /* Reduce el padding para pantallas pequeñas */
   }
}

@media (max-width: 768px) {
   .table-responsive {
      overflow-x: auto;
      display: block;
      white-space: nowrap;
   }
}

/* Estilo de la tabla */
.table {
   border-radius: 8px;
   /* Bordes ligeramente redondeados */
   overflow: hidden;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   /* Sombra más sutil */
   border: 1px solid #dee2e6;
   /* Borde para un diseño limpio */
}

.table th {
   background-color: #343a40;
   /* Fondo oscuro para encabezados */
   color: #4F4F75;
   text-align: center;
   font-weight: 600;
}

.table td {
   text-align: center;
   /* Centrar el contenido */
   vertical-align: middle;
   /* Alinear verticalmente */
   color: #495057;
}

.table td.number {
  text-align: center;
}

.table-striped tbody tr:nth-of-type(odd) {
   background-color: #f8f9fa;
   /* Color alternativo más claro */
}

.table-hover tbody tr:hover {
   background-color: #e2e6ea;
   /* Color al pasar el mouse más sutil */
}

.table-bordered {
   border: 1px solid #4F4F75;
   /* Bordes definidos */
}

.table thead th {
   border-bottom: 2px solid #dee2e6;
   /* Borde inferior más grueso */
}

/* Botones dentro de la tabla */
.btn-outline-primary {
   border-color: #7839CD;
   color: #7839CD;
}

.btn-outline-primary:hover {
   background-color: #7839CD;
   color: #ffffff;
}

.btn-outline-danger {
   border-color: #E53E3E;
   color: #E53E3E;
}

.btn-outline-danger:hover {
   background-color: #E53E3E;
   color: #ffffff;
}

/* del datatable */
@import url('datatables.net-bs5');
@import url('datatables.net-autofill-bs5');
@import url('datatables.net-buttons-bs5');
@import url('datatables.net-responsive-bs5');
@import url('datatables.net-select-bs5');
</style>
