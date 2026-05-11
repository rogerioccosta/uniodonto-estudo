import React from 'react';

interface Props {
  onNavigate: (section: string) => void;
}

export default function ExecutiveHeader({ onNavigate }: Props) {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 50%, #0A1628 100%)',
        borderBottom: '1px solid rgba(201,151,58,0.3)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,151,58,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(26,50,96,0.5) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(201,151,58,0.04) 0%, transparent 40%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C9973A, transparent)' }} />

      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.7rem', color: '#7A90A8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Data do Estudo</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#B8C4D4', marginTop: '0.2rem' }}>Maio de 2026</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: '#7A90A8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Apresentado por</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8F9FC', lineHeight: 1.2 }}>Rogério C Costa</div>
          <div style={{ fontSize: '0.78rem', color: '#C9973A', fontWeight: 500, marginTop: '0.15rem', letterSpacing: '0.04em' }}>Diretor Comercial — Luminus Seguros</div>
        </div>
      </div>

      {/* Hero content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 3rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Logo grande */}
        <div style={{ marginBottom: '2.5rem' }}>
          <img src="/luminus-logo.png" alt="Luminus Seguros" style={{ height: 120, width: 'auto', objectFit: 'contain', maxWidth: '420px' }} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', border: '1px solid rgba(201,151,58,0.4)', borderRadius: '9999px', padding: '0.35rem 1.25rem' }}>
            Estudo Comparativo Confidencial
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', maxWidth: 820 }}>
          Análise de{' '}
          <span style={{ background: 'linear-gradient(135deg, #C9973A, #E8B85A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Benefícios de Saúde
          </span>
          <br />Uniodonto Paulista
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#7A90A8', maxWidth: 600, lineHeight: 1.7, marginBottom: '3rem' }}>
          Comparativo entre o plano Porto Seguro vigente e 10 alternativas em 4 cenários —
          com e sem coparticipação, rede compatível e upgrade, reajuste previsto e recomendações consultivas.
        </p>

        {/* Key stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: 700, width: '100%', marginBottom: '3rem' }}>
          {[
            { label: 'Vidas cobertas', value: '53', sub: 'beneficiários' },
            { label: 'Custo atual/mês', value: 'R$ 35.568', sub: 'Porto Seguro' },
            { label: 'Economia potencial', value: 'até R$ 136k', sub: 'por ano — Cenário 4' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,151,58,0.2)', borderRadius: 12, padding: '1.25rem 1rem', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '0.7rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E8B85A', fontFamily: 'DM Mono, monospace' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#3D526A', marginTop: '0.25rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => onNavigate('cenarios')}
            style={{
              background: 'linear-gradient(135deg, #C9973A, #E8B85A)',
              color: '#0A1628',
              border: 'none',
              borderRadius: 8,
              padding: '0.9rem 2rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Ver Cenários →
          </button>
          <button
            onClick={() => onNavigate('resumo')}
            style={{
              background: 'transparent',
              color: '#B8C4D4',
              border: '1px solid rgba(184,196,212,0.3)',
              borderRadius: 8,
              padding: '0.9rem 2rem',
              fontWeight: 500,
              fontSize: '0.95rem',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Resumo Executivo
          </button>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div style={{ textAlign: 'center', padding: '1.5rem', color: '#3D526A', fontSize: '0.8rem', position: 'relative', zIndex: 2 }}>
        Role para explorar o estudo completo ↓
      </div>
    </header>
  );
}
