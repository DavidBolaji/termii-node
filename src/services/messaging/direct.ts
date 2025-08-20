import { HttpClient } from "../../http/HttpClient";
import { MessageService } from "./MessageService";
import { TemplatesService } from "./TemplateService";
import { CampaignService } from "./campaign/CampaignService";
import { SenderIdService } from "./SenderIdService";
import { TokenService } from "../token/TokenService";
import { InsightService } from "../insights/InsightService";
import { SotelService } from "../sotel/SotelService";

import {
  SendMessageRequest,
  SendMessageResponse,
  SendBulkMessageRequest,
  SendBulkMessageResponse,
} from "../../types/messageService.type";
import {
  SendTemplateRequest,
  SendTemplateResponse,
} from "../../types/templateService.type";
import {
  SendCampaignRequest,
  SendCampaignResponse,
} from "../../types/campaignService.type";
import { SenderIdReqParam, SenderIdRequestResponse } from "../../types/senderService.type";
import {
  SendTokenRequest,
  SendTokenResponse,
} from "../../types/tokenService.type";
import { GetBalanceResponse as BalanceResponse } from "../../types/balanceService.types";
import {
  FetchPlansRequest as EsimPlanRequest,
  FetchPlansResponse as EsimPlanResponse,
  AuthenticateRequest,
  AuthenticateResponse,
  CreateEsimRequest,
  CreateEsimResponse,
  FetchEsimsResponse,
  QrCodeResponse,
  UsageResponse,
} from "../../types/eSimService.type";

/**
 * Singleton HttpClient instance and API key storage
 */
let httpClient: HttpClient | null = null;
let storedApiKey: string | null = null;
let storedBaseUrl: string | undefined = undefined;

/**
 * Initialize the SDK with API key and optional baseUrl.
 * Must be called before using any direct functions.
 * @param apiKey API key string
 * @param baseUrl Optional base URL string
 */
export function initialize(apiKey: string, baseUrl?: string) {
  storedApiKey = apiKey;
  storedBaseUrl = baseUrl;
  httpClient = new HttpClient({ apiKey, baseURL: baseUrl });
}

function getHttpClient(): HttpClient {
  if (!httpClient) {
    if (!storedApiKey) {
      throw new Error("SDK not initialized. Call initialize(apiKey, baseUrl?) first.");
    }
    httpClient = new HttpClient({ apiKey: storedApiKey, baseURL: storedBaseUrl });
  }
  return httpClient;
}

/**
 * Send a single SMS or WhatsApp message directly without instantiating MessageService.
 * @param payload SendMessageRequest payload
 * @returns Promise resolving to SendMessageResponse
 */
export async function sendMessage(
  payload: SendMessageRequest
): Promise<SendMessageResponse> {
  const service = new MessageService(getHttpClient());
  return service.sendMessage(payload);
}

/**
 * Send bulk messages directly without instantiating MessageService.
 * @param payload SendBulkMessageRequest payload
 * @returns Promise resolving to SendBulkMessageResponse
 */
export async function sendBulkMessage(
  payload: SendBulkMessageRequest
): Promise<SendBulkMessageResponse> {
  const service = new MessageService(getHttpClient());
  return service.sendBulkMessage(payload);
}

/**
 * Send a template message directly without instantiating TemplatesService.
 * @param payload SendTemplateRequest payload
 * @returns Promise resolving to SendTemplateResponse
 */
export async function sendTemplate(
  payload: SendTemplateRequest
): Promise<SendTemplateResponse> {
  const service = new TemplatesService(getHttpClient());
  return service.sendTemplate(payload);
}

/**
 * Send a campaign message directly without instantiating CampaignService.
 * @param payload SendCampaignRequest payload
 * @returns Promise resolving to SendCampaignResponse
 */
export async function sendCampaign(
  payload: SendCampaignRequest
): Promise<SendCampaignResponse> {
  const service = new CampaignService(getHttpClient());
  // The CampaignService does not have sendCampaign method, use 'campaign' property or correct method
  if (typeof (service as any).sendCampaign === "function") {
    return (service as any).sendCampaign(payload);
  }
  if (service.campaign && typeof service.campaign.sendCampaign === "function") {
    return service.campaign.sendCampaign(payload);
  }
  throw new Error("sendCampaign method not found on CampaignService");
}

