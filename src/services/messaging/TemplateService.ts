import { HttpClient } from "../../http/HttpClient";
import { SendTemplateRequest, SendTemplateResponse } from "../../types/templateService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 * so IntelliSense shows its full shape instead of just the alias.
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

export class TemplatesService {
    constructor(private http: HttpClient) {}

    /**
     * Send a template-based message via WhatsApp or SMS.
     *
     * @param payload - The request payload containing recipient details,
     *   template ID, device ID, and template data values.
     * @returns A promise that resolves to the API response with message details.
     *
     * @example
     * ```ts
     * const templatesService = new TemplatesService(httpClient);
     * const response = await templatesService.sendTemplate({
     *   phone_number: "+2348012345678",
     *   device_id: "DEVICE123",
     *   template_id: "TEMPLATE456",
     *   data: { name: "John", amount: 5000 }
     * });
     *
     * console.log(response.message_id); // e.g. "MSG7890"
     * ```
     */
    async sendTemplate(payload: SendTemplateRequest): Promise<Expand<SendTemplateResponse>> {
        return this.http.request<Expand<SendTemplateResponse>>("/send/template", {
            method: "POST",
            data: payload,
            authLocation: "body"
        });
    }
}