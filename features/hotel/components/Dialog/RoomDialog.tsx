import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Hotel } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddRoomForm from "../RoomForm/AddRoomForm";
import { HotelWithRooms } from "../../type/HotelWithRooms";

export default function RoomDialog({hotel} : {hotel : HotelWithRooms}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger>
        <Button type="button" variant={"outline"} className="max-w-[150px]">
          <Plus className="mr-2 h-4 w-4" /> Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] w-[90%]">
        <DialogHeader>
          <DialogTitle>Add a Room</DialogTitle>
          <DialogDescription>Add Details about the room</DialogDescription>
        </DialogHeader>
        <AddRoomForm hotel={hotel} handleDialogueOpen={() => setOpen(!open)}/>
      </DialogContent>
    </Dialog>
  );
}
