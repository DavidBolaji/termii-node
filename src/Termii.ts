import { TokenService } from './endpoints';
import { HttpClient } from './http/HttpClient';
import { InsightService } from './services/insights/InsightService';
import { CampaignService } from './services/messaging/campaign/CampaignService';
import { MessageService } from './services/messaging/MessageService';
import { SenderIdService } from './services/messaging/SenderIdService';
import { TemplatesService } from './services/messaging/TemplateService';
import { SotelService } from './services/sotel/SotelService';

export class Termii {
  [key: string]: any;
  private http: HttpClient;
  public readonly message: MessageService;
  public readonly sender: SenderIdService;
  public readonly template: TemplatesService;
  public readonly campaign: CampaignService;
  public readonly insight: InsightService;
  public readonly sotel: SotelService;
  public readonly token: TokenService;


  constructor(apiKey: string, baseUrl?: string) {
    this.http = new HttpClient({ apiKey, baseURL: baseUrl });
    this.message = new MessageService(this.http);
    this.sender = new SenderIdService(this.http);
    this.template = new TemplatesService(this.http);
    this.campaign = new CampaignService(this.http);
    this.insight = new InsightService(this.http);
    this.sotel = new SotelService(this.http);
    this.token = new TokenService(this.http);
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        const services = [
          target.message,
          target.sender,
          target.template,
          target.campaign,
          target.insight,
          target.sotel,
          target.token
        ];
        for (const service of services) {
          if (service && prop in service) {
            const value = (service as any)[prop];
            return typeof value === 'function' ? value.bind(service) : value;
          }
        }
        return undefined;
      }
    });
  }
}
