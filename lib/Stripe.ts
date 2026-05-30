import Stripe from "stripe";

export class Strip {
    #stripe : Stripe;  

    constructor(){
        this.#stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ,{
            apiVersion:"2026-05-27.dahlia"
        });
    }
    async update(payment_intent_id: string, totalPrice : number){
        return await this.#stripe.paymentIntents.update(payment_intent_id,{
            amount: totalPrice * 100
        });
    }

    async create(bookingData : any){
        if(!bookingData) return;
        return await this.#stripe.paymentIntents.create({
                amount: bookingData.totalPrice * 100,
                currency: bookingData.currency,
                automatic_payment_methods: {enabled: true}
            }
        )
    }
    async getById(payment_intent_id: string){
        return await this.#stripe.paymentIntents.retrieve(payment_intent_id);
    }

}