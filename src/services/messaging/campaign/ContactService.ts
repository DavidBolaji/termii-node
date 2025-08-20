import FormData from "form-data";
import { HttpClient } from "../../../http/HttpClient";
import {
  AddContactRequest,
  AddContactResponse,
  DeleteContactResponse,
  FetchContactsResponse,
  UploadContactsRequest,
} from "../../../types/contactService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for managing phonebook contacts.
 */
export class ContactService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch all contacts belonging to a specific phonebook.
   *
   * @param phonebookId - The ID of the phonebook to fetch contacts from
   * @returns Paginated list of contacts with metadata
   *
   * @example
   * ```ts
   * const response = await contactService.fetchContacts("12345");
   * console.log(response.data[0].phone_number); // "+2348012345678"
   * ```
   */
  async fetchContacts(phonebookId: string): Promise<Expand<FetchContactsResponse>> {
    return this.http.request<Expand<FetchContactsResponse>>(
      `/phonebooks/${phonebookId}/contacts`,
      { method: "GET", authLocation: "query" },
      
    );
  }

  /**
   * Add a new contact to a phonebook.
   *
   * @param phonebookId - The ID of the phonebook to add the contact into
   * @param contact - Contact details (phone number, name, email, etc.)
   * @returns The newly added contact record
   *
   * @example
   * ```ts
   * const response = await contactService.addContact("12345", {
   *   phone_number: "+2348012345678",
   *   first_name: "Jane",
   *   last_name: "Doe",
   *   email_address: "jane@example.com"
   * });
   * console.log(response.data.first_name); // "Jane"
   * ```
   */
  async addContact(
    phonebookId: string,
    contact: AddContactRequest
  ): Promise<Expand<AddContactResponse>> {
    return this.http.request<Expand<AddContactResponse>>(
      `/phonebooks/${phonebookId}/contacts`,
      { method: "POST", data: contact, authLocation: "body" }
    );
  }

  /**
   * Upload multiple contacts to a phonebook via CSV file.
   *
   * @param request - Contains CSV file and metadata (phonebook ID, country code)
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const csvBuffer = fs.readFileSync("contacts.csv");
   * const response = await contactService.uploadContacts({
   *   file: csvBuffer,
   *   pid: "12345",
   *   country_code: "NG"
   * });
   * console.log(response.message); // "Contacts uploaded successfully"
   * ```
   */
  async uploadContacts(
    request: UploadContactsRequest
  ): Promise<Expand<{ message: string }>> {
    const form = new FormData();
    form.append("file", request.file, "contacts.csv");
    form.append(
      "contact",
      JSON.stringify({
        pid: request.pid,
        country_code: request.country_code,
      })
    );

    return this.http.request<Expand<{ message: string }>>(`/contacts/upload`, {
      method: "POST",
      data: form,
      authLocation: "body"
    });
  }

  /**
   * Delete a single contact from the system.
   *
   * @param contactId - The ID of the contact to delete
   * @returns Confirmation response
   *
   * @example
   * ```ts
   * const response = await contactService.deleteContact("67890");
   * console.log(response.message); // "Contact deleted successfully"
   * ```
   */
  async deleteContact(contactId: string): Promise<Expand<DeleteContactResponse>> {
    return this.http.request<Expand<DeleteContactResponse>>(`/contacts/${contactId}`, {
      method: "DELETE",
      authLocation: "query"
    });
  }
}
