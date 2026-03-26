import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Building2, CalendarCheck2, ShieldCheck, TrendingUp, UserCheck } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link } from 'react-router-dom';

const chartData = [
  { month: 'Jan', volume: 1.2 },
  { month: 'Fev', volume: 1.5 },
  { month: 'Mar', volume: 1.9 },
  { month: 'Abr', volume: 2.3 },
  { month: 'Mai', volume: 2.6 },
  { month: 'Jun', volume: 3.1 },
];

const services = [
  {
    title: 'Painel de Mercado em Tempo Real',
    description: 'Acompanhe índices, ativos e oportunidades com dados atualizados para decisões ágeis.',
    icon: BarChart3,
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Gestão de Carteiras e Ordens',
    description: 'Centralize portfólios, ordens e histórico operacional com experiência fluida e segura.',
    icon: CalendarCheck2,
    image:
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'White Label para Corretoras',
    description: 'Personalize marca, identidade visual e jornada do investidor sem perder performance.',
    icon: Building2,
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  },
];

const Home = () => {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="glass-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/60 px-4 py-3 dark:border-gray-700/60 md:px-6">
          <div className="text-sm font-semibold tracking-wide text-brand-600 dark:text-brand-300">
            Portal Financeiro White Label
          </div>
          <nav aria-label="Navegação principal da home" className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 font-medium text-brand-700 transition-colors hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/30"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="rounded-md px-3 py-1.5 font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Sobre
            </Link>
            <Link
              to="/dashboard"
              className="rounded-md px-3 py-1.5 font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              Plataforma premium para corretagem digital
            </span>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
              Transforme a experiência financeira dos seus clientes com uma home white label de alto padrão
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Estruture sua corretora com um portal completo para análise, operação e relacionamento, com visual profissional e foco em performance.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Acessar plataforma
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Conhecer arquitetura
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <img
              src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1800&q=80"
              alt="Profissional analisando gráfico financeiro em um monitor"
              loading="eager"
              fetchPriority="high"
              className="h-[280px] w-full rounded-2xl object-cover shadow-xl md:h-[360px]"
            />
            <div className="absolute bottom-4 right-4 rounded-xl bg-white/90 p-3 text-sm shadow-lg backdrop-blur dark:bg-gray-900/85">
              <p className="text-xs text-gray-500 dark:text-gray-400">Volume negociado mensal</p>
              <p className="text-lg font-bold text-brand-600 dark:text-brand-300">+38,4%</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="glass-card overflow-hidden"
          >
            <img src={service.image} alt={service.title} loading="lazy" className="h-40 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="inline-flex rounded-lg bg-brand-100 p-2 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                <service.icon size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.article
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-5 lg:col-span-3"
        >
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Crescimento de Operações</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <Tooltip
                  formatter={(value: unknown) => [`R$ ${Number((Array.isArray(value) ? value[0] : value) ?? 0).toFixed(1)} mi`, 'Volume']}
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'rgb(var(--color-secondary-200))',
                    borderRadius: '12px',
                  }}
                />
                <Area type="monotone" dataKey="volume" stroke="rgb(var(--color-brand-500))" fill="url(#volumeGradient)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card space-y-4 p-5 lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Por que escolher nosso portal</h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 text-brand-500" size={18} />
              Segurança com arquitetura moderna e escalável.
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="mt-0.5 text-brand-500" size={18} />
              Experiência intuitiva para investidores e assessores.
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="mt-0.5 text-brand-500" size={18} />
              Evolução contínua da operação com dados e indicadores de performance.
            </li>
          </ul>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            Ver detalhes técnicos
          </Link>
        </motion.article>
      </section>

      <footer className="glass-card px-5 py-6">
        <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Portal Financeiro White Label</p>
            <p>Plataforma demonstrativa para apresentação de soluções de corretagem digital.</p>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Arquitetura moderna para escala, segurança e personalização white label.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
