'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * Footer component with links, newsletter, and contact info
 */
export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('_subject', 'Nova inscrição na newsletter - Reformei.co');
      formData.append('_captcha', 'false');

      const response = await fetch(`https://formsubmit.co/${SITE_CONFIG.formSubmitEmail}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Inscrição realizada com sucesso!');
        setEmail('');
      } else {
        setMessage('Erro ao inscrever. Tente novamente.');
      }
    } catch (_error) {
      setMessage('Erro de conexão. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#23CF65] dark:bg-[#35503F] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {SITE_CONFIG.name}
              <span className="text-white/80">.</span>co
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Especialistas em reformas de alto padrão para casas e apartamentos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Mais</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
              <Button
                type="submit"
                disabled={loading}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                {loading ? 'Enviando...' : 'Inscrever'}
              </Button>
              {message && (
                <p className={`text-sm ${message.includes('sucesso') ? 'text-green-300' : 'text-red-300'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-white/80 text-sm mb-4 md:mb-0">
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={link.name}
                title={link.name}
              >
                <i className={`fab fa-${link.icon} text-lg`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
