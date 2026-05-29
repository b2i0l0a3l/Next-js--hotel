import { Button } from "@/components/ui/button";
import { Hotel, Room } from "@prisma/client";
import { Loader2, Pencil, PencilLine } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RoomFormValues } from "../../../hotel/type/HotelFormType";
import { useState } from "react";
import { toast } from "sonner";
import { typeRouter, useHandleNavigation } from "@/hooks/useHandleNavigation";
import axios from "axios";
export default function RoomFormSubmitButton({
  hotel,
  room,
  form,
  handleDialogueOpen,
}: {
  hotel?: Hotel & {
    room: Room[];
  };
  room?: Room | null;
  form: UseFormReturn<RoomFormValues, any>;
  handleDialogueOpen?: () => void;
}) {
  const { handleNavigation } = useHandleNavigation();
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: RoomFormValues) {
    try {
      setIsLoading(true);
      if (hotel && room) {
        const res = await axios.patch(`/api/room/${room.id}`, values);
        toast.success("Room updated successfully");
        handleNavigation("/", typeRouter.REFRESH);
      } else {
        if (!hotel) {
          toast.error("Hotel not found");
          return;
        }
        const res = await axios.post(`/api/room`, {
          ...values,
          hotelId: hotel.id,
        });
        toast.success("Room created successfully");
        handleNavigation("/", typeRouter.REFRESH);
      }
      if (handleDialogueOpen) {
        handleDialogueOpen();
      }
    } catch (error) {
      console.error("Failed to submit room form:", error);
      toast.error("Failed to save room");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {room ? (
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type="button"
          className="max-w-[150px]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            <>
              <PencilLine className="mr-2 h-4 w-4" /> Update
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" /> Create Room
            </>
          )}
        </Button>
      )}
    </>
  );
}
