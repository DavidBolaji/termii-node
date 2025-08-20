import { HttpClient } from "../../http/HttpClient";
import { VerifyTokenService } from "../token/VerifyTokenService";
import { VerifyTokenRequest, VerifyTokenResponse } from "../../types/verifyTokenService.types";

describe("VerifyTokenService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: VerifyTokenService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new VerifyTokenService(httpClient);
  });

  it("verifies a token successfully", async () => {
    const payload: VerifyTokenRequest = {
      api_key: "key",
      pin_id: "pin1",
      pin: "1234",
    };
    const mockResponse: VerifyTokenResponse = {
      pinId: "pin1",
      verified: "True",
      msisdn: "1234",
    };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.verifyToken(payload);

    expect(httpClient.request).toHaveBeenCalledWith(
      "/sms/otp/verify",
      { method: "POST", data: payload }
    );
    expect(result).toEqual(mockResponse);
  });
});