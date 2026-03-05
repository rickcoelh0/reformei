/**
 * Schema.org JSON-LD structured data for SEO and AI understanding
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://reformei.co',
  name: 'Reformei',
  alternateName: 'Reformei - Reformas de Alto Padrão',
  description: 'Especialistas em reformas de alto padrão para casas e apartamentos. Transforme seu espaço com qualidade e sofisticação.',
  url: 'https://reformei.co',
  logo: 'https://reformei.co/logo.png',
  image: 'https://reformei.co/og-image.jpg',
  telephone: '+55 (11) 99999-9999',
  email: 'contato@reformei.co',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'São Paulo',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01000-000',
    addressCountry: 'BR',
  },
  areaServed: {
    '@type': 'City',
    name: 'São Paulo',
  },
  priceRange: '$$$',
  serviceType: ['Reformas Residenciais', 'Design de Interiores', 'Reformas de Alto Padrão'],
  sameAs: [
    'https://www.facebook.com/reformei',
    'https://www.instagram.com/reformei',
    'https://www.linkedin.com/company/reformei',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://reformei.co',
  name: 'Reformei',
  description: 'Reformas de Alto Padrão',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://reformei.co/search?q={search_term_string}',
    },
    query_input: 'required name=search_term_string',
  },
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://reformei.co',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Portfólio',
      item: 'https://reformei.co#portfolio',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Orçamento',
      item: 'https://reformei.co#orcamento',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Contato',
      item: 'https://reformei.co#contato',
    },
  ],
};

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Reformas de Alto Padrão',
  description: 'Serviços completos de reforma residencial com design de interiores de alto padrão',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Reformei',
    url: 'https://reformei.co',
  },
  areaServed: {
    '@type': 'City',
    name: 'São Paulo',
  },
  serviceType: 'Reforma Residencial',
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Como funciona o processo de reforma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nosso processo segue 10 etapas cuidadosamente planejadas, desde a avaliação inicial até a entrega final do projeto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é o tempo médio de uma reforma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O tempo varia conforme o tamanho e complexidade do projeto. Fazemos uma avaliação personalizada para cada cliente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vocês trabalham com design de interiores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, oferecemos serviços completos de design de interiores integrados com as reformas.',
      },
    },
  ],
};

export const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'AggregateRating',
  ratingValue: '4.8',
  bestRating: '5',
  worstRating: '1',
  ratingCount: '127',
  reviewCount: '127',
};
