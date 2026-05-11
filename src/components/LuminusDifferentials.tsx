import React from 'react';
import { diferenciaisLuminus, etapasProcesso, contatoLuminus } from '../data/luminus';

export default function LuminusDifferentials() {
  return (
    <section id="luminus" style={{ padding: '4rem 3rem', background: 'linear-gradient(180deg, rgba(10,22,40,0.8) 0%, rgba(15,32,64,0.6) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #C9973A, #E8B85A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', color: '#0A1628', margin: '0 auto 1rem' }}>
            LS
          </div>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            {contatoLuminus.empresa}
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.5rem', color: '#F8F9FC' }}>
            Por Que Escolher a Luminus?
          </h2>
          <p style={{ color: '#7A90A8', marginTop: '0.75rem', maxWidth: 520, lineHeight: 1.7, fontSize: '0.9rem', margin: '0.75rem auto 0' }}>
            {contatoLuminus.tagline}
          </p>
        </div>

        {/* Differentials grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {diferenciaisLuminus.map((d) => (
            <div key={d.titulo} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12,
              padding: '1.25rem',
              transition: 'border-color 0.2s',
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{d.icone}</div>
              <h4 style={{ fontSize: '0.95rem', color: '#F8F9FC', fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>{d.titulo}</h4>
              <p style={{ color: '#7A90A8', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{d.descricao}</p>
              {d.detalhe && (
                <p style={{ color: '#C9973A', fontSize: '0.78rem', marginTop: '0.5rem', fontStyle: 'italic' }}>{d.detalhe}</p>
              )}
            </div>
          ))}
        </div>

        {/* Process timeline */}
        <div style={{ background: 'rgba(201,151,58,0.06)', border: '1px solid rgba(201,151,58,0.2)', borderRadius: 14, padding: '2rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#C9973A', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.5rem', fontWeight: 600 }}>
            Processo de Implantação
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {etapasProcesso.map((e, i) => (
              <div key={e.numero} style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #C9973A, #E8B85A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#0A1628',
                    flexShrink: 0,
                  }}>
                    {e.numero}
                  </div>
                  {i < etapasProcesso.length - 1 && (
                    <div style={{ flex: 1, height: 1, background: 'rgba(201,151,58,0.25)' }} />
                  )}
                </div>
                <div style={{ fontSize: '0.83rem', fontWeight: 600, color: '#F8F9FC', marginBottom: '0.3rem' }}>{e.titulo}</div>
                <div style={{ fontSize: '0.75rem', color: '#7A90A8', lineHeight: 1.5 }}>{e.descricao}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
