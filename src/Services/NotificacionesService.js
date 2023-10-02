import { Loading, Notify, SessionStorage } from 'quasar'

export function notificarError(mensaje, caption = 'Ocurrió un error') {
  Notify.create({
    message: mensaje,
    color: 'negative',
    multiLine: true,
    progress: true,
    timeout: 8000,
    caption: caption,
  })
}

export function notificarNoFeature() {
  Notify.create({
    message: 'No funciona en este momento :(',
    color: 'dark-page',
    multiLine: true,
    progress: true,
    timeout: 8000,
    caption: 'Lo siento',
  })
}

export function notificarExito(mensaje, caption = 'Success') {
  Notify.create({
    message: mensaje,
    color: 'green-5',
    multiLine: true,
    progress: true,
    timeout: 2000,
    caption: caption,
  })
}

export function notificarAlerta(mensaje, caption = 'Alerta') {
  Notify.create({
    message: mensaje,
    color: 'yellow-8',
    multiLine: true,
    progress: true,
    timeout: 8000,
    caption: caption,
  })
}

export function notificarAPIError(error) {

  if (!error.response) {
    notificarError(error.message);
    return;
  }

  switch (error.response.status) {
    case 400:
      for (let i = 0; i < error.response.data.errores.length; i++) {
        const element = error.response.data.errores[i];
        switch (element.type) {
          case 'warning':
            notificarAlerta( element.message)
            break;

          default:
            notificarError(element.message)
            break;
        }
        // if (element.type == '')

      }

      break
    case 404:
      notificarError(
        'Request failed with status code 404',
        `Not Found -> /${error.response.config.url}`,
      )
      break
    case 413:
      notificarError(
        'La imagen es muy grande, por favor reduzca el tamaño de la misma',
        `Entity Too Large`,
      )
      break
    case 422:
      console.log(' es 422');
      console.log(error);
      console.log(error.response);
      if (error.response.data.message) {
        notificarError(error.response.data.message);
      }
      Object.entries(error.response.data.errors).forEach(([key, value]) => {
        value.forEach(err => {
          notificarError(err, key)
        });
      });
      break

    default:
      console.error(error.response);
      notificarError(error.response.statusText, error.response.data.message)
      break
  }
}
