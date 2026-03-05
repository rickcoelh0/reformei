'use client';

import Image from 'next/image';
import { TEAM_MEMBERS } from '@/lib/constants';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

export function TeamSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="equipe"
      ref={ref}
      className="py-20 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossa Equipe
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Profissionais experientes dedicados a transformar seus espaços
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group text-center hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-[#23CF65] font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
