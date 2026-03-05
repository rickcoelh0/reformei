'use client';

import { EXPRESS_FEATURES } from '@/lib/constants';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

export function ReformeExpressSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="express"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-r from-[#23CF65] to-[#35503F] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Reformei Express
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Entrega rápida de materiais de construção com qualidade garantida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPRESS_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 mx-auto">
                <i className={`fas fa-${feature.icon} text-2xl`} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-center opacity-90">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contato"
            className="inline-block px-8 py-3 bg-white text-[#23CF65] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  );
}
