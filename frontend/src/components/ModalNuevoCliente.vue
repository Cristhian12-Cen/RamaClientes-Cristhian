<template>
  <!-- Modal de CARGAR UN NUEVO CLIENTE -->
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
                <label for="tipo_documento" class="form-label">Tipo documento</label>
                <select id="tipo_documento" name="tipo_documento" v-model="cliente.id_tipo_documento" :class="['form-control', { 'is-invalid': errores.id_tipo_documento }]" required>
                  <option value="0" disabled>Seleccionar</option>
                  <option v-for="docs in documentoDESCP" :key="docs.id_tipo_documento" :value="docs.id_tipo_documento">
                    {{ docs.descripcion || 'Sin descripción' }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ errores.id_tipo_documento }}
                </div>
              </div>

              <!-- Tipo Contribuyente -->
              <div class="col-md-6 mb-3 ms-auto text-start">
                <label for="tipo_contribuyente" class="form-label">Tipo Contribuyente</label>
                <select id="tipo_contribuyente" name="tipo_contribuyente" v-model="cliente.id_tipo_contribuyente" :class="['form-control', { 'is-invalid': errores.id_tipo_contribuyente }]" required>
                  <option value="0" disabled>Seleccionar</option>
                  <option v-for="contribuyentes in contriDESCP" :key="contribuyentes.id_tipo_contribuyente" :value="contribuyentes.id_tipo_contribuyente">
                    {{ contribuyentes.descripcion || 'Sin descripción' }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ errores.id_tipo_contribuyente }}
                </div>
              </div>

              <!-- NUMERO IDENTIFICACION -->
              <div class="col-md-6 mb-3 text-start">
                <label for="numero_identificacion" class="form-label">N° IDENTIFICACION</label>
                <input type="text" id="numero_identificacion" v-model="cliente.numero_identificacion" :class="['form-control', { 'is-invalid': errores.numero_identificacion }]"
                  placeholder="Ingrese el numero de identificacion" required>
                <div class="invalid-feedback">
                  {{ errores.numero_identificacion }}
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
                  placeholder="ejemplo@correo.com" required>
                <div class="invalid-feedback">
                  {{ errores.correo }}
                </div>
              </div>

              <!-- RAZON SOCIAL -->
              <div class="col-md-6 mb-3 text-start">
                <label for="razon_social" class="form-label">RAZON SOCIAL</label>
                <input type="text" id="razon_social" v-model="cliente.razon_social" :class="['form-control', { 'is-invalid': errores.razon_social }]"
                  placeholder="Ingrese la razón social" required>
                <div class="invalid-feedback">
                  {{ errores.razon_social }}
                </div>
              </div>

              <!-- DIRECCION -->
              <div class="col-md-6 mb-3 text-start">
                <label for="direccion" class="form-label">DIRECCION</label>
                <input type="text" id="direccion" v-model="cliente.direccion" :class="['form-control', { 'is-invalid': errores.direccion }]"
                  placeholder="Ingrese la dirección" required>
                <div class="invalid-feedback">
                  {{ errores.direccion }}
                </div>
              </div>

              <!-- CIUDAD -->
              <div class="col-md-6 mb-3 text-start">
                <label for="ciudad" class="form-label">CIUDAD</label>
                <select id="ciudad" name="ciudad" v-model="cliente.id_ciudad" :class="['form-control', { 'is-invalid': errores.id_ciudad }]" required>
                  <option value="0" disabled>Seleccionar</option>
                  <option v-for="ciudad in ciudades" :key="ciudad.id_ciudad" :value="ciudad.id_ciudad">
                    {{ ciudad.nombre || 'Sin nombre' }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ errores.id_ciudad }}
                </div>
              </div>

              <!-- EMPRESA -->
              <div class="col-md-6 mb-3 text-start">
                <label for="empresa" class="form-label">EMPRESA</label>
                <select id="empresa" name="empresa" v-model="cliente.id_empresa" :class="['form-control', { 'is-invalid': errores.id_empresa }]" required>
                  <option value="0" disabled>Seleccionar</option>
                  <option v-for="empresa in empresas" :key="empresa.id_empresa" :value="empresa.id_empresa">
                    {{ empresa.nombre || 'Sin nombre' }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ errores.id_empresa }}
                </div>
              </div>

              <!-- CUENTA LOCAL -->
              <div class="col-md-6 mb-3 text-start">
                <label for="cuenta_local" class="form-label">CUENTA LOCAL</label>
                <input type="text" id="cuenta_local" v-model="cliente.cuenta_local" :class="['form-control', { 'is-invalid': errores.cuenta_local }]"
                  placeholder="Ingrese la cuenta local" required>
                <div class="invalid-feedback">
                  {{ errores.cuenta_local }}
                </div>
              </div>

              <!-- CUENTA EXTRANJERA -->
              <div class="col-md-6 mb-3 text-start">
                <label for="cuenta_extranjera" class="form-label">CUENTA EXTRANJERA</label>
                <input type="text" id="cuenta_extranjera" v-model="cliente.cuenta_extranjera" :class="['form-control', { 'is-invalid': errores.cuenta_extranjera }]"
                  placeholder="Ingrese la cuenta extranjera" required>
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

