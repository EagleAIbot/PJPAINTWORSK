import { useEffect, useState } from 'react'
import { useAppStore } from './store/useAppStore'

// ── Seeded pseudo-random ──────────────────────────────────────────────────────
const sr = (seed) => Math.abs(Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1

// ── Paint drip ────────────────────────────────────────────────────────────────
function Drip({ x, y, color, h = 60, w = 6 }) {
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height={h * 0.65} fill={color} opacity={0.85} />
      <ellipse cx={x} cy={y + h * 0.65} rx={w / 2} ry={w * 0.7} fill={color} opacity={0.85} />
    </g>
  )
}

// ── Spray can character ───────────────────────────────────────────────────────
function SprayCan({ x, y, spraying, color }) {
  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }}>
      {/* body */}
      <rect x={-10} y={-36} width={20} height={42} rx={8} fill="#e0e0e0" stroke="#bbb" strokeWidth={1.2} />
      <rect x={-10} y={-36} width={20} height={12} rx={6} fill="#aaa" />
      {/* label */}
      <rect x={-7} y={-20} width={14} height={18} rx={3} fill={color} opacity={0.9} />
      {/* nozzle */}
      <rect x={-3} y={-42} width={6} height={8} rx={2} fill="#888" />
      {/* cap */}
      <rect x={-6} y={-50} width={12} height={9} rx={4} fill={color} />
      {/* hand holding */}
      <ellipse cx={0} cy={8} rx={10} ry={7} fill="#f5c5a3" />
      {/* spray cloud */}
      {spraying && (
        <g opacity={0.7}>
          <ellipse cx={-22} cy={-40} rx={14} ry={10} fill={color} opacity={0.4} />
          <ellipse cx={-32} cy={-38} rx={10} ry={7} fill={color} opacity={0.3} />
          <ellipse cx={-42} cy={-35} rx={7}  ry={5}  fill={color} opacity={0.2} />
        </g>
      )}
    </g>
  )
}

// ── Brick wall ────────────────────────────────────────────────────────────────
function BrickWall({ w, h }) {
  const bH = 28, bW = 68, m = 3
  const rows = Math.ceil(h / (bH + m)) + 1
  const cols = Math.ceil(w / (bW + m)) + 2
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill="#12100e" />
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const offset = (row % 2) * ((bW + m) / 2)
          const bx = col * (bW + m) - offset
          const by = row * (bH + m)
          const s  = row * 100 + col
          return (
            <rect key={`${row}-${col}`} x={bx} y={by} width={bW} height={bH} rx={1}
              fill={`rgb(${70+Math.floor(sr(s)*30)},${35+Math.floor(sr(s+1)*18)},${26+Math.floor(sr(s+2)*14)})`}
            />
          )
        })
      )}
    </g>
  )
}

