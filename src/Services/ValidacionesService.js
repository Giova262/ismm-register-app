import { Loading, Notify, SessionStorage } from 'quasar'

export function isEmpty(value) {
  if (!value || value === '' || value == undefined) {
    console.error('La variable es nula o indefinida')
    return true
  }
  return false
}

export function isCorrectFormatDB(value, longitud) {
  if (value.length > longitud) {
    console.error('La variable excede la cantidad de caracteres')
    return false
  }
  return true
}
