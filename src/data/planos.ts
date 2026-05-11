export type OperadoraId = 'porto' | 'amil' | 'sulamerica';

export interface FaixaEtaria {
  faixa: string;
  vidas: number;
}

export interface Coparticipacao {
  consultas: string;
  examesSimples: string;
  examesEspeciais: string;
  internacoes: string;
  pronto: string;
  observacoes?: string;
}

export interface PlanoInfo {
  id: OperadoraId;
  operadora: string;
  produto: string;
  acomodacao: string;
  abrangencia: string;
  coparticipacao: Coparticipacao;
  reembolso: string;
  prazoCarencia: string;
  cor: string;
  corClara: string;
}

export const faixasEtarias: FaixaEtaria[] = [
  { faixa: '00–18', vidas: 15 },
  { faixa: '19–23', vidas: 1 },
  { faixa: '24–28', vidas: 5 },
  { faixa: '29–33', vidas: 13 },
  { faixa: '34–38', vidas: 7 },
  { faixa: '39–43', vidas: 5 },
  { faixa: '44–48', vidas: 4 },
  { faixa: '49–53', vidas: 1 },
  { faixa: '54–58', vidas: 2 },
];

export const totalVidas = faixasEtarias.reduce((s, f) => s + f.vidas, 0); // 53

export const planosInfo: Record<OperadoraId, PlanoInfo> = {
  porto: {
    id: 'porto',
    operadora: 'Porto Seguro',
    produto: 'Saúde Empresarial',
    acomodacao: 'Apartamento',
    abrangencia: 'Nacional',
    coparticipacao: {
      consultas: 'Sem coparticipação',
      examesSimples: 'Sem coparticipação',
      examesEspeciais: 'Sem coparticipação',
      internacoes: 'Sem coparticipação',
      pronto: 'Sem coparticipação',
    },
    reembolso: 'R$ 95,00',
    prazoCarencia: 'Cumpridas (plano em vigor)',
    cor: '#0066CC',
    corClara: 'rgba(0,102,204,0.15)',
  },
  amil: {
    id: 'amil',
    operadora: 'Amil',
    produto: 'Saúde Empresarial',
    acomodacao: 'Apartamento',
    abrangencia: 'Nacional',
    coparticipacao: {
      consultas: '30% — mín. R$ 15 / máx. R$ 60',
      examesSimples: '30% — mín. R$ 15 / máx. R$ 60',
      examesEspeciais: '30% — mín. R$ 15 / máx. R$ 300',
      internacoes: 'Sem coparticipação',
      pronto: 'R$ 150,00 por utilização',
      observacoes: 'Coparticipação aplicada sobre tabela CBHPM',
    },
    reembolso: 'Necessita validação',
    prazoCarencia: 'Portabilidade de carências disponível',
    cor: '#E8000D',
    corClara: 'rgba(232,0,13,0.12)',
  },
  sulamerica: {
    id: 'sulamerica',
    operadora: 'SulAmérica',
    produto: 'Saúde Empresarial',
    acomodacao: 'Apartamento',
    abrangencia: 'Nacional',
    coparticipacao: {
      consultas: '30% — mín. R$ 15 / máx. R$ 60',
      examesSimples: '30% — mín. R$ 15 / máx. R$ 60',
      examesEspeciais: '30% — mín. R$ 15 / máx. R$ 300',
      internacoes: 'Sem coparticipação',
      pronto: 'R$ 150,00 por utilização',
      observacoes: 'Coparticipação aplicada sobre tabela CBHPM',
    },
    reembolso: 'Necessita validação',
    prazoCarencia: 'Portabilidade de carências disponível',
    cor: '#FF6600',
    corClara: 'rgba(255,102,0,0.12)',
  },
};
