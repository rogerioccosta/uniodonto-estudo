import React from 'react';
import { etapasProcesso, contatoLuminus } from '../data/luminus';

export default function NextSteps() {
  return (
    <section id="proximos-passos" style={{ padding: '4rem 3rem', background: 'rgba(15,32,64,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Próximos Passos
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.5rem', color: '#F8F9FC' }}>
            Como Avançamos Juntos
          </h2>
          <p style={{ color: '#7A90A8', marginTop: '0.75rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
            O processo de migração é simples, estruturado e conduzido integralmente pela Luminus Seguros
            para garantir continuidade de cobertura e zero stress para a equipe de RH.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden', marginBottom: '2.5rem' }}>
          {etapasProcesso.map((etapa, i) => (
            <div key={etapa.numero} style={{
              background: '#0A1628',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: i === 0 ? 'linear-gradient(135deg, #C9973A, #E8B85A)' : 'rgba(201,151,58,0.15)',
                border: i === 0 ? 'none' : '1px solid rgba(201,151,58,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: i === 0 ? '#0A1628' : '#C9973A',
                flexShrink: 0,
              }}>
                {etapa.numero}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8F9FC', marginBottom: '0.3rem' }}>{etapa.titulo}</div>
                <div style={{ fontSize: '0.85rem', color: '#7A90A8', lineHeight: 1.6 }}>{etapa.descricao}</div>
              </div>
              {i === 0 && (
                <span style={{ fontSize: '0.7rem', color: '#4ACA8A', background: 'rgba(26,138,90,0.15)', border: '1px solid rgba(26,138,90,0.3)', borderRadius: 9999, padding: '0.2rem 0.65rem', fontWeight: 600, flexShrink: 0, alignSelf: 'center' }}>
                  PRÓXIMO
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(201,151,58,0.12), rgba(201,151,58,0.06))',
          border: '1px solid rgba(201,151,58,0.35)',
          borderRadius: 14,
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>🤝</div>
          <h3 style={{ fontSize: '1.2rem', color: '#F8F9FC', marginBottom: '0.5rem' }}>
            Vamos agendar nossa próxima conversa?
          </h3>
          <p style={{ color: '#7A90A8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 500, margin: '0 auto 1.5rem' }}>
            A equipe Luminus está disponível para aprofundar qualquer ponto deste estudo,
            validar dados com as operadoras e apoiar a tomada de decisão da Uniodonto Paulista.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, padding: '0.6rem 1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#C9973A', fontWeight: 600 }}>{contatoLuminus.especialista}</span>
            <span style={{ color: '#3D526A' }}>·</span>
            <span style={{ fontSize: '0.85rem', color: '#B8C4D4' }}>{contatoLuminus.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
