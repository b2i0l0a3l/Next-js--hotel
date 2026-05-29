import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { roomSchema } from "../../room/validator/roomValidator";

export type RoomFormValues = z.infer<typeof roomSchema>;
export type RoomFormType = UseFormReturn<RoomFormValues>;
