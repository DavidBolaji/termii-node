/**
 * Request payload for sending a new campaign
 */
export interface SendCampaignRequest {
  /** Country dialing code (e.g. "234" for Nigeria) */
  country_code: string;
  /** Registered sender ID or phone number */
  sender_id: string;
  /** Text message body to be sent */
  message: string;
  /** Delivery channel (DND, WhatsApp, or generic SMS) */
  channel: "dnd" | "whatsapp" | "generic";
  /** Message type (currently only supports "plain") */
  message_type: "plain";
  /** ID of the phonebook containing recipients */
  phonebook_id: string;
  /** Whether to enable Termii’s link tracking feature */
  enable_link_tracking?: boolean;
  /** Category or type of the campaign */
  campaign_type: string;
  /** Whether this is a regular or scheduled campaign */
  schedule_sms_status: "regular" | "scheduled";
  /** Scheduled date/time (ISO string). Required if schedule_sms_status = "scheduled". */
  schedule_time?: string;
}

/**
 * Response after successfully sending a campaign
 */
export interface SendCampaignResponse {
  /** API status message (e.g. "Your campaign has been scheduled") */
  message: string;
}

/**
 * A single campaign record
 */
export interface Campaign {
  /** Unique campaign identifier */
  campaign_id: string;
  /** Associated phonebook ID */
  phone_book: string;
  /** Sender ID or number */
  sender: string;
  /** Campaign type (marketing, transactional, etc.) */
  camp_type: string;
  /** Delivery channel (DND, WhatsApp, generic SMS) */
  channel: string;
  /** Total number of recipients in this campaign */
  total_recipients: number;
  /** Scheduled or actual execution timestamp */
  run_at: string;
  /** Campaign status (pending, running, completed, failed, etc.) */
  status: string;
  /** ISO timestamp of campaign creation */
  created_at: string;
}

/**
 * Response returned when fetching campaigns
 */
export interface FetchCampaignsResponse {
  /** Array of campaign records */
  data: Campaign[];
  /** Pagination links */
  links: {
    /** URL for the first page */
    first: string;
    /** URL for the last page */
    last: string;
    /** URL for the previous page (null if on the first page) */
    prev: string | null;
    /** URL for the next page (null if on the last page) */
    next: string | null;
  };
  /** Pagination metadata */
  meta: {
    /** Current page number */
    current_page: number;
    /** Index of the first item on the current page */
    from: number;
    /** Last available page number */
    last_page: number;
    /** Base API path for pagination */
    path: string;
    /** Number of items per page */
    per_page: number;
    /** Index of the last item on the current page */
    to: number;
    /** Total number of items across all pages */
    total: number;
  };
}

/**
 * A single record in campaign history
 */
export interface CampaignHistoryItem {
  /** Unique record ID */
  id: number;
  /** Sender ID used in the message */
  sender: string;
  /** Recipient phone number */
  receiver: string;
  /** Message body sent */
  message: string;
  /** Abbreviated version of the message */
  message_abbreviation: string;
  /** Amount deducted for this message */
  amount: number;
  /** Delivery channel (DND, WhatsApp, generic SMS) */
  channel: string;
  /** Type of SMS (e.g. "plain") */
  sms_type: string;
  /** Unique message ID */
  message_id: string;
  /** Delivery status (e.g. "sent", "delivered", "failed") */
  status: string;
  /** ISO timestamp of when the record was created */
  date_created: string;
  /** ISO timestamp of last update */
  last_updated: string;
}

/**
 * Response returned when fetching campaign history
 */
export interface FetchCampaignHistoryResponse {
  /** Array of campaign history records */
  data: CampaignHistoryItem[];
  /** Pagination links (same shape as FetchCampaignsResponse.links) */
  links: FetchCampaignsResponse["links"];
  /** Pagination metadata (same shape as FetchCampaignsResponse.meta) */
  meta: FetchCampaignsResponse["meta"];
}

/**
 * Response returned when retrying a failed campaign
 */
export interface RetryCampaignResponse {
  /** API status message */
  message: string;
  /** Retry status (success or failed) */
  status: "success" | "failed";
}
