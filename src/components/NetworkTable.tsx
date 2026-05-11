import { useState, useRef, useEffect } from 'react';
import { prestadores, cidadesDisponiveis, getStatusForPlan } from '../data/rede';
import type { StatusPrestador, TipoPrestador } from '../data/rede';
import { legendasRede } from '../data/legendas';
import type { Cenario, PlanoNoCenario } from '../data/cenarios';

interface Props {
  cenario: Cenario;
}

const CITY_OPTIONS = cidadesDisponiveis.filter(c => c !== 'Todas');

const SP_ZONES = ['SP Centro', 'SP Zona Leste', 'SP Zona Norte', 'SP Zona Oeste', 'SP Zona Sul', 'São Paulo'];
const GRANDE_SP = [
  'Arujá', 'Barueri', 'Caieiras', 'Cajamar', 'Carapicuíba', 'Cotia', 'Diadema',
  'Embu das Artes', 'Ferraz de Vasconcelos', 'Franco da Rocha', 'Guarulhos',
  'Itapecerica da Serra', 'Itapevi', 'Itaquaquecetuba', 'Mauá', 'Mogi das Cruzes',
  'Osasco', 'Ribeirão Pires', 'Santo André', 'São Bernardo do Campo',
  'São Caetano do Sul', 'Suzano', 'Taboão da Serra',
];
const DEFAULT_CITIES = [...SP_ZONES, ...GRANDE_SP].filter(c => CITY_OPTIONS.includes(c));

