export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateTenantForm(data: {
  name?: string;
  floor?: string | number;
  month?: string | number;
  year?: string | number;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || !data.name.trim()) {
    errors.push({
      field: 'name',
      message: 'Tenant name is required',
    });
  } else if (data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Tenant name must be at least 2 characters',
    });
  }

  // Validate floor
  const floor = Number(data.floor);
  if (!data.floor || isNaN(floor)) {
    errors.push({
      field: 'floor',
      message: 'Floor number is required',
    });
  } else if (floor < 0 || floor > 100) {
    errors.push({
      field: 'floor',
      message: 'Floor number must be between 0 and 100',
    });
  } else if (!Number.isInteger(floor)) {
    errors.push({
      field: 'floor',
      message: 'Floor number must be a whole number',
    });
  }

  // Validate month
  const month = Number(data.month);
  if (!data.month || isNaN(month)) {
    errors.push({
      field: 'month',
      message: 'Month is required',
    });
  } else if (month < 1 || month > 12) {
    errors.push({
      field: 'month',
      message: 'Month must be between 1 and 12',
    });
  } else if (!Number.isInteger(month)) {
    errors.push({
      field: 'month',
      message: 'Month must be a whole number',
    });
  }

  // Validate year
  const year = Number(data.year);
  const currentYear = new Date().getFullYear();
  if (!data.year || isNaN(year)) {
    errors.push({
      field: 'year',
      message: 'Year is required',
    });
  } else if (year < 2000 || year > currentYear + 10) {
    errors.push({
      field: 'year',
      message: `Year must be between 2000 and ${currentYear + 10}`,
    });
  } else if (!Number.isInteger(year)) {
    errors.push({
      field: 'year',
      message: 'Year must be a whole number',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getFieldError(
  field: string,
  errors: ValidationError[]
): string | null {
  const error = errors.find((e) => e.field === field);
  return error ? error.message : null;
}

