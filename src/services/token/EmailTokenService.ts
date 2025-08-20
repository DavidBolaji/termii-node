import { HttpClient } from "../../http/HttpClient";
import {
  SendEmailTokenRequest,
  SendEmailTokenResponse,
} from "../../types/emailTokenService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for handling Email OTP operations
 */
export class EmailTokenService {
  constructor(private http: HttpClient) {}

  /**
   * Send an OTP to a user's email address
   *
   * @param payload - Request payload containing API key, email, code, and config ID
   * @returns Expanded `SendEmailTokenResponse` with details about the sent OTP
   */
  async sendEmailToken(
    payload: SendEmailTokenRequest
  ): Promise<Expand<SendEmailTokenResponse>> {
    return this.http.request<Expand<SendEmailTokenResponse>>(
      "/email/otp/send",
      {
        method: "POST",
        data: payload,
        authLocation: "body"
      }
    );
  }
}
