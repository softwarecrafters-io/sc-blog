import {SubscriberRepository} from "@/core/repositories";

export class NewsletterService{
    constructor(private subscriberRepository:SubscriberRepository) {}

    addSubscriber(email: string) {
        return this.subscriberRepository.addSubscriber(email);
    }

    getNumberOfSubscribers() {
        return this.subscriberRepository.getNumberOfSubscribers();
    }
}
