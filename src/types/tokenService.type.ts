/**
 * Request payload for sending an OTP via SMS, WhatsApp, or Email
 */
export interface SendTokenRequest {
  /** OTP message type (numeric digits only, or alphanumeric mix) */
  message_type: "NUMERIC" | "ALPHANUMERIC";
  /** Recipient phone number in international format */
  to: string;
  /** Sender ID or phone number */
  from: string;
  /** Channel to send the OTP (SMS, WhatsApp, email, etc.) */
  channel: "dnd" | "whatsapp" | "generic" | "email";
  /** Maximum number of allowed PIN attempts (min 1) */
  pin_attempts: number;
  /** PIN validity period in minutes (0–60) */
  pin_time_to_live: number;
  /** Length of the OTP PIN (4–8 digits/characters) */
  pin_length: number;
  /** Placeholder text in the message (e.g. "< 1234 >") */
  pin_placeholder: string;
  /** Text message with placeholder (e.g. "Your OTP is < 1234 >") */
  message_text: string;
  /** PIN type: numeric digits or alphanumeric mix */
  pin_type: "NUMERIC" | "ALPHANUMERIC";
}

/**
 * Response after sending an OTP via SMS/WhatsApp
 */
export interface SendTokenResponse {
  /** Unique ID for the OTP PIN */
  pinId: string;
  /** Recipient phone number */
  to: string;
  /** Status of the OTP message */
  smsStatus: string;
}

/**
 * Request payload for sending an OTP via Voice
 */
export interface VoiceTokenRequest {
  /** Recipient phone number in international format */
  phone_number: string;
  /** Maximum number of allowed PIN attempts */
  pin_attempts: number;
  /** PIN validity period in minutes (0–60) */
  pin_time_to_live: number;
  /** Length of the OTP PIN (4–8 digits) */
  pin_length: number;
}

/**
 * Response after sending an OTP via Voice
 */
export interface VoiceTokenResponse {
  /** API response code (e.g., "ok") */
  code: string;
  /** Unique message ID for tracking */
  message_id: string;
  /** Unique OTP PIN ID */
  pinId: string;
  /** API status message */
  message: string;
  /** Remaining balance after sending */
  balance: number;
  /** The user account associated with the request */
  user: string;
}

/**
 * Request payload for initiating a direct Voice Call with a numeric code
 */
export interface VoiceCallRequest {
  /** Recipient phone number */
  phone_number: string;
  /** Numeric code to deliver (must be 4–8 digits) */
  code: number;
}

/**
 * Response after sending a Voice Call
 */
export interface VoiceCallResponse {
  /** API response code (e.g., "ok") */
  code: string;
  /** Unique message ID */
  message_id: string;
  /** OTP PIN ID */
  pinId: string;
  /** API status message */
  message: string;
  /** Remaining balance after sending */
  balance: number;
  /** The user account associated with the request */
  user: string;
}

