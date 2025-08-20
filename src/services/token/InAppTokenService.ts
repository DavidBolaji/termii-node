import { HttpClient } from "../../http/HttpClient";
import { InAppTokenRequest, InAppTokenResponse } from "../../types/inAppTokenService.types";


/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for generating in-app OTP tokens
 */
export class InAppTokenService {
  constructor(private http: HttpClient) {}

  /**
   * Generate a new in-app OTP token
   *
   * @param payload - Request payload containing apiKey, pinType, phoneNumber, and OTP settings
   * @returns Expanded `InAppTokenResponse` with OTP details
   */
  async generate(
    payload: InAppTokenRequest
  ): Promise<Expand<InAppTokenResponse>> {
    return this.http.request<Expand<InAppTokenResponse>>(
      "/sms/otp/generate",
      {
        method: "POST",
        data: payload,
        authLocation: "body"
      }
    );
  }
}
