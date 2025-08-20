import { HttpClient } from "../../http/HttpClient";
import { ContactService } from "../messaging/campaign/ContactService";
import FormData from "form-data";

describe("ContactService", () => {
  let httpClient: HttpClient;
  let service: ContactService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as unknown as HttpClient;
    service = new ContactService(httpClient);
  });

  it("fetches contacts", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({ data: [] });

    const result = await service.fetchContacts("123");

    expect(httpClient.request).toHaveBeenCalledWith(
      "/phonebooks/123/contacts",
      expect.any(Object)
    );
    expect(result.data).toEqual([]);
  });

  it("adds a contact", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({
      data: { phone_number: "12345" },
    });

    const result = await service.addContact("123", { phone_number: "12345" });

    expect(httpClient.request).toHaveBeenCalledWith(
      "/phonebooks/123/contacts",
      expect.objectContaining({
        method: "POST",
        data: { phone_number: "12345" },
      })
    );
    expect(result.data.phone_number).toBe("12345");
  });

  it("uploads contacts", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({
      message: "Upload started",
    });

    const result = await service.uploadContacts({
      file: Buffer.from("fake"),
      country_code: "234",
      pid: "123",
    });

    expect(httpClient.request).toHaveBeenCalledWith(
      "/contacts/upload",
      expect.objectContaining({
        method: "POST",
        data: expect.any(FormData),
      })
    );
    expect(result.message).toBe("Upload started");
  });

  it("deletes a contact", async () => {
    (httpClient.request as jest.Mock).mockResolvedValueOnce({
      message: "Contact deleted successfully",
    });

    const result = await service.deleteContact("999");

    expect(httpClient.request).toHaveBeenCalledWith(
      "/contacts/999",
      expect.objectContaining({
        method: "DELETE",
      })
    );
    expect(result.message).toBe("Contact deleted successfully");
  });
});
