/**
 * Request payload for sending an Email OTP
 */
export interface SendEmailTokenRequest {
  /** Your Termii API key */
  api_key: string;
  /** Recipient email address */
  email_address: string;
  /** OTP code to send (string, 4–8 digits) */
  code: string;
  /** Email configuration ID from Termii dashboard */
  email_configuration_id: string;
}

/**
 * Response after sending an Email OTP
 */
export interface SendEmailTokenResponse {
  /** API response code (e.g., "ok") */
  code: string;
  /** Unique ID of the sent email */
  message_id: string;
  /** API status message */
  message: string;
  /** Remaining balance */
  balance: number;
  /** The user account associated with the message */
  user: string;
}
