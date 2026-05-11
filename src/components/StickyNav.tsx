import { useEffect, useState } from 'react';

const navItems = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'comparativo', label: 'Financeiro' },
  { id: 'rede', label: 'Rede' },
  { id: 'tabela-rede', label: 'Prestadores' },
  { id: 'matriz', label: 'Matriz' },
  { id: 'leitura', label: 'Consultivo' },
  { id: 'recomendacoes', label: 'Planos' },
  { id: 'luminus', label: 'Luminus' },
  { id: 'proximos-passos', label: 'Próximos Passos' },
];

export default function StickyNav() {
  const [ativo, setAtivo] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
      const sections = navItems.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
      let current = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top < 160) current = section.id;
      }
      setAtivo(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (!scrolled) return null;

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 200,
      background: 'rgba(10,22,40,0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(201,151,58,0.2)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      overflowX: 'auto',
      height: 48,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem', flexShrink: 0 }}>
        <img src="/luminus-logo.png" alt="Luminus Seguros" style={{ height: 26, width: 'auto', objectFit: 'contain' }} />
      </div>
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          style={{
            padding: '0.35rem 0.75rem', borderRadius: 6, border: 'none',
            background: ativo === item.id ? 'rgba(201,151,58,0.15)' : 'transparent',
            color: ativo === item.id ? '#E8B85A' : '#7A90A8',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
            fontWeight: ativo === item.id ? 600 : 400, whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
