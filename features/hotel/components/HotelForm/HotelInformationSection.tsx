import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "@/components/shared/FormFieldWrapper";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Field } from "./formFields";
import { FormDescription, FormField, FormLabel, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface HotelInformationSectionProps {
  form: any;
}


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
 
export default function HotelInformationSection({form}: HotelInformationSectionProps){
  return(
    <>
    {fields.map((field) => (
      <FormFieldWrapper
            control={form.control}
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
            control={form.control}
            name={field.name}
            label={field.label}
            className="flex flex-row items-end space-x-3 rounded-md border p-4 gap-2 "
          > 
            {(formField) => field.type(formField)}
          </FormFieldWrapper>
        ))}
       
      </div>
    </div>
    </>
  ) ;
}