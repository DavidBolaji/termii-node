/**
 * Request payload for sending a template message.
 */
export interface SendTemplateRequest {
  /** Recipient's phone number (must be in international format, e.g. +2348012345678). */
  phone_number: string;

  /** Device ID from the Termii dashboard. */
  device_id: string;

  /** Template ID from the Termii dashboard. */
  template_id: string;

  /** Key-value pairs of placeholders to inject into the template. */
  data: Record<string, string | number>;
}

/**
 * Response returned after sending a template message.
 */
export interface SendTemplateResponse {
  /** Response code (usually `"ok"` when successful). */
  code: string;

  /** Unique ID of the message sent. */
  message_id: string;

  /** Human-readable message, e.g. `"Successfully Sent"`. */
  message: string;

  /** User's remaining balance (a number or `"unlimited"`). */
  balance: string | number;

  /** The username of the sender. */
  user: string;
}