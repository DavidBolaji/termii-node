import { HttpClient } from "../../http/HttpClient";
import { EsimService } from "../sotel/EsimService";
import {
  AuthenticateRequest,
  AuthenticateResponse,
  FetchPlansRequest,
  FetchPlansResponse,
  CreateEsimRequest,
  CreateEsimResponse,
  QrCodeResponse,
  UsageResponse,
} from "../../types/eSimService.type";

describe("EsimService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: EsimService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new EsimService(httpClient);
  });

  it("authenticates to get a token", async () => {
    const payload: AuthenticateRequest = { api_key: "key" };
    const mockResponse: AuthenticateResponse = { token: "abc123" };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.authenticate(payload);
    expect(httpClient.request).toHaveBeenCalledWith(
      "/api/esim/authenticate",
      expect.objectContaining({ method: "POST", data: payload, authLocation: "body" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("fetches data plans", async () => {
    const params: FetchPlansRequest = { country: "Nigeria", type: "LOCAL" };
    const mockResponse: FetchPlansResponse = { plans: [] };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.fetchPlans(params);
    expect(httpClient.request).toHaveBeenCalledWith(
      "/api/esim/data/plan/fetch",
      expect.objectContaining({ method: "GET", params, authLocation: "none" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("creates a new eSIM", async () => {
    const payload: CreateEsimRequest = { productId: "p1", iso3: "NG" };
    const mockResponse: CreateEsimResponse = { iccid: "i1", euiccId: "u1", status: "ACTIVE" };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.createEsim(payload);
    expect(httpClient.request).toHaveBeenCalledWith(
      "/api/esim/create",
      expect.objectContaining({ method: "POST", data: payload, authLocation: "none" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("gets QR code for activation", async () => {
    const iccid = "i1";
    const mockResponse: QrCodeResponse = { qrCode: "data" };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.getQrCode(iccid);
    expect(httpClient.request).toHaveBeenCalledWith(
      `/api/esim/activate/${iccid}/qr/code`,
      expect.objectContaining({ method: "GET", authLocation: "none" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("gets usage details", async () => {
    const iccid = "i1";
    const mockResponse: UsageResponse = { iccid, used: 0, remaining: 100, expiry: "2025-09-01" };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.getUsage(iccid);
    expect(httpClient.request).toHaveBeenCalledWith(
      `/api/esim/subscriptions/usage/${iccid}`,
      expect.objectContaining({ method: "GET", authLocation: "none" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("fetches provisioned eSIMs with default pagination", async () => {
    const mockResponse: FetchPlansResponse = { plans: [] };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.fetchEsims();
    expect(httpClient.request).toHaveBeenCalledWith(
      "/api/esim/fetch/esims?page=0&size=15",
      expect.objectContaining({ method: "GET", authLocation: "none" })
    );
    expect(result).toEqual(mockResponse);
  });
});