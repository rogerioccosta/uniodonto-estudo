import { type Cenario, portoAtual } from '../data/cenarios';
import { formatCurrency } from '../utils/formatting';

interface Props {
  cenario: Cenario;
}

export default function ConsultativeReading({ cenario }: Props) {
  const melhorPlano = [...cenario.planos].sort((a, b) => a.mensalTotal - b.mensalTotal)[0];
  const maiorEconomia = Math.abs(melhorPlano.diferencaAnual);
  const comCopart = cenario.planos.some(p => p.coparticipacao !== 'Sem Coparticipação');
  const isUpgrade = cenario.id === 2 || cenario.id === 4;

  const blocks = [
    {
      numero: '01',
      titulo: 'O que este cenário propõe?',
      conteudo: cenario.descricao + ` Neste cenário, os ${cenario.planos.length} planos apresentados representam alternativas reais ao Porto Seguro vigente (${formatCurrency(portoAtual.mensalTotal)}/mês), com economia potencial de até ${formatCurrency(maiorEconomia)} ao ano.`,
      destaque: `Menor mensalidade no cenário: ${formatCurrency(melhorPlano.mensalTotal)}/mês com o plano ${melhorPlano.nome}.`,
    },
    {
      numero: '02',
      titulo: comCopart ? 'Como a coparticipação funciona na prática?' : 'Ausência de coparticipação: vantagem real ou expectativa?',
      conteudo: comCopart
        ? 'A coparticipação é um mecanismo de compartilhamento do custo do atendimento entre empresa e beneficiário. Planos com coparticipação "completa" aplicam percentual sobre a tabela da operadora em consultas, exames e procedimentos. Estudos setoriais indicam redução de 15 a 25% na sinistralidade, o que justifica o prêmio significativamente menor.'
        : 'A ausência de coparticipação mantém a experiência atual dos colaboradores sem impacto na percepção do benefício. Planos sem coparticipação tendem a ter sinistralidade mais elevada — o que pode resultar em reajustes maiores nos anos seguintes. Monitore a utilização após a migração.',
      destaque: comCopart
        ? 'Com coparticipação, a empresa reduz o custo fixo mensal e o colaborador passa a ter consciência de utilização — sem impacto no acesso a cuidados essenciais.'
        : 'Recomenda-se acompanhar a sinistralidade nos primeiros 6 meses após a migração para antecipar tendências de reajuste.',
    },
    {
      numero: '03',
      titulo: isUpgrade ? 'O que muda com o upgrade de rede?' : 'Compatibilidade com o plano atual',
      conteudo: isUpgrade
        ? 'Os planos neste cenário oferecem acesso a uma rede credenciada mais ampla, com hospitais e especialidades adicionais em relação ao plano atual. Recomenda-se validar quais prestadores específicos de interesse dos colaboradores estão cobertos antes da decisão final.'
        : 'Os planos deste cenário foram selecionados por compatibilidade de rede com o Porto Seguro vigente — ou seja, os principais hospitais, laboratórios e prestadores tendem a ser mantidos. Isso facilita a comunicação interna e reduz a resistência à mudança.',
      destaque: isUpgrade
        ? 'Solicite análise de rede por CEP para os principais colaboradores antes de formalizar a proposta.'
        : 'A compatibilidade de rede torna este cenário o de menor impacto na rotina dos colaboradores — ideal para migrações com menor resistência interna.',
    },
    {
      numero: '04',
      titulo: 'O peso do reajuste Porto Seguro em agosto/2026',
      conteudo: `O plano atual Porto Seguro passará por reajuste em ${portoAtual.mesReajuste}. Com base no índice histórico aplicado para empresas de até 29 vidas (${portoAtual.percentualReajuste}%), a mensalidade pode chegar a ${formatCurrency(portoAtual.mensalComReajuste)}/mês — um acréscimo de ${formatCurrency(portoAtual.mensalComReajuste - portoAtual.mensalTotal)}/mês ou ${formatCurrency((portoAtual.mensalComReajuste - portoAtual.mensalTotal) * 12)}/ano.`,
      destaque: `Frente ao valor pós-reajuste de ${formatCurrency(portoAtual.mensalComReajuste)}/mês, o plano ${melhorPlano.nome} representa uma economia ainda mais expressiva: ${formatCurrency(Math.abs((melhorPlano.mensalTotal - portoAtual.mensalComReajuste) * 12))}/ano.`,
    },
  ];

  return (
    <section id="leitura" style={{ padding: '3rem', background: 'rgba(10,22,40,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 600 }}>
            Perspectiva Consultiva — {cenario.titulo}
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '0.4rem', color: '#F8F9FC' }}>
            Leitura Estratégica
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {blocks.map(b => (
            <div key={b.numero} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '1.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.25rem' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 800, color: 'rgba(201,151,58,0.2)', lineHeight: 1, userSelect: 'none', alignSelf: 'flex-start' }}>
                {b.numero}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', color: '#F8F9FC', marginBottom: '0.6rem' }}>{b.titulo}</h3>
                <p style={{ color: '#7A90A8', fontSize: '0.88rem', lineHeight: 1.75, margin: '0 0 0.875rem' }}>{b.conteudo}</p>
                <div style={{ background: 'rgba(201,151,58,0.08)', borderLeft: '3px solid #C9973A', borderRadius: '0 8px 8px 0', padding: '0.75rem 1rem', color: '#E8B85A', fontSize: '0.85rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                  {b.destaque}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
