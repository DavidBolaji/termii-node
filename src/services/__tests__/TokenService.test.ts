import { HttpClient } from "../../http/HttpClient";
import { TokenService } from "../token/TokenService";
import { SendTokenRequest, SendTokenResponse, VoiceTokenRequest, VoiceTokenResponse } from "../../types/tokenService.type";

describe("TokenService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: TokenService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new TokenService(httpClient);
  });

  it("sends a token successfully", async () => {
    const mockResponse: SendTokenResponse = {
      pinId: "29ae67c2-c8e1-4165-8a51-8d3d7c298081",
      to: "2348109077743",
      smsStatus: "Message Sent",
    };

    httpClient.request.mockResolvedValue(mockResponse);

    const payload: SendTokenRequest = {
      message_type: "NUMERIC",
      to: "2348109077743",
      from: "CompanyName",
      channel: "dnd",
      pin_attempts: 3,
      pin_time_to_live: 5,
      pin_length: 6,
      pin_placeholder: "< 1234 >",
      message_text: "Your pin is < 1234 >",
      pin_type: "NUMERIC",
    };

    const result = await service.sendToken(payload);

    expect(httpClient.request).toHaveBeenCalledWith("/sms/otp/send", {
      method: "POST",
      data: payload,
      authLocation: 'body',
    });
    expect(result).toEqual(mockResponse);
  });

   it("sends a voice token successfully", async () => {
    const mockResponse: VoiceTokenResponse = {
      code: "ok",
      message_id: "453166532802459832",
      pinId: "29ae67c2-c8e1-4165-8a51-8d3d7c298081",
      message: "Successfully Sent",
      balance: 77.5,
      user: "Termii Test",
    };

    httpClient.request.mockResolvedValue(mockResponse);

    const payload: VoiceTokenRequest = {
      phone_number: "23409800000000",
      pin_attempts: 5,
      pin_time_to_live: 3,
      pin_length: 6,
    };

    const result = await service.sendVoiceToken(payload);

    expect(httpClient.request).toHaveBeenCalledWith("/sms/otp/send/voice", {
      method: "POST",
      data: payload,
      authLocation: 'body',
    });
    expect(result).toEqual(mockResponse);
  });

});
