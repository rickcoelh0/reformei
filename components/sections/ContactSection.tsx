'use client';

import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

export function ContactSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="contato"
      ref={ref}
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Estamos prontos para transformar seu espaço
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-[#23CF65]/10 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-phone text-2xl text-[#23CF65]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Telefone
            </h3>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-gray-600 dark:text-gray-400 hover:text-[#23CF65] transition-colors"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>

          {/* Email */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-[#23CF65]/10 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-envelope text-2xl text-[#23CF65]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Email
            </h3>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-[#23CF65] transition-colors break-all"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          {/* Address */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-[#23CF65]/10 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-map-marker-alt text-2xl text-[#23CF65]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Endereço
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {SITE_CONFIG.address}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Siga-nos nas redes sociais
          </h3>
          <div className="flex justify-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#23CF65] text-white flex items-center justify-center hover:bg-[#35503F] transition-colors duration-300 transform hover:scale-110"
                aria-label={social.name}
              >
                <i className={`fab fa-${social.icon} text-lg`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
