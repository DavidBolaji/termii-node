/**
 * Media object for WhatsApp high volume messages
 */
export interface Media {
  /** Media URL (image, video, document, etc.) */
  url: string;
  /** Optional caption for the media */
  caption?: string;
}

/**
 * Defines valid message channels for the Termii API.
 */
export type Channel = "dnd" | "generic" | "whatsapp";

/**
 * Request payload for sending a single message
 */
export interface SendMessageRequest {
  /** Recipient phone number(s). Can be a single number or up to 100 numbers. */
  to: string | string[];
  /** Sender ID or device name for WhatsApp */
  from: string;
  /** Optional SMS text (not required if using media) */
  sms?: string;
  /** Message type (API currently supports plain messages) */
  type: string;
  /** Channel to send the message through */
  channel: Channel;
  /** Optional media object for WhatsApp messages */
  media?: Media;
}

/**
 * Response after sending a single message
 */
export interface SendMessageResponse {
  /** Unique ID of the sent message */
  message_id: string;
  /** API status message */
  message: string;
  /** Remaining SMS balance after sending */
  balance: number;
  /** The user account associated with the message */
  user: string;
}

/**
 * Request payload for sending bulk messages
 */
export interface SendBulkMessageRequest {
  /** List of recipients (max 10,000) */
  to: string[];
  /** Sender ID */
  from: string;
  /** SMS text body */
  sms: string;
  /** Message type */
  type: string;
  /** Channel to send the message through */
  channel: Channel;
}

/**
 * Response after sending bulk messages
 */
export interface SendBulkMessageResponse {
  /** API response code (e.g., "ok") */
  code: string;
  /** Bulk message ID */
  message_id: string;
  /** API status message */
  message: string;
  /** Remaining SMS balance */
  balance: number;
  /** The user account associated with the message */
  user: string;
}
