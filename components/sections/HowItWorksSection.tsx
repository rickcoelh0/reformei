'use client';

import { HOW_IT_WORKS_STEPS } from '@/lib/constants';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

export function HowItWorksSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="py-20 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Qual a pegada?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conheça nosso processo completo de transformação de espaços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#23CF65] to-[#35503F] flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <i className={`${step.icon} text-white text-2xl md:text-3xl`} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
