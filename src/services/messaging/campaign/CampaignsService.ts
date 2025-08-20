import { HttpClient } from "../../../http/HttpClient";
import {
  FetchCampaignHistoryResponse,
  FetchCampaignsResponse,
  RetryCampaignResponse,
  SendCampaignRequest,
  SendCampaignResponse,
} from "../../../types/campaignService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for managing SMS/WhatsApp campaigns.
 */
export class CampaignsService {
  constructor(private http: HttpClient) {}

  /**
   * Send a new campaign.
   *
   * @param payload - The campaign details such as sender, message, channel, and phonebook ID.
   * @returns A promise that resolves with the campaign scheduling response.
   *
   * @example
   * ```ts
   * const response = await campaignsService.sendCampaign({
   *   country_code: "NG",
   *   sender_id: "MyApp",
   *   message: "Hello world!",
   *   channel: "dnd",
   *   message_type: "plain",
   *   phonebook_id: "12345",
   *   campaign_type: "marketing",
   *   schedule_sms_status: "regular"
   * });
   *
   * console.log(response.message); // "Your campaign has been scheduled"
   * ```
   */
  async sendCampaign(payload: SendCampaignRequest): Promise<Expand<SendCampaignResponse>> {
    return this.http.request("/sms/campaigns/send", {
      method: "POST",
      data: payload,
      authLocation: "body"
    });
  }

  /**
   * Fetch a paginated list of campaigns.
   *
   * @returns A promise with campaign metadata and pagination links.
   */
  async fetchCampaigns(): Promise<Expand<FetchCampaignsResponse>> {
    return this.http.request("/sms/campaigns", {
      method: "GET",
      authLocation: "query"
    });
  }

  /**
   * Fetch the message history of a specific campaign.
   *
   * @param campaignId - The unique ID of the campaign.
   * @returns A promise with the campaign's delivery history.
   */
  async fetchCampaignHistory(campaignId: string): Promise<Expand<FetchCampaignHistoryResponse>> {
    return this.http.request(`/sms/campaigns/${campaignId}`, {
      method: "GET",
      authLocation: "query"
    });
  }

  /**
   * Retry a failed campaign.
   *
   * @param campaignId - The unique ID of the campaign to retry.
   * @returns A promise with the retry operation result.
   */
  async retryCampaign(campaignId: string): Promise<Expand<RetryCampaignResponse>> {
    return this.http.request(`/sms/campaigns/${campaignId}`, {
      method: "PATCH",
      authLocation: "body"
    });
  }
}