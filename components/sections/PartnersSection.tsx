'use client';

import { PARTNERS } from '@/lib/constants';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import { PartnersCarousel } from '@/components/carousels/PartnersCarousel';

export function PartnersSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="parceiros"
      ref={ref}
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossos Parceiros
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trabalhamos com os melhores fornecedores e profissionais do mercado
          </p>
        </div>

        <PartnersCarousel partners={PARTNERS} />
      </div>
    </section>
  );
}
