"use client";

import { useZodForm } from "@/hooks/useZodForm";
import { HotelWithRooms } from "../../type/HotelWithRooms";
import { hotelSchema } from "../../validator/hotelValidator";
import { Form } from "@/components/ui/form";
import { defaultHotelValues } from "../../utils/hotel-form-defaults";
import HotelInformationSection from "./HotelInformationSection";
import Location from "./Location";
import AddUpdateButton from "./addUpadateButton";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { HotelFormValues } from "../../type/HotelFormType";

export interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

export default function AddHotelForm({ hotel }: AddHotelFormProps) {
  const defaultValues: HotelFormValues = hotel
    ? {
        title: hotel.title,
        description: hotel.description,
        images: hotel.images || [],
        country: hotel.country,
        state: hotel.state,
        city: hotel.city,
        locationDescription: hotel.locationDescription,
        gym: hotel.gym,
        pool: hotel.pool,
        spa: hotel.spa,
        sauna: hotel.sauna,
        freeWifi: hotel.freeWifi,
        airConditioning: hotel.airConditioning,
        tv: hotel.tv,
        restaurant: hotel.restaurant,
        bar: hotel.bar,
        roomService: hotel.roomService,
        parking: hotel.parking,
        isFeatured: hotel.isFeatured,
        coffeeShop: hotel.coffeeShop,
      }
    : defaultHotelValues;

  const form = useZodForm(hotelSchema, defaultValues);
  const { handleNavigation } = useHandleNavigation();
  const [isLoading, setIsLoading] = useState(false);
 
  async function onSubmit(values: HotelFormValues) {
    try {
      setIsLoading(true);
      if (hotel) {
        toast.info("Hotel update logic is not implemented yet");
      } else {
        const res = await axios.post("/api/hotel", values);
        toast.success("Hotel created successfully");
        handleNavigation(`/hotel/${res.data.id}`);
      }
    } catch (error) {
      console.error("Failed to submit hotel form:", error);
      toast.error("Failed to save hotel");
    } finally {
      setIsLoading(false);
    }
  }
   
  return (
    <div>
      <Form {...form}>
        <h3 className="text-lg font-semibold mb-6">{hotel ? "Edit Hotel" : "Add New Hotel"}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-row md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6" >
              <HotelInformationSection form={form} hotel={hotel} />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <Location form={form} />
              <AddUpdateButton hotel={hotel} isLoading={isLoading} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}


