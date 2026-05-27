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

interface AddRoomFormProps {
  hotel?: Hotel & {
    room: Room[];
  };
  room?: Room;
  handleDialogueOpen: ({
    hotel,
    room,
    handleDialogueOpen,
  }: AddRoomFormProps) => void;
}

const roomFields: Field<RoomFormValues, any>[] = [
  {
    name: "title",
    label: "Room Title",
    description : "Provide a title for the room",
    type : (field) => <Input {...field} placeholder="Double room" />,
  },
  {
    name: "description",
    label: "Room Description",
    description : "Provide a description for the room",
    type : (field) => <Textarea {...field} placeholder="This room have a great view" />,
  },
]; 

const ammenities : Field<RoomFormValues , any>[] = [
    {name: "roomService",
    label: "Room Service",
    type: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),},
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
]

export default function AddRoomForm({
  hotel,
  room,
  handleDialogueOpen,
}: AddRoomFormProps) {
  const form = useZodForm(roomSchema, room || defaultRoomValues);
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
            >
              {(formField) => field.type(formField)}
            </FormFieldWrapper>
          ))}
          <div>
                <FormLabel>Choose room Amenities</FormLabel>
                <FormDescription>What make this room a good choice?</FormDescription>
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
          
        </form>
      </Form>
    </div>
  );
}
