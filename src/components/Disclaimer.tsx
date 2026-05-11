import React from 'react';

export default function Disclaimer() {
  return (
    <footer style={{ padding: '3rem', background: 'rgba(10,22,40,0.9)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,151,58,0.15)', border: '1px solid rgba(201,151,58,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
            ⚖️
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#F8F9FC', marginBottom: '0.5rem' }}>Disclaimer e Limitações</h4>
            <p style={{ color: '#7A90A8', fontSize: '0.82rem', lineHeight: 1.75, margin: 0 }}>
              Este estudo foi elaborado pela <strong style={{ color: '#B8C4D4' }}>Luminus Seguros</strong> com base nos documentos fornecidos
              e nas informações disponíveis no momento da análise (Maio de 2026). Os valores apresentados são
              <strong style={{ color: '#B8C4D4' }}> estimativas baseadas nos PDFs fornecidos</strong> e podem diferir dos valores
              finalmente ofertados pelas operadoras após análise técnica e subscrição. Itens marcados como
              <em style={{ color: '#E8B85A' }}> "necessita validação"</em> não foram confirmados junto às operadoras e devem ser
              verificados antes de qualquer decisão.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              titulo: 'Rede Credenciada',
              texto: 'A composição da rede credenciada pode ser alterada pelas operadoras sem aviso prévio. Os dados de rede utilizados são os disponíveis no momento da elaboração do estudo.',
            },
            {
              titulo: 'Coparticipação',
              texto: 'Os valores de coparticipação apresentados são baseados nas tabelas fornecidas. Consultar contrato definitivo para condições exatas.',
            },
            {
              titulo: 'Portabilidade de Carências',
              texto: 'A elegibilidade para portabilidade de carências está sujeita à análise individual pela operadora destino, conforme RN ANS 438/2018.',
            },
            {
              titulo: 'Vigência dos Dados',
              texto: 'Este estudo tem validade de 90 dias a partir da data de elaboração. Após esse prazo, recomenda-se solicitar atualização das condições.',
            },
          ].map((item) => (
            <div key={item.titulo} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B8C4D4', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.titulo}</div>
              <p style={{ color: '#7A90A8', fontSize: '0.78rem', lineHeight: 1.6, margin: 0 }}>{item.texto}</p>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #C9973A, #E8B85A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.7rem', color: '#0A1628' }}>
              LS
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#B8C4D4' }}>Luminus Seguros</div>
              <div style={{ fontSize: '0.7rem', color: '#7A90A8' }}>Inteligência em Benefícios Corporativos</div>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7A90A8', textAlign: 'right' }}>
            <div>Estudo Uniodonto Paulista — Maio 2026</div>
            <div style={{ marginTop: '0.2rem', color: '#3D526A' }}>Documento confidencial — uso interno</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
