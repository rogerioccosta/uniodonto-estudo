import { portoAtual, type Cenario, type PlanoNoCenario } from '../data/cenarios';
import { formatCurrency } from '../utils/formatting';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  ReferenceLine, LabelList,
} from 'recharts';

interface Props {
  cenario: Cenario;
}

// Palette rotates across plans
const PLAN_COLORS = ['#C9973A', '#4ACA8A', '#7BA7E8', '#E87878', '#B47FE8'];

export default function FinancialComparison({ cenario }: Props) {
  const porto = portoAtual.mensalTotal;

  const chartData = [
    { nome: 'Porto\n(Atual)', valor: portoAtual.mensalTotal, isPorto: true },
    ...cenario.planos.map((p, i) => ({
      nome: p.nome,
      valor: p.mensalTotal,
      isPorto: false,
      planIndex: i,
    })),
  ];

  const reajusteData = [
    { nome: 'Porto\n(Ago/26)*', valor: portoAtual.mensalComReajuste, isPorto: true, isReajuste: true },
    ...cenario.planos.map((p, i) => ({
      nome: p.nome,
      valor: p.mensalTotal,
      isPorto: false,
      planIndex: i,
    })),
  ];

  return (
    <section id="comparativo" style={{ padding: '3rem', background: 'rgba(10,22,40,0.6)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Comparativo Financeiro — {cenario.titulo}
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '0.4rem', color: '#F8F9FC' }}>
            Planos vs Porto Seguro Atual
          </h2>
        </div>

        {/* Table comparison */}
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.87rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Plano', 'Acomodação', 'Perm. Mínima', 'Coparticipação', 'Mensalidade', 'Economia Mensal', 'Economia Anual'].map(h => (
                  <th key={h} style={{ padding: '0.8rem 1rem', textAlign: 'left', color: '#7A90A8', fontWeight: 500, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Porto row */}
              <tr style={{ background: 'rgba(100,160,220,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6699CC', flexShrink: 0 }} />
                    <span style={{ color: '#F8F9FC' }}>Porto Seguro</span>
                    <span style={{ fontSize: '0.65rem', color: '#7A90A8', background: 'rgba(255,255,255,0.06)', borderRadius: 9999, padding: '0.1rem 0.5rem' }}>atual</span>
                  </div>
                </td>
                <td style={{ padding: '0.9rem 1rem', color: '#7A90A8' }}>Apartamento</td>
                <td style={{ padding: '0.9rem 1rem', color: '#7A90A8' }}>Cumprida</td>
                <td style={{ padding: '0.9rem 1rem', color: '#7A90A8' }}>Com coparticipação</td>
                <td style={{ padding: '0.9rem 1rem', fontFamily: 'DM Mono, monospace', color: '#6699CC', fontWeight: 600 }}>
                  {formatCurrency(portoAtual.mensalTotal)}
                </td>
                <td style={{ padding: '0.9rem 1rem', color: '#7A90A8' }}>—</td>
                <td style={{ padding: '0.9rem 1rem', color: '#7A90A8' }}>—</td>
              </tr>

              {cenario.planos.map((p, i) => {
                const economia = p.diferencaMensal < 0;
                const cor = PLAN_COLORS[i % PLAN_COLORS.length];
                const varPct = ((p.mensalTotal - porto) / porto * 100);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: cor, flexShrink: 0 }} />
                        <span style={{ color: '#F8F9FC', fontWeight: 500 }}>{p.nome}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', color: '#B8C4D4' }}>{p.acomodacao}</td>
                    <td style={{ padding: '0.9rem 1rem', color: '#B8C4D4' }}>{p.permanenciaMinima}</td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <CopartBadge tipo={p.coparticipacao} />
                    </td>
                    <td style={{ padding: '0.9rem 1rem', fontFamily: 'DM Mono, monospace', color: '#F8F9FC', fontWeight: 600 }}>
                      {formatCurrency(p.mensalTotal)}
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{
                        fontFamily: 'DM Mono, monospace', fontWeight: 700,
                        color: economia ? '#4ACA8A' : '#E87878',
                        fontSize: '0.9rem',
                      }}>
                        {economia ? '−' : '+'}{formatCurrency(Math.abs(p.diferencaMensal))}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.68rem', color: '#7A90A8', marginTop: '0.1rem' }}>
                        {varPct.toFixed(1)}% vs atual
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{
                        fontFamily: 'DM Mono, monospace', fontWeight: 700,
                        color: economia ? '#4ACA8A' : '#E87878',
                        fontSize: '1rem',
                      }}>
                        {economia ? '−' : '+'}{formatCurrency(Math.abs(p.diferencaAnual))}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Two charts side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <ChartCard
            title="Mensalidade por plano"
            subtitle="vs Porto Seguro atual"
            data={chartData}
            referencia={porto}
            referenciaLabel="Porto atual"
          />
          <ChartCard
            title="Mensalidade considerando reajuste"
            subtitle={`Porto Seguro com +${portoAtual.percentualReajuste}% (${portoAtual.mesReajuste})*`}
            data={reajusteData}
            referencia={portoAtual.mensalComReajuste}
            referenciaLabel={`Porto pós-reajuste`}
            isReajuste
          />
        </div>

        <p style={{ color: '#3D526A', fontSize: '0.72rem', marginTop: '1rem', lineHeight: 1.5 }}>
          * O índice de reajuste de {portoAtual.percentualReajuste}% é estimativa baseada no histórico aplicado pela Porto Seguro para empresas de até 29 vidas.
          O índice definitivo para {portoAtual.mesReajuste} ainda não foi divulgado.
        </p>
      </div>
    </section>
  );
}

