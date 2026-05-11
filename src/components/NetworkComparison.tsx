import React from 'react';
import { resumoRede } from '../data/rede';

export default function NetworkComparison() {
  return (
    <section id="rede" style={{ padding: '4rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Rede Credenciada
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.5rem', color: '#F8F9FC' }}>
            Comparativo de Prestadores
          </h2>
          <p style={{ color: '#7A90A8', marginTop: '0.75rem', maxWidth: 600, lineHeight: 1.7, fontSize: '0.9rem' }}>
            Análise dos prestadores hospitalares mantidos, ganhos e perdidos em relação
            ao plano atual Porto Seguro. Dados extraídos do estudo de rede credenciada.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {resumoRede.map((r) => (
            <OperadoraRedeCard key={r.operadora} resumo={r} />
          ))}
        </div>

        {/* Alertas de validação */}
        <div style={{ background: 'rgba(201,151,58,0.08)', border: '1px solid rgba(201,151,58,0.25)', borderRadius: 10, padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem', marginTop: '0.1rem' }}>⚠️</span>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#E8B85A', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Pontos para Validação
              </div>
              <ul style={{ color: '#B8C4D4', fontSize: '0.875rem', lineHeight: 1.7, margin: 0, paddingLeft: '1.2rem' }}>
                <li>A lista de laboratórios (300+ unidades) requer validação das unidades específicas de interesse dos colaboradores.</li>
                <li>Prestadores exclusivos Porto Seguro devem ser identificados e avaliados conforme localização dos colaboradores.</li>
                <li>Hospitais com restrição de atendimento (H¹, PS¹) devem ter as restrições confirmadas com as operadoras.</li>
                <li>Portabilidade de carências sujeita à análise de elegibilidade pelas operadoras destino.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OperadoraRedeCard({ resumo }: { resumo: typeof resumoRede[0] }) {
  const cor = resumo.operadora === 'Amil' ? '#E8000D' : '#FF6600';

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: cor, flexShrink: 0 }} />
        <h3 style={{ fontSize: '1.05rem', color: '#F8F9FC', margin: 0 }}>{resumo.operadora}</h3>
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#4ACA8A', background: 'rgba(26,138,90,0.15)', border: '1px solid rgba(26,138,90,0.3)', borderRadius: 9999, padding: '0.2rem 0.75rem', fontWeight: 600 }}>
          {resumo.percentualCobertura} cobertura
        </span>
      </div>
      <div style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <StatusCount
            count={resumo.totalMantidos}
            label="Mantidos"
            color="#4ACA8A"
            bg="rgba(26,138,90,0.12)"
            border="rgba(26,138,90,0.3)"
          />
          <StatusCount
            count={resumo.totalGanhos}
            label="Ganhos"
            color="#E8B85A"
            bg="rgba(201,151,58,0.12)"
            border="rgba(201,151,58,0.3)"
          />
          <StatusCount
            count={resumo.totalPerdidos}
            label="Perdidos"
            color="#E87878"
            bg="rgba(196,53,53,0.12)"
            border="rgba(196,53,53,0.3)"
          />
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: resumo.totalMantidos, background: '#1A8A5A', transition: 'flex 0.5s' }} />
            <div style={{ flex: resumo.totalGanhos, background: '#C9973A', transition: 'flex 0.5s' }} />
            <div style={{ flex: resumo.totalPerdidos, background: '#C43535', transition: 'flex 0.5s' }} />
          </div>
        </div>

        <p style={{ color: '#7A90A8', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
          {resumo.observacao}
        </p>
      </div>
    </div>
  );
}

function StatusCount({ count, label, color, bg, border }: {
  count: number; label: string; color: string; bg: string; border: string;
}) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color, fontFamily: 'DM Mono, monospace' }}>{count}</div>
      <div style={{ fontSize: '0.7rem', color, marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
    </div>
  );
}
