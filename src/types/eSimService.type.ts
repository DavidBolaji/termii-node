/**
 * Request payload for authentication
 */
export interface AuthenticateRequest {
  /** Your live API key */
  api_key: string;
}

/**
 * Response after authentication
 */
export interface AuthenticateResponse {
  /** JWT bearer token */
  token: string;
}

/**
 * Request payload for fetching available data plans
 */
export interface FetchPlansRequest {
  /** Optional ISO country name (e.g., "Nigeria") */
  country?: string;
  /** Plan type: LOCAL or REGION */
  type: "LOCAL" | "REGION";
}

/**
 * Single data plan object
 */
export interface DataPlan {
  /** Unique plan/product ID */
  productId: string;
  /** Name of the plan */
  name: string;
  /** Data allowance (MB or GB) */
  data: string;
  /** Validity duration in days */
  validity: number;
  /** Price of the plan */
  price: number;
  /** ISO3 country code */
  iso3: string;
}

/**
 * Response containing available plans
 */
export interface FetchPlansResponse {
  /** List of available plans */
  plans: DataPlan[];
}

/**
 * Request payload for creating (provisioning) an eSIM
 */
export interface CreateEsimRequest {
  /** Product ID of the chosen plan */
  productId: string;
  /** ISO3 country code */
  iso3: string;
}

/**
 * Response after creating an eSIM
 */
export interface CreateEsimResponse {
  /** eSIM ICCID */
  iccid: string;
  /** Matching ID / profile ID */
  euiccId: string;
  /** Status of the eSIM (e.g., "ACTIVE", "PENDING") */
  status: string;
}

/**
 * Response for fetching QR code for activation
 */
export interface QrCodeResponse {
  /** Base64-encoded QR code string */
  qrCode: string;
}

/**
 * Response for fetching eSIM data usage
 */
export interface UsageResponse {
  /** ICCID of the eSIM */
  iccid: string;
  /** Total data used in MB */
  used: number;
  /** Remaining data in MB */
  remaining: number;
  /** Expiry date (ISO string) */
  expiry: string;
}

/**
 * Response for listing eSIMs
 */
export interface EsimRecord {
  /** eSIM ICCID */
  iccid: string;
  /** Plan/product ID */
  productId: string;
  /** ISO3 country */
  iso3: string;
  /** Current status */
  status: string;
  /** Date created */
  createdAt: string;
}
export interface FetchEsimsResponse {
  /** List of eSIM records */
  esims: EsimRecord[];
  /** Pagination info */
  total: number;
  page: number;
  size: number;
}
