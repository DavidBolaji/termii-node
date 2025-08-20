import { HttpClient } from '../../http/HttpClient';
import { Channel } from '../../types/messageService.type';
import { MessageService } from '../messaging/MessageService';

describe('MessageService', () => {
  let httpClient: HttpClient;
  let service: MessageService;

  beforeEach(() => {
    httpClient = { request: jest.fn() } as any;
    service = new MessageService(httpClient);
  });

  it('sendMessage invokes POST /sms/send with params', async () => {
    const params = {
      to: '123',
      from: 'me',
      sms: 'hello',
      type: 'plain',
      channel: 'generic' as Channel,
      media: null,
      time_to_live: 0,
    };
    (httpClient.request as jest.Mock).mockResolvedValue({ success: true });
    const res = await service.sendMessage(params);
    expect(httpClient.request).toHaveBeenCalledWith('/sms/send', {
      method: 'POST',
      data: params,
      authLocation: 'body',
    });

    expect(res).toEqual({ success: true });
  });

  it('sendBulkMessage invokes POST /sms/send/bulk with params', async () => {
    const params = {
      to: ['1', '2'],
      from: 'me',
      sms: 'bulk',
      type: undefined,
      channel: undefined,
      media: null,
      time_to_live: 1,
    };
    (httpClient.request as jest.Mock).mockResolvedValue({ ok: true });
    const res = await service.sendBulkMessage(params);
    expect(httpClient.request).toHaveBeenCalledWith('/sms/send/bulk', {
      method: 'POST',
      data: params,
      authLocation: 'body',
    });
    expect(res).toEqual({ ok: true });
  });

});
