import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "@/components/shared/FormFieldWrapper";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./formFields";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { HotelWithRooms } from "../../type/HotelWithRooms";
 


export const fields: Field[] = [
  {
    name: "title",
    label: "Hotel Title",
    description: "Please enter your hotel name",
    type: (field: any) => <Input placeholder="Beach Hotel" {...field} />,
  },
  {
    name: "description",
    label: "Hotel Description",
    description: "Please enter your hotel description",
    type: (field: any) => <Textarea placeholder="Beach Hotel with great views" {...field} />,
  },

]; 

const amenitiesFields:Field[] = [
  {
    name: "gym",
    label: "Gym",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "pool",
    label: "Pool",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "spa",
    label: "Spa",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "sauna",
    label: "Sauna",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "freeWifi",
    label: "Free Wifi",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "airConditioning",
    label: "Air Conditioning",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "tv",
    label: "TV",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "restaurant",
    label: "Restaurant",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "bar",
    label: "Bar",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "roomService",
    label: "Room Service",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "parking",
    label: "Parking",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "isFeatured",
    label: "Is Featured",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: "coffeeShop",
    label: "Coffee Shop",
    type: (field: any) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
];
 
export default function HotelInformationSection({form, hotel}: {form: any, hotel: HotelWithRooms | null}){
  const [imageUrl, setImageUrl] = useState<string | undefined>(hotel?.images?.[0]);
  return(
    <>
    {fields.map((field) => (
      <FormFieldWrapper
            control={form.control}
            key={field.name}
            name={field.name}
            label={field.label}
            description={field.description}
          > 
            {(formField) => field.type(formField)}
          </FormFieldWrapper>
    ))}
   
    <div>
      <FormLabel>Choose Amenities</FormLabel>
      <FormDescription>Select amenities that your hotel offers</FormDescription>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {amenitiesFields.map((field) => (
          <FormFieldWrapper
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            className="flex flex-row items-end space-x-3 rounded-md border p-4 gap-2 "
          > 
            {(formField) => field.type(formField)}
          </FormFieldWrapper>
        ))}
       
      </div>
      <FormFieldWrapper
            control={form.control}
            name="images"
            label="Hotel Image"
            description="Please upload your hotel image"
          > 
            {(formField) => imageUrl ? <></> :
            <div className="flex flex-col items-center max-w-[4000px] p-12 border-2 border-dashed border-primary/50 rouded mt-4">
                <UploadButton 
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                          setImageUrl(res?.[0]?.url)
                        }}
                        onUploadError={(error: Error) => {
                          console.error("Upload error:", error);
                        }}
                />
            </div>
            }
      </FormFieldWrapper>
    </div>
    </>
  ) ;
}