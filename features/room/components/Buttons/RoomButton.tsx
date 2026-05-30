import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import RoomDialog from "../Dialog/RoomDialog";
import axios from "axios";
import { typeRouter, useHandleNavigation } from "@/hooks/useHandleNavigation";
import { toast } from "sonner";
import { Room } from "@prisma/client";
import getImageKey from "@/lib/getImageKey";
import { HotelWithRooms } from "../../../hotel/type/HotelWithRooms";
import DatePickerButton from "./DatePickerButton";

export default function RoomButton({
  room,
  hotel,
}: {
  room: Room;
  hotel: HotelWithRooms;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const isHotelDetailsPage = pathname.includes("hotel-details");
  const { handleNavigation } = useHandleNavigation();


 
  const handleRoomDelete = async () => {
    setIsLoading(true);
    const imageKey = getImageKey(room.image);
    try {
      if (imageKey) {
        await axios
          .post(`/api/uploadthing/delete`, { imageKeys: imageKey })
          .then(async () => {
            await axios.delete(`/api/room/${room.id}`);
            handleNavigation(`/`, typeRouter.REFRESH);
            toast.success("Room deleted successfully");
          });
      }
    } catch (error) {
      console.error("Failed to delete room", error);
      toast.error("Failed to delete room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isHotelDetailsPage ? (
        <DatePickerButton room={room} hotel={hotel} />
      ) : (
        <div className="flex w-full justify-between">
          <Button
            type="button"
            variant={"ghost"}
            disabled={isLoading}
            onClick={handleRoomDelete}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4" /> Deleting...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </>
            )}
          </Button>
          <RoomDialog
            name="Update Room"
            title="Update Room"
            description="Update the Details about the room"
            room={room}
            hotel={hotel}
          />
        </div>
      )}
    </>
  );
}
