# Design Técnico - Migração Reformei para Next.js + Tailwind CSS

## Overview

Este documento descreve a arquitetura técnica e estratégias de implementação para a migração do site Reformei de HTML/CSS/JS vanilla para Next.js 14+ com Tailwind CSS. O objetivo é manter a identidade visual e funcionalidades enquanto melhoramos performance, SEO, acessibilidade e manutenibilidade.

**Stack Tecnológico:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS 3+
- Embla Carousel
- FormSubmit API
- Vercel (deployment)

---

## Arquitetura do Projeto

### Estrutura de Pastas

```
reformei/
├── .kiro/                          # Configuração Kiro
├── .github/                        # GitHub workflows
├── app/                            # App Router (Next.js 14+)
│   ├── layout.tsx                  # Root layout com providers
│   ├── page.tsx                    # Home page
│   ├── globals.css                 # Estilos globais
│   ├── api/                        # API routes
│   │   └── contact/                # Endpoints para formulários
│   └── sitemap.ts                  # Sitemap dinâmico
├── components/                     # Componentes React reutilizáveis
│   ├── common/                     # Componentes compartilhados
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── Navigation.tsx
│   ├── sections/                   # Seções da página
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── BudgetFormSection.tsx
│   │   ├── PartnersSection.tsx
│   │   ├── ReformeExpressSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── NewsletterSection.tsx
│   ├── ui/                        # Componentes UI primitivos
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   └── Badge.tsx
│   └── carousels/                 # Componentes de carrossel
│       ├── PortfolioCarousel.tsx
│       └── PartnersCarousel.tsx
├── lib/                           # Utilitários e helpers
│   ├── utils.ts                   # Funções utilitárias
│   ├── constants.ts               # Constantes da aplicação
│   ├── hooks/                     # Custom hooks
│   │   ├── useTheme.ts
│   │   ├── useScrollReveal.ts
│   │   └── useFormSubmit.ts
│   ├── types/                     # Tipos TypeScript
│   │   ├── index.ts
│   │   └── api.ts
│   └── api/                       # Funções de API
│       └── formSubmit.ts
├── public/                        # Arquivos estáticos
│   ├── images/                    # Imagens otimizadas
│   ├── icons/                     # Ícones SVG
│   ├── fonts/                     # Fontes self-hosted
│   ├── favicon.ico
│   ├── manifest.json              # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
├── styles/                        # Estilos adicionais
│   ├── animations.css
│   └── variables.css
├── .env.local                     # Variáveis de ambiente (local)
├── .env.example                   # Template de variáveis
├── next.config.js                 # Configuração Next.js
├── tailwind.config.ts             # Configuração Tailwind
├── tsconfig.json                  # Configuração TypeScript
├── eslintrc.json                  # Configuração ESLint
├── .prettierrc                    # Configuração Prettier
├── package.json
└── README.md
```

### Padrões de Código

**Naming Conventions:**
- Componentes: PascalCase (e.g., `HeroSection.tsx`)
- Funções/variáveis: camelCase (e.g., `handleFormSubmit`)
- Constantes: UPPER_SNAKE_CASE (e.g., `MAX_CAROUSEL_ITEMS`)
- Tipos/Interfaces: PascalCase com prefixo `I` (e.g., `ITeamMember`)
- Arquivos CSS: kebab-case (e.g., `animations.css`)

**Component Pattern:**
```typescript
// Componente funcional com TypeScript
interface IComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<IComponentProps> = ({ 
  title, 
  onAction 
}) => {
  return <div>{title}</div>;
};
```

---

## Configuração Next.js

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Headers para performance
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [];
  },

  // Rewrites
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Estratégia de Renderização

- **SSG (Static Site Generation):** Home page e páginas estáticas
- **ISR (Incremental Static Regeneration):** Revalidação a cada 3600s
- **SSR (Server-Side Rendering):** Apenas para conteúdo dinâmico
- **CSR (Client-Side Rendering):** Interações do usuário (formulários, carrosséis)

---

