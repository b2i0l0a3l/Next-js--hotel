import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";
import { useState } from "react";
import AddRoomForm from "../RoomForm/AddRoomForm";
import { HotelWithRooms } from "../../../hotel/type/HotelWithRooms";
import { Room } from "@prisma/client";

export default function RoomDialog({
  hotel,
  room,
  title,
  description,
  name,
}: {
  hotel: HotelWithRooms;
  room?: Room;
  title: string;
  description: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type="button" variant={"outline"} className="max-w-[150px]">
          {room ? (
            <Pencil className="mr-2 h-4 w-4" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}{" "}
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] sm:max-w-[900px] w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <AddRoomForm
          hotel={hotel}
          room={room}
          handleDialogueOpen={() => setOpen(!open)}
        />
      </DialogContent>
    </Dialog>
  );
}
