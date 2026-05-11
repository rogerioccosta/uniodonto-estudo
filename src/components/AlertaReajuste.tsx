import { portoAtual } from '../data/cenarios';
import { formatCurrency } from '../utils/formatting';

export default function AlertaReajuste() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(196,53,53,0.1), rgba(196,53,53,0.05))',
      border: '1px solid rgba(196,53,53,0.35)',
      borderRadius: 10,
      padding: '1rem 1.25rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.05rem' }}>⚠️</span>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.72rem', fontWeight: 700, color: '#E87878',
          textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem',
        }}>
          Atenção — Reajuste Porto Seguro em {portoAtual.mesReajuste}
        </div>
        <p style={{ color: '#B8C4D4', fontSize: '0.87rem', lineHeight: 1.65, margin: 0 }}>
          O índice de reajuste para {portoAtual.mesReajuste} ainda não foi divulgado.
          Com base no percentual histórico aplicado pela Porto Seguro para empresas
          de até 29 vidas de{' '}
          <strong style={{ color: '#E8B85A' }}>{portoAtual.percentualReajuste}%</strong>,
          a mensalidade passaria de{' '}
          <strong style={{ color: '#F8F9FC', fontFamily: 'DM Mono, monospace' }}>
            {formatCurrency(portoAtual.mensalTotal)}
          </strong>{' '}
          para aproximadamente{' '}
          <strong style={{ color: '#E87878', fontFamily: 'DM Mono, monospace' }}>
            {formatCurrency(portoAtual.mensalComReajuste)}
          </strong>{' '}
          ao mês — tornando os cenários alternativos ainda mais favoráveis.
        </p>
      </div>
    </div>
  );
}
