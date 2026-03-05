'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  phone: string;
  property?: string;
  budget?: string;
  message: string;
}

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/**
 * Hook to handle form submission to FormSubmit API
 */
export const useFormSubmit = () => {
  const [state, setState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
  });

  const submitForm = async (data: FormData) => {
    setState({ loading: true, success: false, error: null });

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      if (data.property) {
        formData.append('property', data.property);
      }
      if (data.budget) {
        formData.append('budget', data.budget);
      }
      formData.append('message', data.message);
      formData.append('_subject', 'Nova solicitação de orçamento - Reformei.co');
      formData.append('_captcha', 'false');
      formData.append('_next', 'https://reformei.co/obrigado');

      const response = await fetch(`https://formsubmit.co/${SITE_CONFIG.formSubmitEmail}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setState({ loading: false, success: true, error: null });
      } else {
        setState({
          loading: false,
          success: false,
          error: 'Erro ao enviar formulário. Tente novamente.',
        });
      }
    } catch (_error) {
      setState({
        loading: false,
        success: false,
        error: 'Erro de conexão. Tente novamente mais tarde.',
      });
    }
  };

  const reset = () => {
    setState({ loading: false, success: false, error: null });
  };

  return { ...state, submitForm, reset };
};
