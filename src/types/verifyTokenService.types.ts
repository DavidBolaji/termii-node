/**
 * Request payload for verifying an OTP token
 */
export interface VerifyTokenRequest {
  /** The ID of the PIN that was sent */
  pin_id: string;
  /** The PIN code entered by the user */
  pin: string;
}

/**
 * Response after verifying a token
 */
export interface VerifyTokenResponse {
  /** The ID of the verified PIN */
  pinId: string;
  /** Whether the token is verified ("True" or "False") */
  verified: string;
  /** The MSISDN (mobile number) tied to the token */
  msisdn: string;
}
