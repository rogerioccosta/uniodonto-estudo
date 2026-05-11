export interface Legenda {
  codigo: string;
  descricao: string;
}

export const legendasRede: Legenda[] = [
  { codigo: 'H', descricao: 'Hospital' },
  { codigo: 'H¹', descricao: 'Hospital com restrição de atendimento' },
  { codigo: 'LAB', descricao: 'Laboratório / Centro de Diagnóstico' },
  { codigo: 'M', descricao: 'Maternidade' },
  { codigo: 'PA', descricao: 'Pronto Atendimento' },
  { codigo: 'PS', descricao: 'Pronto-Socorro' },
  { codigo: 'PS¹', descricao: 'Pronto-Socorro com restrição de atendimento' },
  { codigo: 'PSA', descricao: 'Pronto-Socorro Adulto' },
  { codigo: 'PSP', descricao: 'Pronto-Socorro Pediátrico' },
];

export const legendasStatus = {
  mantido: 'Prestador mantido em relação ao Porto Seguro atual',
  adicionado: 'Prestador adicional não presente no Porto Seguro',
  perdido: 'Prestador presente no Porto Seguro não disponível nesta operadora',
  naoComparado: 'Não comparado / dados insuficientes',
};
