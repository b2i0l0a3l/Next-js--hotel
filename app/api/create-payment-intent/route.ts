import prismadb from '@/lib/prismadb';
import { Strip } from '@/lib/Stripe';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


const stripe = new Strip();


export async function POST(req : Request){
    const user = await currentUser();
    if(!user) return new NextResponse("Unauthorized" , {status:401});
    const body = await req.json();
    const {booking , pyment_intent_id} = body;

    const bookingData  = {
        ...booking,
        username : user.firstName,
        userEmail : user.emailAddresses[0].emailAddress,
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
       const {updated_intent, res} =  await update(pyment_intent_id,foundBooking.id,booking.totalPrice, bookingData);
        if(!res){
            return NextResponse.error();
        }
        return NextResponse.json({paymentIntent : updated_intent});
    }
    else{
        const paymentIntent = await NewPayment(bookingData);
        if(!paymentIntent) {
            return new NextResponse("Invalid Data", {status : 400});
        }

        return NextResponse.json({paymentIntent});
    }

    return new NextResponse("Internal Server Error", {status:500});
}





async function update(pyment_intent_id: string, id : string ,totalPrice : number , bookingData : any){
       const current_intent = await stripe.getById(pyment_intent_id);
        if(current_intent){
            const updated_intent = await stripe.update(pyment_intent_id,totalPrice);

            const res  = await prismadb.booking.update({
                where: { id: id },
                data: bookingData
            })
            
            return {updated_intent , res};
        
        }
        return { updated_intent: null, res: null};
}


async function NewPayment(bookingData: any){
    const paymentIntent = await stripe.create(bookingData)
        bookingData.paymentIntentId = paymentIntent!.id;
        await prismadb.booking.create({data: bookingData});
    return paymentIntent;
}