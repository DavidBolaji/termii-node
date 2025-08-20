// types/incomingMessage.type.ts

import { Channel } from "./messageService.type";

/**
 * Webhook payload representing an inbound message received by Termii
 */
export interface IncomingMessage {
  /** The classification of message received (always "inbound") */
  type: string;

  /** The ID of the inbound request */
  id: string;

  /** The unique message ID assigned by Termii */
  message_id: string;

  /** The destination phone number */
  receiver: string;

  /** The source/sender phone number */
  sender: string;

  /** The text content of the inbound message */
  message: string;

  /** ISO timestamp when the message was received */
  received_at: string;

  /** Cost charged for receiving the message (if applicable, may be null) */
  cost: number | null;

  /** Command associated with the inbound message (e.g., "Received") */
  command?: string;

  /** Status of the message (e.g., "Received") */
  status: string;

  /** The channel through which the message was received */
  channel: Channel | null;
}
