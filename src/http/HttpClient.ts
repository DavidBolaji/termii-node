import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { TermiiOptions, HttpError } from "../types";
import FormData from "form-data";

type AuthLocation = "query" | "body" | "none";

export class HttpClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(options: TermiiOptions) {
    this.apiKey = options.apiKey;

    this.client = axios.create({
      baseURL: options.baseURL ?? "https://api.ng.termii.com/api",
    });
  }

  public async request<T>(
    path: string,
    options: AxiosRequestConfig & { raw?: boolean; authLocation?: AuthLocation } = {}
  ): Promise<T> {
    try {
      const isFormData = options.data instanceof FormData;

      let params = options.params || {};
      let data = options.data || undefined;
      let headers = {
        ...(options.headers || {}),
        ...(isFormData || options.raw
          ? {}
          : { Accept: "application/json", "Content-Type": "application/json" }),
      };

      // ✅ Decide where to inject api_key
      switch (options.authLocation) {
        case "query":
          params = { ...params, api_key: this.apiKey };
          break;
        case "body":
          if (!isFormData) {
            data = { ...(data || {}), api_key: this.apiKey };
          }
          break;
        case "none":
          headers["X-Token"] = this.apiKey; // 🔑 attach as header
          break;
        default:
          break;
      }

      const response = await this.client.request<T>({
        url: path,
        method: options.method || "GET",
        data,
        params,
        headers,
      });

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      const payload =
        err.response?.data ||
        ({ code: err.response?.status, message: err.message } as any);

      throw new HttpError(
        `HTTP Error: ${err.response?.status || "Unknown"}`,
        payload
      );
    }
  }
}
