'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transformamos espaços em obras de arte.
          </h2>
          
          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
            Renovações de alto padrão para residências exclusivas. Transforme seu imóvel com a excelência e sofisticação que você merece.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#orcamento">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Solicitar orçamento
              </Button>
            </Link>
            <Link href="#portfolio">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Ver projetos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
