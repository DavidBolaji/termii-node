import { HttpClient } from "../../http/HttpClient";
import { BalanceService } from "./BalanceService";
import { EventService } from "./EventService";
import { HistoryService } from "./HistoryService";
import { SearchService } from "./SearchService";
import { StatusService } from "./StatusResponseService";

/**
 * InsightService is the entrypoint for all insight-related API services.
 * It groups sub-services for better organization and reusability.
 */
export class InsightService {
  public readonly event: EventService;
  public readonly balance: BalanceService;
  public readonly search: SearchService;
  public readonly history: HistoryService;
  public readonly status: StatusService;

  constructor(private http: HttpClient) {
    this.event = new EventService();
    this.balance = new BalanceService(this.http);
    this.search = new SearchService(this.http);
    this.history = new HistoryService(this.http);
    this.status = new StatusService(this.http);
  }
}