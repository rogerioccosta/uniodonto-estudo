import { useState } from 'react';

interface ValidacaoItem {
  id: string;
  campo: string;
  valorEstudo: string;
  fonte: string;
  status: 'confirmado' | 'pendente' | 'necessita_validacao';
  nota?: string;
}

const itensValidacao: ValidacaoItem[] = [
  // Porto Seguro
  { id: 'ps-mensal', campo: 'Porto Seguro — Mensalidade total', valorEstudo: 'R$ 35.568,48', fonte: 'PDF Estudo p.1', status: 'confirmado' },
  { id: 'ps-reembolso', campo: 'Porto Seguro — Reembolso', valorEstudo: 'R$ 95,00', fonte: 'PDF Estudo', status: 'confirmado' },
  { id: 'ps-vidas', campo: 'Total de vidas', valorEstudo: '53 vidas (9 faixas etárias)', fonte: 'PDF Estudo — tabela de composição', status: 'confirmado' },
  { id: 'ps-acomodacao', campo: 'Acomodação Porto Seguro', valorEstudo: 'Apartamento', fonte: 'PDF Estudo', status: 'confirmado' },
  // Cenário 1 — Amil com copart
  { id: 'c1-amil-mensal', campo: 'Cenário 1 — Amil 400 (c/ copart.) mensalidade', valorEstudo: 'R$ 30.235,44', fonte: 'PDF Estudo — Cenário 1', status: 'confirmado' },
  { id: 'c1-amil-anual', campo: 'Cenário 1 — Amil 400 (c/ copart.) anual', valorEstudo: 'R$ 362.825,28', fonte: 'PDF Estudo — Cenário 1', status: 'confirmado' },
  { id: 'c1-economia', campo: 'Cenário 1 — Economia anual vs Porto', valorEstudo: 'R$ 63.996,48', fonte: 'Calculado: diferença anual', status: 'confirmado' },
  // Cenário 2 — Amil sem copart
  { id: 'c2-amil-mensal', campo: 'Cenário 2 — Amil 400 (sem copart.) mensalidade', valorEstudo: 'R$ 33.258,98', fonte: 'PDF Estudo — Cenário 2', status: 'confirmado' },
  // Cenário 3 — SulAmérica com copart
  { id: 'c3-sula-mensal', campo: 'Cenário 3 — SulAmérica Esp.300 (c/ copart.) mensalidade', valorEstudo: 'R$ 29.847,62', fonte: 'PDF Estudo — Cenário 3', status: 'confirmado' },
  { id: 'c3-economia', campo: 'Cenário 3 — Economia anual (maior saving)', valorEstudo: 'R$ 68.650,32', fonte: 'Calculado: diferença anual', status: 'confirmado' },
  // Cenário 4 — SulAmérica sem copart
  { id: 'c4-sula-mensal', campo: 'Cenário 4 — SulAmérica Esp.300 (sem copart.) mensalidade', valorEstudo: 'R$ 32.832,38', fonte: 'PDF Estudo — Cenário 4', status: 'confirmado' },
  // Coparticipações
  { id: 'copart-consultas', campo: 'Coparticipação consultas (Amil e SulAm.)', valorEstudo: '30%, mín. R$15, máx. R$60', fonte: 'PDF Estudo — tabela coparticipação', status: 'confirmado' },
  { id: 'copart-exames-especiais', campo: 'Coparticipação exames especiais', valorEstudo: '30%, máx. R$300', fonte: 'PDF Estudo — tabela coparticipação', status: 'confirmado' },
  { id: 'copart-pronto', campo: 'Coparticipação urgência/emergência', valorEstudo: 'R$ 150,00 por utilização', fonte: 'PDF Estudo — tabela coparticipação', status: 'confirmado' },
  // Rede
  { id: 'rede-amil-reembolso', campo: 'Amil — Valor de reembolso', valorEstudo: 'Não especificado no PDF', fonte: '—', status: 'necessita_validacao', nota: 'Confirmar com Amil o valor de reembolso para o produto 400 Nacional' },
  { id: 'rede-sula-reembolso', campo: 'SulAmérica — Valor de reembolso', valorEstudo: 'Não especificado no PDF', fonte: '—', status: 'necessita_validacao', nota: 'Confirmar com SulAmérica o valor de reembolso para o Especial 300' },
  { id: 'rede-labs', campo: 'Rede de laboratórios específicos', valorEstudo: '300+ unidades listadas no PDF', fonte: 'PDF Rede — p. 2–14', status: 'necessita_validacao', nota: 'Lista completa extraída do PDF. Validar unidades de interesse por CEP dos colaboradores.' },
  { id: 'rede-exclusivos-porto', campo: 'Prestadores exclusivos Porto Seguro', valorEstudo: 'Necessita identificação', fonte: '—', status: 'pendente', nota: 'Identificar prestadores no plano atual que NÃO estão na Amil ou SulAmérica na região dos colaboradores.' },
  { id: 'portabilidade', campo: 'Elegibilidade para portabilidade de carências', valorEstudo: 'Provisoriamente aplicável', fonte: 'RN ANS 438/2018', status: 'pendente', nota: 'Confirmar tempo de vigência do contrato Porto Seguro e elegibilidade individual dos beneficiários.' },
  { id: 'faixas-individuais', campo: 'Valores individuais por faixa etária — Amil/SulAm.', valorEstudo: 'Calculados proporcionalmente', fonte: 'PDF Estudo + proporção ANS', status: 'pendente', nota: 'Os valores por faixa foram estimados com base na tabela ANS. Confirmar tabela atualizada com as operadoras.' },
];

