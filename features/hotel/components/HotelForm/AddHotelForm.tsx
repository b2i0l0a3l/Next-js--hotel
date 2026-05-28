"use client";

import { useZodForm } from "@/hooks/useZodForm";
import { HotelWithRooms } from "../../type/HotelWithRooms";
import { hotelSchema } from "../../validator/hotelValidator";
import { Form } from "@/components/ui/form";
import { defaultHotelValues } from "../../utils/hotel-form-defaults";
import HotelInformationSection from "./HotelInformationSection";
import Location from "./Location";
import FormSubmitButton from "../Buttons/FormSubmitButton";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { HotelFormValues } from "../../type/HotelFormType";
import getImageKey from "@/lib/getImageKey";
import FormAlert from "../FormAlert/FormAlert";

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
  const [isDelete, setIsDelete] = useState(false);
 
  async function onSubmit(values: HotelFormValues) {
    try {
      setIsLoading(true);
      if (hotel) { 
        const res = await axios.patch(`/api/hotel/${hotel.id}`, values);
        toast.success("Hotel updated successfully");
        handleNavigation(`/hotel/${res.data.id}`);
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

  const handleDelete = async (hotel: HotelWithRooms) => {
    setIsDelete(true);
    if(!hotel){
      toast.error("Hotel not found");
      return;
    }
    const imageKeys = hotel.images.map((image) => getImageKey(image));
   try{
    if(imageKeys.length > 0){
      await axios.post(`/api/uploadthing/delete`, { imageKeys });
    }  
    await axios.delete(`/api/hotel/${hotel.id}`);
    toast.success("Hotel deleted successfully");
    handleNavigation("/hotel/new");
   }catch(error){
    console.error("Failed to delete images", error);
    toast.error("Failed to delete images");
    return;
   }finally{
    setIsDelete(false);
   }
  };
   
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
              {hotel && !hotel.room.length && (  
                <FormAlert   
                title="One last step!"
                description={
                <>
                  your hotel created successfully  
                  <div >but you need to add some rooms to it to be published.</div> 
                </>
                }
                /> 
              )}
              <div className="flex justify-between gap-2 flex-wrap">
                <FormSubmitButton handleNavigation={handleNavigation} hotel={hotel} isLoading={isLoading} handleDelete={() => handleDelete(hotel!)} isDelete={isDelete}/>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}


 