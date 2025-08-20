import { HttpClient } from "../../http/HttpClient";
import { EmailTokenService } from "../token/EmailTokenService";
import { SendEmailTokenRequest, SendEmailTokenResponse } from "../../types/emailTokenService.type";

describe("EmailTokenService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: EmailTokenService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new EmailTokenService(httpClient);
  });

  it("sends an email OTP", async () => {
    const payload: SendEmailTokenRequest = {
      api_key: "key",
      email_address: "user@example.com",
      code: "1234",
      email_configuration_id: "conf1",
    };
    const mockResponse: SendEmailTokenResponse = {
      code: "ok",
      message_id: "msg1",
      message: "Sent",
      balance: 10,
      user: "user",
    };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.sendEmailToken(payload);

    expect(httpClient.request).toHaveBeenCalledWith(
      "/email/otp/send",
      expect.objectContaining({ method: "POST", data: payload, authLocation: "body" })
    );
    expect(result).toEqual(mockResponse);
  });
});