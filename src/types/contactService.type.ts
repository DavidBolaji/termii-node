/**
 * Represents a single contact in the phonebook.
 */
export interface Contact {
  /** Unique ID of the contact */
  id: number;
  /** Phonebook ID this contact belongs to */
  pid: number;
  /** Contact's phone number */
  phone_number: string;
  /** Contact's email address (optional) */
  email_address: string | null;
  /** Custom message associated with the contact (optional) */
  message: string | null;
  /** Company name (optional) */
  company: string | null;
  /** First name (optional) */
  first_name: string | null;
  /** Last name (optional) */
  last_name: string | null;
  /** Timestamp when the contact was created */
  create_at: string;
  /** Timestamp when the contact was last updated */
  updated_at: string;
}

/**
 * Generic structure for paginated API responses.
 * T represents the type of records in the `data` array.
 */
export interface PaginatedResponse<T> {
  /** Array of records returned */
  data: T[];
  /** Links for navigation between pages */
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  /** Metadata about pagination */
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

/** Response type specifically for fetching contacts */
export type FetchContactsResponse = PaginatedResponse<Contact>;

/**
 * Request body for adding a single contact.
 */
export interface AddContactRequest {
  phone_number: string;
  country_code?: string;
  email_address?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
}

/**
 * Response after adding a contact.
 */
export interface AddContactResponse {
  /** Newly created contact record */
  data: Contact;
}

/**
 * Request for uploading multiple contacts.
 */
export interface UploadContactsRequest {
  /** CSV file containing contacts */
  file: Buffer | Blob;
  /** Country code for all contacts */
  country_code: string;
  /** Phonebook ID */
  pid: string;
}

/**
 * Response after deleting a contact.
 */
export interface DeleteContactResponse {
  /** Confirmation message (e.g. "Contact deleted successfully") */
  message: string;
}
