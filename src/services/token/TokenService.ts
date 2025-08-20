import { HttpClient } from "../../http/HttpClient";
import {
  SendTokenRequest,
  SendTokenResponse,
  VoiceTokenRequest,
  VoiceTokenResponse,
  VoiceCallRequest,
  VoiceCallResponse,
} from "../../types/tokenService.type";
import { EmailTokenService } from "./EmailTokenService";
import { InAppTokenService } from "./InAppTokenService";
import { VerifyTokenService } from "./VerifyTokenService";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for sending and verifying OTP tokens (SMS, WhatsApp, or Voice)
 */
export class TokenService {
  public readonly email: EmailTokenService;
  public readonly verify: VerifyTokenService;
  public readonly inApp: InAppTokenService;


  constructor(private http: HttpClient) {
    this.email = new EmailTokenService(this.http)
    this.verify = new VerifyTokenService(this.http)
    this.inApp = new InAppTokenService(this.http)
  }

  /**
   * Send a one-time password (OTP) token via SMS, WhatsApp, or Email
   *
   * @param payload - Request payload with OTP configuration and message
   * @returns Expanded `SendTokenResponse` containing PIN details
   */
  async sendToken(
    payload: SendTokenRequest
  ): Promise<Expand<SendTokenResponse>> {
    return this.http.request<Expand<SendTokenResponse>>("/sms/otp/send", {
      method: "POST",
      data: payload
    });
  }

  /**
   * Send a one-time password (OTP) token via Voice call
   *
   * @param payload - Request payload with phone number and OTP parameters
   * @returns Expanded `VoiceTokenResponse` with OTP call details
   */
  async sendVoiceToken(
    payload: VoiceTokenRequest
  ): Promise<Expand<VoiceTokenResponse>> {
    return this.http.request<Expand<VoiceTokenResponse>>(
      "/sms/otp/send/voice",
      {
        method: "POST",
        data: payload
      }
    );
  }

  /**
   * Initiate a direct voice call delivering a numeric code
   *
   * @param payload - Request containing phone number and numeric code
   * @returns Expanded `VoiceCallResponse` with call status
   */
  async sendVoiceCall(
    payload: VoiceCallRequest
  ): Promise<Expand<VoiceCallResponse>> {
    return this.http.request<Expand<VoiceCallResponse>>(
      "/sms/otp/send/call",
      {
        method: "POST",
        data: payload
      }
    );
  }

  
}
