"use client";

import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { HotelWithRooms } from "../../type/HotelWithRooms";
import { hotelSchema } from "../../validator/hotelValidator";
import {
  Form
} from "@/components/ui/form";

import { defaultHotelValues } from "../../utils/hotel-form-defaults";
import HotelInformationSection from "./HotelInformationSection";

export interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}


export default function AddHotelForm({ hotel }: AddHotelFormProps) {
  const form = useZodForm(hotelSchema, defaultHotelValues);

  function onSubmit(values: z.infer<typeof hotelSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <h3 className="text-lg font-semibold mb-6">{hotel ? "Edit Hotel" : "Add New Hotel"}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6" >
              <HotelInformationSection form={form} hotel={hotel} />
            </div>
            <div className="flex-1 flex flex-col gap-6">part2</div>
          </div>
        </form>
      </Form>
    </div>
  );
}

