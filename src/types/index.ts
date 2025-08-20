/**
 * Type definitions for Termii SDK
 */

export interface TermiiOptions {
  apiKey: string;
  baseURL?: string;
}

export type ResponseData<T> = {
  status: number;
  data: T;
};
// Error payload for API errors
export interface ApiErrorPayload {
  code: number;
  message: string;
}

// Base Termii error class
export class TermiiError extends Error {
  public payload: ApiErrorPayload;
  constructor(message: string, payload: ApiErrorPayload) {
    super(message);
    this.payload = payload;
    Object.setPrototypeOf(this, TermiiError.prototype);
  }
}

// HTTP-specific error
export class HttpError extends TermiiError {
  constructor(message: string, payload: ApiErrorPayload) {
    super(message, payload);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

// Validation-specific error
export class ValidationError extends TermiiError {
  constructor(message: string, payload: ApiErrorPayload) {
    super(message, payload);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Represents a single sender ID item in the response.
 */
export interface SenderId {
  sender_id: string;
  status: string;
  company: string | null;
  usecase: string | null;
  country: string | null;
  created_at: string;
}

/**
 * Represents paginated response data for any type T.
 */
export interface PaginatedData<T> {
  data: T[];
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  from: number;
  to: number;
}
// // Re-export all type modules
export * from './balanceService.types';
export * from './campaignService.type';
export * from './contactService.type';
export * from './emailTokenService.type';
export * from './eSimService.type';
export * from './eventService.type';
export * from './historyService.type';
export * from './inAppTokenService.types';
export * from './incomingService.type';
export * from './messageService.type';
export * from './phonebookService.type';
export * from './searchService.types';
export * from './senderService.type';
export * from './statusRequestService.type';
export * from './templateService.type';
export * from './tokenService.type';
export * from './verifyTokenService.types';