## Configuração Tailwind CSS

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f2',
          100: '#dce5e0',
          200: '#b8ccc1',
          300: '#7ba89a',
          400: '#5a8f78',
          500: '#35503F', // Verde Musgo
          600: '#2d4435',
          700: '#25382b',
          800: '#1d2c22',
          900: '#152019',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#23CF65', // Verde Claro
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        background: '#FFFFFF',
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        reross: ['var(--font-reross)', 'serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scroll-reveal': 'scrollReveal 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scrollReveal: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

### Temas Light/Dark

O tema escuro é implementado com a classe `dark` no elemento raiz. Tailwind CSS aplica automaticamente as variações de cor baseado na presença dessa classe.

**Estratégia de Cores para Dark Mode:**
- Backgrounds: Tons escuros de azul/cinza
- Textos: Branco/cinza claro
- Acentos: Mantêm saturação similar
- Borders: Tons mais claros que o background

---

## Componentes Principais

### Header/Navigation

**Responsabilidades:**
- Logo e branding
- Menu de navegação responsivo
- Hamburger menu para mobile
- Theme switcher
- Smooth scroll para links internos

**Props:**
```typescript
interface IHeaderProps {
  onThemeToggle?: () => void;
  currentTheme?: 'light' | 'dark';
}
```

### Hero Section

**Responsabilidades:**
- Background image otimizado
- Headline e subheadline
- CTA button
- Lazy loading de imagem
- Responsividade

**Características:**
- Next.js Image component
- Aspect ratio 16:9
- Placeholder blur
- Lazy loading

### Section Cards (Como Funciona)

**Grid Responsivo:**
- Desktop (1024px+): 5 colunas
- Tablet (768px-1024px): 3 colunas
- Mobile (320px-768px): 2 colunas

**Animações:**
- Scroll reveal ao entrar na viewport
- Stagger animation entre cards
- Respeita `prefers-reduced-motion`

### Carousels

**Portfolio Carousel:**
- Embla Carousel com plugins
- Before/After images
- Touch gestures
- Keyboard navigation
- Auto-play com pausa

**Partners Carousel:**
- Loop infinito
- Auto-scroll
- Pause on hover/touch
- Responsive logo sizing

### Forms

**Budget Form:**
- Validação em tempo real
- Integração FormSubmit
- Loading state
- Success/error messages
- Acessibilidade completa

**Newsletter Form:**
- Email validation
- Loading state
- Success message
- Integração FormSubmit

### Footer

**Componentes:**
- Link sections
- Newsletter form
- Copyright
- Social media links
- Responsive layout

---

## Estratégias de Performance

### Image Optimization

**Implementação:**
```typescript
import Image from 'next/image';

export const OptimizedImage = () => (
  <Image
    src="/images/hero.jpg"
    alt="Hero image"
    width={1920}
    height={1080}
    priority={false}
    loading="lazy"
    placeholder="blur"
    blurDataURL="data:image/..."
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
);
```

**Estratégia:**
- WebP com fallback JPEG
- Múltiplos tamanhos (srcset)
- Lazy loading para below-the-fold
- Priority para above-the-fold
- Blur placeholder

### Code Splitting

- Dynamic imports para componentes pesados
- Route-based code splitting automático
- Lazy loading de bibliotecas (Embla, ScrollReveal)

### Font Loading

**Estratégia:**
- Self-hosted WOFF2 fonts
- `font-display: swap` para evitar FOIT
- Preload de fontes críticas
- Subsetting de caracteres

**Implementação em layout.tsx:**
```typescript
import { Poppins, Reross_Quadratic } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const reross = Reross_Quadratic({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-reross',
  display: 'swap',
});
```

### Caching

**Estratégia:**
- Static assets: 1 year (immutable)
- Images: 1 year
- HTML: No cache (revalidate on demand)
- API responses: 5 minutes

---

## SEO e Metadata

### Meta Tags

**Implementação em layout.tsx:**
```typescript
export const metadata: Metadata = {
  title: 'Reformei - Reformas de Alto Padrão',
  description: 'Especialistas em reformas de alto padrão com 10 anos de experiência.',
  keywords: ['reformas', 'construção', 'design', 'interiores'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://reformei.com.br',
    siteName: 'Reformei',
    images: [
      {
        url: 'https://reformei.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Reformei',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reformei',
    description: 'Especialistas em reformas de alto padrão',
    images: ['https://reformei.com.br/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  canonical: 'https://reformei.com.br',
};
```

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /.env*

Sitemap: https://reformei.com.br/sitemap.xml
```

### sitemap.xml

Gerado dinamicamente em `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://reformei.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
```

### Schema.org

```typescript
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Reformei',
  description: 'Especialistas em reformas de alto padrão',
  url: 'https://reformei.com.br',
  telephone: '+55 11 XXXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua X, 123',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01234-567',
    addressCountry: 'BR',
  },
};
```

---

## Modo Escuro

### Implementação com Tailwind

**Estratégia:**
- Classe `dark` no elemento `<html>`
- Variáveis CSS customizadas
- Transições suaves

**Hook customizado:**
```typescript
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (preferred ? 'dark' : 'light');
    
    setTheme(initial as 'light' | 'dark');
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme };
};

