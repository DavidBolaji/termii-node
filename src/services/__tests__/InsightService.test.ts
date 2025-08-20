import { HttpClient } from "../../http/HttpClient";
import { InsightService } from "../insights/InsightService";
import { BalanceService } from "../insights/BalanceService";
import { SearchService } from "../insights/SearchService";
import { HistoryService } from "../insights/HistoryService";
import { StatusService } from "../insights/StatusResponseService";
import { EventService } from "../insights/EventService";

describe("InsightService", () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: InsightService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new InsightService(httpClient);
  });

  it("exposes sub-services", () => {
    expect(service.balance).toBeInstanceOf(BalanceService);
    expect(service.search).toBeInstanceOf(SearchService);
    expect(service.history).toBeInstanceOf(HistoryService);
    expect(service.status).toBeInstanceOf(StatusService);
    expect(service.event).toBeInstanceOf(EventService);
  });
});