/**
 * Single Sender ID entry
 */
export interface SenderId {
  /** The Sender ID string */
  sender_id: string;
  /** Current approval status (e.g., "pending", "approved", "rejected") */
  status: string;
  /** Associated company (if provided) */
  company: string | null;
  /** Use case for the Sender ID */
  usecase: string | null;
  /** Country where the Sender ID applies */
  country: string | null;
  /** Creation timestamp */
  created_at: string;
}

/**
 * Query params for requesting a new Sender ID
 */
export interface SenderIdReqParam {
  /** The desired Sender ID string */
  sender_id: string;
  /** Intended use case for the Sender ID */
  usecase: string;
  /** Company name requesting the Sender ID */
  company: string;
}

/**
 * Response for fetching sender IDs (paginated)
 */
export interface SenderIdResponse {
  /** Current page number */
  current_page: number;
  /** Array of Sender IDs */
  data: SenderId[];
  /** URL of the first page */
  first_page_url: string;
  /** Index of the first item on this page */
  from: number;
  /** Last page number */
  last_page: number;
  /** URL of the last page */
  last_page_url: string;
  /** URL of the next page (or null if none) */
  next_page_url: string | null;
  /** Base path for pagination */
  path: string;
  /** Number of items per page */
  per_page: number;
  /** URL of the previous page (or null if none) */
  prev_page_url: string | null;
  /** Index of the last item on this page */
  to: number;
  /** Total number of results */
  total: number;
}

/**
 * Response after requesting a new Sender ID
 */
export interface SenderIdRequestResponse {
  /** API status code (e.g., "ok") */
  code: string;
  /** Status message (e.g., "Sender Id requested. You will be contacted...") */
  message: string;
}
