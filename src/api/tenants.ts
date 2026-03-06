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
  createdAt?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

const API_BASE_URL = 'http://178.156.219.218';

export async function createTenant(data: TenantFormData): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/tenants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

