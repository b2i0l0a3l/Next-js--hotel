import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { hotelSchema } from "../validator/hotelValidator";
import { roomSchema } from "../validator/roomValidator";

export type HotelFormValues = z.infer<typeof hotelSchema>;
export type HotelFormType = UseFormReturn<HotelFormValues>;
export type RoomFormValues = z.infer<typeof roomSchema>;
export type RoomFormType = UseFormReturn<RoomFormValues>;