const applyTheme = (theme: string) => {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
```

### Transições Suaves

```css
html {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

## Dependências

### Dependências Principais

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.0",
    "tailwindcss": "^3.3.0",
    "embla-carousel-react": "^8.0.0",
    "embla-carousel-autoplay": "^8.0.0",
    "axios": "^1.5.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.50.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "@tailwindcss/forms": "^0.5.0",
    "@tailwindcss/typography": "^0.5.0"
  }
}
```

### Justificativa de Dependências

- **next**: Framework principal com otimizações
- **react/react-dom**: Biblioteca UI
- **typescript**: Type safety
- **tailwindcss**: Estilização utility-first
- **embla-carousel**: Carrosséis acessíveis
- **axios**: HTTP client
- **clsx/tailwind-merge**: Utilitários de className

---

## Padrões de Desenvolvimento

### Custom Hooks

**useTheme.ts:**
- Gerencia tema light/dark
- Persiste em localStorage
- Respeita preferência do sistema

**useScrollReveal.ts:**
- Detecta quando elemento entra na viewport
- Aplica animações
- Respeita `prefers-reduced-motion`

**useFormSubmit.ts:**
- Integração com FormSubmit API
- Validação
- Loading/error states

### Utilities

**cn() - Merge de classNames:**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Validação:**
```typescript
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  return regex.test(phone);
};
```

---

## Estrutura de Pastas Detalhada

### /app (App Router)

- `layout.tsx`: Root layout com providers
- `page.tsx`: Home page
- `globals.css`: Estilos globais
- `api/`: API routes para formulários
- `sitemap.ts`: Sitemap dinâmico
- `robots.ts`: Robots.txt dinâmico

### /components

- `common/`: Header, Footer, Navigation, ThemeSwitcher
- `sections/`: Componentes de seção (Hero, HowItWorks, etc)
- `ui/`: Componentes primitivos (Button, Card, Input, etc)
- `carousels/`: Componentes de carrossel

### /lib

- `utils.ts`: Funções utilitárias
- `constants.ts`: Constantes da aplicação
- `hooks/`: Custom hooks
- `types/`: Tipos TypeScript
- `api/`: Funções de API

### /public

- `images/`: Imagens otimizadas
- `icons/`: Ícones SVG
- `fonts/`: Fontes self-hosted
- `manifest.json`: PWA manifest
- `robots.txt`: Robots.txt
- `sitemap.xml`: Sitemap

### /styles

- `animations.css`: Animações customizadas
- `variables.css`: Variáveis CSS

---

## Próximas Etapas

Este design técnico fornece a base para a implementação. Os próximos passos incluem:

1. Análise de aceitação de critérios
2. Definição de propriedades de correção
3. Criação de testes
4. Implementação dos componentes
5. Testes de performance e acessibilidade
6. Deploy e monitoramento


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Responsive Navigation Display

For any viewport width, the navigation display should match the breakpoint requirements: horizontal menu for desktop (>768px), hamburger menu for mobile (<768px).

**Validates: Requirements 2.2, 2.3**

### Property 2: Theme Persistence Round Trip

For any theme selection, saving the preference to localStorage and reloading the page should restore the same theme.

**Validates: Requirements 3.1, 3.2**

### Property 3: Theme Application to All Components

For any theme change, all components should update their colors and styles to reflect the new theme without page reload.

**Validates: Requirements 3.4, 3.5**

### Property 4: Smooth Scroll Navigation

For any internal navigation link, clicking it should smoothly scroll to the target section accounting for fixed header height within 500-800ms.

**Validates: Requirements 2.7, 20.1, 20.2, 20.3**

### Property 5: Responsive Grid Columns

For any viewport width, the grid layout should display the correct number of columns: 5 for desktop (>1024px), 3 for tablet (768-1024px), 2 for mobile (<768px).

**Validates: Requirements 5.2, 5.3, 5.4, 10.2, 10.3, 10.4**

### Property 6: Step Card Content Completeness

For any step card in the "Como Funciona" section, it should display an icon, number, and description.

**Validates: Requirements 5.5**

### Property 7: Portfolio Carousel Before/After Display

For any portfolio item in the carousel, it should display both before and after images side by side on desktop, stacked vertically on mobile.

**Validates: Requirements 6.2, 6.7**

### Property 8: Carousel Indicator Synchronization

For any carousel scroll action, the dot indicators should update to reflect the current carousel position.

**Validates: Requirements 6.5**

### Property 9: Form Validation on Invalid Data

For any form submission with invalid data (missing required fields, invalid email/phone format), the system should display validation error messages and prevent submission.

**Validates: Requirements 7.3, 27.1, 27.2, 27.3, 27.4**

### Property 10: Form Submission Success

For any form submission with valid data, the system should send the data to FormSubmit backend, display a success message, and clear the form.

**Validates: Requirements 7.2, 7.4, 7.8, 21.1, 21.2, 21.4**

### Property 11: Form Accessibility

For any form field, it should have an associated label and proper ARIA attributes for screen reader support.

**Validates: Requirements 7.6, 16.9**

### Property 12: Partners Carousel Infinite Loop

For any partners carousel scroll to the end, it should seamlessly loop back to the beginning without visible interruption.

**Validates: Requirements 8.3**

### Property 13: Lazy Loading Below-the-Fold Images

For any image below the fold, it should have loading="lazy" attribute and should not load until the user scrolls near it.

**Validates: Requirements 15.1, 22.2**

### Property 14: Image Responsive Sizing

For any image, it should scale responsively with its container and not exceed the container width on any viewport.

**Validates: Requirements 13.4, 22.4**

### Property 15: Meta Tags Presence

For any page, it should include proper meta tags (title, description, keywords) and Open Graph tags for social sharing.

**Validates: Requirements 14.1, 14.2**

### Property 16: Heading Hierarchy Correctness

For any page, headings should follow proper hierarchy (H1 for main title, H2 for sections, H3 for subsections) without skipping levels.

**Validates: Requirements 14.6, 16.3**

### Property 17: Image Alt Text Presence

For any image on the page, it should have descriptive alt text for accessibility and SEO.

**Validates: Requirements 14.9, 16.2**

### Property 18: Color Contrast Compliance

For any text element, the color contrast ratio should meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text) in both light and dark modes.

**Validates: Requirements 16.4, 18.4**

### Property 19: Keyboard Navigation Support

For any interactive element, it should be reachable and operable using keyboard navigation (Tab, Enter, Escape keys).

**Validates: Requirements 16.5, 20.5**

### Property 20: Focus Indicator Visibility

For any interactive element, when focused via keyboard, it should display a visible focus indicator.

**Validates: Requirements 16.7**

### Property 21: Touch Target Size

For any interactive element on mobile, it should have a minimum size of 44x44 pixels for easy touch interaction.

**Validates: Requirements 13.5**

### Property 22: Font Loading Without Layout Shift

For any page load, fonts should load without causing Cumulative Layout Shift (CLS) using font-display: swap.

**Validates: Requirements 17.6, 29.6**

### Property 23: Dark Mode Color Adjustment

For any component in dark mode, colors should be adjusted for readability while maintaining brand identity.

**Validates: Requirements 26.2, 26.6**

### Property 24: Carousel Touch Gesture Support

For any carousel on mobile, it should respond to touch swipe gestures for navigation.

**Validates: Requirements 6.3, 28.3**

### Property 25: Carousel Keyboard Navigation

For any carousel, it should support keyboard navigation (arrow keys, Enter) for accessibility.

**Validates: Requirements 28.4**

### Property 26: Semantic HTML Structure

For any page, all content should use semantic HTML elements (header, nav, main, section, article, footer) appropriately.

**Validates: Requirements 16.1**

### Property 27: ARIA Labels on Interactive Elements

For any interactive element (button, link, form input), it should have appropriate ARIA labels or aria-label attributes.

**Validates: Requirements 16.6, 28.6**

### Property 28: Scroll Reveal Animation Respect

For any scroll reveal animation, it should respect the prefers-reduced-motion media query and disable animations for users who prefer reduced motion.

**Validates: Requirements 19.4**

### Property 29: External Link Target Behavior

For any external link (social media, external resources), clicking it should open in a new tab without affecting the current page.

**Validates: Requirements 11.4**

### Property 30: Newsletter Email Validation

For any newsletter form submission, the email should be validated for proper format before submission.

**Validates: Requirements 12.3**

### Property 31: Responsive Typography Scaling

For any text element, font size should scale appropriately across breakpoints (larger on desktop, smaller on mobile) while maintaining readability.

**Validates: Requirements 13.3**

### Property 32: No Horizontal Scrolling

For any viewport size, the page should not have horizontal scrolling and should adapt layout to fit the viewport width.

**Validates: Requirements 13.2**

### Property 33: Carousel Auto-Play Behavior

For any carousel with auto-play enabled, it should automatically advance to the next item every 5 seconds and pause when user interacts with it.

**Validates: Requirements 6.8, 8.2**

### Property 34: Form Loading State Display

For any form submission, the submit button should display a loading state (spinner, disabled state, or text change) while the request is being processed.

**Validates: Requirements 7.7**

### Property 35: Network Error Handling

For any form submission that fails due to network error, the system should display a user-friendly error message and allow retry.

**Validates: Requirements 21.7**

---

## Testing Strategy

### Dual Testing Approach

This project requires both unit testing and property-based testing for comprehensive coverage:

**Unit Tests:**
- Specific examples and edge cases
- Component rendering and DOM structure
- Integration points between components
- Error conditions and error messages
- Configuration file validation

**Property-Based Tests:**
- Universal properties across all inputs
- Responsive behavior across all breakpoints
- Form validation across various input combinations
- Carousel behavior with different data sets
- Theme switching and persistence
- Accessibility compliance across components

### Unit Testing

**Framework:** Jest + React Testing Library

**Test Categories:**

1. **Component Rendering Tests**
   - Header renders with logo and navigation
   - Hero section displays with image and CTA
   - Form fields render with labels and placeholders
   - Carousel displays with navigation controls

2. **Integration Tests**
   - Navigation links scroll to correct sections
   - Form submission sends data to FormSubmit
   - Theme switcher updates localStorage
   - Carousel indicators update on scroll

3. **Edge Case Tests**
   - Empty form submission
   - Network error handling
   - Missing environment variables
   - Unsupported browser features

4. **Accessibility Tests**
   - ARIA labels present on interactive elements
   - Semantic HTML structure
   - Color contrast ratios
   - Keyboard navigation

### Property-Based Testing

**Framework:** fast-check (JavaScript/TypeScript)

**Configuration:**
- Minimum 100 iterations per property test
- Custom generators for realistic data
- Shrinking enabled for failure analysis

**Property Test Examples:**

```typescript
// Property 1: Responsive Navigation Display
test('navigation display matches viewport breakpoint', () => {
  fc.assert(
    fc.property(fc.integer({ min: 320, max: 2560 }), (viewportWidth) => {
      const isDesktop = viewportWidth > 768;
      const { getByRole, queryByRole } = render(<Header />);
      
      // Simulate viewport width
      window.innerWidth = viewportWidth;
      
      if (isDesktop) {
        expect(queryByRole('navigation')).toBeInTheDocument();
      } else {
        expect(queryByRole('button', { name: /menu/i })).toBeInTheDocument();
      }
    }),
    { numRuns: 100 }
  );
});

