import { useState } from 'react';
import { cenarios } from './data/cenarios';
import ExecutiveHeader from './components/ExecutiveHeader';
import ScenarioSelector from './components/ScenarioSelector';
import SummaryCards from './components/SummaryCards';
import FinancialComparison from './components/FinancialComparison';
import NetworkComparison from './components/NetworkComparison';
import NetworkTable from './components/NetworkTable';
import DecisionMatrix from './components/DecisionMatrix';
import ConsultativeReading from './components/ConsultativeReading';
import Recommendations from './components/Recommendations';
import LuminusDifferentials from './components/LuminusDifferentials';
import NextSteps from './components/NextSteps';
import Disclaimer from './components/Disclaimer';
import StickyNav from './components/StickyNav';

export default function App() {
  const [selectedId, setSelectedId] = useState(1);

  const cenario = cenarios.find(c => c.id === selectedId) ?? cenarios[0];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628' }}>
      <StickyNav />

      {/* 1. Capa executiva */}
      <ExecutiveHeader onNavigate={scrollTo} />

      {/* 2. Seletor de cenário — sticky, sempre visível */}
      <ScenarioSelector selected={selectedId} onChange={id => { setSelectedId(id); document.getElementById('resumo')?.scrollIntoView({ behavior: 'smooth' }); }} />

      {/* 3–13. Conteúdo responsivo ao cenário selecionado */}
      <SummaryCards cenario={cenario} />
      <FinancialComparison cenario={cenario} />
      <NetworkComparison />
      <NetworkTable key={`network-${selectedId}`} cenario={cenario} />
      {/* Matriz rebuilds on scenario change via key */}
      <DecisionMatrix key={`matrix-${selectedId}`} cenario={cenario} />
      <ConsultativeReading cenario={cenario} />
      <Recommendations cenario={cenario} />
      <LuminusDifferentials />
      <NextSteps />
      <Disclaimer />
    </div>
  );
}
