'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useFormSubmit } from '@/lib/hooks/useFormSubmit';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

export function BudgetFormSection() {
  const ref = useScrollReveal();
  const { submitForm, loading, error, success } = useFormSubmit();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(formData);
    if (!error) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        property: '',
        budget: '',
        message: '',
      });
    }
  };

  return (
    <section
      id="orcamento"
      ref={ref}
      className="py-20 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Solicitar Orçamento
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Preencha o formulário abaixo e nossa equipe entrará em contato em breve
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome completo"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Telefone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(11) 99999-9999"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de imóvel
                </label>
                <select
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#23CF65] focus:border-transparent transition-colors"
                >
                  <option value="">Selecione um tipo</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa">Casa</option>
                  <option value="comercial">Comercial</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Faixa de orçamento
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#23CF65] focus:border-transparent transition-colors"
              >
                <option value="">Selecione uma faixa</option>
                <option value="ate-50k">Até R$ 50.000</option>
                <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                <option value="100k-200k">R$ 100.000 - R$ 200.000</option>
                <option value="200k-500k">R$ 200.000 - R$ 500.000</option>
                <option value="acima-500k">Acima de R$ 500.000</option>
              </select>
            </div>

            <Textarea
              label="Mensagem"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Conte-nos sobre seu projeto..."
              rows={5}
            />

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Enviando...' : 'Solicitar Orçamento'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
