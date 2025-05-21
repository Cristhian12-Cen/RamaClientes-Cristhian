<template>
  <!-- Modal de CARGAR UNA NUEVA EMPRESA -->
  <div class="modal fade show d-block" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content text-white p-4" style="background-color: #4F4F75; border-radius: 10px;">
        <!-- Encabezado -->
        <div class="modal-header border-bottom">
          <h1 class="modal-title fs-3 fw-semibold" id="staticBackdropLabel"> {{ tituloModal }}</h1>
          <button type="button" class="btn-close bg-white" @click="cerrarModal" aria-label="Close"></button>
        </div>
        <form action="#" id="formcliente" class="needs-validation" @submit.prevent="guardarOmodificar" novalidate>
          <!-- Cuerpo del Modal -->
          <div class="modal-body">
            <p class="text-start mb-5">{{ subtituloModal }}</p>
            <div class="row">

              <!-- Tipo documento -->
              <div class="col-md-6 mb-3 ms-auto text-start">
                <label for="rol" class="form-label">Tipo documento</label>
                <select id="rol" name="rol" v-model="cliente.id_tipo_documento" :class="['form-control', { 'is-invalid': errores.id_tipo_documento }]" required>
                  <option value="0" disabled>Seleccionar</option>
                  <option v-for="docs in documentoDESCP" :key="docs.id_tipo_documento" :value="docs.id_tipo_documento">
                    {{ docs.descripcion || 'Sin rol' }} <!-- Mostrar un mensaje si no hay nombre -->
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ errores.id_tipo_documento }}
                </div>
              </div>

              <!-- Tipo Contribuyente -->
              <div class="col-md-6 mb-3 ms-auto text-start">
                <label for="rol" class="form-label">Tipo Contribuyente</label>
                <select id="rol" name="rol" v-model="cliente.id_tipo_contribuyente" :class="['form-control', { 'is-invalid': errores.id_tipo_contribuyente }]" required>
                  <option value="0" disabled>Seleccionar</option>
                  <option v-for="contribuyentes in contriDESCP" :key="contribuyentes.id_tipo_contribuyente" :value="contribuyentes.id_tipo_contribuyente">
                    {{ contribuyentes.descripcion || 'Sin rol' }} <!-- Mostrar un mensaje si no hay nombre -->
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ errores.id_tipo_contribuyente }}
                </div>
              </div>

              <!-- NOMBRE -->
              <div class="col-md-6 mb-3 text-start">
                <label for="numeroIDENTIFICACION" class="form-label">N° IDENTIFICACION</label>
                <input type="text" id="numeroIDENTIFICACION" v-model="cliente.numeroIDENTIFICACION" :class="['form-control', { 'is-invalid': errores.numeroIDENTIFICACION }]"
                  placeholder="Ingrese el numero de identificacion" required>
                <div class="invalid-feedback">
                  {{ errores.numeroIDENTIFICACION }}
                </div>
              </div>

              <!-- TELEFONO -->
              <div class="col-md-6 mb-3 text-start">
                <label for="telefono" class="form-label">Nº de telefono</label>
                <input type="text" id="telefono" v-model="cliente.telefono" :class="['form-control', { 'is-invalid': errores.telefono }]"
                  placeholder="Ingrese el numero"  @input="soloNumerostelefono('telefono', 10)" required>
                <div class="invalid-feedback">
                  {{ errores.telefono }}
                </div>
              </div>

              <!-- CORREO -->
              <div class="col-md-6 mb-3 text-start">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" id="correo" v-model="cliente.correo" :class="['form-control', { 'is-invalid': errores.correo }]"
                  placeholder="" required>
                <div class="invalid-feedback">
                  {{ errores.correo }}
                </div>
              </div>
                <!-- CORREO -->
                <div class="col-md-6 mb-3 text-start">
                <label for="razonSOCIAL" class="form-label">RAZON SOCIAL</label>
                <input type="" id="razonSOCIAL" v-model="cliente.razonSOCIAL" :class="['form-control', { 'is-invalid': errores.razonSOCIAL }]"
                  placeholder="" required>
                <div class="invalid-feedback">
                  {{ errores.razonSOCIAL }}
                </div>
              </div>

                <!-- CORREO -->
                <div class="col-md-6 mb-3 text-start">
                <label for="direccion" class="form-label">DIRECCION</label>
                <input type="" id="direccion" v-model="cliente.direccion" :class="['form-control', { 'is-invalid': errores.direccion }]"
                  placeholder="" required>
                <div class="invalid-feedback">
                  {{ errores.direccion }}
                </div>
              </div>

                <!-- CORREO -->
                <div class="col-md-6 mb-3 text-start">
                <label for="id_ciudad" class="form-label">CIUDAD</label>
                <input type="" id="id_ciudad" v-model="cliente.id_ciudad" :class="['form-control', { 'is-invalid': errores.id_ciudad }]"
                  placeholder="" required>
                <div class="invalid-feedback">
                  {{ errores.id_ciudad }}
                </div>
              </div>

                <!-- CORREO -->
                <div class="col-md-6 mb-3 text-start">
                <label for="id_empresa" class="form-label">EMPRESA</label>
                <input type="" id="id_empresa" v-model="cliente.id_empresa" :class="['form-control', { 'is-invalid': errores.id_empresa }]"
                  placeholder="" required>
                <div class="invalid-feedback">
                  {{ errores.id_empresa }}
                </div>
              </div>

                <!-- CORREO -->
                <div class="col-md-6 mb-3 text-start">
                <label for="correo" class="form-label">CUENTA LOCAL</label>
                <input type="" id="correo" v-model="cliente.cuenta_local" :class="['form-control', { 'is-invalid': errores.cuenta_local }]"
                  placeholder="" required>
                <div class="invalid-feedback">
                  {{ errores.correo }}
                </div>
              </div>

                <!-- CORREO -->
                <div class="col-md-6 mb-3 text-start">
                <label for="cuenta_extranjera" class="form-label">CUENTA EXTRANJERA</label>
                <input type="" id="cuenta_extranjera" v-model="cliente.cuenta_extranjera" :class="['form-control', { 'is-invalid': errores.cuenta_extranjera }]"
                  placeholder="" required>
                <div class="invalid-feedback">
                  {{ errores.cuenta_extranjera }}
                </div>
              </div>
            </div>
          </div>
          <!-- Pie del Modal -->
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-danger" @click="cerrarModal">Cancelar</button>
            <button type="submit" class="btn btn-success" id="btnGuardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
