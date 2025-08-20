import { HttpClient } from "../../http/HttpClient";
import { HistoryService } from "../insights/HistoryService";
import { HistoryRequest, HistoryResponse } from "../../types/historyService.type";

describe("HistoryService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: HistoryService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new HistoryService(httpClient);
  });

  it("fetches message history without filter", async () => {
    const mockResponse: HistoryResponse = [
      {
        sender: "sender",
        receiver: "receiver",
        message: "hi",
        amount: 1,
        reroute: 0,
        status: "DELIVERED",
        sms_type: "plain",
        send_by: "sender",
        media_url: null,
        message_id: "mid",
        notify_url: null,
        notify_id: null,
        created_at: "now",
      },
    ];
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.getHistory();

    expect(httpClient.request).toHaveBeenCalledWith(
      "/sms/inbox",
      { method: "GET", params: undefined }
    );
    expect(result).toEqual(mockResponse);
  });

  it("fetches message history with filter", async () => {
    const payload: HistoryRequest = { message_id: "mid" };
    const mockResponse: HistoryResponse = [];
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.getHistory(payload);

    expect(httpClient.request).toHaveBeenCalledWith(
      "/sms/inbox",
      { method: "GET", params: payload }
    );
    expect(result).toEqual(mockResponse);
  });
});