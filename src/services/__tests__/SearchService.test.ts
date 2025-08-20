import { HttpClient } from "../../http/HttpClient";
import { SearchService } from "../insights/SearchService";
import { SearchRequest, SearchResponse } from "../../types/searchService.types";

describe("SearchService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: SearchService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new SearchService(httpClient);
  });

  it("checks phone number DND status and network", async () => {
    const payload: SearchRequest = { phone_number: "2348012345678" };
    const mockResponse: SearchResponse = {
      number: "2348012345678",
      status: "Active",
      network: "MTN Nigeria",
      network_code: "62120",
    };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.checkNumber(payload);

    expect(httpClient.request).toHaveBeenCalledWith(
      "/check/dnd",
      { method: "GET", params: payload }
    );
    expect(result).toEqual(mockResponse);
  });
});