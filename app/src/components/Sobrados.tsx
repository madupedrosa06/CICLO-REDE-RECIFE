// Silhueta dos sobrados coloridos do Recife Antigo e da Ponte Maurício de Nassau.
export function Sobrados({ className = '' }: { className?: string }) {
  const casas = [
    { x: 0, w: 46, h: 62, c: '#D9A13B' }, { x: 46, w: 40, h: 74, c: '#D9707E' },
    { x: 86, w: 50, h: 58, c: '#4FA3A0' }, { x: 136, w: 38, h: 80, c: '#2C5DA8' },
    { x: 174, w: 48, h: 66, c: '#B5532F' }, { x: 222, w: 42, h: 72, c: '#D9A13B' },
    { x: 264, w: 46, h: 60, c: '#D9707E' }
  ]
  return (
    <svg viewBox="0 0 480 96" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      {casas.map((k, i) => (
        <g key={i}>
          <path d={`M${k.x} 96 V${96 - k.h + 10} Q${k.x + k.w / 2} ${96 - k.h - 6} ${k.x + k.w} ${96 - k.h + 10} V96 Z`} fill={k.c} />
          <rect x={k.x + 3} y={96 - k.h + 8} width={k.w - 6} height="3" fill="#FBF5E9" opacity=".8" />
          {[0, 1].map(r => [0, 1].map(col => (
            <rect key={`${r}${col}`} x={k.x + 8 + col * (k.w - 24)} y={96 - k.h + 18 + r * 22} width="8" height="13" rx="4" fill="#FBF5E9" opacity=".9" />
          )))}
        </g>
      ))}
      {/* Ponte Maurício de Nassau */}
      <path d="M310 96 V78 H480 V96" fill="none" />
      <path d="M310 80 H480" stroke="#FBF5E9" strokeWidth="4" />
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M${318 + i * 42} 96 Q${339 + i * 42} 70 ${360 + i * 42} 96`} fill="none" stroke="#FBF5E9" strokeWidth="4" />
      ))}
      {[0, 1, 2, 3, 4].map(i => <rect key={i} x={314 + i * 42} y="62" width="4" height="18" fill="#FBF5E9" />)}
      <path d="M310 96 H480" stroke="#FBF5E9" strokeWidth="2" opacity=".5" />
    </svg>
  )
}

/** Ícone de estação: fachada de sobrado. */
export function FachadaSvg({ cor = '#1F4E8C', tamanho = 36 }: { cor?: string; tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 40 44" aria-hidden="true">
      <path d="M4 42 V14 Q20 0 36 14 V42 Z" fill={cor} stroke="#FBF5E9" strokeWidth="2.5" />
      <rect x="10" y="17" width="6" height="9" rx="3" fill="#FBF5E9" />
      <rect x="24" y="17" width="6" height="9" rx="3" fill="#FBF5E9" />
      <rect x="16" y="29" width="8" height="13" rx="4" fill="#FBF5E9" />
    </svg>
  )
}
