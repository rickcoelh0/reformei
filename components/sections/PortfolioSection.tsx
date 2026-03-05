'use client';

import { PORTFOLIO_ITEMS } from '@/lib/constants';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import { PortfolioCarousel } from '@/components/carousels/PortfolioCarousel';

export function PortfolioSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Eu já Reformei
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos de transformação
          </p>
        </div>

        <div className="h-[500px] md:h-[600px]">
          <PortfolioCarousel items={PORTFOLIO_ITEMS} />
        </div>
      </div>
    </section>
  );
}
