# 🚀 Portal Financeiro & Corretagem (White-Label)

Uma aplicação web **White-Label** de alta performance para o mercado financeiro, desenvolvida com tecnologias modernas para oferecer uma experiência de **SaaS Financeiro** premium. O sistema combina dados em tempo real, simulação de trading e gestão de carteira em uma interface sofisticada e totalmente personalizável.

![Dashboard Preview](public/icons.svg) *Adicione um screenshot do dashboard aqui*

## 🎯 Objetivo

Desenvolver um ecossistema robusto para corretoras e fintechs que necessitam de uma plataforma de investimento personalizada, rápida e escalável. O foco está na **Experiência do Usuário (UX)**, **Performance** e **Arquitetura White-Label**.

## ✨ Funcionalidades Principais

### 🎨 Arquitetura White-Label
- **Theming Dinâmico**: Personalização instantânea de cores da marca (presets: Azul, Verde, Roxo, Laranja) via `Zustand` e CSS Variables.
- **Identidade Visual**: Upload de logo e alteração do nome da corretora refletidos em toda a aplicação.
- **Dark/Light Mode**: Suporte nativo a temas claro e escuro com persistência de preferência.

### 📊 Dashboard Interativo
- **Visão Geral do Mercado**: Monitoramento de índices (IBOVESPA, S&P 500, IFIX) em tempo real.
- **Gráficos Avançados**: Gráficos de área interativos (Recharts) com seletores de período (1D, 1W, 1M, 1A).
- **Destaques do Dia**: Ranking de ações com maiores altas e baixas.

### 💰 Trading & Mercado
- **Monitoramento de Ativos**: Lista de ações com busca, filtros e dados de variação/volume.
- **Simulador de Ordens**: Interface completa de Compra e Venda com validação e feedback visual.
- **Histórico de Operações**: Registro detalhado de todas as ordens executadas e pendentes.

### 💼 Gestão de Carteira
- **Alocação de Ativos**: Gráficos de distribuição (Donut Chart) da carteira.
- **Rentabilidade**: Acompanhamento de lucro/prejuízo em tempo real e valor total do patrimônio.

### 🔌 Camada de Dados Híbrida
- **Integração Alpha Vantage**: Dados reais de mercado para cotações e gráficos históricos.
- **Sistema de Fallback**: Mocks inteligentes que assumem automaticamente caso a API atinja limites ou falhe.
- **Cache Inteligente**: Otimização de requisições para performance e economia de cota de API.

## 🧠 Tecnologias Utilizadas

### Core
- **React 19** + **Vite**: Performance extrema e DX superior.
- **TypeScript**: Tipagem estática para robustez e manutenibilidade.

### Estilização & UI
- **Tailwind CSS v4**: Estilização utilitária e design system configurável.
- **Framer Motion**: Animações fluidas, transições de página e microinterações.
- **Lucide React**: Ícones vetoriais leves e consistentes.
- **Glassmorphism**: Estética moderna com transparências e desfoques (blur).

### Gerenciamento de Estado & Dados
- **Zustand**: Gerenciamento de estado global leve e persistente (LocalStorage).
- **Recharts**: Biblioteca de gráficos composável e responsiva.
- **Axios**: Cliente HTTP para consumo de APIs.

## 🎨 Sistema de Cores e Acessibilidade (WCAG 2.1)

A plataforma foi projetada seguindo as diretrizes de acessibilidade **WCAG 2.1**, garantindo um contraste adequado em todos os elementos visuais para ambos os modos (Claro e Escuro).

- **Contraste Mínimo**: Todos os textos normais possuem taxa de contraste mínima de 4.5:1, e textos grandes 3:1.
- **Transições Suaves**: Mudanças de tema (Light/Dark) e estados interativos (Hover/Focus) utilizam animações CSS de transição suaves.
- **Paletas Dinâmicas**: Utilização da função `currentColor` para sincronizar elementos gráficos (como eixos de charts e ícones) com o tema atual.
- **Glassmorphism Acessível**: Ajustes nos níveis de opacidade de fundos e bordas (ex: `dark:bg-gray-800/30` e `dark:border-gray-800/50`) para manter a legibilidade de textos e tabelas sem perder a estética "glass".
- **Feedback Visual**: Indicadores de alta (Verde) e baixa (Vermelho) ajustados em modo escuro para `text-green-400` / `text-red-400` sobre fundos com opacidade `bg-green-900/40` e `bg-red-900/40`, otimizando a leitura.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado.

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/portal-financeiro-whitelabel.git
cd portal-financeiro-whitelabel
```

2. Instale as dependências:
```bash
npm install
```

3. Configuração de Ambiente (Opcional para dados reais):
Crie um arquivo `.env` na raiz do projeto e adicione sua chave da Alpha Vantage (ou use `demo`):
```env
VITE_ALPHA_VANTAGE_KEY=SUA_CHAVE_AQUI
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## 📂 Estrutura do Projeto

```
src/
├── assets/          # Imagens e vetores estáticos
├── components/      # Componentes React reutilizáveis
│   ├── dashboard/   # Widgets específicos do dashboard
│   ├── layout/      # Layout principal (Sidebar, Header)
│   └── ...
├── contexts/        # Contextos React (se aplicável)
├── pages/           # Páginas da aplicação (Roteamento)
├── services/        # Integração com APIs e Mocks
├── store/           # Stores do Zustand (Estado Global)
├── types/           # Definições de Tipos TypeScript
└── ...
```



Desenvolvido com 💙 por [Lucas Capelotto](https://github.com/LucasCapelotto)
