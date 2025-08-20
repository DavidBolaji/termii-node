// services/StatusService.ts
import { HttpClient } from "../../http/HttpClient";
import { StatusRequest, StatusResponse } from "../../types/statusRequestService.type";


/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for checking if a number is fake, valid, or ported
 */
export class StatusService {
  constructor(private http: HttpClient) {}

  /**
   * Check number status, detect if ported, and retrieve operator details
   *
   * @param payload - Request payload with phone_number and country_code
   * @returns Expanded StatusResponse with full details
   */
  async checkStatus(
    payload: StatusRequest
  ): Promise<Expand<StatusResponse>> {
    return this.http.request<Expand<StatusResponse>>(
      "/insight/number/query",
      {
        method: "GET",
        params: payload // phone_number & country_code as query params
      }
    );
  }
}
