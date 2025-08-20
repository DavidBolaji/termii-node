/**
 * Enum defining valid PIN types
 */
export type PinType = "NUMERIC" | "ALPHANUMERIC";

/**
 * Request payload for generating an in-app OTP token
 */
export interface InAppTokenRequest {
  /** Your Termii API key */
  api_key: string;
  /** The type of PIN to generate (numeric or alphanumeric) */
  pin_type: PinType;
  /** Recipient phone number (in international format, e.g., 2348109477743) */
  phone_number: string;
  /** Number of allowed attempts before expiration (min 1) */
  pin_attempts: number;
  /** How long (in minutes) the PIN is valid before expiration (0–60) */
  pin_time_to_live: number;
  /** Length of the PIN code (min 4, max 8) */
  pin_length: number;
}

/**
 * Response payload after generating an in-app OTP token
 */
export interface InAppTokenResponse {
  /** API status message (e.g., "success") */
  status: string;
  /** Data object containing token details */
  data: {
    /** Unique ID of the generated PIN */
    pin_id: string;
    /** The generated OTP code */
    otp: string;
    /** Phone number tied to the OTP */
    phone_number: string;
    /** Additional phone number info (returned by Termii) */
    phone_number_other: string;
  };
}
