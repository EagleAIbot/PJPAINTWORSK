import { useEffect, useState } from 'react'
import { useAppStore } from './store/useAppStore'

const BASE = import.meta.env.BASE_URL
const i    = (name) => `${BASE}images/${name}`

const SLIDES = [
  i('artwork-batman.png'),
  i('skateboard-portrait-red.png'),
  i('giveway-sign.png'),
  i('mancave-saw.png'),
  i('coke-bettyboop-mirror.png'),
  i('gas-stop-sign.png'),
]

export default function HeroScene() {
  const setSceneLoaded = useAppStore(s => s.setSceneLoaded)
  const [current, setCurrent] = useState(0)
  const [prev,    setPrev]    = useState(null)

  useEffect(() => {
    // Trigger text animations after a short settle
    const t = setTimeout(() => setSceneLoaded(), 300)

    // Cycle slides
    const id = setInterval(() => {
      setCurrent(c => {
        setPrev(c)
        return (c + 1) % SLIDES.length
      })
    }, 5500)

    return () => { clearTimeout(t); clearInterval(id) }
  }, [setSceneLoaded])

  return (
    <div className="hero-photo-wrap">
      {/* Outgoing slide — fades away */}
      {prev !== null && (
        <div
          key={`prev-${prev}`}
          className="hero-slide hero-slide--out"
          style={{ backgroundImage: `url(${SLIDES[prev]})` }}
        />
      )}
      {/* Incoming slide — fades in + gentle zoom */}
      <div
        key={`curr-${current}`}
        className="hero-slide hero-slide--in"
        style={{ backgroundImage: `url(${SLIDES[current]})` }}
      />
      {/* Gradient overlay — keeps text legible */}
      <div className="hero-photo-overlay" />
    </div>
  )
}
