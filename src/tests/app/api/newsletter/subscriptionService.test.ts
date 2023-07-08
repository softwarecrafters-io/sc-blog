import {addSubscriber} from "@/services/subscriptionService";
import {before} from "node:test";

describe('Subscription Service', ()=>{
    //load env variables
    before(()=>{

    })
    it('adds subscriber ', async ()=>{
        const email = 'miguelghz+blog1@gmail.com';
        const result = await addSubscriber(email, '');
        expect(result.email).toEqual(email);
        //expect(result).toEqual({});
    });
});