export default function NetworkTable({ cenario }: Props) {
  const amilPlanos = cenario.planos.filter(p => p.operadora === 'Amil');
  const sulaPlanos = cenario.planos.filter(p => p.operadora === 'SulAmérica');

  const [selectedPlan, setSelectedPlan] = useState<PlanoNoCenario>(cenario.planos[0]);
  const [cidades, setCidades] = useState<string[]>(DEFAULT_CITIES);
  const [categoria, setCategoria] = useState<'Todos' | 'Hospital' | 'Laboratório'>('Todos');
  const [status, setStatus] = useState<string>('ganho');
  const [busca, setBusca] = useState('');

  const handlePlanSelect = (plan: PlanoNoCenario) => {
    setSelectedPlan(plan);
    setCidades(DEFAULT_CITIES);
    setCategoria('Todos');
    setStatus('ganho');
    setBusca('');
  };

  const toggleCidade = (city: string) => {
    setCidades(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const clearCidades = () => setCidades([]);

  const LAB_TIPOS: TipoPrestador[] = ['LAB'];
  const HOSP_TIPOS: TipoPrestador[] = ['H', 'H¹', 'M', 'PS', 'PS¹', 'PA', 'PSP'];

  // Filter prestadores
  const filtered = prestadores.filter(p => {
    const st = getStatusForPlan(p, selectedPlan.nome);
    if (st === null) return false;
    if (cidades.length > 0 && !cidades.includes(p.cidade)) return false;
    if (categoria === 'Laboratório' && !p.tipo.some(t => LAB_TIPOS.includes(t))) return false;
    if (categoria === 'Hospital' && !p.tipo.some(t => HOSP_TIPOS.includes(t))) return false;
    if (status !== 'Todos' && st !== status) return false;
    if (busca) {
      const q = busca.toLowerCase();
      if (!p.nome.toLowerCase().includes(q) && !p.cidade.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const allForPlan = prestadores.filter(p => getStatusForPlan(p, selectedPlan.nome) !== null);
  // Badges reflect city + categoria filters
  const cityFiltered = allForPlan.filter(p => {
    if (cidades.length > 0 && !cidades.includes(p.cidade)) return false;
    if (categoria === 'Laboratório' && !p.tipo.some(t => LAB_TIPOS.includes(t))) return false;
    if (categoria === 'Hospital' && !p.tipo.some(t => HOSP_TIPOS.includes(t))) return false;
    return true;
  });
  const mantidos = cityFiltered.filter(p => getStatusForPlan(p, selectedPlan.nome) === 'mantido').length;
  const ganhos   = cityFiltered.filter(p => getStatusForPlan(p, selectedPlan.nome) === 'ganho').length;
  const perdidos = cityFiltered.filter(p => getStatusForPlan(p, selectedPlan.nome) === 'perdido').length;

  const badgeStatus = (st: StatusPrestador | null) => {
    if (st === 'mantido') return <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4ACA8A', background: 'rgba(26,138,90,0.12)', border: '1px solid rgba(26,138,90,0.3)', borderRadius: 9999, padding: '0.2rem 0.65rem', whiteSpace: 'nowrap' }}>✓ Mantido</span>;
    if (st === 'ganho')   return <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#E8B85A', background: 'rgba(201,151,58,0.12)', border: '1px solid rgba(201,151,58,0.3)', borderRadius: 9999, padding: '0.2rem 0.65rem', whiteSpace: 'nowrap' }}>+ Ganho</span>;
    if (st === 'perdido') return <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#E87878', background: 'rgba(196,53,53,0.12)', border: '1px solid rgba(196,53,53,0.3)', borderRadius: 9999, padding: '0.2rem 0.65rem', whiteSpace: 'nowrap' }}>− Perdido</span>;
    return <span style={{ color: '#7A90A8' }}>—</span>;
  };

  return (
    <section id="tabela-rede" style={{ padding: '4rem 3rem', background: 'rgba(15,32,64,0.4)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Mapeamento de Rede — {cenario.titulo}
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.5rem', color: '#F8F9FC' }}>
            Tabela de Prestadores
          </h2>
          <p style={{ color: '#7A90A8', fontSize: '0.87rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
            Selecione o plano para ver a rede comparada ao Porto Seguro atual (Prata Mais I).
          </p>
        </div>

        {/* Plan selector */}
        <div style={{ marginBottom: '1.75rem' }}>
          {amilPlanos.length > 0 && (
            <PlanGroup label="Amil" color="#E8000D" plans={amilPlanos} selected={selectedPlan} onSelect={handlePlanSelect} />
          )}
          {sulaPlanos.length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <PlanGroup label="SulAmérica" color="#FF6600" plans={sulaPlanos} selected={selectedPlan} onSelect={handlePlanSelect} />
            </div>
          )}
        </div>

        {/* Summary badges */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: '#7A90A8', marginRight: '0.5rem' }}>
            <strong style={{ color: '#E8B85A' }}>{selectedPlan.nome} ({selectedPlan.operadora})</strong> vs Porto Seguro
          </div>
          <SummaryBadge count={mantidos} label="Mantidos" color="#4ACA8A" bg="rgba(26,138,90,0.12)" border="rgba(26,138,90,0.3)" onClick={() => setStatus(s => s === 'mantido' ? 'Todos' : 'mantido')} active={status === 'mantido'} />
          <SummaryBadge count={ganhos}   label="Ganhos"   color="#E8B85A" bg="rgba(201,151,58,0.12)" border="rgba(201,151,58,0.3)" onClick={() => setStatus(s => s === 'ganho' ? 'Todos' : 'ganho')} active={status === 'ganho'} />
          <SummaryBadge count={perdidos} label="Perdidos" color="#E87878" bg="rgba(196,53,53,0.12)" border="rgba(196,53,53,0.3)" onClick={() => setStatus(s => s === 'perdido' ? 'Todos' : 'perdido')} active={status === 'perdido'} />
          {status !== 'Todos' && (
            <button onClick={() => setStatus('Todos')} style={{ fontSize: '0.75rem', color: '#7A90A8', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, padding: '0.25rem 0.65rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              Limpar ✕
            </button>
          )}
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
          <input
            type="text"
            placeholder="Buscar prestador ou cidade..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '0.6rem 1rem', color: '#F8F9FC', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', outline: 'none', flex: '1 1 200px', minWidth: 160 }}
          />
          <CidadeMultiSelect selected={cidades} onToggle={toggleCidade} onClear={clearCidades} />
          {/* Categoria: Hospital / Laboratório */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, overflow: 'hidden' }}>
            {(['Todos', 'Hospital', 'Laboratório'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                style={{
                  padding: '0.6rem 0.85rem',
                  fontSize: '0.82rem',
                  fontFamily: 'DM Sans, sans-serif',
                  border: 'none',
                  borderRight: cat !== 'Laboratório' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  cursor: 'pointer',
                  background: categoria === cat ? 'rgba(201,151,58,0.18)' : 'transparent',
                  color: categoria === cat ? '#E8B85A' : '#7A90A8',
                  fontWeight: categoria === cat ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {cat === 'Todos' ? 'Todos' : cat === 'Hospital' ? '🏥 Hospitais' : '🔬 Labs'}
              </button>
            ))}
          </div>
        </div>

        {/* Active city chips */}
        {cidades.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#7A90A8' }}>Cidades:</span>
            {cidades.map(c => (
              <button key={c} onClick={() => toggleCidade(c)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#B8C4D4', background: 'rgba(201,151,58,0.1)', border: '1px solid rgba(201,151,58,0.3)', borderRadius: 9999, padding: '0.18rem 0.6rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                {c} <span style={{ color: '#7A90A8', fontSize: '0.65rem' }}>✕</span>
              </button>
            ))}
            <button onClick={clearCidades} style={{ fontSize: '0.7rem', color: '#7A90A8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.1rem 0.3rem', fontFamily: 'DM Sans, sans-serif', textDecoration: 'underline' }}>
              Limpar todas
            </button>
          </div>
        )}

        {/* Results count */}
        <div style={{ fontSize: '0.8rem', color: '#7A90A8', marginBottom: '0.75rem' }}>
          {filtered.length} de {cityFiltered.length} prestadores na região selecionada
          {status !== 'Todos' && ` — filtrando: ${status}`}
        </div>

        {/* Table */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Prestador', 'Tipo', 'Cidade', `Status vs Porto (${selectedPlan.nome})`, 'Obs.'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', color: '#7A90A8', fontWeight: 500, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#7A90A8' }}>Nenhum prestador encontrado.</td></tr>
              ) : filtered.map(p => {
                const st = getStatusForPlan(p, selectedPlan.nome);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#F8F9FC', fontWeight: 500, maxWidth: 280 }}>{p.nome}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {p.tipo.map(t => (
                          <span key={t} style={{ fontSize: '0.7rem', color: '#B8C4D4', background: 'rgba(184,196,212,0.1)', border: '1px solid rgba(184,196,212,0.2)', borderRadius: 4, padding: '0.15rem 0.45rem', fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#7A90A8', whiteSpace: 'nowrap' }}>{p.cidade}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{badgeStatus(st)}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#7A90A8', fontSize: '0.78rem', maxWidth: 220 }}>{p.observacao ?? '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <LegendItem color="#4ACA8A" label="Mantido — presente no Porto Seguro E no plano selecionado" />
          <LegendItem color="#E8B85A" label="Ganho — presente no plano selecionado, não estava no Porto" />
          <LegendItem color="#E87878" label="Perdido — presente no Porto Seguro, não está no plano selecionado" />
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {legendasRede.map(l => (
            <div key={l.codigo} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#7A90A8' }}>
              <span style={{ fontWeight: 700, color: '#B8C4D4' }}>{l.codigo}</span>
              <span>{l.descricao}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── City multi-select dropdown ───────────────────────────────────────────────

function CidadeMultiSelect({ selected, onToggle, onClear }: {
  selected: string[];
  onToggle: (city: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const q = search.toLowerCase();
  const filtered = CITY_OPTIONS.filter(c => !q || c.toLowerCase().includes(q));

  // Group: SP zones first, then others
  const spZones  = filtered.filter(c => c.startsWith('SP ') || c === 'São Paulo');
  const others   = filtered.filter(c => !c.startsWith('SP ') && c !== 'São Paulo');

  const label = selected.length === 0
    ? 'Cidade: Todas'
    : selected.length === 1
    ? selected[0]
    : `${selected.length} cidades`;

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 180 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
          background: open ? 'rgba(201,151,58,0.08)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${open ? 'rgba(201,151,58,0.4)' : selected.length > 0 ? 'rgba(201,151,58,0.5)' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 8, padding: '0.6rem 0.85rem',
          color: selected.length > 0 ? '#E8B85A' : '#F8F9FC',
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem',
          cursor: 'pointer', whiteSpace: 'nowrap',
        }}
      >
        <span>{label}</span>
        <span style={{ fontSize: '0.65rem', color: '#7A90A8', marginLeft: '0.25rem' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 50,
          width: 260,
          background: '#0D1F3C',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10,
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}>
          {/* Search inside dropdown */}
          <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <input
              autoFocus
              type="text"
              placeholder="Filtrar cidade..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '0.4rem 0.65rem', color: '#F8F9FC', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Select all / clear */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => { CITY_OPTIONS.forEach(c => { if (!selected.includes(c)) onToggle(c); }); }}
              style={{ flex: 1, padding: '0.4rem', fontSize: '0.72rem', color: '#7A90A8', background: 'none', border: 'none', borderRight: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              Selecionar todas
            </button>
            <button
              onClick={onClear}
              style={{ flex: 1, padding: '0.4rem', fontSize: '0.72rem', color: '#7A90A8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              Limpar seleção
            </button>
          </div>

          {/* City list */}
          <div style={{ maxHeight: 260, overflowY: 'auto' }}>
            {spZones.length > 0 && (
              <>
                <div style={{ padding: '0.4rem 0.75rem 0.2rem', fontSize: '0.65rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.02)' }}>
                  São Paulo
                </div>
                {spZones.map(city => (
                  <CityRow key={city} city={city} checked={selected.includes(city)} onToggle={onToggle} />
                ))}
              </>
            )}
            {others.length > 0 && (
              <>
                <div style={{ padding: '0.4rem 0.75rem 0.2rem', fontSize: '0.65rem', color: '#7A90A8', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.02)', borderTop: spZones.length > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined }}>
                  Outras cidades
                </div>
                {others.map(city => (
                  <CityRow key={city} city={city} checked={selected.includes(city)} onToggle={onToggle} />
                ))}
              </>
            )}
            {filtered.length === 0 && (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#7A90A8', fontSize: '0.8rem' }}>
                Nenhuma cidade encontrada
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CityRow({ city, checked, onToggle }: { city: string; checked: boolean; onToggle: (c: string) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.45rem 0.75rem', cursor: 'pointer', transition: 'background 0.1s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(city)}
        style={{ accentColor: '#C9973A', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }}
      />
      <span style={{ fontSize: '0.82rem', color: checked ? '#F8F9FC' : '#B8C4D4', fontFamily: 'DM Sans, sans-serif' }}>{city}</span>
    </label>
  );
}

// ─── Reusable sub-components ──────────────────────────────────────────────────

function PlanGroup({ label, color, plans, selected, onSelect }: {
  label: string; color: string; plans: PlanoNoCenario[]; selected: PlanoNoCenario; onSelect: (p: PlanoNoCenario) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 110 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B8C4D4', letterSpacing: '0.05em' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {plans.map(plan => {
          const isActive = selected.id === plan.id;
          return (
            <button key={plan.id} onClick={() => onSelect(plan)} style={{ padding: '0.45rem 0.9rem', borderRadius: 8, border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.12)'}`, background: isActive ? `${color}22` : 'transparent', color: isActive ? '#F8F9FC' : '#7A90A8', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: isActive ? 600 : 400, transition: 'all 0.15s' }}>
              {plan.nome}
              <span style={{ fontSize: '0.68rem', color: isActive ? '#B8C4D4' : '#4A6078', marginLeft: '0.4rem' }}>
                {plan.coparticipacao === 'Sem Coparticipação' ? 'S/cop' : plan.coparticipacao === 'Coparticipação Parcial' ? 'Parc' : 'C/cop'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryBadge({ count, label, color, bg, border, onClick, active }: {
  count: number; label: string; color: string; bg: string; border: string; onClick: () => void; active: boolean;
}) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: active ? bg : 'transparent', border: `1px solid ${active ? color : border}`, borderRadius: 9999, padding: '0.3rem 0.75rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s' }}>
      <span style={{ fontSize: '1rem', fontWeight: 700, color, fontFamily: 'DM Mono, monospace' }}>{count}</span>
      <span style={{ fontSize: '0.72rem', color: active ? color : '#7A90A8', fontWeight: active ? 600 : 400 }}>{label}</span>
    </button>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#7A90A8' }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span>{label}</span>
    </div>
  );
}

function Select({ value, onChange, options, label }: {
  value: string; onChange: (v: string) => void; options: string[]; label: string;
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '0.6rem 0.85rem', color: '#F8F9FC', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', outline: 'none', cursor: 'pointer', minWidth: 100 }}>
      {options.map(o => (
        <option key={o} value={o} style={{ background: '#0F2040' }}>
          {o === 'Todos' ? `${label}: Todos` : o}
        </option>
      ))}
    </select>
  );
}
