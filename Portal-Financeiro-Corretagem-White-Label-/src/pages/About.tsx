import { motion } from 'framer-motion';
import { Blocks, CheckCircle2, Database, Layers, Network, Rocket, ServerCog, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const stack = [
  { area: 'Frontend', value: 'React, TypeScript, React Router, Tailwind CSS e Framer Motion' },
  { area: 'Backend', value: 'Node.js com NestJS para APIs modulares e regras de negócio' },
  { area: 'Banco de Dados', value: 'PostgreSQL para persistência transacional, auditoria e consultas analíticas' },
  { area: 'Integração', value: 'Camada de serviços para market data, ordens e portfólio via APIs REST' },
];

const objectives = [
  'Demonstrar uma plataforma de corretagem white label com experiência premium e operação orientada a dados.',
  'Apresentar um fluxo completo de mercado, portfólio, ordens e monitoramento em uma arquitetura escalável.',
  'Evidenciar padrões técnicos aplicáveis a produtos financeiros digitais para múltiplas corretoras.',
];

const featureCards = [
  {
    title: 'Dashboard Analítico',
    description: 'Visão consolidada de performance com indicadores, variação de mercado e leitura rápida de tendências.',
  },
  {
    title: 'Gestão de Ativos e Carteiras',
    description: 'Acompanhamento de posições, composição de portfólio e exposição a risco por perfil de investidor.',
  },
  {
    title: 'Fluxo de Ordens',
    description: 'Simulação operacional de ordens de compra e venda com status, histórico e rastreabilidade.',
  },
  {
    title: 'Customização White Label',
    description: 'Personalização visual para representar diferentes marcas mantendo consistência de UX e performance.',
  },
  {
    title: 'Camada de Segurança',
    description: 'Padrões de autenticação, autorização e segregação de responsabilidades para operações sensíveis.',
  },
  {
    title: 'Arquitetura Escalável',
    description: 'Estrutura modular pronta para crescer em usuários, integrações e volume transacional.',
  },
];

const architecture = [
  {
    icon: Layers,
    title: 'Camada de Apresentação',
    text: 'Frontend React com roteamento SPA, componentes reutilizáveis e renderização orientada a estados de mercado.',
  },
  {
    icon: ServerCog,
    title: 'Camada de Aplicação',
    text: 'APIs NestJS em Node.js com domínio separado por módulos de usuários, ordens, carteira e market data.',
  },
  {
    icon: Database,
    title: 'Camada de Dados',
    text: 'PostgreSQL com modelagem relacional para ativos, ordens, posições, eventos e trilhas de auditoria.',
  },
  {
    icon: Network,
    title: 'Camada de Integração',
    text: 'Conectores de mercado e serviços externos para cotações, enriquecimento de dados e sincronização operacional.',
  },
];

const useCases = [
  'Demonstração comercial para corretoras que desejam lançar ou modernizar um portal financeiro próprio.',
  'Provas de conceito técnicas para validar stack Node.js + NestJS + React + PostgreSQL em produtos de investimento.',
  'Treinamento de equipes de produto e operação em jornadas típicas de monitoramento, carteira e execução de ordens.',
];

const About = () => {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="glass-card p-5 md:p-6">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            Sobre a aplicação
          </span>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
            Portal Financeiro de Corretagem White Label com foco técnico e demonstrativo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Esta aplicação foi desenvolvida para demonstrar capacidades típicas de uma solução de corretagem digital moderna. O objetivo é apresentar arquitetura, stack, fluxos de negócio e recursos essenciais para plataformas financeiras escaláveis.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Voltar para Home
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Abrir dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Blocks className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tecnologias utilizadas</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {stack.map((item) => (
              <article key={item.area} className="rounded-xl border border-gray-200/70 bg-white/70 p-4 dark:border-gray-700/70 dark:bg-gray-800/60">
                <p className="font-semibold text-gray-900 dark:text-white">{item.area}</p>
                <p className="mt-1">{item.value}</p>
              </article>
            ))}
          </div>
        </motion.article>

        <motion.article initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Rocket className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Objetivos principais</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {objectives.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Funcionalidades demonstrativas</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {featureCards.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Arquitetura do sistema</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {architecture.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="glass-card p-5"
            >
              <div className="mb-3 inline-flex rounded-lg bg-brand-100 p-2 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                <item.icon size={18} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Casos de aplicação</h2>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {useCases.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Características técnicas relevantes</h2>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
              Estrutura modular preparada para multi-tenant e múltiplas corretoras em modo white label.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
              Base PostgreSQL adequada para consultas relacionais de ordens, histórico e reconciliação.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
              Backend NestJS com separação por domínios para facilitar manutenção, testes e evolução.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
              Frontend React com foco em usabilidade de alta frequência e resposta rápida em cenários operacionais.
            </li>
          </ul>
        </motion.article>
      </section>

      <section className="glass-card p-5 md:p-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Este portal é uma aplicação demonstrativa criada especificamente para apresentar potencial técnico, arquitetura e principais funcionalidades esperadas em soluções de corretagem digital. O conteúdo exibe cenários práticos de uso e recursos centrais para usuários finais e equipes internas.
        </p>
      </section>
    </div>
  );
};

export default About;
