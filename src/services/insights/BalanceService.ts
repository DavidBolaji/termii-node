// services/BalanceService.ts
import { HttpClient } from "../../http/HttpClient";
import { GetBalanceResponse } from "../../types/balanceService.types";


/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for fetching account balance
 */
export class BalanceService {
  constructor(private http: HttpClient) { }

  /**
   * Fetch the current account balance and currency
   *
   * @returns Expanded GetBalanceResponse with balance details
   */
  async getBalance(): Promise<Expand<GetBalanceResponse>> {
    return this.http.request<Expand<GetBalanceResponse>>("/get-balance", {
      method: "GET",
      authLocation: "query"
    });
  }
}
