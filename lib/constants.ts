/**
 * Site configuration constants
 */

export const SITE_CONFIG = {
  name: 'Reformei',
  description: 'Especialistas em reformas de alto padrão para casas e apartamentos',
  url: 'https://reformei.co',
  email: 'nossovalor@reformei.co',
  phone: '(11) 97513-4459',
  address: 'Rua Cristovão Pereira, 1626 – Campo Belo – SP',
  formSubmitEmail: 'rick.coelho95@gmail.com',
  formSubmitRedirect: 'https://reformei.co/obrigado.html',
};

/**
 * Navigation links
 */
export const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Qual a pegada?', href: '#como-funciona' },
  { label: 'Eu já Reformei', href: '#portfolio' },
  { label: 'Orçamentos', href: '#orcamento' },
  { label: 'Parceiros', href: '#parceiros' },
  { label: 'Reformei Express', href: '#express' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Contato', href: '#contato' },
];

/**
 * Social media links
 */
export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/reformei.co/',
    icon: 'instagram',
  },
  {
    name: 'Pinterest',
    url: 'https://br.pinterest.com/reformei_co/',
    icon: 'pinterest',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@reformei.co',
    icon: 'tiktok',
  },
];

/**
 * How it works steps
 */
export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: 'Projeto de interiores',
    description: 'Planejamento detalhado do seu espaço com design personalizado.',
    icon: 'fas fa-paint-brush',
  },
  {
    id: 2,
    title: 'Orçamento',
    description: 'Estimativa transparente com todos os custos da obra.',
    icon: 'fas fa-calculator',
  },
  {
    id: 3,
    title: 'Prazo da obra',
    description: 'Cronograma detalhado com previsão precisa de entrega.',
    icon: 'fas fa-calendar-alt',
  },
  {
    id: 4,
    title: 'Remoção dos móveis',
    description: 'Serviço completo de remoção cuidadosa do seu mobiliário.',
    icon: 'fas fa-truck',
  },
  {
    id: 5,
    title: 'Armazenamento dos móveis',
    description: 'Guardamos seus itens com segurança durante a reforma.',
    icon: 'fas fa-box',
  },
  {
    id: 6,
    title: 'Gestão da obra',
    description: 'Acompanhamento profissional em todas as etapas do processo.',
    icon: 'fas fa-hard-hat',
  },
  {
    id: 7,
    title: 'Seguro',
    description: 'Proteção completa para sua tranquilidade durante a obra.',
    icon: 'fas fa-shield-alt',
  },
  {
    id: 8,
    title: 'Móveis planejados e acabamentos',
    description: 'Soluções sob medida com materiais de alta qualidade.',
    icon: 'fas fa-couch',
  },
  {
    id: 9,
    title: 'Personal organizer',
    description: 'Organização profissional do seu espaço após a reforma.',
    icon: 'fas fa-tasks',
  },
  {
    id: 10,
    title: 'Canal de pós-obra',
    description: 'Suporte contínuo e assistência após a conclusão da reforma.',
    icon: 'fas fa-headset',
  },
];

/**
 * Team members
 */
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Alex Braceiro',
    role: 'Comercial',
    image: '/images/equipe/alex.jpg',
  },
  {
    id: 2,
    name: 'Fabiana Oliveira',
    role: 'Arquiteta',
    image: '/images/equipe/fabiana.jpg',
  },
  {
    id: 3,
    name: 'Ana Burgos',
    role: 'Arquiteta',
    image: '/images/equipe/ana.jpg',
  },
  {
    id: 4,
    name: 'Ricardo Coelho',
    role: 'Diretor de TI',
    image: '/images/equipe/ricardo.jpg',
  },
  {
    id: 5,
    name: 'Fred Sekkel',
    role: 'Diretor de Marketing',
    image: '/images/equipe/fred.jpg',
  },
  {
    id: 6,
    name: 'Victória Macedo',
    role: 'Gestora Financeira',
    image: '/images/equipe/victoria.jpg',
  },
  {
    id: 7,
    name: 'Marcos Pinheiro',
    role: 'Coordenador de Obra',
    image: '/images/equipe/marcos.jpg',
  },
];

/**
 * Portfolio items
 */
export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Sala Comercial Paulista',
    description: 'Transformação completa de espaço comercial',
    before: '/images/aed/paulista/antes-sala.jpg',
    after: '/images/aed/paulista/depois-sala.jpg',
  },
  {
    id: 2,
    title: 'Apartamento Perdizes',
    description: 'Reforma completa com design moderno',
    rooms: [
      {
        name: 'Sala',
        before: '/images/aed/perdizes/antes-sala.jpg',
        after: '/images/aed/perdizes/depois-sala.jpg',
      },
      {
        name: 'Cozinha',
        before: '/images/aed/perdizes/antes-cozinha.jpg',
        after: '/images/aed/perdizes/depois-cozinha.jpg',
      },
      {
        name: 'Banheiro',
        before: '/images/aed/perdizes/antes-banheiro.jpg',
        after: '/images/aed/perdizes/depois-banheiro.jpg',
      },
    ],
  },
];

/**
 * Partners
 */
export const PARTNERS = [
  { id: 1, name: 'Ana Burgos', logo: '/images/Parceiros/arquiteta.jpg' },
  { id: 2, name: 'Wall Arts', logo: '/images/Parceiros/art.png' },
  { id: 3, name: 'Todeschini', logo: '/images/Parceiros/todeschini.webp' },
  { id: 4, name: 'Salvabras', logo: '/images/Parceiros/salvabras.png' },
  { id: 5, name: 'Reformar', logo: '/images/Parceiros/reformar.jpg' },
  { id: 6, name: 'Gesso', logo: '/images/Parceiros/gesso.png' },
  { id: 7, name: 'Elétricos', logo: '/images/Parceiros/eletricos.jpg' },
  { id: 8, name: 'Edielson Hidráulica', logo: '/images/Parceiros/hidraulica.jpg' },
  { id: 9, name: 'Victorious Glass', logo: '/images/Parceiros/glass.jpg' },
  { id: 10, name: 'Leroy Merlin', logo: '/images/Parceiros/leroy.png' },
  { id: 11, name: 'Casa Mansour', logo: '/images/Parceiros/mansur.jpg' },
];

/**
 * Reformei Express features
 */
export const EXPRESS_FEATURES = [
  {
    id: 1,
    title: 'Entrega Rápida',
    description: 'Receba seus materiais de construção no conforto da sua casa.',
    icon: 'truck-fast',
  },
  {
    id: 2,
    title: 'Variedade de Produtos',
    description: 'Tudo que você precisa para sua obra em um só lugar.',
    icon: 'box',
  },
  {
    id: 3,
    title: 'Preços Competitivos',
    description: 'Economize tempo e dinheiro com nossas ofertas exclusivas.',
    icon: 'tag',
  },
];
