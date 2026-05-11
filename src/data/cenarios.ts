export type Operadora = 'Amil' | 'SulAmérica';

export interface FaixaPlano {
  faixa: string;
  vidas: number;
  valor: number;
}

export interface PlanoNoCenario {
  id: string;
  nome: string;
  operadora: Operadora;
  acomodacao: 'Apartamento' | 'Enfermaria';
  permanenciaMinima: string;
  coparticipacao: 'Sem Coparticipação' | 'Coparticipação Parcial' | 'Coparticipação Completa';
  mensalTotal: number;
  anualTotal: number;
  diferencaMensal: number;
  diferencaAnual: number;
  valoresPorFaixa: FaixaPlano[];
}

export interface Cenario {
  id: number;
  titulo: string;
  subtitulo: string;
  descricao: string;
  planos: PlanoNoCenario[];
}

// ────────────────────────────────────────────────────────────
// PORTO SEGURO — plano atual (referência)
// Porto Seguro POSSUI coparticipação — cenários sem/parcial são ganho
// ────────────────────────────────────────────────────────────
export const portoAtual = {
  nome: 'Porto Seguro (Atual)',
  mensalTotal: 35568.48,
  anualTotal: 426821.76,
  reembolso: 'R$ 95,00',
  coparticipacao: 'Com Coparticipação',
  mensalComReajuste: 40002.89,
  percentualReajuste: 12.47,
  mesReajuste: 'Agosto/2026',
};

const faixas = ['00 a 18', '19 a 23', '24 a 28', '29 a 33', '34 a 38', '39 a 43', '44 a 48', '49 a 53', '54 a 58'];
const vidas  = [15, 1, 5, 13, 7, 5, 4, 1, 2];

function faixa(valores: number[]): FaixaPlano[] {
  return faixas.map((f, i) => ({ faixa: f, vidas: vidas[i], valor: valores[i] }));
}

function diff(mensal: number) {
  return {
    diferencaMensal: parseFloat((mensal - portoAtual.mensalTotal).toFixed(2)),
    diferencaAnual:  parseFloat(((mensal - portoAtual.mensalTotal) * 12).toFixed(2)),
  };
}

// ────────────────────────────────────────────────────────────
// CENÁRIO 1 — Sem coparticipação / Parcial — Planos compatíveis
// GANHO: plano atual Porto já tem coparticipação
// ────────────────────────────────────────────────────────────
const c1Ouro: PlanoNoCenario = {
  id: 'c1-ouro', nome: 'Ouro', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Parcial',
  mensalTotal: 33374.85, anualTotal: 400498.20, ...diff(33374.85),
  valoresPorFaixa: faixa([381.56, 446.43, 544.64, 653.57, 686.25, 754.88, 943.60, 1037.96, 1297.45]),
};

const c1S450: PlanoNoCenario = {
  id: 'c1-s450', nome: 'S450', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Parcial',
  mensalTotal: 37909.36, anualTotal: 454912.32, ...diff(37909.36),
  valoresPorFaixa: faixa([433.40, 507.08, 618.64, 742.37, 779.49, 857.44, 1071.80, 1178.98, 1473.73]),
};

const c1Classico: PlanoNoCenario = {
  id: 'c1-classico100', nome: 'Clássico 100', operadora: 'SulAmérica',
  acomodacao: 'Enfermaria', permanenciaMinima: '24 meses',
  coparticipacao: 'Sem Coparticipação',
  mensalTotal: 32805.75, anualTotal: 393669.00, ...diff(32805.75),
  valoresPorFaixa: faixa([363.50, 454.39, 563.43, 625.42, 669.19, 776.26, 927.94, 1087.55, 1294.72]),
};

// ────────────────────────────────────────────────────────────
// CENÁRIO 2 — Sem coparticipação / Parcial — Upgrade de rede
// ────────────────────────────────────────────────────────────
const c2OuroII: PlanoNoCenario = {
  id: 'c2-ouroII', nome: 'Ouro II', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Parcial',
  mensalTotal: 36959.17, anualTotal: 443510.04, ...diff(36959.17),
  valoresPorFaixa: faixa([422.54, 494.37, 603.13, 723.76, 759.95, 835.95, 1044.94, 1149.43, 1436.79]),
};

const c2S750: PlanoNoCenario = {
  id: 'c2-s750r1', nome: 'S750 R1', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Parcial',
  mensalTotal: 42860.75, anualTotal: 514329.00, ...diff(42860.75),
  valoresPorFaixa: faixa([490.01, 573.31, 699.44, 839.33, 881.30, 969.43, 1211.79, 1332.97, 1666.21]),
};

const c2EspecialVital: PlanoNoCenario = {
  id: 'c2-especial-vital', nome: 'Especial Vital', operadora: 'SulAmérica',
  acomodacao: 'Apartamento', permanenciaMinima: '24 meses',
  coparticipacao: 'Sem Coparticipação',
  mensalTotal: 32268.50, anualTotal: 387222.00, ...diff(32268.50),
  valoresPorFaixa: faixa([357.56, 446.94, 554.21, 615.17, 658.23, 763.54, 912.75, 1069.74, 1273.53]),
};

const c2Especial100RC: PlanoNoCenario = {
  id: 'c2-especial100rc', nome: 'Especial 100 RC', operadora: 'SulAmérica',
  acomodacao: 'Apartamento', permanenciaMinima: '24 meses',
  coparticipacao: 'Sem Coparticipação',
  mensalTotal: 35853.34, anualTotal: 430240.08, ...diff(35853.34),
  valoresPorFaixa: faixa([397.27, 496.60, 615.78, 683.51, 731.36, 848.37, 1014.15, 1188.58, 1415.01]),
};

