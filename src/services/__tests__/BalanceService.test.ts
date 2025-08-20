import { HttpClient } from "../../http/HttpClient";
import { BalanceService } from "../insights/BalanceService";
import { GetBalanceResponse } from "../../types/balanceService.types";

describe("BalanceService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: BalanceService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new BalanceService(httpClient);
  });

  it("fetches account balance", async () => {
    const mockResponse: GetBalanceResponse = {
      user: "testUser",
      balance: 100,
      currency: "USD",
    };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.getBalance();

    expect(httpClient.request).toHaveBeenCalledWith(
        "/get-balance",
        { method: "GET", authLocation: "query" }
    );
    expect(result).toEqual(mockResponse);
  });
});