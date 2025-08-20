import { HttpClient } from "../../http/HttpClient";
import { VerifyTokenRequest, VerifyTokenResponse } from "../../types/verifyTokenService.types";


/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for verifying OTP tokens
 */
export class VerifyTokenService {
  constructor(private http: HttpClient) {}

  /**
   * Verify an OTP token by checking its pinId and PIN code
   *
   * @param payload - Request payload containing apiKey, pinId, and pin
   * @returns Expanded `VerifyTokenResponse` with verification status
   */
  async verifyToken(
    payload: Expand<VerifyTokenRequest>
  ): Promise<Expand<VerifyTokenResponse>> {
    return this.http.request<Expand<VerifyTokenResponse>>(
      "/sms/otp/verify",
      {
        method: "POST",
        data: payload,
        authLocation: "body"
      }
    );
  }
}
