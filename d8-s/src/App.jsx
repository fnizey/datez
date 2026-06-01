import { useState, useEffect, useRef, useCallback } from 'react'

/* ─── constants ─── */
const CONFETTI_COLORS = ['#ff4d6d','#ffb700','#ff8fa3','#c9184a','#fff0f3','#a855f7','#fb923c','#34d399','#60a5fa','#f472b6']
const ORBIT_EMOJIS = ['💖','🌹','✨','💫','🌸','💕','🦋','🎀']
const NO_MSGS = ['Nei? 😢','Er du sikker? 🥺','Tenk deg om...','Siste sjanse! 💔','Virkelig?? 😭','PLEEEASE 🙏','Du kan ikke 🚫','Aldri 😈']
const HINTS = [
  'Hint: det riktige svaret er til venstre 👆',
  'Nei-knappen fungerer ikke helt som forventet 🤭',
  'Den er litt sky, den knappen 🏃',
  'Noen knapper nekter å bli trykket 😇',
  'Ja-knappen savner deg 💔',
  'Gi opp og trykk ja 😌',
]

/* ─── Particle ─── */
function Particle({ x, y, color, vx, vy, life }) {
  return (
    <div style={{
      position: 'fixed', left: x, top: y, width: 8, height: 8,
      borderRadius: '50%', background: color, pointerEvents: 'none',
      zIndex: 999, opacity: life, transform: 'translate(-50%,-50%)',
      transition: 'none',
    }} />
  )
}

/* ─── Confetti ─── */
function Confetti({ color, left, delay, size, drift }) {
  return (
    <div style={{
      position: 'fixed', top: -20, left: `${left}%`,
      width: size, height: size * 0.6,
      background: color, borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      '--drift': `${drift}px`,
      animation: `confettiFall ${2.5 + Math.random() * 2.5}s ease-in ${delay}s forwards`,
      pointerEvents: 'none', zIndex: 300,
      transform: `rotate(${Math.random()*360}deg)`,
    }} />
  )
}

/* ─── Sparkle ─── */
function Sparkle({ x, y }) {
  const symbols = ['✨','💫','⭐','🌟','💥']
  return (
    <div style={{
      position: 'fixed', left: x, top: y, fontSize: '1.4rem',
      pointerEvents: 'none', zIndex: 500,
      animation: 'sparkleAnim 0.7s ease-out forwards',
    }}>
      {symbols[Math.floor(Math.random() * symbols.length)]}
    </div>
  )
}

/* ─── Orbiting emoji ─── */
function OrbitEmoji({ emoji, delay, radius }) {
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      width: 0, height: 0, pointerEvents: 'none',
      animation: `orbitSpin ${8 + delay}s linear infinite`,
      animationDelay: `${delay * -2}s`,
      '--r': `${radius}px`,
    }}>
      <span style={{
        fontSize: '1.6rem', display: 'block',
        transform: `translateX(${radius}px)`,
        filter: 'drop-shadow(0 0 6px rgba(255,77,109,0.5))',
      }}>{emoji}</span>
    </div>
  )
}

