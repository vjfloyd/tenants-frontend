'use client';

import { useState } from 'react';
import {calculateBill} from '@/api/tenants';

export interface BillDetailData {
  month: string;
  year: string;
  amount: string;
  engineConsumption: string;
}

export interface TenantConsumptionForm {
  code: string;
  floor: number;
  name: string;
  consumption: string;
}

export interface ConsumptionData {
  tenants: TenantConsumptionForm[];
}

export interface UseBillFormState {
  billDetail: BillDetailData;
  consumption: ConsumptionData;
}

export interface UseBillFormReturn {
  formData: UseBillFormState;
  setFormData: React.Dispatch<React.SetStateAction<UseBillFormState>>;
  activeTab: 'billDetail' | 'consumption';
  setActiveTab: (tab: 'billDetail' | 'consumption') => void;
  isFormValid: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  successMessage: string;
  errorMessage: string;
  handleBillDetailChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleConsumptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  clearMessages: () => void;
}

const initialBillDetail: BillDetailData = {
  month: '',
  year: '',
  amount: '',
  engineConsumption: '',
};

const initialConsumption: ConsumptionData = {
  tenants: [],
};

export function useBillForm(): UseBillFormReturn {
  const [formData, setFormData] = useState<UseBillFormState>({
    billDetail: initialBillDetail,
    consumption: initialConsumption,
  });
  const [activeTab, setActiveTab] = useState<'billDetail' | 'consumption'>('billDetail');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Check if all fields are filled
  const isFormValid =
    Object.values(formData.billDetail).every(value => value.trim() !== '') &&
    formData.consumption.tenants.length > 0 &&
    formData.consumption.tenants.every(t => t.consumption.trim() !== '');

  const handleBillDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      billDetail: {
        ...prev.billDetail,
        [name]: value,
      },
    }));
  };

  const handleConsumptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const tenantCode = e.target.getAttribute('data-tenant-code');

    if (name === 'electricityConsumption' && tenantCode) {
      setFormData((prev) => ({
        ...prev,
        consumption: {
          ...prev.consumption,
          tenants: prev.consumption.tenants.map((t) =>
            t.code === tenantCode ? { ...t, consumption: value } : t
          ),
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!isFormValid) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // Map form data to API structure
      const billData = {
        month: parseInt(formData.billDetail.month),
        year: parseInt(formData.billDetail.year),
        amount: parseFloat(formData.billDetail.amount),
        engine: parseFloat(formData.billDetail.engineConsumption),
        tenants: formData.consumption.tenants.map((t) => ({
          code: t.code,
          floor: t.floor,
          name: t.name,
          consumption: parseFloat(t.consumption),
        })),
      };
      console.log(billData);
      await calculateBill(billData);

      setIsSuccess(true);
      setSuccessMessage('Bill sent successfully!');
      setFormData({
        billDetail: initialBillDetail,
        consumption: initialConsumption,
      });
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
    setFormData({
      billDetail: initialBillDetail,
      consumption: initialConsumption,
    });
    setActiveTab('billDetail');
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
    setFormData,
    activeTab,
    setActiveTab,
    isFormValid,
    isLoading,
    isSuccess,
    successMessage,
    errorMessage,
    handleBillDetailChange,
    handleConsumptionChange,
    handleSubmit,
    resetForm,
    clearMessages,
  };
}
