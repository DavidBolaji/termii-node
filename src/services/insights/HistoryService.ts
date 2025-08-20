// services/HistoryService.ts
import { HttpClient } from "../../http/HttpClient";
import { HistoryRequest, HistoryResponse } from "../../types/historyService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for fetching SMS, Voice & WhatsApp message history (Inbox API)
 */
export class HistoryService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch message history (all messages or a single message if message_id is provided)
   *
   * @param payload - Optional request payload with message_id
   * @returns Expanded HistoryResponse array of message records
   */
  async getHistory(
    payload?: HistoryRequest
  ): Promise<Expand<HistoryResponse>> {
    return this.http.request<Expand<HistoryResponse>>("/sms/inbox", {
      method: "GET",
      params: payload // message_id if provided
    });
  }
}
