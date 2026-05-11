import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { type Cenario, portoAtual } from '../data/cenarios';
import { formatCurrency } from '../utils/formatting';

interface Props {
  cenario: Cenario;
}

interface Criterio {
  id: string;
  nome: string;
  peso: number;
  porto: number;
  scores: number[]; // one per plan in cenario
  justificativa: string;
}

const PLAN_COLORS = ['#C9973A', '#4ACA8A', '#7BA7E8', '#E87878', '#B47FE8'];

function buildCriterios(cenario: Cenario): Criterio[] {
  return [
    {
      id: 'custo',
      nome: 'Custo',
      peso: 35,
      porto: 3,
      scores: cenario.planos.map(p => {
        const economia = (portoAtual.mensalTotal - p.mensalTotal) / portoAtual.mensalTotal;
        if (economia > 0.25) return 10;
        if (economia > 0.15) return 8;
        if (economia > 0.05) return 7;
        if (economia > 0) return 6;
        return 4;
      }),
      justificativa: 'Baseado na economia mensal vs Porto Seguro vigente.',
    },
    {
      id: 'cobertura',
      nome: 'Cobertura',
      peso: 25,
      porto: 10,
      scores: cenario.planos.map(p => {
        if (p.coparticipacao === 'Sem Coparticipação') return 9;
        if (p.coparticipacao === 'Coparticipação Parcial') return 7;
        return 5;
      }),
      justificativa: 'Porto Seguro sem coparticipação = cobertura plena. Coparticipação reduz a percepção do benefício.',
    },
    {
      id: 'rede',
      nome: 'Rede',
      peso: 20,
      porto: 9,
      scores: cenario.planos.map(p => {
        if (p.acomodacao === 'Apartamento' && p.permanenciaMinima === '12 meses') return 8;
        if (p.acomodacao === 'Apartamento') return 7;
        return 6;
      }),
      justificativa: 'Apartamento com carência curta indica produto de rede mais ampla. Necessita validação por CEP.',
    },
    {
      id: 'transicao',
      nome: 'Facilidade de Transição',
      peso: 10,
      porto: 10,
      scores: cenario.planos.map(p =>
        p.permanenciaMinima === '12 meses' ? 8 : 6
      ),
      justificativa: 'Carência de 12 meses facilita portabilidade. 24 meses pode exigir análise caso a caso.',
    },
    {
      id: 'reputacao',
      nome: 'Reputação',
      peso: 10,
      porto: 8,
      scores: cenario.planos.map(() => 8),
      justificativa: 'Todas as operadoras envolvidas são de grande porte e reguladas pela ANS.',
    },
  ];
}

