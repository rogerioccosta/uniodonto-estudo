export function formatCurrency(value: number, decimals = 2): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDiff(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '−' : '+';
  return `${sign} ${formatCurrency(abs)}`;
}

export function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function calcVariacao(atual: number, novo: number): number {
  return ((novo - atual) / atual) * 100;
}
