import { HttpClient } from "../../http/HttpClient";
import {
  SenderIdReqParam,
  SenderIdResponse,
  SenderIdRequestResponse,
} from "../../types/senderService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

export class SenderIdService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch all registered Sender IDs
   *
   * @param page - The page number to fetch (for pagination)
   * @returns Expanded `SenderIdResponse` object containing paginated sender IDs
   */
  async fetchSenderIds(page: number): Promise<Expand<SenderIdResponse>> {
    return this.http.request<Expand<SenderIdResponse>>("/sender-id", {
      method: "GET",
      params: { page },
      authLocation: "query"
    });
  }

  /**
   * Request registration of a new Sender ID
   *
   * @param params - The sender ID request payload
   * @returns Expanded `SenderIdRequestResponse` with request status
   */
  async requestSenderId(
    params: SenderIdReqParam
  ): Promise<Expand<SenderIdRequestResponse>> {
    return this.http.request<Expand<SenderIdRequestResponse>>(
      "/sender-id/request",
      {
        method: "POST",
        data: params,
        authLocation: "body"
      }
    );
  }
}