// IMPORTACIONES
import { defineEmits, onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

// Importar libreria de alertas
import Swal from 'sweetalert2'

// ----------------- IMPORTAR CON EL SERVIDOR CON AXIOS------------------------

// 1ro importar la libreria de Axios
import axios from 'axios'

// Definir el evento `cerrar` que el padre escuchará
const emit = defineEmits(['cerrar', 'actualizartabla'])

// Importante para que el titulo cambie segun modificar o cargar
const props = defineProps({
  tituloModal: String,
  subtituloModal: String,
  cliente: Object // para recibir los datos del cliente desde la tabla
})

const cliente = ref({ ...props.cliente }) // Crear una referencia reactiva a los datos de la empresa

const cerrarModal = () => {
  Swal.fire({
    title: '¿Está seguro de que desea cancelar la carga?',
    icon: 'warning',
    showCancelButton: true, // Muestra el botón de cancelar
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true // Invierte el orden de los botones (Aceptar primero, Cancelar después)
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el cliente hace clic en "Aceptar"
      makeToast('Éxito', 'La acción ha sido cancelada correctamente', 'success')
      emit('cerrar') // Emitimos el evento para que el padre lo maneje y cierre el modal
    }
  })
}

/* -------------------VALIDACIONES---------------------- */
// Validar formulario
/* const validarFormulario = (event: Event) => {
  event.preventDefault()

  const form = document.getElementById('formcliente') as HTMLFormElement | null
  if (!form) return // Detiene la ejecución si form es null

  if (!form.checkValidity()) {
    event.stopPropagation()
  }

  form.classList.add('was-validated')
}

// Ejecutar validación al montar el componente
onMounted(() => {
  const form = document.getElementById('formcliente') as HTMLFormElement | null
  if (!form) return // Asegurar que form no es null antes de agregar el event listener

  form.addEventListener('submit', validarFormulario)
}) */
const enviado = ref(false)