const cliente = ref({ ...props.cliente }) // Crear una referencia reactiva a los datos del cliente

const cerrarModal = () => {
  Swal.fire({
    title: '¿Está seguro de que desea cancelar la carga?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      makeToast('Éxito', 'La acción ha sido cancelada correctamente', 'success')
      emit('cerrar')
    }
  })
}

// VALIDACIONES
const enviado = ref(false)

const errores = ref({
  numero_identificacion: '',
  id_tipo_contribuyente: '',
  telefono: '',
  correo: '',
  id_empresa: '',
  cuenta_extranjera: '',
  cuenta_local: '',
  id_ciudad: '',
  direccion: '',
  razon_social: '',
  id_tipo_documento: ''
})

const validarnumeroIDENTIFICACION = () => {
  if (!cliente.value.numero_identificacion || typeof cliente.value.numero_identificacion !== 'string') {
    return 'Por favor, ingrese el número de identificación.'
  }
  const ced = cliente.value.numero_identificacion.trim()
  if (!/^\d{6,15}$/.test(ced)) return 'La identificación debe contener entre 6 y 15 dígitos numéricos.'
  cliente.value.numero_identificacion = ced
  return ''
}

const soloNumerostelefono = (campo: string, maxLong: number) => {
  cliente.value[campo] = cliente.value[campo]
    .replace(/\D/g, '') // elimina todo lo que no es dígito
    .slice(0, maxLong) // recorta si se pasa del máximo
}

const validarTipoDocumento = () => {
  if (!cliente.value.id_tipo_documento || cliente.value.id_tipo_documento === 0) {
    return 'Por favor, seleccione un tipo de documento.'
  }
  return ''
}

const validarcontribuyente = () => {
  if (!cliente.value.id_tipo_contribuyente || cliente.value.id_tipo_contribuyente === 0) {
    return 'Por favor, seleccione un tipo de contribuyente.'
  }
  return ''
}

const validarCiudad = () => {
  if (!cliente.value.id_ciudad || cliente.value.id_ciudad === 0) {
    return 'Por favor, seleccione una ciudad.'
  }
  return ''
}

const validarEmpresa = () => {
  if (!cliente.value.id_empresa || cliente.value.id_empresa === 0) {
    return 'Por favor, seleccione una empresa.'
  }
  return ''
}

const razonSOCIAL = () => {
  const razon_social = cliente.value.razon_social.trim().replace(/\s+/g, ' ')
  if (!razon_social) return 'Por favor, ingrese la razón social.'
  if (razon_social.length < 3) return 'Debe tener al menos 3 caracteres.'
  cliente.value.razon_social = razon_social
  return ''
}

