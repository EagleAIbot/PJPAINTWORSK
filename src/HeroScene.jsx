import { useEffect, useState } from 'react'
import { useAppStore } from './store/useAppStore'

// ── Paint drip ────────────────────────────────────────────────────────────────
function Drip({ x, y, color, h = 60, w = 6 }) {
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height={h * 0.65} fill={color} opacity={0.75} />
      <ellipse cx={x} cy={y + h * 0.65} rx={w / 2} ry={w * 0.7} fill={color} opacity={0.75} />
    </g>
  )
}

// ── Spray can ─────────────────────────────────────────────────────────────────
function SprayCan({ x, y, spraying, color }) {
  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }}>
      <rect x={-10} y={-36} width={20} height={42} rx={8} fill="#c8c4bc" stroke="#a0998e" strokeWidth={1} />
      <rect x={-10} y={-36} width={20} height={12} rx={6} fill="#8a8278" />
      <rect x={-7} y={-20} width={14} height={18} rx={3} fill={color} opacity={0.9} />
      <rect x={-3} y={-42} width={6} height={8} rx={2} fill="#6e6860" />
      <rect x={-6} y={-50} width={12} height={9} rx={4} fill={color} />
      <ellipse cx={0} cy={8} rx={10} ry={7} fill="#d4a882" />
      {spraying && (
        <g opacity={0.65}>
          <ellipse cx={-22} cy={-40} rx={14} ry={10} fill={color} opacity={0.35} />
          <ellipse cx={-32} cy={-38} rx={10} ry={7}  fill={color} opacity={0.22} />
          <ellipse cx={-42} cy={-35} rx={7}  ry={5}  fill={color} opacity={0.14} />
        </g>
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
        stroke="#C9A96E" strokeWidth={10} opacity={p1}
        style={{ paintOrder: 'stroke fill' }}>P</text>
      <text x={530} y={380} fontSize={240} fill="#C9A96E" opacity={p1 * 0.9}>P</text>
      {/* J */}
      <text x={720} y={380} fontSize={240} fill="none"
        stroke="#E8D5A8" strokeWidth={10} opacity={p2}
        style={{ paintOrder: 'stroke fill' }}>J</text>
      <text x={720} y={380} fontSize={240} fill="#E8D5A8" opacity={p2 * 0.9}>J</text>
      {/* PAINTWORKS */}
      <text x={370} y={450} fontSize={80} fill="none"
        stroke="#F2EDE6" strokeWidth={5} opacity={p3}
        style={{ paintOrder: 'stroke fill' }}>PAINTWORKS</text>
      <text x={370} y={450} fontSize={80} fill="#F2EDE6" opacity={p3 * 0.8}>PAINTWORKS</text>
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

  const CYCLE          = 50
  const phase          = tick % (CYCLE * 2)
  const letterProgress = Math.min(1, phase / CYCLE)
  const isActive       = phase < CYCLE

  const canX = 490 + letterProgress * 320
  const canY = 280

  const sprayColors  = ['#C9A96E', '#E8D5A8', '#F2EDE6']
  const currentColor = letterProgress < 0.33 ? sprayColors[0] : letterProgress < 0.66 ? sprayColors[1] : sprayColors[2]

  // ── Mobile ─────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0d0c0b' }}>
        <svg viewBox="0 0 420 780" width="100%" height="100%"
          preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="grainMob">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
              <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended"/>
              <feComposite in="blended" in2="SourceGraphic" operator="in"/>
            </filter>
            <linearGradient id="mobFadePJ" x1="0" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#0d0c0b" stopOpacity="0" />
              <stop offset="100%" stopColor="#0d0c0b" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          {/* Clean dark canvas */}
          <rect x={0} y={0} width={420} height={780} fill="#0d0c0b" />
          <rect x={0} y={0} width={420} height={780} fill="#131210" filter="url(#grainMob)" opacity={0.06} />
          <Drip x={80}  y={0} color="#C9A96E" h={90}  w={7} />
          <Drip x={200} y={0} color="#E8D5A8" h={70}  w={5} />
          <Drip x={340} y={0} color="#C9A96E" h={110} w={6} />
          <g fontFamily="Impact, 'Arial Black', sans-serif" fontWeight={900}>
            <text x={30} y={260} fontSize={160} fill="none" stroke="#C9A96E" strokeWidth={7} opacity={letterProgress} style={{ paintOrder:'stroke fill' }}>PJ</text>
            <text x={30} y={260} fontSize={160} fill="#C9A96E" opacity={letterProgress * 0.9}>PJ</text>
            <text x={28} y={340} fontSize={52}  fill="none" stroke="#F2EDE6" strokeWidth={3} opacity={Math.min(1, letterProgress * 2)} style={{ paintOrder:'stroke fill' }}>PAINTWORKS</text>
            <text x={28} y={340} fontSize={52}  fill="#F2EDE6" opacity={Math.min(1, letterProgress * 2) * 0.8}>PAINTWORKS</text>
          </g>
          <SprayCan x={canX * 0.3 + 50} y={canY * 0.5} spraying={isActive} color={currentColor} />
          <rect x={0} y={390} width={420} height={390} fill="url(#mobFadePJ)" />
        </svg>
      </div>
    )
  }

  // ── Desktop ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0d0c0b' }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended"/>
            <feComposite in="blended" in2="SourceGraphic" operator="in"/>
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="heroFadePJ" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0d0c0b" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d0c0b" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="heroFadePJSides" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#0d0c0b" stopOpacity="0.75" />
            <stop offset="18%"  stopColor="#0d0c0b" stopOpacity="0" />
            <stop offset="82%"  stopColor="#0d0c0b" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d0c0b" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Clean dark canvas with subtle grain */}
        <rect x={0} y={0} width={VW} height={VH} fill="#0d0c0b" />
        <rect x={0} y={0} width={VW} height={VH} fill="#181613" filter="url(#grain)" opacity={0.07} />

        {/* Subtle warm vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="100%" stopColor="#0a0908" stopOpacity="0.6" />
        </radialGradient>
        <rect x={0} y={0} width={VW} height={VH} fill="url(#vignette)" />

        {/* Paint drips — gold palette */}
        <Drip x={380}  y={0} color="#C9A96E" h={120} w={8} />
        <Drip x={470}  y={0} color="#a88a50" h={80}  w={5} />
        <Drip x={560}  y={0} color="#E8D5A8" h={150} w={9} />
        <Drip x={640}  y={0} color="#C9A96E" h={90}  w={6} />
        <Drip x={690}  y={0} color="#F2EDE6" h={110} w={7} />
        <Drip x={760}  y={0} color="#C9A96E" h={70}  w={5} />
        <Drip x={830}  y={0} color="#E8D5A8" h={130} w={8} />
        <Drip x={920}  y={0} color="#a88a50" h={85}  w={6} />
        <Drip x={1000} y={0} color="#C9A96E" h={100} w={7} />
        <Drip x={1080} y={0} color="#E8D5A8" h={95}  w={5} />

        {/* Letters */}
        <g filter="url(#glow)">
          <GraffitiLetters progress={letterProgress} />
        </g>

        {/* Spray can */}
        <g filter="url(#glow)">
          <SprayCan x={canX} y={canY} spraying={isActive} color={currentColor} />
        </g>

        {/* Side + bottom fade */}
        <rect x={0} y={0}         width={VW} height={VH}        fill="url(#heroFadePJSides)" />
        <rect x={0} y={VH * 0.45} width={VW} height={VH * 0.55} fill="url(#heroFadePJ)" />

        {/* Corner marks — subtle */}
        <g opacity={0.12}>
          <rect x={30}     y={30} width={50} height={3}  fill="#C9A96E" />
          <rect x={30}     y={30} width={3}  height={50} fill="#C9A96E" />
          <rect x={VW-80}  y={30} width={50} height={3}  fill="#C9A96E" />
          <rect x={VW-33}  y={30} width={3}  height={50} fill="#C9A96E" />
        </g>
      </svg>
    </div>
  )
}