export default function DecisionMatrix({ cenario }: Props) {
  const [criterios, setCriterios] = useState<Criterio[]>(() => buildCriterios(cenario));

  // Rebuild when cenario changes (simple approach via key in parent)
  const totalPeso = criterios.reduce((s, c) => s + c.peso, 0);

  const scorePorto = criterios.reduce((s, c) => s + (c.porto * c.peso) / 100, 0);
  const scoresPlanos = cenario.planos.map((_, pi) =>
    criterios.reduce((s, c) => s + ((c.scores[pi] ?? 5) * c.peso) / 100, 0)
  );

  const radarData = criterios.map(c => {
    const obj: Record<string, number | string> = { criterio: c.nome, 'Porto Seguro': c.porto };
    cenario.planos.forEach((p, i) => { obj[p.nome] = c.scores[i] ?? 5; });
    return obj;
  });

  const updatePeso = (id: string, peso: number) =>
    setCriterios(prev => prev.map(c => c.id === id ? { ...c, peso } : c));

  const allScores = [{ nome: 'Porto Seguro', score: scorePorto, isPorto: true }, ...cenario.planos.map((p, i) => ({ nome: p.nome, score: scoresPlanos[i], isPorto: false, index: i }))];
  const maxScore = Math.max(...allScores.map(s => s.score));

  return (
    <section id="matriz" style={{ padding: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Análise Consultiva — {cenario.titulo}
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '0.4rem', color: '#F8F9FC' }}>
            Matriz de Decisão
          </h2>
          <p style={{ color: '#7A90A8', marginTop: '0.5rem', maxWidth: 600, lineHeight: 1.7, fontSize: '0.88rem' }}>
            Ajuste os pesos conforme as prioridades da Uniodonto Paulista para personalizar a recomendação.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left: sliders */}
          <div>
            <div style={{ fontSize: '0.72rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Critérios e Pesos
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {criterios.map(c => (
                <div key={c.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.88rem', color: '#F8F9FC', fontWeight: 500 }}>{c.nome}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.82rem', color: '#E8B85A', fontWeight: 600 }}>{c.peso}%</span>
                  </div>
                  <input type="range" min={5} max={50} step={5} value={c.peso} onChange={e => updatePeso(c.id, parseInt(e.target.value))} style={{ width: '100%', accentColor: '#C9973A', cursor: 'pointer' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(cenario.planos.length + 1, 6)}, 1fr)`, gap: '0.35rem', marginTop: '0.6rem' }}>
                    {/* Porto score */}
                    <ScoreCell label="Porto" score={c.porto} />
                    {cenario.planos.map((p, i) => (
                      <ScoreCell key={p.id} label={p.nome.split(' ')[0]} score={c.scores[i] ?? 5} />
                    ))}
                  </div>
                  <p style={{ color: '#7A90A8', fontSize: '0.73rem', margin: '0.5rem 0 0', lineHeight: 1.5 }}>{c.justificativa}</p>
                </div>
              ))}
            </div>
            {Math.abs(totalPeso - 100) > 0.5 && (
              <div style={{ marginTop: '0.75rem', color: '#E87878', fontSize: '0.78rem', background: 'rgba(196,53,53,0.1)', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                ⚠ Total dos pesos: {totalPeso}% — ajuste para totalizar 100%.
              </div>
            )}
          </div>

          {/* Right: scores + radar */}
          <div>
            <div style={{ fontSize: '0.72rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Pontuação Ponderada
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {allScores.map((s, idx) => {
                const isWinner = s.score === maxScore && !s.isPorto;
                const cor = s.isPorto ? '#4466AA' : PLAN_COLORS[(s as any).index % PLAN_COLORS.length];
                return (
                  <div key={s.nome} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.75rem 1rem',
                    background: isWinner ? 'rgba(201,151,58,0.1)' : 'rgba(255,255,255,0.03)',
                    border: isWinner ? '1px solid rgba(201,151,58,0.35)' : '1px solid rgba(255,255,255,0.07)',
                    borderLeft: `3px solid ${cor}`,
                    borderRadius: 8,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', color: '#F8F9FC', fontWeight: 500 }}>{s.nome}</div>
                      {isWinner && <div style={{ fontSize: '0.62rem', color: '#C9973A', marginTop: '0.15rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Melhor pontuação neste cenário</div>}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isWinner ? '#E8B85A' : '#B8C4D4', fontFamily: 'DM Mono, monospace' }}>
                      {s.score.toFixed(1)}
                    </div>
                    <div style={{ width: 56, height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(s.score / 10) * 100}%`, background: isWinner ? '#C9973A' : cor, borderRadius: 9999 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Radar */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Radar Comparativo</div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="criterio" tick={{ fill: '#7A90A8', fontSize: 10 }} />
                  <Radar name="Porto Seguro" dataKey="Porto Seguro" stroke="#4466AA" fill="#4466AA" fillOpacity={0.12} strokeWidth={2} />
                  {cenario.planos.map((p, i) => (
                    <Radar key={p.id} name={p.nome} dataKey={p.nome} stroke={PLAN_COLORS[i % PLAN_COLORS.length]} fill={PLAN_COLORS[i % PLAN_COLORS.length]} fillOpacity={0.1} strokeWidth={1.5} />
                  ))}
                  <Legend wrapperStyle={{ fontSize: '0.75rem', color: '#7A90A8' }} />
                  <Tooltip contentStyle={{ background: '#0F2040', border: '1px solid rgba(201,151,58,0.3)', borderRadius: 8, fontSize: '0.78rem', color: '#F8F9FC' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreCell({ label, score }: { label: string; score: number }) {
  const color = score >= 8 ? '#4ACA8A' : score >= 6 ? '#E8B85A' : '#E87878';
  return (
    <div style={{ textAlign: 'center', padding: '0.3rem 0.2rem', background: 'rgba(255,255,255,0.04)', borderRadius: 5 }}>
      <div style={{ fontSize: '0.6rem', color: '#7A90A8', marginBottom: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ fontSize: '0.88rem', fontWeight: 700, color, fontFamily: 'DM Mono, monospace' }}>{score}</div>
    </div>
  );
}