const validarDireccion = () => {
  const direccion = cliente.value.direccion.trim().replace(/\s+/g, ' ')
  if (!direccion) return 'Por favor, ingrese la dirección.'
  if (direccion.length < 5) return 'Debe tener al menos 5 caracteres.'
  cliente.value.direccion = direccion
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

const validarCuentaLocal = () => {
  const cuenta = cliente.value.cuenta_local.trim()
  if (!cuenta) return 'Por favor, ingrese la cuenta local.'
  cliente.value.cuenta_local = cuenta
  return ''
}

const validarCuentaExtranjera = () => {
  const cuenta = cliente.value.cuenta_extranjera.trim()
  if (!cuenta) return 'Por favor, ingrese la cuenta extranjera.'
  cliente.value.cuenta_extranjera = cuenta
  return ''
}

// VERIFICAR DUPLICADOS
interface clienteDatos {
  id_cliente: number
  numero_identificacion: string
  correo: string
}

const verificarclienteDuplicado = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/cliente')
    const clientesRegistrados = data.clientes

    const numero_identificacion = cliente.value.numero_identificacion.trim()
    const correo = cliente.value.correo.trim().toLowerCase()

    const numero_identificacionExistente = clientesRegistrados.some((u: clienteDatos) => u.numero_identificacion === numero_identificacion)
    const correoExistente = clientesRegistrados.some((u: clienteDatos) => u.correo.toLowerCase() === correo)

    return { numero_identificacionExistente, correoExistente }
  } catch (error) {
    console.error('Error al consultar clientes:', error)
    return { numero_identificacionExistente: false, correoExistente: false }
  }
}

