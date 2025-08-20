import { HttpClient } from "../../http/HttpClient";
import { InAppTokenService } from "../token/InAppTokenService";
import { InAppTokenRequest, InAppTokenResponse } from "../../types/inAppTokenService.types";

describe("InAppTokenService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: InAppTokenService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new InAppTokenService(httpClient);
  });

  it("generates an in-app token", async () => {
    const payload: InAppTokenRequest = {
      api_key: "key",
      pin_type: "NUMERIC",
      phone_number: "1234567890",
      pin_attempts: 3,
      pin_time_to_live: 5,
      pin_length: 6,
    };
    const mockResponse: InAppTokenResponse = {
      status: "success",
      data: {
        pin_id: "abc123",
        otp: "654321",
        phone_number: "1234567890",
        phone_number_other: "1234567890",
      },
    };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.generate(payload);

    expect(httpClient.request).toHaveBeenCalledWith(
      "/sms/otp/generate",
      expect.objectContaining({ method: "POST", data: payload })
    );
    expect(result).toEqual(mockResponse);
  });
});