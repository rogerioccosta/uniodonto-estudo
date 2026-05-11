import { cenarios } from '../data/cenarios';

interface Props {
  selected: number;
  onChange: (id: number) => void;
}

const ICONS = ['🔄', '⬆️', '💰', '🏆'];
const COPART_LABELS = [
  'Sem / Parcial',
  'Sem / Parcial',
  'Com coparticipação',
  'Com coparticipação',
];
const REDE_LABELS = [
  'Rede compatível',
  'Upgrade de rede',
  'Rede compatível',
  'Upgrade de rede',
];

export default function ScenarioSelector({ selected, onChange }: Props) {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0F2040 100%)',
        borderBottom: '1px solid rgba(201,151,58,0.3)',
        padding: '2.5rem 3rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 90,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Label */}
        <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Selecione o cenário para visualização
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,151,58,0.15)' }} />
        </div>

        {/* 4 scenario tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {cenarios.map((c, i) => {
            const isActive = selected === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onChange(c.id)}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(201,151,58,0.18), rgba(201,151,58,0.08))'
                    : 'rgba(255,255,255,0.02)',
                  border: isActive
                    ? '1px solid rgba(201,151,58,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  borderBottom: isActive ? '2px solid #C9973A' : '2px solid transparent',
                  borderRadius: '10px 10px 0 0',
                  padding: '1rem 1rem 1.1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at top, rgba(201,151,58,0.08), transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{ICONS[i]}</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: isActive ? '#E8B85A' : '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      {c.titulo}
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isActive ? '#F8F9FC' : '#B8C4D4', marginTop: '0.2rem', lineHeight: 1.3 }}>
                      {c.subtitulo}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 600,
                    color: isActive ? '#4ACA8A' : '#7A90A8',
                    background: isActive ? 'rgba(26,138,90,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isActive ? 'rgba(26,138,90,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 9999, padding: '0.15rem 0.55rem',
                    letterSpacing: '0.05em',
                  }}>
                    {COPART_LABELS[i]}
                  </span>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 600,
                    color: isActive ? '#E8B85A' : '#7A90A8',
                    background: isActive ? 'rgba(201,151,58,0.12)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isActive ? 'rgba(201,151,58,0.25)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 9999, padding: '0.15rem 0.55rem',
                    letterSpacing: '0.05em',
                  }}>
                    {REDE_LABELS[i]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
