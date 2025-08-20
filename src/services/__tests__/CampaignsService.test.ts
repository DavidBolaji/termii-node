import { HttpClient } from "../../http/HttpClient";
import { CampaignsService } from "../messaging/campaign/CampaignsService";

describe("CampaignsService", () => {
  let httpClient: HttpClient;
  let service: CampaignsService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as unknown as HttpClient;
    service = new CampaignsService(httpClient);
  });

  it("sends a campaign", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({
      message: "Your campaign has been scheduled",
    });

    const result = await service.sendCampaign({
      country_code: "234",
      sender_id: "Termii",
      message: "Welcome",
      channel: "generic",
      message_type: "plain",
      phonebook_id: "abc123",
      campaign_type: "personalized",
      schedule_sms_status: "scheduled",
      schedule_time: "2025-08-16 10:00",
    });

    expect(httpClient.request).toHaveBeenCalledWith(
        "/sms/campaigns/send",
      expect.objectContaining({ method: "POST" })
    );
    expect(result.message).toBe("Your campaign has been scheduled");
  });

  it("fetches campaigns", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({
      data: [{ campaign_id: "C123", sender: "Termii" }],
    });

    const result = await service.fetchCampaigns();

    expect(httpClient.request).toHaveBeenCalledWith(
        "/sms/campaigns",
      expect.objectContaining({ method: "GET" })
    );
    expect(result.data[0].campaign_id).toBe("C123");
  });

  it("fetches campaign history", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({
      data: [{ id: 64, message: "Hi This is from Termii Campaign" }],
    });

    const result = await service.fetchCampaignHistory("C123");

    expect(httpClient.request).toHaveBeenCalledWith(
        "/sms/campaigns/C123",
      expect.objectContaining({ method: "GET" })
    );
    expect(result.data[0].id).toBe(64);
  });

  it("retries a campaign", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({
      message: "Your failed campaign has been retried",
      status: "success",
    });

    const result = await service.retryCampaign("C123");

    expect(httpClient.request).toHaveBeenCalledWith(
        "/sms/campaigns/C123",
      expect.objectContaining({ method: "PATCH" })
    );
    expect(result.status).toBe("success");
  });
});