// Feature: reformei-nextjs-migration, Property 1: Responsive Navigation Display
```

```typescript
// Property 2: Theme Persistence Round Trip
test('theme preference persists across page reloads', () => {
  fc.assert(
    fc.property(fc.constantFrom('light', 'dark'), (theme) => {
      const { getByRole } = render(<Header />);
      const themeButton = getByRole('button', { name: /theme/i });
      
      // Set theme
      if (theme === 'dark') {
        fireEvent.click(themeButton);
      }
      
      // Verify localStorage
      expect(localStorage.getItem('theme')).toBe(theme);
      
      // Simulate reload
      const stored = localStorage.getItem('theme');
      expect(stored).toBe(theme);
    }),
    { numRuns: 100 }
  );
});

// Feature: reformei-nextjs-migration, Property 2: Theme Persistence Round Trip
```

```typescript
// Property 5: Responsive Grid Columns
test('grid displays correct columns for viewport width', () => {
  fc.assert(
    fc.property(fc.integer({ min: 320, max: 2560 }), (viewportWidth) => {
      const { container } = render(<HowItWorksSection />);
      const grid = container.querySelector('[data-testid="steps-grid"]');
      
      window.innerWidth = viewportWidth;
      fireEvent.resize(window);
      
      const expectedColumns = 
        viewportWidth > 1024 ? 5 :
        viewportWidth > 768 ? 3 : 2;
      
      const computedStyle = window.getComputedStyle(grid);
      const columnCount = computedStyle.gridTemplateColumns.split(' ').length;
      
      expect(columnCount).toBe(expectedColumns);
    }),
    { numRuns: 100 }
  );
});

