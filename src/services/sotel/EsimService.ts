import { HttpClient } from "../../http/HttpClient";
import { AuthenticateRequest, AuthenticateResponse, CreateEsimRequest, CreateEsimResponse, FetchEsimsResponse, FetchPlansRequest, FetchPlansResponse, QrCodeResponse, UsageResponse } from "../../types/eSimService.type";

/**
 * Utility type that forces TypeScript to expand an interface
 */
type Expand<T> = { [K in keyof T]: T[K] } & {};

export class EsimService {
    constructor(private http: HttpClient) { }

    /**
     * Authenticate with API key to get a bearer token
     */
    async authenticate(
        payload: AuthenticateRequest
    ): Promise<Expand<AuthenticateResponse>> {
        return this.http.request<Expand<AuthenticateResponse>>("/api/esim/authenticate", {
            method: "POST",
            data: payload,
            authLocation: "body"
        });
    }

    /**
     * Fetch available data plans by country and type
     */
    async fetchPlans(
        params: FetchPlansRequest
    ): Promise<Expand<FetchPlansResponse>> {
        return this.http.request<Expand<FetchPlansResponse>>("/api/esim/data/plan/fetch", {
            method: "GET",
            params,
            authLocation: "none"
        });
    }

    /**
     * Create (provision) a new eSIM
     */
    async createEsim(
        payload: CreateEsimRequest
    ): Promise<Expand<CreateEsimResponse>> {
        return this.http.request<Expand<CreateEsimResponse>>("/api/esim/create", {
            method: "POST",
            data: payload,
            authLocation: "none"
        });
    }

    /**
     * Get QR code for activating an eSIM
     */
    async getQrCode(iccid: string): Promise<Expand<QrCodeResponse>> {
        return this.http.request<Expand<QrCodeResponse>>(
            `/api/esim/activate/${iccid}/qr/code`,
            { method: "GET", authLocation: "none" }
        );
    }

    /**
     * Get usage details of an eSIM by ICCID
     */
    async getUsage(iccid: string): Promise<Expand<UsageResponse>> {
        return this.http.request<Expand<UsageResponse>>(
            `/api/esim/subscriptions/usage/${iccid}`,
            { method: "GET", authLocation: "none" }
        );
    }

    /**
     * Fetch list of provisioned eSIMs with pagination
     */
    async fetchEsims(
        page: number = 0,
        size: number = 15
    ): Promise<Expand<FetchEsimsResponse>> {
        return this.http.request<Expand<FetchEsimsResponse>>(
            `/api/esim/fetch/esims?page=${page}&size=${size}`,
            { method: "GET", authLocation: "none" }
        );
    }
}
