'use client';

import { useState } from 'react';
import { createTenant, TenantFormData } from '@/api/tenants';
import { validateTenantForm, ValidationError } from '@/utils/validation';

export interface UseTenantFormState {
  name: string;
  floor: string;
  month: string;
  year: string;
}

export interface UseTenantFormReturn {
  formData: UseTenantFormState;
  errors: ValidationError[];
  isLoading: boolean;
  isSuccess: boolean;
  successMessage: string;
  errorMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  clearMessages: () => void;
}

const initialFormState: UseTenantFormState = {
  name: '',
  floor: '',
  month: '',
  year: new Date().getFullYear().toString(),
};

export function useTenantForm(): UseTenantFormReturn {
  const [formData, setFormData] = useState<UseTenantFormState>(initialFormState);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors for this field when user starts typing
    setErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate form
    const validationResult = validateTenantForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    try {
      const tenantData: TenantFormData = {
        name: formData.name.trim(),
        floor: Number(formData.floor),
        month: Number(formData.month),
        year: Number(formData.year),
      };

      await createTenant(tenantData);

      setIsSuccess(true);
      setSuccessMessage(
        `Tenant was created successfully!`
      );
      setFormData(initialFormState);
      setErrors([]);
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors([]);
    setIsSuccess(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    successMessage,
    errorMessage,
    handleInputChange,
    handleSubmit,
    resetForm,
    clearMessages,
  };
}

