import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { hotelSchema } from "../validator/hotelValidator";

export type HotelFormValues = z.infer<typeof hotelSchema>;
export type HotelFormType = UseFormReturn<HotelFormValues>;
