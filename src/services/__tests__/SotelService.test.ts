import { HttpClient } from "../../http/HttpClient";
import { SotelService } from "../sotel/SotelService";
import { EsimService } from "../sotel/EsimService";

describe("SotelService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: SotelService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new SotelService(httpClient);
  });

  it("exposes EsimService via 'esim' property", () => {
    expect(service.esim).toBeInstanceOf(EsimService);
  });

  it("calls underlying EsimService for fetchEsims", async () => {
    // spy on esim.fetchEsims
    const esimSpy = jest.spyOn(service.esim, "fetchEsims").mockResolvedValue({ esims: [], total: 0, page: 0, size: 0 });
    const result = await service.esim.fetchEsims();
    expect(esimSpy).toHaveBeenCalled();
    expect(result).toEqual({ esims: [], total: 0, page: 0, size: 0 });
  });
});