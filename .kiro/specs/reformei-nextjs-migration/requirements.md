# Requisitos de Migração - Reformei para Next.js + Tailwind CSS

## Introdução

O Reformei é um site de especialistas em reformas de alto padrão que necessita ser migrado de HTML/CSS/JS vanilla para Next.js + Tailwind CSS. O objetivo é manter a identidade visual, funcionalidades e conteúdo enquanto melhorando performance, SEO e manutenibilidade.

## Glossário

- **Reformei**: Sistema web de apresentação de serviços de reformas de alto padrão
- **Next.js**: Framework React com renderização server-side e otimizações de performance
- **Tailwind CSS**: Framework CSS utility-first para estilização
- **Embla Carousel**: Biblioteca de carrossel responsivo
- **FormSubmit**: Serviço de backend para processamento de formulários
- **Theme Switcher**: Funcionalidade de alternância entre modo claro e escuro
- **Lazy Loading**: Carregamento sob demanda de imagens
- **SEO**: Search Engine Optimization - otimização para mecanismos de busca
- **Responsive Design**: Design que se adapta a diferentes tamanhos de tela
- **Accessibility**: Conformidade com padrões de acessibilidade web (WCAG)

## Requisitos

### Requisito 1: ? Estrutura Base do Projeto Next.js ✅

**User Story:** Como desenvolvedor, quero que o projeto seja estruturado com Next.js 14+, para que eu possa aproveitar as otimizações modernas e App Router.

#### Critérios de Aceitação

1. ✅ THE Project SHALL use Next.js 14 or higher with App Router
2. ✅ THE Project SHALL have Tailwind CSS configured for styling
3. ✅ THE Project SHALL have TypeScript configured for type safety
4. ✅ THE Project SHALL have ESLint and Prettier configured for code quality
5. ✅ THE Project SHALL have a clear folder structure: `/app`, `/components`, `/lib`, `/public`, `/styles`

---

### Requisito 2: ? Componente Header com Navegação

**User Story:** Como visitante, quero um header fixo com navegação responsiva, para que eu possa acessar diferentes seções do site facilmente.

#### Critérios de Aceitação

1. ? THE Header SHALL display the Reformei logo on the left side
2. WHEN the viewport width is greater than 768px, THE Header SHALL display horizontal navigation menu
3. WHEN the viewport width is less than 768px, THE Header SHALL display a hamburger menu that toggles a mobile navigation drawer
4. ? THE Header SHALL include a Theme Switcher button that toggles between light and dark modes
5. ? THE Header SHALL remain fixed at the top of the page with proper z-index
6. ? THE Header SHALL have smooth transitions between light and dark themes
7. WHEN a navigation link is clicked, THE Page SHALL scroll smoothly to the corresponding section

---

### Requisito 3: ? Persistência de Tema (Light/Dark Mode)

**User Story:** Como usuário, quero que minha preferência de tema seja salva, para que eu não precise reselecionar a cada visita.

#### Critérios de Aceitação

1. WHEN the Theme Switcher is toggled, THE System SHALL save the preference to localStorage
2. WHEN the page loads, THE System SHALL read the theme preference from localStorage
3. IF no preference is stored, THE System SHALL use the system preference (prefers-color-scheme)
4. ? THE Theme Switcher SHALL update all components to reflect the selected theme
5. FOR ALL theme changes, the transition SHALL be smooth without page flicker

---

### Requisito 4: ? Seção Hero com Call-to-Action

**User Story:** Como visitante, quero uma seção hero impactante com imagem de fundo e CTA, para que eu seja motivado a explorar os serviços.

#### Critérios de Aceitação

1. ? THE Hero Section SHALL display a background image with proper aspect ratio
2. ? THE Hero Section SHALL display the main headline and subheadline
3. ? THE Hero Section SHALL include a prominent CTA button
4. WHEN the viewport is mobile, THE Hero Section SHALL optimize image size and text layout
5. ? THE Hero Section image SHALL be lazy-loaded for performance
6. ? THE Hero Section SHALL have proper contrast for text readability in both light and dark modes

---

### Requisito 5: ? Seção "Como Funciona" com Grid de 10 Passos

**User Story:** Como visitante, quero entender o processo de reforma em 10 passos, para que eu saiba o que esperar.

#### Critérios de Aceitação

