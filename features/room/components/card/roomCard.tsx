import { HotelWithRooms } from "../../../hotel/type/HotelWithRooms";
import { Booking, Hotel, Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AmenityItem from "../RoomForm/AmenityRoom";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MountainSnow,
  Trash,
  User,
  VolumeX,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RoomButton from "../Buttons/RoomButton";

interface RoomCardProps {
  hotel: HotelWithRooms;
  room: Room;
  booking?: Booking[];
}
export default function RoomCard({ hotel, room, booking }: RoomCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square overflow-hidden w-full relative h-[200px] rounded-lg ">
          <Image
            fill
            src={room?.image}
            alt={room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 content-start text-sm mt-4">
          <AmenityItem>
            <Bed className="h-4 w-4" /> {room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <User className="h-4 w-4" /> {room.guestCount} Guest{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" /> {room.bathRoomCount} bathroom{"(s)"}
          </AmenityItem>
          {!!room.kingBed && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" /> {room.kingBed} king Bed{"(s)"}
            </AmenityItem>
          )}
          {!!room.queenBen && (
            <AmenityItem>
              <Bed className="h-4 w-4" /> {room.queenBen} Queen Bed{"(s)"}
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" /> Balcony
            </AmenityItem>
          )}
          {room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" /> City View
            </AmenityItem>
          )}
          {room.mountainView && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" /> Mountain View
            </AmenityItem>
          )}
          {room.airCondition && (
            <AmenityItem>
              <AirVent className="h-4 w-4" /> Air Condition
            </AmenityItem>
          )}
          {room.soundProof && (
            <AmenityItem>
              <VolumeX className="h-4 w-4" /> Sound Proofed
            </AmenityItem>
          )}
        </div>
        <Separator className="mt-2" />
        <div className="flex gap-4 justify-between mt-4">
          <div>
            Room Price : <span className="font-bold">${room.roomPrice}</span>
            <span className="text-xs"> /24hrs</span>
          </div>
          {!!room.breakFastPrice && (
            <div>
              BreakFast Price:{" "}
              <span className="font-bold">${room.breakFastPrice}</span>
              <span className="text-xs"></span>
            </div>
          )}
        </div>
        <Separator className="mt-2" />
      </CardContent>
      <CardFooter>
        <RoomButton room={room} hotel={hotel} />
      </CardFooter>
    </Card>
  );
}