const errores = ref({
  numeroIDENTIFICACION: '',
  id_tipo_contribuyente: '',
  telefono: '',
  correo: '',
  id_empresa: '',
  cuenta_extranjera: '',
  cuenta_local: '',
  id_ciudad: '',
  direccion: '',
  razonSOCIAL: '',
  id_tipo_documento: ''
})

const validarnumeroIDENTIFICACION = () => {
  if (!cliente.value.numeroIDENTIFICACION || typeof cliente.value.numeroIDENTIFICACION !== 'string') {
    return 'Por favor, ingrese el número de cédula.'
  }
  const ced = cliente.value.numeroIDENTIFICACION.trim()
  if (!/^\d{6,10}$/.test(ced)) return 'La cédula debe contener entre 6 y 10 dígitos numéricos.'
  cliente.value.numeroIDENTIFICACION = ced
  return ''
}

const soloNumeros = (campo: string, maxLong: number) => {
  cliente.value[campo] = cliente.value[campo]
    .replace(/\D/g, '') // elimina todo lo que no es dígito
    .slice(0, maxLong) // recorta si se pasa del máximo
}
const soloNumerostelefono = (campo: string, maxLong: number) => {
  cliente.value[campo] = cliente.value[campo]
    .replace(/\D/g, '') // elimina todo lo que no es dígito
    .slice(0, maxLong) // recorta si se pasa del máximo
}

const validarcontribuyente = () => {
  if (!cliente.value.id_tipo_contribuyente || cliente.value.id_tipo_contribuyente === 0) {
    return 'Por favor, seleccione un rol.'
  }
  return ''
}

const razonSOCIAL = () => {
  const razonSOCIAL = cliente.value.razonSOCIAL.trim().replace(/\s+/g, ' ')
  if (!razonSOCIAL) return 'Por favor, ingrese la razon social.'
  if (razonSOCIAL.length < 3) return ' debe tener al menos 6 caracteres.'
  if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(razonSOCIAL)) return 'Solo se permiten letras.'
  cliente.value.razonSOCIAL = razonSOCIAL
  return ''
}

const validarTelefono = () => {
  const tel = cliente.value.telefono.trim()
  if (!tel) return 'Por favor, ingrese el número de teléfono.'
  if (!/^\d{8,15}$/.test(tel)) return 'El teléfono debe contener entre 8 y 15 dígitos.'
  cliente.value.telefono = tel
  return ''
}

const validarCorreo = () => {
  const correo = cliente.value.correo.trim()
  if (!correo) return 'Por favor, ingrese el correo.'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(correo)) return 'Formato de correo inválido.'
  cliente.value.correo = correo.toLowerCase()
  return ''
}

// ------------------------- FIN VALIDACIONES ------------------------|

// -----------------------VERIFICAR DUPLICADOS -----------------------|

interface clienteDatos {
  id_cliente: number // eslint-disable-line camelcase
  numeroIDENTIFICACION: string // eslint-disable-line camelcase
  correo: string // eslint-disable-line camelcase
}

const verificarclienteDuplicado = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/cliente')
    const clientesRegistrados = data.clientes

    const numeroIDENTIFICACION = cliente.value.numeroIDENTIFICACION.trim()
    const correo = cliente.value.correo.trim().toLowerCase()

    const numeroIDENTIFICACIONExistente = clientesRegistrados.some((u: clienteDatos) => u.numeroIDENTIFICACION === numeroIDENTIFICACION)
    const correoExistente = clientesRegistrados.some((u: clienteDatos) => u.correo.toLowerCase() === correo)

    return { numeroIDENTIFICACIONExistente, correoExistente }
  } catch (error) {
    console.error('Error al consultar clientes:', error)
    return { numeroIDENTIFICACIONExistente: false, correoExistente: false }
  }
}

// ----------------------FIN VERIFICAR DUPLICADOS --------------------|