1. ? THE "Como Funciona" Section SHALL display 10 steps in a responsive grid
2. WHEN the viewport width is greater than 1024px, THE Grid SHALL display 5 columns
3. WHEN the viewport width is between 768px and 1024px, THE Grid SHALL display 3 columns
4. WHEN the viewport width is less than 768px, THE Grid SHALL display 2 columns
5. EACH Step Card SHALL display an icon, number, and description
6. WHEN a user scrolls to this section, THE Cards SHALL animate in with scroll reveal effect
7. ? THE Section SHALL maintain consistent spacing and alignment across all breakpoints

---

### Requisito 6: ? Carrossel de Portfólio com Antes/Depois

**User Story:** Como visitante, quero ver projetos anteriores com comparação antes/depois, para que eu possa avaliar a qualidade do trabalho.

#### Critérios de Aceitação

1. ? THE Portfolio Carousel SHALL use Embla Carousel for smooth scrolling
2. EACH Portfolio Item SHALL display before and after images side by side
3. ? THE Carousel SHALL support touch gestures on mobile devices
4. ? THE Carousel SHALL display navigation arrows and dot indicators
5. WHEN the carousel is scrolled, THE Indicators SHALL update to show current position
6. ? THE Portfolio Images SHALL be lazy-loaded for performance
7. WHEN the viewport is mobile, THE Before/After images SHALL stack vertically
8. ? THE Carousel SHALL auto-play with a 5-second interval and pause on user interaction

---

### Requisito 7: ? Formulário de Orçamento com FormSubmit

**User Story:** Como visitante interessado, quero preencher um formulário de orçamento, para que eu possa solicitar um orçamento personalizado.

#### Critérios de Aceitação

1. ? THE Budget Form SHALL collect name, email, phone, and project description
2. WHEN the form is submitted with valid data, THE System SHALL send it to FormSubmit backend
3. WHEN the form is submitted with invalid data, THE System SHALL display validation errors
4. WHEN the form is successfully submitted, THE System SHALL display a success message
5. ? THE Form Fields SHALL have proper labels and placeholder text
6. ? THE Form SHALL be accessible with proper ARIA labels and semantic HTML
7. WHEN the form is submitted, THE Submit Button SHALL show a loading state
8. ? THE Form SHALL clear after successful submission

---

### Requisito 8: ? Carrossel Infinito de Parceiros

**User Story:** Como visitante, quero ver os parceiros da Reformei, para que eu tenha confiança na empresa.

#### Critérios de Aceitação

1. ? THE Partners Carousel SHALL display partner logos in a continuous loop
2. ? THE Carousel SHALL auto-scroll horizontally without user interaction
3. WHEN the carousel reaches the end, THE Carousel SHALL seamlessly loop back to the beginning
4. ? THE Carousel SHALL pause on hover (desktop) or touch (mobile)
5. ? THE Partner Logos SHALL be properly sized and aligned
6. ? THE Carousel SHALL be responsive and adjust logo size based on viewport

---

### Requisito 9: ? Seção Reformei Express com CTA para Loja Online

**User Story:** Como visitante, quero conhecer o Reformei Express, para que eu possa acessar a loja online de produtos.

#### Critérios de Aceitação

1. ? THE Reformei Express Section SHALL display information about the online store
2. ? THE Section SHALL include a prominent CTA button linking to the online store
3. ? THE Section SHALL display benefits or features of Reformei Express
4. WHEN the CTA button is clicked, THE System SHALL navigate to the external store URL
5. ? THE Section SHALL be visually distinct from other sections
6. ? THE Section SHALL maintain brand consistency with colors and typography

---

### Requisito 10: ? Grid de Equipe com 7 Membros

**User Story:** Como visitante, quero conhecer a equipe da Reformei, para que eu tenha confiança nos profissionais.

#### Critérios de Aceitação

1. ? THE Team Section SHALL display 7 team members in a responsive grid
2. WHEN the viewport width is greater than 1024px, THE Grid SHALL display 4 columns
3. WHEN the viewport width is between 768px and 1024px, THE Grid SHALL display 3 columns
4. WHEN the viewport width is less than 768px, THE Grid SHALL display 2 columns
5. EACH Team Member Card SHALL display a photo, name, and role
6. EACH Team Member Card SHALL have a hover effect showing social media links
7. ? THE Team Photos SHALL be optimized and lazy-loaded
8. ? THE Section SHALL maintain consistent spacing and alignment

---