// CONFIGURACION PARA EJECUTAR GUARDAR O MODIFICAR
const guardarOmodificar = async () => {
  enviado.value = true
  errores.value.numero_identificacion = validarnumeroIDENTIFICACION()
  errores.value.id_tipo_documento = validarTipoDocumento()
  errores.value.id_tipo_contribuyente = validarcontribuyente()
  errores.value.id_ciudad = validarCiudad()
  errores.value.id_empresa = validarEmpresa()
  errores.value.razon_social = razonSOCIAL()
  errores.value.direccion = validarDireccion()
  errores.value.telefono = validarTelefono()
  errores.value.correo = validarCorreo()
  errores.value.cuenta_local = validarCuentaLocal()
  errores.value.cuenta_extranjera = validarCuentaExtranjera()

  const tieneErrores = Object.values(errores.value).some(e => e !== '')
  if (tieneErrores) {
    makeToast('Error', 'Por favor corrija los campos marcados.', 'error')
    return
  }

  if (cliente.value.id_cliente) {
    modificar()
  } else {
    const { numero_identificacionExistente, correoExistente } = await verificarclienteDuplicado()
    if (numero_identificacionExistente) {
      errores.value.numero_identificacion = 'Ya existe un cliente con esta identificación.'
      makeToast('Error', 'Identificación ya registrada.', 'error')
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

// router para elegir donde volver a la hora de guardar
const router = useRouter()

// FUNCION PARA GUARDAR EL CLIENTE EN LA BD
const guardar = async () => {
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.post('http://localhost:3000/api/cliente', {
      razon_social: cliente.value.razon_social,
      numero_identificacion: cliente.value.numero_identificacion,
      direccion: cliente.value.direccion,
      telefono: cliente.value.telefono,
      correo: cliente.value.correo,
      cuenta_local: cliente.value.cuenta_local,
      cuenta_extranjera: cliente.value.cuenta_extranjera,
      id_tipo_documento: cliente.value.id_tipo_documento,
      id_tipo_contribuyente: cliente.value.id_tipo_contribuyente,
      id_ciudad: cliente.value.id_ciudad,
      id_empresa: cliente.value.id_empresa,
      estado: true
    }, config)

    console.log(response.data)
    router.push('/client')
    limpiarFormulario()
    const formElement = document.getElementById('formcliente') as HTMLFormElement | null
    if (formElement) {
      formElement.classList.remove('was-validated')
    }
    console.log('Datos enviados al backend para cargar cliente:', cliente.value)
    emit('cerrar')
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

// FUNCION PARA MODIFICAR EL CLIENTE EN LA BD
const modificar = async () => {
  try {
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.put(`http://localhost:3000/api/cliente/${cliente.value.id_cliente}`, {
      razon_social: cliente.value.razon_social,
      numero_identificacion: cliente.value.numero_identificacion,
      direccion: cliente.value.direccion,
      telefono: cliente.value.telefono,
      correo: cliente.value.correo,
      cuenta_local: cliente.value.cuenta_local,
      cuenta_extranjera: cliente.value.cuenta_extranjera,
      id_tipo_documento: cliente.value.id_tipo_documento,
      id_tipo_contribuyente: cliente.value.id_tipo_contribuyente,
      id_ciudad: cliente.value.id_ciudad,
      id_empresa: cliente.value.id_empresa
    }, config)

    console.log(response.data)
    router.push('/client')
    limpiarFormulario()
    const formElement = document.getElementById('formcliente') as HTMLFormElement | null
    if (formElement) {
      formElement.classList.remove('was-validated')
    }
    console.log('Datos enviados al backend para modificar el cliente:', cliente.value)

    emit('actualizartabla')
    emit('cerrar')
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

// OBTENER DATOS DE LA BD PARA LOS SELECTS

// Definir las estructuras
interface TipoContribuyente {
  id_tipo_contribuyente: number
  descripcion: string
}

interface TipoDocumento {
  id_tipo_documento: number
  descripcion: string
}

interface Ciudad {
  id_ciudad: number
  nombre: string
}

interface Empresa {
  id_empresa: number
  nombre: string
}

// Listas obtenidas de la BD
const contriDESCP = ref<TipoContribuyente[]>([])
const documentoDESCP = ref<TipoDocumento[]>([])
const ciudades = ref<Ciudad[]>([])
const empresas = ref<Empresa[]>([])

const getTiposContribuyentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tipos_contribuyentes')
    console.log('Datos obtenidos de la API para contribuyente:', response.data)
    contriDESCP.value = response.data.tipos_contribuyentes
  } catch (error) {
    console.error(error)
    makeToast('Error', 'Error al conseguir tipos de contribuyentes', 'error')
  }
}

const getTiposDocumentos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tipos_documentos')
    console.log('Datos obtenidos de la API para documentos:', response.data)
    documentoDESCP.value = response.data.tipos_documentos
  } catch (error) {
    console.error(error)
    makeToast('Error', 'Error al conseguir tipos de documentos', 'error')
  }
}

const getCiudades = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/ciudades')
    console.log('Datos obtenidos de la API para ciudades:', response.data)
    ciudades.value = response.data.ciudades
  } catch (error) {
    console.error(error)
    makeToast('Error', 'Error al conseguir ciudades', 'error')
  }
}

const getEmpresas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/empresas')
    console.log('Datos obtenidos de la API para empresas:', response.data)
    empresas.value = response.data.empresas
  } catch (error) {
    console.error(error)
    makeToast('Error', 'Error al conseguir empresas', 'error')
  }
}

// Llamar a las funciones al montar el componente
onMounted(() => {
  getTiposContribuyentes()
  getTiposDocumentos()
  getCiudades()
  getEmpresas()
})

// CODIGO PARA LIMPIAR EL FORMULARIO
const limpiarFormulario = () => {
  Object.assign(cliente.value, {
    numero_identificacion: '',
    id_tipo_contribuyente: 0,
    telefono: '',
    correo: '',
    id_empresa: 0,
    cuenta_extranjera: '',
    cuenta_local: '',
    id_ciudad: 0,
    direccion: '',
    razon_social: '',
    id_tipo_documento: 0
  })
}

// Función para mostrar toasts (mensaje emergente)
const makeToast = (titulo: string, texto: string, tipo: 'success' | 'error' | 'warning' | 'info' | 'question') => {
  console.log(`Toast: ${titulo} - ${texto} (${tipo})`)
  Swal.fire({
    title: titulo,
    text: texto,
    icon: tipo,
    position: 'center',
    timer: 3000,
    showConfirmButton: false
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