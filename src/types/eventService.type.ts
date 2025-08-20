import { Channel } from "./messageService.type";

/**
 * Outbound message delivery status values
 */
export type DeliveryStatus =
  | "DELIVERED"
  | "DND Active on Phone Number"
  | "Message Sent"
  | "Received"
  | "Message Failed"
  | "Rejected"
  | "Expired";

/**
 * Webhook payload for outbound message delivery events
 */
export interface OutboundMessageEvent {
  /** Type of event (e.g., "outbound_message") */
  type: string;
  /** Unique ID of the request sent */
  id: string;
  /** Unique ID of the message */
  message_id: string;
  /** Recipient phone number */
  receiver: string;
  /** Sender ID or WhatsApp device ID */
  sender: string;
  /** Text of the message sent */
  message: string;
  /** Timestamp when the message was sent */
  sent_at: string;
  /** Cost of the message */
  cost: string;
  /** Delivery status of the message */
  status: DeliveryStatus;
  /** Channel used (dnd, whatsapp, or generic) */
  channel: Channel;
}

/**
 * Device status values
 */
export type DeviceStatus = "connected" | "disconnected";

/**
 * Webhook payload for device status notifications
 */
export interface DeviceStatusEvent {
  /** Type of event (e.g., "device_status") */
  type: string;
  /** Current device status */
  status: DeviceStatus;
  /** Unique device ID */
  device_id: string;
  /** Human-readable device name */
  name: string;
}

/**
 * Union type for all possible Termii events
 */
export type TermiiEvent = OutboundMessageEvent | DeviceStatusEvent;
