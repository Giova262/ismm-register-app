import { Loading, Notify, SessionStorage, LocalStorage } from 'quasar'
import {
  notificarError,
  notificarExito,
} from 'src/Services/NotificacionesService'
import { isEmpty, isCorrectFormatDB } from 'src/Services/ValidacionesService'
import EventoApiService from 'src/components/ABM/Evento/EventoAPIService'

class Evento {
  constructor() {
    this.id = null
    this.nombre = null
    this.titulo = null
    this.subtitulo = null
    this.descripcion = null
    this.color = null
    this.icono = null
    this.foto = ''
    this.video = ''
    this.sonido = ''
    this.etiqueta_id = null
    this.persona_id = null
    this.ubicacion_id = null
    this.tiempo_id = null
  }

  fakeData() {
    this.nombre = 'nombre Evento'
    this.titulo = 'titulo Evento'
    this.subtitulo = 'subtitulo Evento'
    this.descripcion = 'descripcion Evento'
    this.color = '#FF00FF'
    this.icono = 'icono Evento'
  }

  /** Metodos */
  validacionParaCrear() {
    if (isEmpty(this.nombre) || !isCorrectFormatDB(this.nombre, 200)) {
      notificarError(`El Nombre del evento es un dato requerido`)
      return false
    }
    if (isEmpty(this.titulo) || !isCorrectFormatDB(this.titulo, 200)) {
      notificarError(`El Titulo del evento es un dato requerido`)
      return false
    }
    if (
      isEmpty(this.descripcion) ||
      !isCorrectFormatDB(this.descripcion, 500)
    ) {
      notificarError(`La descripcion del evento es un dato requerido`)
      return false
    }
    return true
  }

  getPayload() {
    return {
      nombre: this.nombre,
      titulo: this.titulo,
      subtitulo: this.subtitulo,
      descripcion: this.descripcion,
      color: this.color,
      icono: this.icono,
      foto: this.foto,
      video: this.video,
      sonido: this.sonido,
      etiqueta_id: this.etiqueta_id,
      persona_id: this.persona_id,
      ubicacion_id: this.ubicacion_id,
      tiempo_id: this.tiempo_id,
    }
  }

  async crear() {
    return await EventoApiService.store(this.getPayload())
  }

  async editar() {
    if (!this.id) return null
    console.log('this.getPayload()');
    console.log(this.getPayload());
    return await EventoApiService.update(this.getPayload(), this.id)
  }

  async eliminar() {
    if (!this.id) return null
    return await EventoApiService.destroy(this.id)
  }

  async vincular(request, idEvento) {
    return await EventoApiService.vincular(request, idEvento)
  }

  async updateVinculoPersona(new_persona_id){
    const request = {
      persona_id: new_persona_id
    }
    return await EventoApiService.updateVinculoPersona(request, this.id)
  }

  cargarDatos(data) {
    this.id = data.id
    this.nombre = data.nombre
    this.titulo = data.titulo
    this.subtitulo = data.subtitulo
    this.descripcion = data.descripcion
    this.color = data.color
    this.icono = data.icono
    this.foto = data.foto
    this.video = data.video
    this.sonido = data.sonido
    this.etiqueta_id = data.etiqueta_id
    this.persona_id = data.persona_id
    this.ubicacion_id = data.ubicacion_id
    this.tiempo_id = data.tiempo_id
  }
}

export default Evento
