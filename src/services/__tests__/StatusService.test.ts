import { HttpClient } from "../../http/HttpClient";
import { StatusService } from "../insights/StatusResponseService";
import { StatusRequest, StatusResponse } from "../../types/statusRequestService.type";

describe("StatusService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: StatusService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new StatusService(httpClient);
  });

  it("checks number status with query params", async () => {
    const payload: StatusRequest = { phone_number: "2348012345678", country_code: "NG" };
    const mockResponse: StatusResponse = {
      result: [
        {
          routeDetail: { number: "2348012345678", ported: 0 },
          countryDetail: { countryCode: "234", mobileCountryCode: "621", iso: "NG" },
          operatorDetail: {
            operatorCode: "ANG",
            operatorName: "Airtel Nigeria",
            mobileNumberCode: "62120",
            mobileRoutingCode: "0001",
            carrierIdentificationCode: "001",
            lineType: "Mobile"
          },
          status: 1
        }
      ]
    };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.checkStatus(payload);

    expect(httpClient.request).toHaveBeenCalledWith(
      "/insight/number/query",
      { method: "GET", params: payload }
    );
    expect(result).toEqual(mockResponse);
  });
});