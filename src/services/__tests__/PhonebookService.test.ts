import { HttpClient } from "../../http/HttpClient";
import { PhonebookService } from "../messaging/campaign/PhonebookService";

describe("PhonebookService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: PhonebookService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new PhonebookService(httpClient);
  });

  it("fetches phonebooks", async () => {
    const mockResponse = { data: [], links: {}, meta: {} };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.fetchPhonebooks();
    expect(httpClient.request).toHaveBeenCalledWith(
        "/phonebooks",
        expect.objectContaining({ method: "GET", authLocation: "query" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("creates a phonebook", async () => {
    const payload = { api_key: "key", phonebook_name: "MyBook", description: "desc" };
    const mockResponse = { message: "Phonebook added successfully" };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.createPhonebook(payload as any);
    expect(httpClient.request).toHaveBeenCalledWith(
        "/phonebooks",
        expect.objectContaining({ method: "POST", data: payload, authLocation: "body" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("updates a phonebook", async () => {
    const payload = { api_key: "key", phonebook_name: "NewName", description: "newdesc" };
    const mockResponse = { message: "Phonebook Updated Successfully" };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.updatePhonebook("123", payload as any);
    expect(httpClient.request).toHaveBeenCalledWith(
        "/phonebooks/123",
        expect.objectContaining({ method: "PATCH", data: payload, authLocation: "body" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("deletes a phonebook", async () => {
    const mockResponse = { message: "Phonebook deleted successfully" };
    (httpClient.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await service.deletePhonebook("123");
    expect(httpClient.request).toHaveBeenCalledWith(
        "/phonebooks/123",
        expect.objectContaining({ method: "DELETE", authLocation: "query" })
    );
    expect(result).toEqual(mockResponse);
  });
});