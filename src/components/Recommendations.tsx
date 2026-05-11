import { useState } from 'react';
import { type Cenario, portoAtual } from '../data/cenarios';
import { formatCurrency } from '../utils/formatting';

interface Props {
  cenario: Cenario;
}

const PLAN_COLORS = ['#C9973A', '#4ACA8A', '#7BA7E8', '#E87878', '#B47FE8'];

export default function Recommendations({ cenario }: Props) {
  const [aberto, setAberto] = useState<number>(0);

  const sorted = [...cenario.planos].sort((a, b) => a.mensalTotal - b.mensalTotal);

  return (
    <section id="recomendacoes" style={{ padding: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Recomendações — {cenario.titulo}
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '0.4rem', color: '#F8F9FC' }}>
            Análise por Plano
          </h2>
          <p style={{ color: '#7A90A8', marginTop: '0.5rem', lineHeight: 1.7, fontSize: '0.88rem' }}>
            Planos ordenados do mais econômico ao mais caro dentro do {cenario.titulo}.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {sorted.map((p, rank) => {
            const cor = PLAN_COLORS[cenario.planos.indexOf(p) % PLAN_COLORS.length];
            const economia = p.diferencaMensal < 0;
            const varPct = ((p.mensalTotal - portoAtual.mensalTotal) / portoAtual.mensalTotal * 100);
            const isOpen = aberto === rank;

            return (
              <div key={p.id} style={{
                background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                border: isOpen ? '1px solid rgba(201,151,58,0.3)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}>
                {/* Header */}
                <button
                  onClick={() => setAberto(isOpen ? -1 : rank)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  {rank === 0 && (
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4ACA8A', background: 'rgba(26,138,90,0.15)', border: '1px solid rgba(26,138,90,0.3)', borderRadius: 9999, padding: '0.2rem 0.6rem', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Mais econômico
                    </span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: cor, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.95rem', color: '#F8F9FC', fontWeight: 600 }}>{p.nome}</div>
                      <div style={{ fontSize: '0.72rem', color: '#7A90A8', marginTop: '0.1rem' }}>
                        {p.acomodacao} · {p.permanenciaMinima} · {p.coparticipacao}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8F9FC', fontFamily: 'DM Mono, monospace' }}>
                      {formatCurrency(p.mensalTotal)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: economia ? '#4ACA8A' : '#E87878', marginTop: '0.1rem', fontWeight: 600 }}>
                      {economia ? '−' : '+'}{formatCurrency(Math.abs(p.diferencaMensal))}/mês ({varPct.toFixed(1)}%)
                    </div>
                  </div>
                  <span style={{ color: '#7A90A8', fontSize: '0.9rem', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>▾</span>
                </button>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <InfoBox label="Economia mensal" value={`${economia ? '−' : '+'}${formatCurrency(Math.abs(p.diferencaMensal))}`} positive={economia} />
                    <InfoBox label="Economia anual" value={`${economia ? '−' : '+'}${formatCurrency(Math.abs(p.diferencaAnual))}`} positive={economia} />
                    <InfoBox label="Vs pós-reajuste (ago/26)*" value={`${p.mensalTotal < portoAtual.mensalComReajuste ? '−' : '+'}${formatCurrency(Math.abs(p.mensalTotal - portoAtual.mensalComReajuste))}`} positive={p.mensalTotal < portoAtual.mensalComReajuste} />
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Tag label={p.acomodacao} />
                        <Tag label={'Perm. ' + p.permanenciaMinima} />
                        <Tag label={p.coparticipacao} highlight={p.coparticipacao === 'Sem Coparticipação'} />
                        <Tag label={`${formatCurrency(p.anualTotal)}/ano`} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ color: '#3D526A', fontSize: '0.72rem', marginTop: '1rem' }}>
          * Comparação com base no reajuste estimado de {portoAtual.percentualReajuste}% (índice histórico para empresas ≤29 vidas). Índice definitivo não divulgado.
        </p>
      </div>
    </section>
  );
}

function InfoBox({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div style={{ background: positive ? 'rgba(26,138,90,0.08)' : 'rgba(196,53,53,0.08)', border: `1px solid ${positive ? 'rgba(26,138,90,0.2)' : 'rgba(196,53,53,0.2)'}`, borderRadius: 8, padding: '0.75rem' }}>
      <div style={{ fontSize: '0.68rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: 700, color: positive ? '#4ACA8A' : '#E87878', fontFamily: 'DM Mono, monospace' }}>{value}</div>
    </div>
  );
}

function Tag({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span style={{ fontSize: '0.72rem', color: highlight ? '#4ACA8A' : '#7A90A8', background: highlight ? 'rgba(26,138,90,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${highlight ? 'rgba(26,138,90,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 9999, padding: '0.2rem 0.65rem', fontWeight: highlight ? 600 : 400 }}>
      {label}
    </span>
  );
}
