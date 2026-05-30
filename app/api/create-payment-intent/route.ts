import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ,{
    apiVersion:"2026-05-27.dahlia"
});


export async function POST(req : Request){
    const user = await currentUser()
    if(!user) return new NextResponse("Unauthorized" , {status:401});
    const body = await req.json();
    const {booking , pyment_intent_id} = body;

    const bookingData = {
        ...booking,
        username : user.firstName,
        email : user.emailAddresses[0].emailAddress,
        userId : user.id,
        currency : 'usd',
        paymentIntentId :  pyment_intent_id
    };

    let foundBooking;

    if(pyment_intent_id){

        foundBooking = await prismadb.booking.findFirst({where:{paymentIntentId:pyment_intent_id , userId: user.id}});
        
    }
    if(pyment_intent_id && foundBooking)
    {

    }else{
        const paymentIntent = await stripe.paymentIntents.create({
                amount: booking.totalPrice * 100,
                currency: booking.currency,
                automatic_payment_methods: {enabled: true}

            }
        )
        bookingData.paymentIntentId = paymentIntent.id;
        await prismadb.booking.create({data: bookingData});
        return NextResponse.json({paymentIntent});
    }

    return new NextResponse("Internal Server Error", {status:500});
}