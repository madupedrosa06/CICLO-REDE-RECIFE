import type { LatLng } from '../types'

export function pegarLocalizacao(): Promise<LatLng> {
  return new Promise((ok, erro) => {
    if (!navigator.geolocation) return erro(new Error('Seu navegador não informa a localização.'))
    navigator.geolocation.getCurrentPosition(
      p => ok([p.coords.latitude, p.coords.longitude]),
      () => erro(new Error('Não foi possível pegar sua localização. Escolha uma área.')),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  })
}
