/**
 * Type to represent the result of a validation
 */
export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

/**
 * Validates that a string is not empty
 */
export const validateRequired = (value: string, fieldName = 'Field'): ValidationResult => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }
  return { isValid: true };
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      message: 'Email is required',
    };
  }
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address',
    };
  }
  
  return { isValid: true };
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string, requirements?: {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}): ValidationResult => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = requirements || {};
  
  if (!password || password.length === 0) {
    return {
      isValid: false,
      message: 'Password is required',
    };
  }
  
  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters long`,
    };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }
  
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character',
    };
  }
  
  return { isValid: true };
};

/**
 * Validates a URL format
 */
export const validateUrl = (url: string, allowEmpty = false): ValidationResult => {
  if (!url || url.trim() === '') {
    if (allowEmpty) {
      return { isValid: true };
    }
    return {
      isValid: false,
      message: 'URL is required',
    };
  }
  
  try {
    new URL(url);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      message: 'Please enter a valid URL',
    };
  }
};

/**
 * Validates minimum length
 */
export const validateMinLength = (value: string, minLength: number, fieldName = 'Field'): ValidationResult => {
  if (!value || value.length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} must be at least ${minLength} characters long`,
    };
  }
  return { isValid: true };
};

/**
 * Validates maximum length
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName = 'Field'): ValidationResult => {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      message: `${fieldName} must be no more than ${maxLength} characters`,
    };
  }
  return { isValid: true };
};

/**
 * Validates a number range
 */
export const validateNumberRange = (
  value: number, 
  min?: number, 
  max?: number, 
  fieldName = 'Value'
): ValidationResult => {
  if (min !== undefined && value < min) {
    return {
      isValid: false,
      message: `${fieldName} must be at least ${min}`,
    };
  }
  
  if (max !== undefined && value > max) {
    return {
      isValid: false,
      message: `${fieldName} must be no more than ${max}`,
    };
  }
  
  return { isValid: true };
};

/**
 * Validates that value matches a pattern
 */
export const validatePattern = (
  value: string, 
  pattern: RegExp, 
  message = 'Invalid format', 
  fieldName = 'Field'
): ValidationResult => {
  if (!pattern.test(value)) {
    return {
      isValid: false,
      message: `${fieldName}: ${message}`,
    };
  }
  return { isValid: true };
};

/**
 * Validates that two values match
 */
export const validateMatch = (
  value1: string, 
  value2: string, 
  fieldName1 = 'First field', 
  fieldName2 = 'Second field'
): ValidationResult => {
  if (value1 !== value2) {
    return {
      isValid: false,
      message: `${fieldName1} must match ${fieldName2}`,
    };
  }
  return { isValid: true };
};

/**
 * Runs multiple validations and returns the first error
 */
export const validateAll = (validations: ValidationResult[]): ValidationResult => {
  for (const result of validations) {
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
}; 