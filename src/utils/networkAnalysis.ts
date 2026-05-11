import { prestadores, getStatusForPlan, type TipoPrestador } from '../data/rede';

export interface FiltrosRede {
  cidade: string;
  tipo: string;
  status: string;
  busca: string;
  planNome?: string;
}

export function filtrarPrestadores(filtros: FiltrosRede) {
  return prestadores.filter(p => {
    if (filtros.planNome) {
      const status = getStatusForPlan(p, filtros.planNome);
      if (status === null) return false;
      if (filtros.status && filtros.status !== 'Todos' && status !== filtros.status) return false;
    }
    if (filtros.cidade && filtros.cidade !== 'Todas' && p.cidade !== filtros.cidade) return false;
    if (filtros.tipo && filtros.tipo !== 'Todos' && !p.tipo.includes(filtros.tipo as TipoPrestador)) return false;
    if (filtros.busca) {
      const q = filtros.busca.toLowerCase();
      if (!p.nome.toLowerCase().includes(q) && !p.cidade.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export function contarPorPlano(planNome: string) {
  return {
    mantidos: prestadores.filter(p => getStatusForPlan(p, planNome) === 'mantido').length,
    ganhos:   prestadores.filter(p => getStatusForPlan(p, planNome) === 'ganho').length,
    perdidos: prestadores.filter(p => getStatusForPlan(p, planNome) === 'perdido').length,
  };
}
