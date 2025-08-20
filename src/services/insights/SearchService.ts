// services/SearchService.ts
import { HttpClient } from "../../http/HttpClient";
import { SearchRequest, SearchResponse } from "../../types/searchService.types";


/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for verifying phone numbers and detecting DND & network status
 */
export class SearchService {
  constructor(private http: HttpClient) {}

  /**
   * Verify phone number DND status and detect network
   *
   * @param payload - Request payload with phone_number
   * @returns Expanded SearchResponse with number details
   */
  async checkNumber(
    payload: SearchRequest
  ): Promise<Expand<SearchResponse>> {
    return this.http.request<Expand<SearchResponse>>("/check/dnd", {
      method: "GET",
      params: payload // send phone_number as query param
    });
  }
}