/**
 * Fetch sender IDs directly without instantiating SenderIdService.
 * @param page Page number
 * @returns Promise resolving to sender IDs response
 */
export async function fetchSenderIds(
  page: number
): Promise<SenderIdRequestResponse> {
  const service = new SenderIdService(getHttpClient());
  const response = await service.fetchSenderIds(page);
  // Wrap response to include code and message if missing
  if (!('code' in response) || !('message' in response)) {
    return {
      code: 'ok' as string,
      message: 'Success' as string,
      ...response,
    };
  }
  return response as any;
}

/**
 * Request new sender ID directly without instantiating SenderIdService.
 * @param payload SenderIdReqParam
 * @returns Promise resolving to sender ID request response
 */
export async function requestSenderId(
  payload: SenderIdReqParam
): Promise<SenderIdRequestResponse> {
  const service = new SenderIdService(getHttpClient());
  return service.requestSenderId(payload);
}

/**
 * Send OTP token directly without instantiating TokenService.
 * @param payload SendTokenRequest
 * @returns Promise resolving to SendTokenResponse
 */
export async function sendToken(
  payload: SendTokenRequest
): Promise<SendTokenResponse> {
  const service = new TokenService(getHttpClient());
  return service.sendToken(payload);
}

/**
 * Fetch account balance directly without instantiating InsightService.
 * @returns Promise resolving to BalanceResponse
 */
export async function getBalance(): Promise<BalanceResponse> {
  const service = new InsightService(getHttpClient());
  return service.balance.getBalance();
}

/**
 * Authenticate with API key to get a bearer token directly without instantiating EsimService.
 * @param payload AuthenticateRequest
 * @returns Promise resolving to AuthenticateResponse
 */
export async function authenticateEsim(
  payload: AuthenticateRequest
): Promise<AuthenticateResponse> {
  const service = new SotelService(getHttpClient());
  return service.esim.authenticate(payload);
}

/**
 * Fetch eSIM plans directly without instantiating EsimService.
 * @param payload FetchPlansRequest
 * @returns Promise resolving to FetchPlansResponse
 */
export async function fetchEsimPlans(
  payload: EsimPlanRequest
): Promise<EsimPlanResponse> {
  const service = new SotelService(getHttpClient());
  return service.esim.fetchPlans(payload);
}

/**
 * Create (provision) a new eSIM directly without instantiating EsimService.
 * @param payload CreateEsimRequest
 * @returns Promise resolving to CreateEsimResponse
 */
export async function createEsim(
  payload: CreateEsimRequest
): Promise<CreateEsimResponse> {
  const service = new SotelService(getHttpClient());
  return service.esim.createEsim(payload);
}

/**
 * Get QR code for activating an eSIM directly without instantiating EsimService.
 * @param iccid eSIM ICCID string
 * @returns Promise resolving to QrCodeResponse
 */
export async function getEsimQrCode(
  iccid: string
): Promise<QrCodeResponse> {
  const service = new SotelService(getHttpClient());
  return service.esim.getQrCode(iccid);
}

/**
 * Get usage details of an eSIM directly without instantiating EsimService.
 * @param iccid eSIM ICCID string
 * @returns Promise resolving to UsageResponse
 */
export async function getEsimUsage(
  iccid: string
): Promise<UsageResponse> {
  const service = new SotelService(getHttpClient());
  return service.esim.getUsage(iccid);
}

/**
 * Fetch list of provisioned eSIMs directly without instantiating EsimService.
 * @param page Page number (default 0)
 * @param size Page size (default 15)
 * @returns Promise resolving to FetchEsimsResponse
 */
export async function fetchEsims(
  page: number = 0,
  size: number = 15
): Promise<FetchEsimsResponse> {
  const service = new SotelService(getHttpClient());
  return service.esim.fetchEsims(page, size);
}
