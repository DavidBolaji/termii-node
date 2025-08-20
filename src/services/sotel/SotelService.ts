import { HttpClient } from "../../http/HttpClient";
import { EsimService } from "./EsimService";


/**
 * SotelService is the entrypoint for all esim-related API services.
 * It groups sub-services for better organization and reusability.
 */
export class SotelService {
  public readonly esim: EsimService;

  constructor(private http: HttpClient) {
  
    this.esim = new EsimService(this.http);
  }
}
