import { cenarios, portoAtual, type Cenario } from '../data/cenarios';
import { formatCurrency } from '../utils/formatting';
import AlertaReajuste from './AlertaReajuste';

interface Props {
  cenario: Cenario;
}

export default function SummaryCards({ cenario }: Props) {
  const melhorPlano = [...cenario.planos].sort((a, b) => a.mensalTotal - b.mensalTotal)[0];
  const maiorEconomia = Math.abs(melhorPlano.diferencaAnual);
  const todosEconomizam = cenario.planos.every(p => p.diferencaMensal < 0);

  return (
    <section id="resumo" style={{ padding: '2.5rem 3rem', background: 'rgba(15,32,64,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Resumo Executivo — {cenario.titulo}
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '0.4rem', color: '#F8F9FC' }}>
            {cenario.subtitulo}
          </h2>
          <p style={{ color: '#7A90A8', marginTop: '0.5rem', maxWidth: 620, lineHeight: 1.7, fontSize: '0.9rem' }}>
            {cenario.descricao}
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <KpiCard
            label="Custo atual Porto Seguro"
            value={formatCurrency(portoAtual.mensalTotal)}
            sub="mensalidade vigente / 53 vidas"
            icon="💳"
          />
          <KpiCard
            label="Após reajuste estimado (ago/26)"
            value={formatCurrency(portoAtual.mensalComReajuste)}
            sub={`+${portoAtual.percentualReajuste}% — índice histórico`}
            icon="📈"
            alert
          />
          <KpiCard
            label={`Menor custo — ${cenario.titulo}`}
            value={formatCurrency(melhorPlano.mensalTotal)}
            sub={melhorPlano.nome}
            icon="💡"
            destaque
          />
          <KpiCard
            label="Maior economia anual potencial"
            value={`até ${formatCurrency(maiorEconomia)}`}
            sub={`vs Porto vigente · ${melhorPlano.nome}`}
            icon="💰"
            destaque
          />
          <KpiCard
            label="Planos neste cenário"
            value={String(cenario.planos.length)}
            sub={cenario.planos.map(p => p.nome).join(' · ')}
            icon="📋"
          />
        </div>

        {/* Alerta reajuste */}
        <AlertaReajuste />
      </div>
    </section>
  );
}

function KpiCard({ label, value, sub, icon, destaque, alert }: {
  label: string; value: string; sub: string; icon: string; destaque?: boolean; alert?: boolean;
}) {
  const borderColor = alert ? 'rgba(196,53,53,0.35)' : destaque ? 'rgba(201,151,58,0.4)' : 'rgba(255,255,255,0.07)';
  const bg = alert ? 'rgba(196,53,53,0.08)' : destaque ? 'rgba(201,151,58,0.1)' : 'rgba(255,255,255,0.03)';
  const valueColor = alert ? '#E87878' : destaque ? '#E8B85A' : '#F8F9FC';

  return (
    <div style={{ background: bg, border: `1px solid ${borderColor}`, borderRadius: 12, padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
      {(destaque || alert) && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${alert ? '#C43535' : '#C9973A'}, transparent)` }} />
      )}
      <div style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>{icon}</div>
      <div style={{ fontSize: '0.68rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>{label}</div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: valueColor, fontFamily: 'DM Mono, monospace', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.72rem', color: '#3D526A', lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}