// ---------------------CONFIGURACION PAR EJECUTAR GUARDAR O MODIFICAR------------------------------------|
const guardarOmodificar = async () => {
  /* if (cliente.value.id_cliente) {
    // Si existe id_empresa, es una modificación
    modificar()
  } else {
    // Si no existe, es un nuevo registro
    guardar()
  } */
  enviado.value = true
  errores.value.numeroIDENTIFICACION = validarnumeroIDENTIFICACION()
  errores.value.id_tipo_contribuyente = validarcontribuyente()
  errores.value.razonSOCIAL = razonSOCIAL()
  errores.value.telefono = validarTelefono()
  errores.value.correo = validarCorreo()

  const tieneErrores = Object.values(errores.value).some(e => e !== '')
  if (tieneErrores) {
    makeToast('Error', 'Por favor corrija los campos marcados.', 'error')
    return
  }

  if (cliente.value.id_cliente) {
    modificar()
  } else {
    const { numeroIDENTIFICACIONExistente, correoExistente } = await verificarclienteDuplicado()
    if (numeroIDENTIFICACIONExistente) {
      errores.value.numeroIDENTIFICACION = 'Ya existe un cliente con esta cédula.'
      makeToast('Error', 'Cédula ya registrada.', 'error')
      return
    }
    if (correoExistente) {
      errores.value.correo = 'Ya existe un cliente con este correo.'
      makeToast('Error', 'Correo ya registrado.', 'error')
      return
    }

    guardar()
  }
}

// ---------------------HASTA ACÁ LA CONFIGURACION PAR EJECUTAR GUARDAR O MODIFICAR-----------------------|

// -----------------CONFIGURACION DE AXIOS-------------------|
// router para elegir donde volver a la hora de guardar
const router = useRouter()

// ------------------------FUNCION PARA GUARDAR LA EMPRESA EN LA BD---------------------------------------|

const guardar = async () => {
  // Obtener el token del almacenamiento local
  const token = localStorage.getItem('token') // O usa Vuex o cualquier otro método para obtenerlo

  // Configuración de los encabezados para incluir el token
  const config = {
    headers: {
      Authorization: `Bearer ${token}` // Añadir el token al encabezado
    }
  }

  try {
    const response = await axios.post('http://localhost:8080/api/cliente', {
      numeroIDENTIFICACION: cliente.value.numeroIDENTIFICACION,
      razonSOCIAL: cliente.value.razonSOCIAL,
      telefono: cliente.value.telefono,
      direccion: cliente.value.direccion,
      id_tipo_contribuyente: cliente.value.id_tipo_contribuyente,
      id_ciudad: cliente.value.id_ciudad,
      id_empresa: cliente.value.id_empresa,
      id_tipo_documento: cliente.value.id_tipo_documento,
      cuenta_local: cliente.value.cuenta_local,
      cuenta_extranjera: cliente.value.cuenta_extranjera,
      correo: cliente.value.correo,
      estado: true
    }, config)
    // mensajes de éxito
    console.log(response.data)
    router.push('/client') // Redirigir a la página de cliente después de guardar
    // Limpiar el formulario después de guardar
    limpiarFormulario()
    const formElement = document.getElementById('formcliente') as HTMLFormElement | null
    if (formElement) {
      formElement.classList.remove('was-validated') // Quitar la clase 'was-validated' para evitar que se activen las validaciones después de limpiar
    }
    console.log('Datos enviados al backend para cargar cliente:', cliente.value)
    // cerrar el modal
    emit('cerrar') // Emitimos el evento para que el padre lo maneje y cierre el modal
    makeToast('Éxito', 'El cliente se guardó correctamente', 'success')
    emit('actualizartabla')
  } catch (error) {
    console.error('Error al cargar los datos del cliente en la base de datos:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cargar los datos del cliente.'
    })
  }
}

// ---------------------------FIN FUNCION PARA GUARDAR LA EMPRESA EN LA BD--------------------------------|

// ------------------------FUNCION PARA MODIFICAR LA EMPRESA EN LA BD---------------------------------------|

