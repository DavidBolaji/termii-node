import { HttpClient } from "../../../http/HttpClient";
import {
  CreatePhonebookRequest,
  CreatePhonebookResponse,
  DeletePhonebookResponse,
  FetchPhonebooksResponse,
  UpdatePhonebookRequest,
  UpdatePhonebookResponse,
} from "../../../types/phonebookService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

export class PhonebookService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch all phonebooks (paginated)
   *
   * @returns Expanded `FetchPhonebooksResponse` including `data`, `links`, and `meta`
   */
  async fetchPhonebooks(): Promise<Expand<FetchPhonebooksResponse>> {
    return this.http.request<Expand<FetchPhonebooksResponse>>("/phonebooks", {
      method: "GET",
      authLocation: "query"
    });
  }

  /**
   * Create a new phonebook
   *
   * @param payload - Details of the phonebook to create
   * @returns Expanded `CreatePhonebookResponse` with status message
   */
  async createPhonebook(
    payload: CreatePhonebookRequest
  ): Promise<Expand<CreatePhonebookResponse>> {
    return this.http.request<Expand<CreatePhonebookResponse>>("/phonebooks", {
      method: "POST",
      data: payload,
      authLocation: "body"
    });
  }

  /**
   * Update an existing phonebook
   *
   * @param phonebookId - The ID of the phonebook to update
   * @param payload - Updated details for the phonebook
   * @returns Expanded `UpdatePhonebookResponse` with status message
   */
  async updatePhonebook(
    phonebookId: string,
    payload: UpdatePhonebookRequest
  ): Promise<Expand<UpdatePhonebookResponse>> {
    return this.http.request<Expand<UpdatePhonebookResponse>>(
      `/phonebooks/${phonebookId}`,
      {
        method: "PATCH",
        data: payload,
        authLocation: "body"
      }
    );
  }

  /**
   * Delete a phonebook
   *
   * @param phonebookId - The ID of the phonebook to delete
   * @returns Expanded `DeletePhonebookResponse` with confirmation message
   */
  async deletePhonebook(
    phonebookId: string
  ): Promise<Expand<DeletePhonebookResponse>> {
    return this.http.request<Expand<DeletePhonebookResponse>>(
      `/phonebooks/${phonebookId}`,
      {
        method: "DELETE",
        authLocation: "query"
      }
    );
  }
}