export default function DataValidation() {
  const [filtro, setFiltro] = useState<'todos' | 'confirmado' | 'pendente' | 'necessita_validacao'>('todos');
  const [visivel, setVisivel] = useState(true);

  const filtrados = itensValidacao.filter((i) => filtro === 'todos' || i.status === filtro);

  const counts = {
    confirmado: itensValidacao.filter((i) => i.status === 'confirmado').length,
    pendente: itensValidacao.filter((i) => i.status === 'pendente').length,
    necessita_validacao: itensValidacao.filter((i) => i.status === 'necessita_validacao').length,
  };

  const statusConfig = {
    confirmado: { label: 'Confirmado', cor: '#4ACA8A', bg: 'rgba(26,138,90,0.15)', border: 'rgba(26,138,90,0.35)' },
    pendente: { label: 'Pendente', cor: '#E8B85A', bg: 'rgba(201,151,58,0.15)', border: 'rgba(201,151,58,0.35)' },
    necessita_validacao: { label: 'Necessita Validação', cor: '#E87878', bg: 'rgba(196,53,53,0.15)', border: 'rgba(196,53,53,0.35)' },
  };

  if (!visivel) return (
    <div style={{ padding: '1rem 3rem', background: 'rgba(201,151,58,0.05)', borderBottom: '1px solid rgba(201,151,58,0.2)' }}>
      <button onClick={() => setVisivel(true)} style={{ background: 'none', border: 'none', color: '#C9973A', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>
        🔍 Exibir Painel de Validação de Dados
      </button>
    </div>
  );

  return (
    <section style={{ padding: '3rem', background: 'rgba(201,151,58,0.05)', borderBottom: '1px solid rgba(201,151,58,0.25)', borderTop: '1px solid rgba(201,151,58,0.25)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.1rem' }}>🔍</span>
              <h2 style={{ fontSize: '1.1rem', color: '#E8B85A', margin: 0 }}>Painel de Validação de Dados</h2>
            </div>
            <p style={{ color: '#7A90A8', fontSize: '0.82rem', margin: 0 }}>
              Rastreabilidade de todos os dados utilizados no estudo. Itens marcados como "Necessita Validação" devem ser confirmados antes da decisão.
            </p>
          </div>
          <button
            onClick={() => setVisivel(false)}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#7A90A8', cursor: 'pointer', fontSize: '0.8rem', padding: '0.4rem 0.75rem', fontFamily: 'DM Sans, sans-serif' }}
          >
            Minimizar ✕
          </button>
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {(['todos', 'confirmado', 'pendente', 'necessita_validacao'] as const).map((f) => {
            const count = f === 'todos' ? itensValidacao.length : counts[f];
            const config = f === 'todos' ? { label: 'Todos', cor: '#7A90A8', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' } : statusConfig[f];
            return (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 9999,
                  border: `1px solid ${filtro === f ? config.cor : config.border}`,
                  background: filtro === f ? config.bg : 'transparent',
                  color: filtro === f ? config.cor : '#7A90A8',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: filtro === f ? 600 : 400,
                }}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                {['Campo / Dado', 'Valor no Estudo', 'Fonte', 'Status', 'Nota'].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#7A90A8', fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((item) => {
                const sc = statusConfig[item.status];
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.65rem 1rem', color: '#B8C4D4', maxWidth: 220 }}>{item.campo}</td>
                    <td style={{ padding: '0.65rem 1rem', color: '#F8F9FC', fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{item.valorEstudo}</td>
                    <td style={{ padding: '0.65rem 1rem', color: '#7A90A8', fontSize: '0.75rem' }}>{item.fonte}</td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span style={{ fontSize: '0.7rem', color: sc.cor, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 9999, padding: '0.2rem 0.65rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {sc.label}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: '#7A90A8', fontSize: '0.75rem', maxWidth: 240, lineHeight: 1.5 }}>{item.nota ?? '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