const modificar = async () => {
  try {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token') // O usa Vuex o cualquier otro método para obtenerlo

    // Configuración de los encabezados para incluir el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Añadir el token al encabezado
      }
    }
    const response = await axios.put(`http://localhost:8080/api/cliente/${cliente.value.id_cliente}`, {
      numeroIDENTIFICACION: cliente.value.numeroIDENTIFICACION,
      razonSOCIAL: cliente.value.razonSOCIAL,
      telefono: cliente.value.telefono,
      direccion: cliente.value.direccion,
      id_tipo_contribuyente: cliente.value.id_tipo_contribuyente,
      id_ciudad: cliente.value.id_ciudad,
      id_empresa: cliente.value.id_empresa,
      id_tipo_documento: cliente.value.id_tipo_documento,
      cuenta_local: cliente.value.cuenta_local,
      cuenta_extranjera: cliente.value.cuenta_extranjera,
      correo: cliente.value.correo,
      estado: true
    }, config)
    // mensajes de éxito
    console.log(response.data)
    router.push('/user') // Redirigir a la página de empresas después de guardar
    // Limpiar el formulario después de guardar
    limpiarFormulario()
    const formElement = document.getElementById('formcliente') as HTMLFormElement | null
    if (formElement) {
      formElement.classList.remove('was-validated') // Quitar la clase 'was-validated' para evitar que se activen las validaciones después de limpiar
    }
    console.log('Datos enviados al backend para modificar el cliente:', cliente.value)

    // Actualizar el cliente modificado en la lista local
    emit('actualizartabla')
    // cerrar el modal
    emit('cerrar') // Emitimos el evento para que el padre lo maneje y cierre el modal
    makeToast('Éxito', 'El cliente se modificó correctamente', 'success')
  } catch (error) {
    console.error('Error al modificar los datos del cliente en la base de datos:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo modificar los datos del cliente.'
    })
  }
}

// ------------------------FIN FUNCION PARA MODIFICAR LA EMPRESA EN LA BD-----------------------------------|

// ----------------------------OBTENER PERIODOS DE LA BD--------------------------------------------------|

// Definir la estructura
interface TipoContribuyente {
  id_tipo_contribuyente: number // eslint-disable-line camelcase
  descripcion: string // eslint-disable-line camelcase
}

interface TipoDocumento {
  id_tipo_documento: number // eslint-disable-line camelcase
  descripcion: string // eslint-disable-line camelcase
}

// Lista de períodos obtenidos de la BD
const contriDESCP = ref<TipoContribuyente[]>([]) // eslint-disable-line camelcase
const documentoDESCP = ref<TipoDocumento[]>([]) // eslint-disable-line camelcase

const getRolByDB = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/tipo_contribuyente')
    console.log('Datos obtenidos de la API para contribuyente:', response.data)
    contriDESCP.value = response.data.contribuyentes // Almacenar la lista de períodos
  } catch (error) {
    console.error(error) // Manejo de errores
    makeToast('Error', 'Error al conseguir contribuyente', 'error')
  }
}

const getDOCUMENTOByDB = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/tipo_documento')
    console.log('Datos obtenidos de la API para documento:', response.data)
    documentoDESCP.value = response.data.docs // Almacenar la lista de períodos
  } catch (error) {
    console.error(error) // Manejo de errores
    makeToast('Error', 'Error al conseguir documento', 'error')
  }
}

// Llamar a la función al montar el componente
onMounted(() => {
  getRolByDB()
  getDOCUMENTOByDB()
})

// --------------------------FIN DE OBTENER PERIODOS DE LA BD---------------------------------------------|

// ---------------------------CODIGO PARA LIMPAR EL FORMULARIO -------------------------------------------|
const limpiarFormulario = () => {
  Object.assign(cliente.value, {
    numeroIDENTIFICACION: '',
    id_tipo_contribuyente: '',
    telefono: '',
    correo: '',
    id_empresa: '',
    cuenta_extranjera: '',
    cuenta_local: '',
    id_ciudad: '',
    direccion: '',
    razonSOCIAL: '',
    id_tipo_documento: ''
  })
}
// ---------------------------FIN CODIGO PARA LIMPAR EL FORMULARIO --------------------------------------------------

// Función para mostrar toasts (mensaje emergente)
const makeToast = (titulo: string, texto: string, tipo: 'success' | 'error' | 'warning' | 'info' | 'question') => {
  console.log(`Toast: ${titulo} - ${texto} (${tipo})`)
  Swal.fire({
    title: titulo,
    text: texto,
    icon: tipo, // 'success', 'error', 'warning', 'info', 'question'
    // confirmButtonText: 'OK',
    position: 'center', // Posición del Toast
    timer: 3000, // Duración antes de cerrarse automáticamente (en milisegundos)
    showConfirmButton: false // Para mostrar un botón de confirmación
  })
}

</script>

<style scoped>
.bg-color {
  background-color: #4F4F75;
  color: #ffff;
}

.btn-color {
  color: #ffff;
}
</style>
