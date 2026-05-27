import * as z from "zod";

export const hotelSchema = z.object({ 
title: z.string().min(3,{message:"title must be at least 3 characters"}),
description: z.string().min(10,{message:"description must be at least 10 characters"}),
images: z.array(z.string()).min(1,{message:"images must be at least 1 images"}),
country: z.string().min(1,{message:"Please select a country"}),
state: z.string().min(1,{message:"Please select a state"}),
city: z.string().min(1,{message:"Please select a city"}),
locationDescription: z.string().min(10,{message:"locationDescription must be at least 10 characters"}),
gym: z.boolean().optional(),
pool: z.boolean().optional(),
spa: z.boolean().optional(),
sauna: z.boolean().optional(),
freeWifi: z.boolean().optional(),
airConditioning: z.boolean().optional(),
tv: z.boolean().optional(),
restaurant: z.boolean().optional(),
bar: z.boolean().optional(),
roomService: z.boolean().optional(),
parking: z.boolean().optional(),
isFeatured: z.boolean().optional(),
coffeeShop: z.boolean().optional() 
})   