import { useZodForm } from "@/hooks/useZodForm";
import { Hotel, Room } from "@prisma/client";
import { roomSchema } from "../../validator/roomValidator";
import { defaultRoomValues } from "../../utils/room-form-defaults";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "@/components/shared/FormFieldWrapper";
import { RoomFormValues } from "../../type/HotelFormType";
import { Field } from "../../type/formFields";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import UploadImage from "../Buttons/uploadImage";
import RoomFormSubmitButton from "../Buttons/RoomFormSubmitButton";

interface AddRoomFormProps {
  hotel?: Hotel & {
    room: Room[];
  };
  room?: Room;
  handleDialogueOpen?: () => void;
}

const roomFields: Field<RoomFormValues, any>[] = [
  {
    name: "title",
    label: "Room Title",
    description: "Provide a title for the room",
    type: (field) => <Input {...field} placeholder="Double room" />,
  },
  {
    name: "description",
    label: "Room Description",
    description: "Provide a description for the room",
    type: (field) => (
      <Textarea {...field} placeholder="This room have a great view" />
    ),
  },
];

const ammenities: Field<RoomFormValues, any>[] = [
  {
    name: "roomService",
    label: "Room Service",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "balcony",
    label: "Balcony",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "privateBatroom",
    label: "Private Batroom",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "airCondition",
    label: "Air Conditioning",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "soundProof",
    label: "Sound Proof",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "cityView",
    label: "City View",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "mountainView",
    label: "Mountain View",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "roomView",
    label: "Room View",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
];

const priceAndGuestFields: Field<RoomFormValues, any>[] = [
  {
    name: "roomPrice",
    label: "Room Price in USD *",
    description: "state the price for 24 hours (one night) for this room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },
  {
    name: "bedCount",
    label: "Bed Count *",
    description: "Number of beds in the room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },
  {
    name: "guestCount",
    label: "Max Guests *",
    description: "Maximum number of guests allowed in the room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },
  {
    name: "bathRoomCount",
    label: "Bathrooms Count *",
    description: "Number of bathrooms in the room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },
];

const moreFields: Field<RoomFormValues, any>[] = [
  {
    name: "breakFastPrice",
    label: "Breakfast Price in USD *",
    description: "state the price for breakfast for this room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },
  {
    name: "kingBed",
    label: "King Beds Count",
    description: "Number of king beds in the room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },
  {
    name: "queenBen",
    label: "Queen Beds Count",
    description: "Number of queen beds in the room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },

  {
    name: "bedCount",
    label: "Total Bed Count",
    description: "Total number of beds in the room",
    type: (field) => (
      <Input {...field} type="number" min={0} className="w-full" />
    ),
  },
];

export default function AddRoomForm({
  hotel,
  room,
  handleDialogueOpen,
}: AddRoomFormProps) {
  const form = useZodForm(roomSchema, {
    ...defaultRoomValues,
    hotelId: hotel?.id || "",
    ...room,
  });
  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form>
          {roomFields.map((field) => (
            <FormFieldWrapper
              control={form.control}
              key={field.name}
              name={field.name}
              label={field.label}
              description={field.description}
              className="mb-2"
            >
              {(formField) => field.type(formField)}
            </FormFieldWrapper>
          ))}
          <div>
            <FormLabel>Choose room Amenities</FormLabel>
            <FormDescription>
              What make this room a good choice?
            </FormDescription>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {ammenities.map((field) => (
                <FormFieldWrapper
                  control={form.control}
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  className="flex flex-row items-end space-x-3 rounded-md border p-4 gap-2"
                >
                  {(formField) => field.type(formField)}
                </FormFieldWrapper>
              ))}
            </div>
          </div>
          <UploadImage
            form={form}
            image={room?.image}
            name="image"
            label="Room Image"
          />
          <div className="flex flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
              {priceAndGuestFields.map((field) => (
                <FormFieldWrapper
                  control={form.control}
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  description={field.description}
                  className="mb-2"
                >
                  {(formField) => field.type(formField)}
                </FormFieldWrapper>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-6">
              {moreFields.map((field) => (
                <FormFieldWrapper
                  control={form.control}
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  description={field.description}
                  className="mb-2"
                >
                  {(formField) => field.type(formField)}
                </FormFieldWrapper>
              ))}
            </div>
          </div>
            <div className="pt-4 pb-2">
              <RoomFormSubmitButton form={form} hotel={hotel} room={room} handleDialogueOpen={handleDialogueOpen} />

            </div>
        </form>
      </Form>
    </div>
  );
}