/* ─── YES screen ─── */
function YesScreen() {
  const [confetti] = useState(() =>
    Array.from({ length: 150 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: 7 + Math.random() * 11,
      drift: (Math.random() - 0.5) * 200,
    }))
  )

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(-45deg,#1a0010,#2d0020,#1a0010,#0d0018)',
      backgroundSize: '400% 400%',
      animation: 'bgDrift 6s ease infinite, fadeIn 0.4s ease',
    }}>
      {/* Glow blobs */}
      <div style={{ position:'fixed', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,77,109,0.25),transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', animation:'glowPulse 3s ease-in-out infinite' }} />
      <div style={{ position:'fixed', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,183,0,0.2),transparent 70%)', top:'20%', right:'10%', pointerEvents:'none', animation:'glowPulse 4s ease-in-out infinite 1s' }} />

      {confetti.map(c => <Confetti key={c.id} {...c} />)}

      <div style={{ textAlign:'center', zIndex:10, animation:'popIn 0.7s cubic-bezier(.34,1.56,.64,1)' }}>
        <div style={{ fontSize:'5rem', animation:'heartbeat 1.4s ease-in-out infinite', display:'block', marginBottom:'1.2rem', filter:'drop-shadow(0 0 30px rgba(255,77,109,0.8))' }}>
          💖
        </div>

        <h1 style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize: 'clamp(3rem,10vw,7rem)',
          fontWeight: 600,
          color: 'transparent',
          backgroundImage: 'linear-gradient(90deg,#ff4d6d,#ffb700,#ff8fa3,#ffb700,#ff4d6d)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          animation: 'shimmer 2s linear infinite',
          marginBottom: '0.8rem',
          lineHeight: 1,
        }}>
          JA!!!! 🎉
        </h1>

        <p style={{ fontSize:'clamp(1.2rem,3vw,1.8rem)', color:'rgba(255,255,255,0.9)', fontWeight:300, marginBottom:'0.4rem' }}>
          Dette blir den beste torsdagen ever 🥹
        </p>
        <p style={{ fontSize:'clamp(0.95rem,2vw,1.2rem)', color:'rgba(255,255,255,0.65)', marginBottom:'2.5rem' }}>
          4. juni · Middag 🍽️ · Bowling 🎳 · 3 år snart 🎂
        </p>

        <div style={{ display:'flex', gap:'0.8rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'2.5rem' }}>
          {['📅 Torsdag 4. juni','🍽️ Middag','🎳 Bowling','🎂 3 år i august!','💕 Oss to'].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,77,109,0.3)',
              borderRadius: '50px',
              padding: '0.6rem 1.4rem',
              color: 'white', fontWeight: 400, fontSize: '0.95rem',
              animation: `popIn 0.5s cubic-bezier(.34,1.56,.64,1) ${0.3 + i * 0.1}s both`,
            }}>
              {item}
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:'0.4rem', justifyContent:'center', fontSize:'2.5rem', animation:'wiggle 1.2s ease-in-out infinite' }}>
          {'💖💕💗💕💖'.split('').map((e,i) => <span key={i}>{e}</span>)}
        </div>
      </div>
    </div>
  )
}

