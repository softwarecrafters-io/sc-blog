import {loadEnvVariables} from "../../testHelpers/envLoader";
import {SubscriberRepository} from "../../../core/repositories";
import {MailerLiteSubscriberRepository} from "../../../infrastructure/repositories/server/mailerLiteSubscriberRepository";
import {Subscriber} from "../../../core/models";

describe('Subscription Service', ()=>{
    //load env variables
    let subscriberRepository: SubscriberRepository;
    beforeAll(()=>{
        loadEnvVariables();
        const apiKey = process.env.MAILER_LITE_API_KEY as string;
        const groupId = process.env.MAILER_LITE_GROUP_ID as string;
        subscriberRepository = new MailerLiteSubscriberRepository(apiKey, groupId);
    })

    it('adds subscriber ', async ()=>{
        const email = 'miguelghz+blog1@gmail.com';
        const result = await subscriberRepository.addSubscriber(email).toPromise() as Subscriber;
        expect(result.email).toEqual(email);
    });

    it('gets number of subscribers', async () => {
        const result = await subscriberRepository.getNumberOfSubscribers().toPromise();
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
    });
});
