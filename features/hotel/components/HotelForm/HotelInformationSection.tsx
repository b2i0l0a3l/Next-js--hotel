import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "@/components/shared/FormFieldWrapper";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./formFields";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { HotelWithRooms } from "../../type/HotelWithRooms";
import UploadImage from "./uploadImage";
import { HotelFormType, HotelFormValues } from "../../type/HotelFormType";

export const fields: Field<HotelFormValues, any>[] = [
  {
    name: "title",
    label: "Hotel Title",
    description: "Please enter your hotel name",
    type: (field) => <Input placeholder="Beach Hotel" {...field} />,
  },
  {
    name: "description",
    label: "Hotel Description",
    description: "Please enter your hotel description",
    type: (field) => (
      <Textarea placeholder="Beach Hotel with great views" {...field} />
    ),
  },
];

const amenitiesFields: Field<HotelFormValues, any>[] = [
  {
    name: "gym",
    label: "Gym",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "pool",
    label: "Pool",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "spa",
    label: "Spa",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "sauna",
    label: "Sauna",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "freeWifi",
    label: "Free Wifi",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "airConditioning",
    label: "Air Conditioning",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "tv",
    label: "TV",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "restaurant",
    label: "Restaurant",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "bar",
    label: "Bar",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "roomService",
    label: "Room Service",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "parking",
    label: "Parking",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "isFeatured",
    label: "Is Featured",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "coffeeShop",
    label: "Coffee Shop",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
];

export default function HotelInformationSection({
  form,
  hotel,
}: {
  form: HotelFormType;
  hotel: HotelWithRooms | null;
}) {

  return (
    <>
      {getFields(form)}
      {getAmenities(form)}

      <UploadImage form={form} hotel={hotel} />
    </>
  );
}

function getFields(form: HotelFormType) {
  return (
    <div>
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
    </div>
  );
}

function getAmenities(form: HotelFormType){
  return (
    <>
     <FormLabel>Choose Amenities</FormLabel>
        <FormDescription>
          Select amenities that your hotel offers
        </FormDescription>
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
    </>
  )
}
