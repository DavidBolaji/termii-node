// types/searchService.type.ts

/**
 * Request payload for checking phone number DND & network status
 */
export interface SearchRequest {
  /** Phone number to verify (must be in international format e.g., 23490126727) */
  phone_number: string;
}

/**
 * Response from the Search API (DND & network lookup)
 */
export interface SearchResponse {
  /** The phone number that was checked */
  number: string;

  /** Current DND / blacklist status of the number */
  status: string;

  /** Network name (e.g., Airtel Nigeria, MTN Nigeria) */
  network: string;

  /** Network code (e.g., 62120 for Airtel NG) */
  network_code: string;
}
