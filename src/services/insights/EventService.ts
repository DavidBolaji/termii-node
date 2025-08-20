import crypto from "crypto";
import { TermiiEvent } from "../../types/eventService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

/**
 * Service for verifying and handling Termii webhook events
 */
export class EventService {
  constructor() { }

  /**
   * Verify that an incoming webhook event really came from Termii
   *
   * @param rawPayload - The raw request body (as a string)
   * @param signature - The "X-Termii-Signature" header from the request
   * @param secretKey - The Termii secretkey
   * @returns true if the signature is valid, false otherwise
   */
  verifySignature(rawPayload: string, signature: string, secretKey: string): boolean {
    const computed = crypto
      .createHmac("sha512", secretKey)
      .update(rawPayload)
      .digest("hex");

    const computedBuf = Buffer.from(computed, "hex");
    const receivedBuf = Buffer.from(signature, "hex");

    if (computedBuf.length !== receivedBuf.length) {
      return false; // avoid RangeError
    }

    return crypto.timingSafeEqual(
      computedBuf,
      receivedBuf
    );
  }

  /**
   * Parse the incoming webhook event into a strongly typed object
   *
   * @param payload - Parsed JSON body of the webhook
   * @returns Expanded TermiiEvent with event details
   */
  parseEvent(payload: unknown): Expand<TermiiEvent> {
    return payload as Expand<TermiiEvent>;
  }
}