### Requisito 11: ? Seção de Contato com Informações e Redes Sociais

**User Story:** Como visitante, quero encontrar informações de contato e redes sociais, para que eu possa entrar em contato com a Reformei.

#### Critérios de Aceitação

1. ? THE Contact Section SHALL display phone number, email, and physical address
2. ? THE Contact Section SHALL display links to social media profiles
3. ? THE Contact Section SHALL include a contact form or CTA button
4. WHEN a social media link is clicked, THE System SHALL open the profile in a new tab
5. ? THE Contact Information SHALL be properly formatted and easy to read
6. ? THE Section SHALL be accessible with proper semantic HTML and ARIA labels

---

### Requisito 12: ? Footer com Links, Newsletter e Copyright

**User Story:** Como visitante, quero acessar links úteis e me inscrever na newsletter, para que eu possa ficar atualizado sobre novidades.

#### Critérios de Aceitação

1. ? THE Footer SHALL display multiple link sections (Serviços, Sobre, Contato, etc.)
2. ? THE Footer SHALL include a newsletter subscription form
3. WHEN a user enters an email in the newsletter form, THE System SHALL validate the email format
4. WHEN the newsletter form is submitted with valid email, THE System SHALL process the subscription
5. ? THE Footer SHALL display copyright information and year
6. ? THE Footer SHALL be responsive and stack properly on mobile
7. ? THE Footer Links SHALL have proper hover states and accessibility

---

### Requisito 13: ? Responsividade Completa (Mobile, Tablet, Desktop)

**User Story:** Como usuário em qualquer dispositivo, quero que o site funcione perfeitamente, para que eu tenha uma boa experiência.

#### Critérios de Aceitação

1. ? THE Website SHALL be fully responsive for mobile (320px+), tablet (768px+), and desktop (1024px+)
2. WHEN the viewport changes, THE Layout SHALL adapt without horizontal scrolling
3. ? THE Typography SHALL scale appropriately for each breakpoint
4. ? THE Images SHALL be responsive and not exceed container width
5. ? THE Touch targets SHALL be at least 44x44px on mobile devices
6. ? THE Navigation SHALL be optimized for each device type
7. FOR ALL sections, the spacing and padding SHALL adjust for each breakpoint

---

### Requisito 14: ? Otimização de SEO

**User Story:** Como proprietário do site, quero que o site seja otimizado para SEO, para que eu tenha melhor visibilidade nos mecanismos de busca.

#### Critérios de Aceitação

1. ? THE Website SHALL have proper meta tags (title, description, keywords) on all pages
2. ? THE Website SHALL have Open Graph tags for social media sharing
3. ? THE Website SHALL have a robots.txt file for search engine crawling
4. ? THE Website SHALL have a sitemap.xml file listing all pages
5. ? THE Website SHALL have a manifest.json for PWA support
6. ? THE Website SHALL have proper heading hierarchy (H1, H2, H3)
7. ? THE Website SHALL have structured data (Schema.org) for rich snippets
8. ? THE Website SHALL have proper canonical tags to avoid duplicate content
9. ? THE Images SHALL have descriptive alt text for accessibility and SEO

---

### Requisito 15: ? Otimização de Performance

**User Story:** Como usuário, quero que o site carregue rapidamente, para que eu tenha uma boa experiência.

#### Critérios de Aceitação

1. ? THE Website SHALL have lazy loading for images below the fold
2. ? THE Website SHALL use Next.js Image component for automatic optimization
3. ? THE Website SHALL have code splitting for faster initial load
4. ? THE Website SHALL minimize CSS and JavaScript bundles
5. ? THE Website SHALL have a Lighthouse score of 90+ for performance
6. ? THE Website SHALL have proper caching strategies for static assets
7. ? THE Website SHALL use modern image formats (WebP) with fallbacks
8. ? THE Website SHALL preload critical resources (fonts, above-the-fold images)

---

### Requisito 16: ? Acessibilidade (WCAG 2.1 AA)

**User Story:** Como usuário com deficiência, quero que o site seja acessível, para que eu possa usar todos os recursos.

#### Critérios de Aceitação

