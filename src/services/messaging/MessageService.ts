import { HttpClient } from "../../http/HttpClient";
import {
  SendMessageRequest,
  SendMessageResponse,
  SendBulkMessageRequest,
  SendBulkMessageResponse,
} from "../../types/messageService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

export class MessageService {
  constructor(private http: HttpClient) {}

  /**
   * Send a single SMS or WhatsApp message
   *
   * @param payload - Request payload containing recipient, sender ID, and message details
   * @returns Expanded `SendMessageResponse` with message details
   */
  async sendMessage(
    payload: SendMessageRequest
  ): Promise<Expand<SendMessageResponse>> {
    return this.http.request<Expand<SendMessageResponse>>("/sms/send", {
      method: "POST",
      data: payload,
      authLocation: "body"
    });
  }

  /**
   * Send bulk messages (up to 10,000 recipients)
   *
   * @param payload - Bulk message request payload
   * @returns Expanded `SendBulkMessageResponse` with bulk message status
   */
  async sendBulkMessage(
    payload: SendBulkMessageRequest
  ): Promise<Expand<SendBulkMessageResponse>> {
    return this.http.request<Expand<SendBulkMessageResponse>>("/sms/send/bulk", {
      method: "POST",
      data: payload,
      authLocation: "body"
    });
  }
}
