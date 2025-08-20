import { HttpClient } from "../../../http/HttpClient";
import { CampaignsService } from "./CampaignsService";
import { ContactService } from "./ContactService";
import { PhonebookService } from "./PhonebookService";

/**
 * CampaignService is the entrypoint for all campaign-related API services.
 * It groups sub-services for better organization and reusability.
 */
export class CampaignService {
  public readonly phonebook: PhonebookService;
  public readonly contact: ContactService;
  public readonly campaign: CampaignsService;

  constructor(private http: HttpClient) {
  
    this.phonebook = new PhonebookService(this.http);
    this.contact = new ContactService(this.http);
    this.campaign = new CampaignsService(this.http);
  }
}
