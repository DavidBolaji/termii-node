// types/historyService.type.ts

/**
 * Request payload for fetching message history.
 * Optional message_id can be used to filter a single message report.
 */
export interface HistoryRequest {
  /** Optional message ID to filter history by a single message */
  message_id?: string;
}

/**
 * Response item representing a single message history record
 */
export interface HistoryItem {
  /** Sender name or ID */
  sender: string;

  /** Recipient phone number */
  receiver: string;

  /** Message text body */
  message: string;

  /** Number of units charged for this message */
  amount: number;

  /** Indicates if rerouted (0 = no, 1 = yes) */
  reroute: number;

  /** Delivery status (e.g., "DND Active on Phone Number") */
  status: string;

  /** Type of SMS (e.g., "plain") */
  sms_type: string;

  /** Sent by (e.g., "sender") */
  send_by: string;

  /** Media URL if message included media (WhatsApp, MMS, etc.) */
  media_url: string | null;

  /** Unique message ID */
  message_id: string;

  /** Optional callback URL */
  notify_url: string | null;

  /** Optional callback notification ID */
  notify_id: string | null;

  /** Timestamp of when the message was created */
  created_at: string;
}

/**
 * Response from the Inbox History API
 * Returns an array of HistoryItem records
 */
export type HistoryResponse = HistoryItem[];
