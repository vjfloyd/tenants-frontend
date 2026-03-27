// API service for tenant operations
export interface TenantFormData {
  name: string;
  floor: number;
  month: number;
  year: number;
}

export interface TenantResponse {
  id?: string;
  name: string;
  floor: number;
  month: number;
  year: number;
  code: string;
  createdAt?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_TENANTS_API || 'http://localhost:4007';
console.log('[DEBUG] Tenants API_BASE_URL:', API_BASE_URL);

export async function createTenant(data: TenantFormData): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/tenants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `Failed to create tenant: ${response.statusText}`
      );
    }

    // API returns void, so return the submitted data
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while creating the tenant');
  }
}

export async function loadTenants(): Promise<TenantResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/tenants`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `Failed to load tenants: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while loading tenants');
  }
}

export async function deleteTenant(id: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/v1/tenants/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while deleting the tenant');
  }

}

export interface TenantConsumption {
  code: string;
  floor: number;
  name: string;
  consumption: number;
}

export interface BillData {
  month: number;
  year: number;
  amount: number;
  engine: number;
  tenants: TenantConsumption[];
}

export async function calculateBill(data: BillData): Promise<void> {
 try {
   const response = await fetch(`${API_BASE_URL}/v1/payments/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `Failed to calculate bill: ${response.statusText}`
      );
    }
 } catch (error) {
   if (error instanceof Error) {
     throw error;
   }
   throw new Error('An unexpected error occurred while calculating the bill');
 }
}
