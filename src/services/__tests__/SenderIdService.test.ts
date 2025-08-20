import { HttpClient } from '../../http/HttpClient';
import { SenderIdService } from '../messaging/SenderIdService';

describe('SenderIdService', () => {
    let httpClient: HttpClient;
    let service: SenderIdService;

    beforeEach(() => {
        httpClient = { request: jest.fn() } as any;
        service = new SenderIdService(httpClient);
    });


    it('getSenderIds invokes GET /api/sender-id', async () => {
        (httpClient.request as jest.Mock).mockResolvedValue({ page: 1 });
        const res = await service.fetchSenderIds(5);
        expect(httpClient.request).toHaveBeenCalledWith('/sender-id', {
            method: 'GET',
            params: { page: 5 },
            authLocation: 'query',
        });
        expect(res).toEqual({ page: 1 });
    });

    it('requestSenderId invokes POST /api/sender-id/request', async () => {
        const params = { api_key: 'n', sender_id: 'Acme', company: 'c', usecase: 'p' };
        (httpClient.request as jest.Mock).mockResolvedValue({ req: true });
        const res = await service.requestSenderId(params);
        expect(httpClient.request).toHaveBeenCalledWith('/sender-id/request', {
            method: 'POST',
            data: params,
            authLocation: 'body',
        });
        expect(res).toEqual({ req: true });
    });
});