// ────────────────────────────────────────────────────────────
// CENÁRIO 3 — Com coparticipação — Planos compatíveis
// ────────────────────────────────────────────────────────────
const c3Ouro: PlanoNoCenario = {
  id: 'c3-ouro', nome: 'Ouro', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 25031.72, anualTotal: 300380.64, ...diff(25031.72),
  valoresPorFaixa: faixa([286.18, 334.83, 408.49, 490.19, 514.70, 566.17, 707.71, 778.48, 973.10]),
};

const c3S450: PlanoNoCenario = {
  id: 'c3-s450', nome: 'S450', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 28432.08, anualTotal: 341184.96, ...diff(28432.08),
  valoresPorFaixa: faixa([325.05, 380.31, 463.98, 556.78, 584.62, 643.08, 803.85, 884.24, 1105.30]),
};

const c3Classico: PlanoNoCenario = {
  id: 'c3-classico100', nome: 'Clássico 100', operadora: 'SulAmérica',
  acomodacao: 'Enfermaria', permanenciaMinima: '24 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 24604.32, anualTotal: 295251.84, ...diff(24604.32),
  valoresPorFaixa: faixa([272.63, 340.78, 422.57, 469.06, 501.90, 582.19, 695.96, 815.66, 971.05]),
};

// ────────────────────────────────────────────────────────────
// CENÁRIO 4 — Com coparticipação — Upgrade de rede
// ────────────────────────────────────────────────────────────
const c4OuroII: PlanoNoCenario = {
  id: 'c4-ouroII', nome: 'Ouro II', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 27719.41, anualTotal: 332632.92, ...diff(27719.41),
  valoresPorFaixa: faixa([316.91, 370.78, 452.35, 542.82, 569.96, 626.96, 783.70, 862.07, 1077.59]),
};

const c4Platinum: PlanoNoCenario = {
  id: 'c4-platinum-r1', nome: 'Platinum R1', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 34526.39, anualTotal: 414316.68, ...diff(34526.39),
  valoresPorFaixa: faixa([394.73, 461.83, 563.43, 676.12, 709.93, 780.92, 976.15, 1073.77, 1342.21]),
};

const c4S750: PlanoNoCenario = {
  id: 'c4-s750r1', nome: 'S750 R1', operadora: 'Amil',
  acomodacao: 'Apartamento', permanenciaMinima: '12 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 32146.77, anualTotal: 385761.24, ...diff(32146.77),
  valoresPorFaixa: faixa([367.52, 430.00, 524.60, 629.52, 661.00, 727.10, 908.88, 999.77, 1249.71]),
};

const c4EspecialVital: PlanoNoCenario = {
  id: 'c4-especial-vital', nome: 'Especial Vital', operadora: 'SulAmérica',
  acomodacao: 'Apartamento', permanenciaMinima: '24 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 24201.13, anualTotal: 290413.56, ...diff(24201.13),
  valoresPorFaixa: faixa([268.16, 335.20, 415.65, 461.38, 493.67, 572.66, 684.56, 802.30, 955.13]),
};

const c4Especial100RC: PlanoNoCenario = {
  id: 'c4-especial100rc', nome: 'Especial 100 RC', operadora: 'SulAmérica',
  acomodacao: 'Apartamento', permanenciaMinima: '24 meses',
  coparticipacao: 'Coparticipação Completa',
  mensalTotal: 26890.26, anualTotal: 322683.12, ...diff(26890.26),
  valoresPorFaixa: faixa([297.95, 372.45, 461.84, 512.64, 548.52, 636.28, 760.61, 891.44, 1061.26]),
};

// ────────────────────────────────────────────────────────────
// EXPORT
// ────────────────────────────────────────────────────────────
export const cenarios: Cenario[] = [
  {
    id: 1,
    titulo: 'Cenário 1',
    subtitulo: 'Planos compatíveis ao atual',
    descricao: 'Sem coparticipação ou parcial — em produtos de rede equivalente ao Porto Seguro vigente. Como o plano atual já possui coparticipação, a redução ou eliminação representa ganho direto para os colaboradores.',
    planos: [c1Ouro, c1S450, c1Classico],
  },
  {
    id: 2,
    titulo: 'Cenário 2',
    subtitulo: 'Upgrade em rede e diferenciais',
    descricao: 'Sem coparticipação ou parcial — em produtos com rede ampliada e diferenciais superiores. Eliminar ou reduzir a coparticipação representa um ganho real vs o plano Porto Seguro atual.',
    planos: [c2OuroII, c2S750, c2EspecialVital, c2Especial100RC],
  },
  {
    id: 3,
    titulo: 'Cenário 3',
    subtitulo: 'Com coparticipação — planos compatíveis',
    descricao: 'Coparticipação completa aplicada em todos os planos, mantendo rede equivalente ao plano atual. Maior potencial de economia mensal para a empresa.',
    planos: [c3Ouro, c3S450, c3Classico],
  },
  {
    id: 4,
    titulo: 'Cenário 4',
    subtitulo: 'Com coparticipação — upgrade de rede',
    descricao: 'Coparticipação completa com acesso a rede ampliada e produtos premium. Combina gestão de custos com cobertura diferenciada.',
    planos: [c4OuroII, c4Platinum, c4S750, c4EspecialVital, c4Especial100RC],
  },
];
