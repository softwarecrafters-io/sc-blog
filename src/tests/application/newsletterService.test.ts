import { of } from "rxjs";
import { SubscriberRepository } from "../../core/repositories";
import {NewsletterService} from "../../application/newsletterService";
import {Subscriber} from "../../core/models";

describe('NewsletterService', ()=>{
    let service: NewsletterService;
    let subscriberRepository: SubscriberRepository;

    beforeAll(()=>{
        subscriberRepository = {
            addSubscriber: jest.fn().mockReturnValue(of({email: 'test@example.com'})),
            getNumberOfSubscribers: jest.fn().mockReturnValue(of(100))
        } as any;
        service = new NewsletterService(subscriberRepository);
    })

    it('adds subscriber ', async ()=>{
        const email = 'test@example.com';
        const result = await service.addSubscriber(email).toPromise() as Subscriber;
        expect(result.email).toEqual(email);
        expect(subscriberRepository.addSubscriber).toHaveBeenCalledWith(email);
    });

    it('gets number of subscribers', async () => {
        const result = await service.getNumberOfSubscribers().toPromise();
        expect(result).toBe(100);
        expect(subscriberRepository.getNumberOfSubscribers).toHaveBeenCalled();
    });
});
