import crypto from "crypto";
import { EventService } from "../insights/EventService";
import { TermiiEvent } from "../../types/eventService.type";

describe("EventService", () => {
  let service: EventService;

  beforeEach(() => {
    service = new EventService();
  });

  it("verifies a valid signature", () => {
    const rawPayload = "payload";
    const secretKey = "secret";
    const signature = crypto.createHmac("sha512", secretKey).update(rawPayload).digest("hex");
    expect(service.verifySignature(rawPayload, signature, secretKey)).toBe(true);
  });

  it("rejects an invalid signature", () => {
    expect(service.verifySignature("a", "b", "secret")).toBe(false);
  });

  it("parses event payload", () => {
    const payload: TermiiEvent = {
      type: "outbound_message",
      id: "1",
      message_id: "mid",
      receiver: "r",
      sender: "s",
      message: "msg",
      sent_at: "now",
      cost: "0",
      status: "DELIVERED",
      channel: "generic",
    };
    const result = service.parseEvent(payload);
    expect(result).toEqual(payload);
  });
});