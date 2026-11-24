// Gera os QR codes das estações para imprimir nas placas.
// Uso: npm run qrcodes -- https://seu-site.vercel.app
// Saída: pasta qrcodes/ com um PNG (só o QR) e um SVG (QR + nome da estação) por estação.
import QRCode from 'qrcode'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const base = (process.argv[2] || 'https://moverecife.vercel.app').replace(/\/$/, '')
const estacoes = JSON.parse(await readFile(new URL('../src/data/estacoes.json', import.meta.url), 'utf8'))
await mkdir('qrcodes', { recursive: true })

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

for (const e of estacoes) {
  const url = `${base}/estacao/${e.id}?origem=qr`
  await QRCode.toFile(`qrcodes/${e.id}.png`, url, { width: 1000, margin: 2, color: { dark: '#1F4E8C', light: '#FFFFFF' } })

  const qrSvg = await QRCode.toString(url, { type: 'svg', margin: 0, color: { dark: '#1F4E8C', light: '#FFFFFF' } })
  const interno = qrSvg.replace(/^.*?<svg[^>]*>/s, '').replace(/<\/svg>\s*$/, '')
  const tamanho = Number((qrSvg.match(/viewBox="0 0 (\d+)/) || [])[1] || 29)
  const placa = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760" viewBox="0 0 600 760">
  <rect width="600" height="760" rx="28" fill="#FBF5E9" stroke="#1F4E8C" stroke-width="10"/>
  <text x="300" y="80" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="48" font-weight="800" fill="#1F4E8C">MOVE RECIFE</text>
  <text x="300" y="118" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="22" fill="#B5532F">Destrave o caminho, mova a cidade.</text>
  <rect x="90" y="145" width="420" height="420" fill="#fff"/>
  <svg x="110" y="165" width="380" height="380" viewBox="0 0 ${tamanho} ${tamanho}">${interno}</svg>
  <text x="300" y="625" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#1E2430">${esc(e.nome)}</text>
  <text x="300" y="670" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" fill="#1E2430">Aponte a câmera e veja o caminho seguro</text>
</svg>`
  await writeFile(`qrcodes/${e.id}.svg`, placa)
  console.log('✓', e.nome, '→', url)
}
console.log(`\n${estacoes.length} QR codes gerados em ./qrcodes`)