1. ? THE Website SHALL have proper semantic HTML structure
2. ? THE Website SHALL have descriptive alt text for all images
3. ? THE Website SHALL have proper heading hierarchy
4. ? THE Website SHALL have sufficient color contrast (WCAG AA standard)
5. ? THE Website SHALL be keyboard navigable (Tab, Enter, Escape)
6. ? THE Website SHALL have proper ARIA labels for interactive elements
7. ? THE Website SHALL have focus indicators visible on all interactive elements
8. ? THE Website SHALL support screen readers with proper announcements
9. ? THE Forms SHALL have associated labels for all inputs
10. ? THE Website SHALL have skip navigation links

---

### Requisito 17: ? Tipografia com Poppins e Reross Quadratic

**User Story:** Como designer, quero que o site use as fontes corretas, para que o design seja fiel ao original.

#### Critérios de Aceitação

1. ? THE Website SHALL use Poppins font for body text and headings
2. ? THE Website SHALL use Reross Quadratic font for special headings or accents
3. ? THE Fonts SHALL be loaded from a CDN or self-hosted for performance
4. ? THE Font Weights SHALL include Regular (400) and Bold (700) at minimum
5. ? THE Fonts SHALL have proper fallbacks for unsupported browsers
6. ? THE Font Loading SHALL not cause layout shift (CLS)

---

### Requisito 18: ? Paleta de Cores Consistente

**User Story:** Como designer, quero que as cores sejam consistentes, para que o design seja coeso.

#### Critérios de Aceitação

