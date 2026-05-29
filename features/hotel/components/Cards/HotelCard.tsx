"use client";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { HotelWithRooms } from "../../type/HotelWithRooms";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AmenityItem from "../../../room/components/RoomForm/AmenityRoom";
import { Dumbbell, MapPin } from "lucide-react";
import useLocation from "@/hooks/useLocation";
import { Button } from "@/components/ui/button";

export default function HotelCard({ hotel }: { hotel: HotelWithRooms }) {
  const { handleNavigation, includePath } = useHandleNavigation();
  const isShowHotelPage = includePath("hotel-details");
  const { getCountrtyByCode } = useLocation();
  const countryName = getCountrtyByCode(hotel.country);
  return (
    <div
      className={cn(
        `col-span-1 cursor-pointer transition hover:scale-105`,
        isShowHotelPage && "cursor-default",
      )}
      onClick={() =>
        !isShowHotelPage && handleNavigation(`/hotel-details/${hotel.id}`)
      }
    >
      <div className="flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
        <div className="aspect-square flex-1 overflow-hidden relative w-full h-[210px] rounded-lg ">
          <Image
            src={hotel.images[0]}
            alt={hotel.title}
            fill
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
          <h3 className="font-semibold text-xl">{hotel.title}</h3>
          <div className="text-primary/90">
            {hotel.description?.substring(0, 45)}..
          </div>
          <div className="text-primary/90">
            <AmenityItem>
              <MapPin className="size-4 s-4 " /> {countryName?.name},{" "}
              {hotel.city}
            </AmenityItem>
            {hotel.gym && (
              <AmenityItem>
                <Dumbbell className="size-4 s-4 " /> GYM
              </AmenityItem>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {hotel.room[0].roomPrice && (
                <>
                  <div className="font-semibold text-base">
                    ${hotel.room[0].roomPrice}
                  </div>
                  <div className="text-xs"> /24hrs</div>
                </>
              )}
            </div>
            {!isShowHotelPage && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation(`/hotel/${hotel.id}`);
                }}
                variant={"outline"}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
