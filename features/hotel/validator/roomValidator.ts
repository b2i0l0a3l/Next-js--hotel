import * as z from "zod";

export const roomSchema = z.object({
    title: z.string().min(3,{message:"title must be at least 3 characters"}),
    description: z.string().min(10,{message:"description must be at least 10 characters"}),
    bedCount: z.coerce.number().min(1,{message:"bedCount must be at least 1"}),
    guestCount: z.coerce.number().min(1,{message:"guestCount must be at least 1"}),
    bathRoomCount: z.coerce.number().min(1,{message:"bathRoomCount must be at least 1"}),
    kingBed: z.coerce.number().min(0,{message:"kingBed must be at least 0"}),
    queenBen: z.coerce.number().min(0,{message:"queenBen must be at least 0"}),
    image: z.string().min(1,{message:"image must be at least 1 image"}),
    breakFastPrice: z.coerce.number().min(0,{message:"breakFastPrice must be at least 0"}),
    roomPrice: z.coerce.number().min(0,{message:"roomPrice must be at least 0"}),
    cityView: z.boolean().optional(),
    roomView: z.boolean().optional(),
    mountainView: z.boolean().optional(),
    airCondition: z.boolean().optional(),
    soundProof: z.boolean().optional(),
    balcony: z.boolean().optional(),
    privateBatroom: z.boolean().optional(),
    hotelId: z.coerce.string().min(1,{message:"hotelId is required"}),
})