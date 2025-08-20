// types/balanceService.type.ts

/**
 * Response for the Balance API
 */
export interface GetBalanceResponse {
  /** The user account associated with the balance */
  user: string;

  /** The remaining wallet balance */
  balance: number;

  /** The currency of the balance (e.g., NGN, USD) */
  currency: string;
}
