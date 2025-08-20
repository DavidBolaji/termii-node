/**
 * A phonebook record
 */
export interface Phonebook {
  /** Unique identifier for the phonebook */
  id: string;
  /** Display name of the phonebook */
  name: string;
  /** Total number of contacts inside this phonebook */
  total_number_of_contacts: number;
  /** ISO timestamp when the phonebook was created */
  date_created: string;
  /** ISO timestamp when the phonebook was last updated */
  last_updated: string;
}

/**
 * Links metadata for pagination
 */
export interface PaginationLinks {
  /** URL for the first page */
  first: string;
  /** URL for the last page */
  last: string;
  /** URL for the previous page (null if on the first page) */
  prev: string | null;
  /** URL for the next page (null if on the last page) */
  next: string | null;
}

/**
 * Meta information for pagination
 */
export interface PaginationMeta {
  /** Current page number */
  current_page: number;
  /** Index of the first item on the current page */
  from: number;
  /** Last available page number */
  last_page: number;
  /** Base API path for pagination */
  path: string;
  /** Number of items per page */
  per_page: number;
  /** Index of the last item on the current page */
  to: number;
  /** Total number of items across all pages */
  total: number;
}

/**
 * Response returned when fetching phonebooks
 */
export interface FetchPhonebooksResponse {
  /** Array of phonebook records */
  data: Phonebook[];
  /** Pagination links */
  links: PaginationLinks;
  /** Pagination metadata */
  meta: PaginationMeta;
}

/**
 * Request payload for creating a new phonebook
 */
export interface CreatePhonebookRequest {
  /** API key of the authenticated user */
  api_key: string;
  /** Name of the phonebook to create */
  phonebook_name: string;
  /** Optional description of the phonebook */
  description?: string;
}

/**
 * Response returned after successfully creating a phonebook
 */
export interface CreatePhonebookResponse {
  /** Status message (e.g. "Phonebook added successfully") */
  message: string;
}

/**
 * Request payload for updating an existing phonebook
 */
export interface UpdatePhonebookRequest {
  /** API key of the authenticated user */
  api_key: string;
  /** New phonebook name */
  phonebook_name: string;
  /** Optional description to update */
  description?: string;
}

/**
 * Response returned after successfully updating a phonebook
 */
export interface UpdatePhonebookResponse {
  /** Status message (e.g. "Phonebook Updated Successfully") */
  message: string;
}

/**
 * Response returned after successfully deleting a phonebook
 */
export interface DeletePhonebookResponse {
  /** Status message (e.g. "Phonebook deleted successfully") */
  message: string;
}
