import { HttpClient } from '../../http/HttpClient';
import { TemplatesService } from '../messaging/TemplateService';

describe('TemplatesService', () => {
    let httpClient: HttpClient;
    let service: TemplatesService;

    beforeEach(() => {
        httpClient = { request: jest.fn() } as any;
        service = new TemplatesService(httpClient);
    });


    it('sendTemplate invokes POST /send/template', async () => {
        const params = {
            phone_number: "2347880234567",
            device_id: "talert",
            template_id: "1493-csdn3-ns34w-sd3434-dfdf",

            data: {
                product_name: "Termii",
                otp: 120435,
                expiry_time: "10 minutes"
            }
        };

        (httpClient.request as jest.Mock).mockResolvedValue({ done: true });
        const res = await service.sendTemplate(params);
        expect(httpClient.request).toHaveBeenCalledWith('/send/template', {
            method: 'POST',
            data: params,
            authLocation: "body"
        });
        expect(res).toEqual({ done: true });
    });
});