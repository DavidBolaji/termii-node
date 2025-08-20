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
          target.token,
        ];
        for (const service of services) {
          if (service && prop in service) {
            const value = (service as any)[prop];
            return typeof value === 'function' ? value.bind(service) : value;
          }
        }
        return undefined;
      },
    });
  }

  // ---------- Explicit Method Forwarding ----------

  // Messaging
  public sendMessage(payload: Parameters<MessageService['sendMessage']>[0]): ReturnType<MessageService['sendMessage']> {
    return this.message.sendMessage(payload);
  }

  public sendBulkMessage(payload: Parameters<MessageService['sendBulkMessage']>[0]): ReturnType<MessageService['sendBulkMessage']> {
    return this.message.sendBulkMessage(payload);
  }

  // Templates
  public sendTemplate(payload: Parameters<TemplatesService['sendTemplate']>[0]): ReturnType<TemplatesService['sendTemplate']> {
    return this.template.sendTemplate(payload);
  }

  // Campaigns
  public sendCampaign(payload: Parameters<CampaignService['campaign']['sendCampaign']>[0]): ReturnType<CampaignService['campaign']['sendCampaign']> {
    return this.campaign.campaign.sendCampaign(payload);
  }

  public fetchCampaigns(): ReturnType<CampaignService['campaign']['fetchCampaigns']> {
    return this.campaign.campaign.fetchCampaigns();
  }

  public fetchCampaignHistory(campaignId: Parameters<CampaignService['campaign']['fetchCampaignHistory']>[0]): ReturnType<CampaignService['campaign']['fetchCampaignHistory']> {
    return this.campaign.campaign.fetchCampaignHistory(campaignId);
  }

  public retryCampaign(campaignId: Parameters<CampaignService['campaign']['retryCampaign']>[0]): ReturnType<CampaignService['campaign']['retryCampaign']> {
    return this.campaign.campaign.retryCampaign(campaignId);
  }

  // Contacts
  public fetchContacts(phonebookId: Parameters<CampaignService['contact']['fetchContacts']>[0]): ReturnType<CampaignService['contact']['fetchContacts']> {
    return this.campaign.contact.fetchContacts(phonebookId);
  }

  public addContact(phonebookId: Parameters<CampaignService['contact']['addContact']>[0], contact: Parameters<CampaignService['contact']['addContact']>[1]): ReturnType<CampaignService['contact']['addContact']> {
    return this.campaign.contact.addContact(phonebookId, contact);
  }

  public uploadContacts(request: Parameters<CampaignService['contact']['uploadContacts']>[0]): ReturnType<CampaignService['contact']['uploadContacts']> {
    return this.campaign.contact.uploadContacts(request);
  }

  public deleteContact(contactId: Parameters<CampaignService['contact']['deleteContact']>[0]): ReturnType<CampaignService['contact']['deleteContact']> {
    return this.campaign.contact.deleteContact(contactId);
  }

  // Phonebooks
  public fetchPhonebooks(): ReturnType<CampaignService['phonebook']['fetchPhonebooks']> {
    return this.campaign.phonebook.fetchPhonebooks();
  }

  public createPhonebook(payload: Parameters<CampaignService['phonebook']['createPhonebook']>[0]): ReturnType<CampaignService['phonebook']['createPhonebook']> {
    return this.campaign.phonebook.createPhonebook(payload);
  }

  public updatePhonebook(phonebookId: Parameters<CampaignService['phonebook']['updatePhonebook']>[0], payload: Parameters<CampaignService['phonebook']['updatePhonebook']>[1]): ReturnType<CampaignService['phonebook']['updatePhonebook']> {
    return this.campaign.phonebook.updatePhonebook(phonebookId, payload);
  }

  public deletePhonebook(phonebookId: Parameters<CampaignService['phonebook']['deletePhonebook']>[0]): ReturnType<CampaignService['phonebook']['deletePhonebook']> {
    return this.campaign.phonebook.deletePhonebook(phonebookId);
  }

  // Sender IDs
  public fetchSenderIds(page: Parameters<SenderIdService['fetchSenderIds']>[0]): ReturnType<SenderIdService['fetchSenderIds']> {
    return this.sender.fetchSenderIds(page);
  }

  public requestSenderId(payload: Parameters<SenderIdService['requestSenderId']>[0]): ReturnType<SenderIdService['requestSenderId']> {
    return this.sender.requestSenderId(payload);
  }

  // Token
  public sendToken(payload: Parameters<TokenService['sendToken']>[0]): ReturnType<TokenService['sendToken']> {
    return this.token.sendToken(payload);
  }

  public sendVoiceToken(payload: Parameters<TokenService['sendVoiceToken']>[0]): ReturnType<TokenService['sendVoiceToken']> {
    return this.token.sendVoiceToken(payload);
  }

  public sendVoiceCall(payload: Parameters<TokenService['sendVoiceCall']>[0]): ReturnType<TokenService['sendVoiceCall']> {
    return this.token.sendVoiceCall(payload);
  }

  public sendEmailToken(payload: Parameters<TokenService["email"]["sendEmailToken"]>[0]): ReturnType<TokenService["email"]['sendEmailToken']> {
    return this.token.email.sendEmailToken(payload);
  }

  public generateToken(payload: Parameters<TokenService["inApp"]["generate"]>[0]): ReturnType<TokenService["inApp"]["generate"]> {
    return this.token.inApp.generate(payload);
  }

  public verifyToken(payload: Parameters<TokenService["verify"]["verifyToken"]>[0]): ReturnType<TokenService["verify"]["verifyToken"]> {
    return this.token.verify.verifyToken(payload);
  }

  // Insights
  public getBalance(): ReturnType<InsightService['balance']['getBalance']> {
    return this.insight.balance.getBalance();
  }

  // Sotel / eSIM
  public authenticateEsim(payload: Parameters<SotelService['esim']['authenticate']>[0]): ReturnType<SotelService['esim']['authenticate']> {
    return this.sotel.esim.authenticate(payload);
  }

  public fetchEsimPlans(payload: Parameters<SotelService['esim']['fetchPlans']>[0]): ReturnType<SotelService['esim']['fetchPlans']> {
    return this.sotel.esim.fetchPlans(payload);
  }

  public createEsim(payload: Parameters<SotelService['esim']['createEsim']>[0]): ReturnType<SotelService['esim']['createEsim']> {
    return this.sotel.esim.createEsim(payload);
  }

  public getEsimQrCode(iccid: Parameters<SotelService['esim']['getQrCode']>[0]): ReturnType<SotelService['esim']['getQrCode']> {
    return this.sotel.esim.getQrCode(iccid);
  }

  public getEsimUsage(iccid: Parameters<SotelService['esim']['getUsage']>[0]): ReturnType<SotelService['esim']['getUsage']> {
    return this.sotel.esim.getUsage(iccid);
  }

  public fetchEsims(
    page?: Parameters<SotelService['esim']['fetchEsims']>[0],
    size?: Parameters<SotelService['esim']['fetchEsims']>[1]
  ): ReturnType<SotelService['esim']['fetchEsims']> {
    return this.sotel.esim.fetchEsims(page, size);
  }
}