// ── Graffiti letters ──────────────────────────────────────────────────────────
function GraffitiLetters({ progress }) {
  const p1 = Math.min(1, progress * 3)
  const p2 = Math.min(1, Math.max(0, (progress - 0.33) * 3))
  const p3 = Math.min(1, Math.max(0, (progress - 0.66) * 3))
  return (
    <g fontFamily="Impact, 'Arial Black', sans-serif" fontWeight={900}>
      {/* P */}
      <text x={530} y={380} fontSize={240} fill="none"
        stroke="#FF2D55" strokeWidth={12} opacity={p1}
        style={{ paintOrder: 'stroke fill' }}>P</text>
      <text x={530} y={380} fontSize={240} fill="#FF2D55" opacity={p1 * 0.9}>P</text>
      {/* J */}
      <text x={720} y={380} fontSize={240} fill="none"
        stroke="#FFD600" strokeWidth={12} opacity={p2}
        style={{ paintOrder: 'stroke fill' }}>J</text>
      <text x={720} y={380} fontSize={240} fill="#FFD600" opacity={p2 * 0.9}>J</text>
      {/* PAINTWORKS */}
      <text x={370} y={450} fontSize={80} fill="none"
        stroke="#00E5FF" strokeWidth={6} opacity={p3}
        style={{ paintOrder: 'stroke fill' }}>PAINTWORKS</text>
      <text x={370} y={450} fontSize={80} fill="#00E5FF" opacity={p3 * 0.85}>PAINTWORKS</text>
    </g>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
const VW = 1380, VH = 760

export default function HeroScene() {
  const setSceneLoaded = useAppStore(s => s.setSceneLoaded)
  const [tick, setTick]         = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 900)
    const t  = setTimeout(() => setSceneLoaded(), 400)
    const id = setInterval(() => setTick(n => n + 1), 120)
    return () => { clearTimeout(t); clearInterval(id) }
  }, [setSceneLoaded])

  // Progress cycles 0 → 1 over CYCLE ticks, then resets
  const CYCLE          = 50
  const phase          = tick % (CYCLE * 2)
  const letterProgress = Math.min(1, phase / CYCLE)
  const isActive       = phase < CYCLE

  // Can sweeps left-to-right across the centered letter zone
  const canX = 490 + letterProgress * 320
  const canY = 280

  const sprayColors  = ['#FF2D55', '#FFD600', '#00E5FF']
  const currentColor = letterProgress < 0.33 ? sprayColors[0] : letterProgress < 0.66 ? sprayColors[1] : sprayColors[2]

  // ── Mobile ────────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0d0d0d' }}>
        <svg viewBox="0 0 420 780" width="100%" height="100%"
          preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="wallClipMob"><rect x={0} y={0} width={420} height={780} /></clipPath>
            <linearGradient id="mobFadePJ" x1="0" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#0d0d0d" stopOpacity="0" />
              <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <g clipPath="url(#wallClipMob)"><BrickWall w={420} h={780} /></g>
          <Drip x={80}  y={0} color="#FF2D55" h={90}  w={8} />
          <Drip x={200} y={0} color="#FFD600" h={70}  w={6} />
          <Drip x={340} y={0} color="#00E5FF" h={110} w={7} />
          <g fontFamily="Impact, 'Arial Black', sans-serif" fontWeight={900}>
            <text x={30} y={260} fontSize={160} fill="none" stroke="#FF2D55" strokeWidth={8} opacity={letterProgress} style={{ paintOrder:'stroke fill' }}>PJ</text>
            <text x={30} y={260} fontSize={160} fill="#FF2D55" opacity={letterProgress * 0.9}>PJ</text>
            <text x={28} y={340} fontSize={52}  fill="none" stroke="#00E5FF" strokeWidth={4} opacity={Math.min(1, letterProgress * 2)} style={{ paintOrder:'stroke fill' }}>PAINTWORKS</text>
            <text x={28} y={340} fontSize={52}  fill="#00E5FF" opacity={Math.min(1, letterProgress * 2) * 0.85}>PAINTWORKS</text>
          </g>
          <SprayCan x={canX * 0.3 + 50} y={canY * 0.5} spraying={isActive} color={currentColor} />
          <rect x={0} y={390} width={420} height={390} fill="url(#mobFadePJ)" />
        </svg>
      </div>
    )
  }

  // ── Desktop ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0d0d0d' }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <defs>
          <clipPath id="wallClip"><rect x={0} y={0} width={VW} height={VH} /></clipPath>
          <linearGradient id="heroFadePJ" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0d0d0d" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="heroFadePJSides" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#0d0d0d" stopOpacity="0.7" />
            <stop offset="20%"  stopColor="#0d0d0d" stopOpacity="0" />
            <stop offset="80%"  stopColor="#0d0d0d" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Brick wall */}
        <BrickWall w={VW} h={VH} />

        {/* Faded background graffiti tags */}
        <text x={20}   y={120} fontSize={42} fill="#FF2D55" opacity={0.07}
          fontFamily="Impact,sans-serif" fontWeight={900} transform="rotate(-8,20,120)">STREETS</text>
        <text x={900}  y={200} fontSize={55} fill="#FFD600" opacity={0.06}
          fontFamily="Impact,sans-serif" fontWeight={900} transform="rotate(5,900,200)">WILD STYLE</text>
        <text x={1100} y={600} fontSize={38} fill="#00E5FF" opacity={0.07}
          fontFamily="Impact,sans-serif" fontWeight={900} transform="rotate(-12,1100,600)">KINGS</text>
        <text x={50}   y={680} fontSize={32} fill="#FF2D55" opacity={0.06}
          fontFamily="Impact,sans-serif" fontWeight={900} transform="rotate(4,50,680)">ALL CITY</text>

        {/* Paint drips — clustered over centered letters */}
        <Drip x={380}  y={0} color="#FF2D55" h={120} w={9} />
        <Drip x={470}  y={0} color="#FF2D55" h={80}  w={6} />
        <Drip x={560}  y={0} color="#FFD600" h={150} w={10} />
        <Drip x={640}  y={0} color="#FFD600" h={90}  w={7} />
        <Drip x={690}  y={0} color="#00E5FF" h={110} w={8} />
        <Drip x={760}  y={0} color="#FF2D55" h={70}  w={6} />
        <Drip x={830}  y={0} color="#00E5FF" h={130} w={9} />
        <Drip x={920}  y={0} color="#FFD600" h={85}  w={7} />
        <Drip x={1000} y={0} color="#FF2D55" h={100} w={8} />
        <Drip x={1080} y={0} color="#00E5FF" h={95}  w={6} />

        {/* Letters */}
        <g filter="url(#glow)">
          <GraffitiLetters progress={letterProgress} />
        </g>

        {/* Spray can */}
        <g filter="url(#glow)">
          <SprayCan x={canX} y={canY} spraying={isActive} color={currentColor} />
        </g>

        {/* Side fade */}
        <rect x={0} y={0}         width={VW} height={VH}        fill="url(#heroFadePJSides)" />
        {/* Bottom fade */}
        <rect x={0} y={VH * 0.45} width={VW} height={VH * 0.55} fill="url(#heroFadePJ)" />

        {/* Corner marks */}
        <g opacity={0.15}>
          <rect x={30}     y={30} width={60} height={4}  fill="#fff" />
          <rect x={30}     y={30} width={4}  height={60} fill="#fff" />
          <rect x={VW-90}  y={30} width={60} height={4}  fill="#fff" />
          <rect x={VW-34}  y={30} width={4}  height={60} fill="#fff" />
        </g>
      </svg>
    </div>
  )
}