function ChartCard({ title, subtitle, data, referencia, referenciaLabel, isReajuste }: {
  title: string; subtitle: string; data: any[]; referencia: number; referenciaLabel: string; isReajuste?: boolean;
}) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '1.25rem' }}>
      <div style={{ marginBottom: '0.25rem', fontSize: '0.82rem', fontWeight: 600, color: '#F8F9FC' }}>{title}</div>
      <div style={{ marginBottom: '1rem', fontSize: '0.72rem', color: '#7A90A8' }}>{subtitle}</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 20, right: 10, bottom: 10, left: 10 }} barSize={38}>
          <XAxis
            dataKey="nome"
            tick={{ fill: '#7A90A8', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#7A90A8', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`}
            domain={[20000, 'auto']}
          />
          <Tooltip
            contentStyle={{ background: '#0F2040', border: '1px solid rgba(201,151,58,0.3)', borderRadius: 8, color: '#F8F9FC', fontSize: '0.78rem' }}
            formatter={(v: unknown) => [formatCurrency(Number(v)), 'Mensalidade']}
          />
          <ReferenceLine
            y={referencia}
            stroke={isReajuste ? '#E87878' : '#6699CC'}
            strokeDasharray="5 3"
            strokeWidth={1.5}
            label={{ value: referenciaLabel, fill: isReajuste ? '#E87878' : '#6699CC', fontSize: 10, position: 'insideTopRight' }}
          />
          <Bar dataKey="valor" radius={[5, 5, 0, 0]}>
            {data.map((entry: any, index: number) => (
              <Cell
                key={index}
                fill={
                  entry.isPorto
                    ? (isReajuste ? '#C43535' : '#4466AA')
                    : PLAN_COLORS[(index - 1) % PLAN_COLORS.length]
                }
                opacity={entry.isPorto ? 0.7 : 0.9}
              />
            ))}
            <LabelList
              dataKey="valor"
              position="top"
              style={{ fill: '#B8C4D4', fontSize: 10 }}
              formatter={(v: unknown) => `R$${(Number(v) / 1000).toFixed(1)}k`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CopartBadge({ tipo }: { tipo: PlanoNoCenario['coparticipacao'] }) {
  const map = {
    'Sem Coparticipação': { color: '#4ACA8A', bg: 'rgba(26,138,90,0.12)', border: 'rgba(26,138,90,0.3)' },
    'Coparticipação Parcial': { color: '#E8B85A', bg: 'rgba(201,151,58,0.12)', border: 'rgba(201,151,58,0.3)' },
    'Coparticipação Completa': { color: '#E87878', bg: 'rgba(196,53,53,0.12)', border: 'rgba(196,53,53,0.3)' },
  };
  const s = map[tipo];
  return (
    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 9999, padding: '0.2rem 0.65rem', whiteSpace: 'nowrap' }}>
      {tipo}
    </span>
  );
}