// Feature: reformei-nextjs-migration, Property 5: Responsive Grid Columns
```

```typescript
// Property 9: Form Validation on Invalid Data
test('form validation rejects invalid data', () => {
  fc.assert(
    fc.property(
      fc.record({
        name: fc.stringOf(fc.char()),
        email: fc.string(),
        phone: fc.string(),
        description: fc.string()
      }),
      (formData) => {
        const { getByRole, queryByText } = render(<BudgetForm />);
        
        // Fill form with potentially invalid data
        fireEvent.change(screen.getByLabelText(/name/i), { 
          target: { value: formData.name } 
        });
        fireEvent.change(screen.getByLabelText(/email/i), { 
          target: { value: formData.email } 
        });
        
        fireEvent.click(getByRole('button', { name: /submit/i }));
        
        // Check if validation errors appear for invalid data
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        if (!isValidEmail && formData.email.length > 0) {
          expect(queryByText(/invalid email/i)).toBeInTheDocument();
        }
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: reformei-nextjs-migration, Property 9: Form Validation on Invalid Data
```

```typescript
// Property 13: Lazy Loading Below-the-Fold Images
test('below-the-fold images have lazy loading', () => {
  fc.assert(
    fc.property(fc.array(fc.object()), (images) => {
      const { container } = render(<PortfolioSection images={images} />);
      const allImages = container.querySelectorAll('img');
      
      allImages.forEach((img) => {
        const isAboveFold = img.getBoundingClientRect().top < window.innerHeight;
        
        if (!isAboveFold) {
          expect(img.getAttribute('loading')).toBe('lazy');
        }
      });
    }),
    { numRuns: 100 }
  );
});

// Feature: reformei-nextjs-migration, Property 13: Lazy Loading Below-the-Fold Images
```

### Performance Testing

**Lighthouse Audit:**
- Performance score: 90+
- Accessibility score: 95+
- Best Practices score: 90+
- SEO score: 100

**Bundle Analysis:**
- Main bundle: < 200KB (gzipped)
- CSS bundle: < 50KB (gzipped)
- Image optimization: WebP with JPEG fallback

### Accessibility Testing

**Tools:**
- axe DevTools
- WAVE
- Lighthouse Accessibility Audit
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS)

**Checklist:**
- Semantic HTML structure
- ARIA labels and roles
- Color contrast ratios
- Keyboard navigation
- Focus indicators
- Form labels and validation messages
- Alt text for images
- Skip navigation links

### Browser Compatibility Testing

**Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (Chrome Mobile, Safari iOS)

**Testing Approach:**
- Cross-browser testing with BrowserStack
- Responsive design testing
- Touch interaction testing
- Feature detection and graceful degradation

---

## Conclusão

Este design técnico fornece uma base sólida para a migração do Reformei para Next.js + Tailwind CSS. A arquitetura foi projetada para:

- Manter a identidade visual e funcionalidades existentes
- Melhorar performance através de otimizações do Next.js
- Garantir acessibilidade completa (WCAG 2.1 AA)
- Facilitar manutenção e extensão futura
- Implementar testes abrangentes (unit + property-based)

Os próximos passos incluem a criação de tarefas de implementação baseadas neste design.