1. ? THE Website SHALL use Verde Musgo (#35503F) as primary color
2. ? THE Website SHALL use Verde Claro (#23CF65) as accent color
3. ? THE Website SHALL use Branco as background color
4. ? THE Website SHALL have proper color contrast in both light and dark modes
5. ? THE Tailwind Configuration SHALL define these colors as custom theme colors
6. ? THE Dark Mode SHALL have appropriate color adjustments for readability

---

### Requisito 19: ? Scroll Reveal Animations

**User Story:** Como visitante, quero ver animações ao fazer scroll, para que o site seja mais engajante.

#### Critérios de Aceitação

1. WHEN a user scrolls to a section, THE Elements SHALL animate in smoothly
2. ? THE Animations SHALL not impact performance (use CSS transforms)
3. ? THE Animations SHALL be subtle and not distract from content
4. ? THE Animations SHALL respect prefers-reduced-motion preference
5. ? THE Scroll Reveal Library SHALL be lightweight or implemented with CSS

---

### Requisito 20: ? Smooth Scroll para Links Internos

**User Story:** Como visitante, quero que os links internos façam scroll suave, para que a navegação seja agradável.

#### Critérios de Aceitação

1. WHEN a navigation link is clicked, THE Page SHALL scroll smoothly to the target section
2. ? THE Scroll Animation SHALL take approximately 500-800ms
3. ? THE Scroll SHALL account for fixed header height
4. ? THE Scroll Behavior SHALL work on all modern browsers
5. ? THE Scroll SHALL be keyboard accessible

---

### Requisito 21: ? Integração com FormSubmit para Formulários

**User Story:** Como proprietário, quero que os formulários sejam processados pelo FormSubmit, para que eu receba as submissões.

#### Critérios de Aceitação

1. ? THE Budget Form SHALL submit data to FormSubmit backend
2. ? THE Newsletter Form SHALL submit data to FormSubmit backend
3. WHEN a form is submitted, THE System SHALL validate data before sending
4. WHEN the submission is successful, THE System SHALL display a success message
5. WHEN the submission fails, THE System SHALL display an error message
6. ? THE Form Submissions SHALL include all required fields
7. ? THE System SHALL handle network errors gracefully

---

### Requisito 22: ? Lazy Loading de Imagens

**User Story:** Como usuário, quero que as imagens carreguem sob demanda, para que o site seja mais rápido.

#### Critérios de Aceitação

1. ? THE Website SHALL use Next.js Image component for all images
2. ? THE Images Below the Fold SHALL be lazy-loaded
3. ? THE Images SHALL have proper placeholder while loading
4. ? THE Images SHALL be responsive and scale with container
5. ? THE Images SHALL be optimized in multiple formats (WebP, JPEG)
6. ? THE Image Loading SHALL not cause layout shift

---

### Requisito 23: ? Suporte a PWA (Progressive Web App)

**User Story:** Como usuário, quero poder instalar o site como app, para que eu possa acessá-lo offline.

#### Critérios de Aceitação

1. ? THE Website SHALL have a manifest.json file
2. ? THE Website SHALL have a service worker for offline support
3. ? THE Website SHALL have app icons in multiple sizes
4. ? THE Website SHALL have a theme color and background color
5. ? THE Website SHALL be installable on mobile devices
6. ? THE Website SHALL work offline with cached content

---

### Requisito 24: ? Configuração de Variáveis de Ambiente

**User Story:** Como desenvolvedor, quero gerenciar configurações sensíveis, para que o projeto seja seguro.

#### Critérios de Aceitação

1. ? THE Project SHALL have a .env.local file for local development
2. ? THE Project SHALL have a .env.example file documenting required variables
3. ? THE Project SHALL use environment variables for API endpoints
4. ? THE Project SHALL use environment variables for FormSubmit endpoint
5. ? THE Sensitive Data SHALL not be committed to version control
6. ? THE Environment Variables SHALL be properly typed in TypeScript

---

### Requisito 25: ? Documentação do Projeto

**User Story:** Como desenvolvedor, quero ter documentação clara, para que eu possa manter e estender o projeto.

#### Critérios de Aceitação

1. ? THE Project SHALL have a README.md with setup instructions
2. ? THE Project SHALL have documentation for component structure
3. ? THE Project SHALL have documentation for environment variables
4. ? THE Project SHALL have documentation for deployment process
5. ? THE Code SHALL have comments for complex logic
6. ? THE Components SHALL have JSDoc comments for props and usage

---

### Requisito 26: ? Suporte a Modo Escuro Completo

**User Story:** Como usuário, quero usar o site em modo escuro, para que eu tenha conforto visual.

#### Critérios de Aceitação

1. ? THE Website SHALL have a complete dark mode implementation
2. WHEN dark mode is enabled, THE Colors SHALL be adjusted for readability
3. ? THE Dark Mode SHALL maintain brand identity
4. ? THE Images SHALL be optimized for dark mode (if needed)
5. ? THE Transitions Between Modes SHALL be smooth
6. ? THE Dark Mode Preference SHALL be persisted in localStorage

---

### Requisito 27: ? Validação de Formulários

**User Story:** Como usuário, quero receber feedback sobre erros de formulário, para que eu possa corrigi-los.

#### Critérios de Aceitação

1. ? THE Form Validation SHALL check for required fields
2. ? THE Form Validation SHALL validate email format
3. ? THE Form Validation SHALL validate phone number format
4. WHEN validation fails, THE System SHALL display error messages
5. ? THE Error Messages SHALL be clear and actionable
6. ? THE Form Fields SHALL have visual indicators of errors
7. ? THE Validation SHALL happen on blur and on submit

---

### Requisito 28: ? Integração com Embla Carousel

**User Story:** Como desenvolvedor, quero usar Embla Carousel para carrosséis, para que eu tenha componentes robustos.

#### Critérios de Aceitação

1. ? THE Portfolio Carousel SHALL use Embla Carousel library
2. ? THE Partners Carousel SHALL use Embla Carousel library
3. ? THE Carousels SHALL support touch gestures on mobile
4. ? THE Carousels SHALL have keyboard navigation support
5. ? THE Carousels SHALL display navigation controls (arrows, dots)
6. ? THE Carousels SHALL be accessible with proper ARIA labels

---

### Requisito 29: ? Otimização de Fontes

**User Story:** Como desenvolvedor, quero que as fontes sejam otimizadas, para que o site carregue rápido.

#### Critérios de Aceitação

1. ? THE Fonts SHALL be self-hosted or loaded from optimized CDN
2. ? THE Font Files SHALL use WOFF2 format for modern browsers
3. ? THE Font Loading SHALL use font-display: swap to avoid invisible text
4. ? THE Font Preloading SHALL be configured for critical fonts
5. ? THE Font Subsetting SHALL be used to reduce file size
6. ? THE Font Loading SHALL not cause layout shift (CLS)

---

### Requisito 30: ? Testes de Compatibilidade de Navegadores

**User Story:** Como proprietário, quero que o site funcione em navegadores modernos, para que eu tenha máxima cobertura.

#### Critérios de Aceitação

1. ? THE Website SHALL work on Chrome 90+
2. ? THE Website SHALL work on Firefox 88+
3. ? THE Website SHALL work on Safari 14+
4. ? THE Website SHALL work on Edge 90+
5. ? THE Website SHALL gracefully degrade on older browsers
6. ? THE Website SHALL be tested on mobile browsers (Chrome Mobile, Safari iOS)


