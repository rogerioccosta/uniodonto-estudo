export interface DiferencialLuminus {
  icone: string;
  titulo: string;
  descricao: string;
  detalhe?: string;
}

export interface EtapaProcesso {
  numero: number;
  titulo: string;
  descricao: string;
}

export const diferenciaisLuminus: DiferencialLuminus[] = [
  {
    icone: '🎯',
    titulo: 'Assessoria Consultiva Especializada',
    descricao: 'Análise técnica aprofundada do mercado de benefícios, com comparativos personalizados e recomendações baseadas no perfil da empresa.',
    detalhe: 'Não somos apenas corretores — somos parceiros estratégicos na gestão de benefícios corporativos.',
  },
  {
    icone: '🔄',
    titulo: 'Gestão Ativa de Sinistros',
    descricao: 'Acompanhamento e intervenção proativa em casos de sinistros complexos, negociando com as operadoras em nome do cliente.',
    detalhe: 'Redução de glosas e melhora nas relações com prestadores.',
  },
  {
    icone: '📊',
    titulo: 'Relatórios de Utilização',
    descricao: 'Relatórios periódicos com análise de sinistralidade, ranking de utilizações e alertas para controle de custos.',
    detalhe: 'Informação para tomada de decisão — não apenas dados brutos.',
  },
  {
    icone: '🤝',
    titulo: 'Atendimento Exclusivo',
    descricao: 'Canal dedicado de atendimento para RH e colaboradores, com suporte na resolução de problemas com operadoras.',
    detalhe: 'Tempo médio de resposta inferior a 4 horas úteis.',
  },
  {
    icone: '📋',
    titulo: 'Implantação Assistida',
    descricao: 'Suporte completo durante a transição de operadora: portabilidade de carências, inclusões, carteirinhas e comunicação interna.',
    detalhe: 'Cronograma estruturado com marcos claros e responsáveis definidos.',
  },
  {
    icone: '💡',
    titulo: 'Revisão Anual de Benefícios',
    descricao: 'Revisão anual do portfólio de benefícios com análise de mercado, benchmarking e propostas de renovação antecipadas.',
    detalhe: 'Evite reajustes surpresa — planeje com antecedência.',
  },
  {
    icone: '🏥',
    titulo: 'Inteligência de Rede',
    descricao: 'Análise detalhada da rede credenciada por região, com identificação de prestadores estratégicos para o perfil da empresa.',
    detalhe: 'Comparativos de rede personalizados por cidade e especialidade.',
  },
  {
    icone: '⚖️',
    titulo: 'Compliance e Regulatório',
    descricao: 'Orientação sobre obrigações legais, regulação ANS e boas práticas na gestão de benefícios de saúde.',
    detalhe: 'Sua empresa em conformidade, sempre.',
  },
];

export const etapasProcesso: EtapaProcesso[] = [
  {
    numero: 1,
    titulo: 'Reunião de Alinhamento',
    descricao: 'Apresentação deste estudo, validação dos dados e alinhamento das prioridades da Uniodonto Paulista.',
  },
  {
    numero: 2,
    titulo: 'Validação Técnica',
    descricao: 'Confirmação das coberturas, rede credenciada e condições comerciais com as operadoras selecionadas.',
  },
  {
    numero: 3,
    titulo: 'Proposta Formalizada',
    descricao: 'Emissão de proposta formal com condições definitivas, vigência e cronograma de implantação.',
  },
  {
    numero: 4,
    titulo: 'Aprovação e Assinatura',
    descricao: 'Aprovação pela diretoria e assinatura dos contratos com a nova operadora.',
  },
  {
    numero: 5,
    titulo: 'Implantação',
    descricao: 'Migração assistida pela Luminus Seguros: portabilidade de carências, inclusões e distribuição de carteirinhas.',
  },
  {
    numero: 6,
    titulo: 'Acompanhamento',
    descricao: 'Gestão ativa do plano com relatórios trimestrais e suporte contínuo.',
  },
];

export const contatoLuminus = {
  empresa: 'Luminus Seguros',
  especialista: 'Rogério',
  email: 'rogerio@luminusseguros.com.br',
  slogan: 'Inteligência em Benefícios Corporativos',
  tagline: 'Seu parceiro estratégico na gestão de saúde empresarial',
};