/* ─── Main App ─── */
export default function App() {
  const [accepted, setAccepted] = useState(false)
  const [noPos, setNoPos] = useState(null)
  const [noClicks, setNoClicks] = useState(0)
  const [sparkles, setSparkles] = useState([])
  const [phase, setPhase] = useState(0) // 0=envelope, 1=letter opening, 2=question
  const noRef = useRef(null)
  const sparkleId = useRef(0)
  const noPosRef = useRef(null)

  // Click sparkles
  useEffect(() => {
    const handler = (e) => {
      const id = ++sparkleId.current
      setSparkles(s => [...s, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setSparkles(s => s.filter(sp => sp.id !== id)), 800)
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  // No button flee
  useEffect(() => {
    const handler = (e) => {
      const btn = noRef.current
      if (!btn || phase !== 2) return
      const pos = noPosRef.current || btn.getBoundingClientRect()
      const cx = (noPosRef.current?.x ?? pos.left) + btn.offsetWidth / 2
      const cy = (noPosRef.current?.y ?? pos.top) + btn.offsetHeight / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      if (dist < 160) {
        const angle = Math.atan2(cy - e.clientY, cx - e.clientX)
        const push = 180
        const vw = window.innerWidth, vh = window.innerHeight
        const nx = Math.min(Math.max(cx + Math.cos(angle) * push - btn.offsetWidth / 2, 8), vw - btn.offsetWidth - 8)
        const ny = Math.min(Math.max(cy + Math.sin(angle) * push - btn.offsetHeight / 2, 8), vh - btn.offsetHeight - 8)
        noPosRef.current = { x: nx, y: ny }
        setNoPos({ x: nx, y: ny })
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [phase])

  const openEnvelope = () => {
    setPhase(1)
    setTimeout(() => setPhase(2), 800)
  }

  if (accepted) return <YesScreen />

  /* ── Phase 0: Envelope ── */
  if (phase === 0) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #1a0010 0%, #0a0008 70%)',
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
      }} onClick={openEnvelope}>
        {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}

        {/* Glow */}
        <div style={{ position:'fixed', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,77,109,0.12),transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', animation:'glowPulse 4s ease-in-out infinite' }} />

        {/* Stars */}
        {Array.from({length:40},(_,i) => (
          <div key={i} style={{
            position:'fixed',
            left: `${Math.random()*100}%`,
            top: `${Math.random()*100}%`,
            width: Math.random() > 0.7 ? 3 : 2,
            height: Math.random() > 0.7 ? 3 : 2,
            borderRadius:'50%',
            background:'white',
            opacity: 0.2 + Math.random() * 0.6,
            pointerEvents:'none',
            animation:`glowPulse ${2+Math.random()*3}s ease-in-out infinite`,
            animationDelay:`${Math.random()*3}s`,
          }}/>
        ))}

        <div style={{ textAlign:'center', zIndex:10, animation:'slideUp 1s cubic-bezier(.34,1.56,.64,1)' }}>
          <div style={{
            fontSize:'8rem',
            animation:'heartbeat 2s ease-in-out infinite, float 4s ease-in-out infinite',
            display:'block', marginBottom:'2rem',
            filter:'drop-shadow(0 0 40px rgba(255,77,109,0.6))',
            cursor:'pointer',
          }}>
            💌
          </div>
          <p style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'clamp(1.2rem,3vw,1.8rem)',
            color:'rgba(255,255,255,0.6)',
            fontStyle:'italic',
            letterSpacing:'0.1em',
          }}>
            Trykk for å åpne
          </p>
          <div style={{ marginTop:'1rem', fontSize:'1.2rem', opacity:0.4, animation:'float 3s ease-in-out infinite' }}>↓</div>
        </div>
      </div>
    )
  }

  /* ── Phase 1: Opening ── */
  if (phase === 1) {
    return (
      <div style={{
        minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        background:'radial-gradient(ellipse at center,#1a0010 0%,#0a0008 70%)',
      }}>
        <div style={{ fontSize:'8rem', animation:'heartbeat 0.4s ease-in-out infinite', filter:'drop-shadow(0 0 40px rgba(255,77,109,0.8))' }}>💌</div>
      </div>
    )
  }

  /* ── Phase 2: Question ── */
  const noMsg = NO_MSGS[Math.min(noClicks, NO_MSGS.length - 1)]
  const hint = HINTS[Math.min(noClicks, HINTS.length - 1)]

  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse at 30% 20%,rgba(255,77,109,0.15),transparent 50%), radial-gradient(ellipse at 70% 80%,rgba(255,183,0,0.1),transparent 50%), #0a0008',
      padding:'2rem', position:'relative', overflow:'hidden',
      animation:'fadeIn 0.5s ease',
    }}>
      {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}

      {/* Stars bg */}
      {Array.from({length:30},(_,i) => (
        <div key={i} style={{
          position:'fixed', left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
          width:2, height:2, borderRadius:'50%', background:'white',
          opacity:0.15+Math.random()*0.4, pointerEvents:'none',
          animation:`glowPulse ${2+Math.random()*3}s ease-in-out infinite`,
          animationDelay:`${Math.random()*4}s`,
        }}/>
      ))}

      {/* Glow blob center */}
      <div style={{ position:'fixed', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,77,109,0.08),transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', animation:'glowPulse 5s ease-in-out infinite' }} />

      <div style={{ position:'relative', zIndex:10, textAlign:'center', maxWidth:'640px', width:'100%', animation:'slideUp 0.6s cubic-bezier(.34,1.56,.64,1)' }}>

        {/* Orbiting emojis */}
        <div style={{ position:'relative', height:'180px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'0.5rem' }}>
          {ORBIT_EMOJIS.map((e,i) => <OrbitEmoji key={i} emoji={e} delay={i} radius={80} />)}
          <div style={{ fontSize:'4.5rem', animation:'heartbeat 1.8s ease-in-out infinite', filter:'drop-shadow(0 0 30px rgba(255,77,109,0.7))', zIndex:2 }}>
            💖
          </div>
        </div>

        {/* Anniversary tag */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'0.5rem',
          background:'linear-gradient(135deg,rgba(255,183,0,0.15),rgba(255,77,109,0.1))',
          border:'1px solid rgba(255,183,0,0.3)',
          borderRadius:'50px', padding:'0.45rem 1.2rem',
          fontSize:'0.85rem', color:'rgba(255,220,100,0.9)', fontWeight:400,
          marginBottom:'1.2rem',
          animation:'popIn 0.6s cubic-bezier(.34,1.56,.64,1) 0.2s both',
        }}>
          🎂 Nærmer oss 3 år i august — dette er en forsmak
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(2.2rem,7vw,4.5rem)',
          fontWeight:600, fontStyle:'italic',
          lineHeight:1.1, marginBottom:'0.5rem',
          color:'transparent',
          backgroundImage:'linear-gradient(135deg,#fff 30%,rgba(255,143,163,0.8) 70%)',
          WebkitBackgroundClip:'text', backgroundClip:'text',
        }}>
          Vil du bli med meg på date?
        </h1>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', margin:'1rem auto 1.5rem', maxWidth:300 }}>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,rgba(255,77,109,0.5))' }} />
          <span style={{ fontSize:'1rem', opacity:0.6 }}>✦</span>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,rgba(255,77,109,0.5),transparent)' }} />
        </div>

        {/* Info card */}
        <div style={{
          background:'rgba(255,255,255,0.04)',
          backdropFilter:'blur(30px)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:'28px', padding:'1.5rem 2rem',
          marginBottom:'2.2rem',
          boxShadow:'0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(1.1rem,3vw,1.45rem)', color:'rgba(255,255,255,0.9)', marginBottom:'1rem', fontStyle:'italic' }}>
            📅 <strong style={{ fontStyle:'normal' }}>Torsdag 4. juni</strong>
          </p>
          <div style={{ display:'flex', gap:'0.7rem', justifyContent:'center', flexWrap:'wrap' }}>
            {['🍽️ Middag','🎳 Bowling (kanskje)','💕 Bare oss to'].map((p,i) => (
              <span key={i} style={{
                background:'rgba(255,77,109,0.12)', border:'1px solid rgba(255,77,109,0.2)',
                borderRadius:'50px', padding:'0.4rem 1rem',
                fontSize:'0.9rem', color:'rgba(255,180,180,0.9)', fontWeight:400,
              }}>{p}</span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', alignItems:'center', flexWrap:'wrap' }}>
          <button
            onClick={() => setAccepted(true)}
            style={{
              background:'linear-gradient(135deg,#ff4d6d,#c9184a)',
              color:'white', border:'none', borderRadius:'50px',
              padding:'1.1rem 3rem', fontSize:'1.25rem',
              fontFamily:"'Cormorant Garamond', serif", fontWeight:600,
              cursor:'pointer', letterSpacing:'0.04em',
              boxShadow:'0 0 30px rgba(255,77,109,0.5), 0 0 60px rgba(255,77,109,0.2)',
              animation:'glowPulse 2s ease-in-out infinite',
              transition:'transform 0.2s, box-shadow 0.2s',
              fontStyle:'italic',
            }}
            onMouseEnter={e => { e.target.style.transform='scale(1.08)'; e.target.style.boxShadow='0 0 50px rgba(255,77,109,0.8),0 0 100px rgba(255,77,109,0.3)' }}
            onMouseLeave={e => { e.target.style.transform='scale(1)'; e.target.style.boxShadow='0 0 30px rgba(255,77,109,0.5),0 0 60px rgba(255,77,109,0.2)' }}
          >
            Ja, selvfølgelig! 💖
          </button>

          <button
            ref={noRef}
            onClick={() => setNoClicks(c => c + 1)}
            style={{
              background:'rgba(255,255,255,0.05)',
              color:'rgba(255,100,120,0.7)',
              border:'1px solid rgba(255,100,120,0.2)',
              borderRadius:'50px', padding:'1.1rem 2rem',
              fontSize:'0.95rem', fontFamily:"'DM Sans', sans-serif",
              cursor:'not-allowed', backdropFilter:'blur(10px)',
              position: noPos ? 'fixed' : 'relative',
              left: noPos ? noPos.x : 'auto',
              top: noPos ? noPos.y : 'auto',
              zIndex:50, userSelect:'none',
              transition: noPos ? 'none' : 'transform 0.3s',
            }}
          >
            {noMsg}
          </button>
        </div>

        <p style={{
          marginTop:'1.8rem',
          color:'rgba(255,255,255,0.25)',
          fontSize:'0.82rem', fontStyle:'italic',
          animation: noClicks >= 3 ? 'wiggle 0.5s ease-in-out infinite' : 'none',
        }}>
          {hint}
        </p>
      </div>
    </div>
  )
}
