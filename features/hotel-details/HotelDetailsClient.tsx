"use client";
import useLocation from "@/hooks/useLocation";
import { HotelWithRooms } from "../hotel/type/HotelWithRooms";
import { Booking } from "@prisma/client";
import Image from "next/image";
import AmenityItem from "../room/components/RoomForm/AmenityRoom";
import { FaSpa, FaSwimmingPool } from "react-icons/fa";
import {
  Car,
  Dumbbell,
  MapPin,
  ShoppingBasket,
  Toilet,
  Tv,
  Utensils,
  Wifi,
  Wine,
} from "lucide-react";
import RoomCard from "../room/components/card/roomCard";

export default function HotelDetailsClient({
  hotel,
  booking,
}: {
  hotel: HotelWithRooms;
  booking: Booking[];
}) {
  const { getCountrtyByCode, getStatesByCountry } = useLocation();
  const country = getCountrtyByCode(hotel.country);
  const state = getStatesByCountry(hotel.country);
  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full bg-red-200 h-[200px] md:h-[400px] rounded-lg">
        <Image
          src={hotel.images[0]}
          alt={hotel.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold text-xl md:text-3xl ">{hotel.title}</h3>
        <div className="font-semibold mt-4">
          <AmenityItem>
            <MapPin className="size-4 " />
            {country?.name}, {state?.name}, {hotel.city}
          </AmenityItem>
        </div>
        <h3 className="font-semibold mt-4 text-lg mb-2">Location Details</h3>
        <p className="text-primary/90 mb-2">{hotel.locationDescription}</p>
        <h3 className="font-semibold mt-4 text-lg mb-2">About this hotel</h3>
        <p className="text-primary/90 mb-2">{hotel.description}</p>
        <h3 className="font-semibold mt-4 text-lg mb-2">Popular Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start tex">
          {hotel.gym && (
            <AmenityItem>
              <Dumbbell className="size-4 mr-2" />
              Gym
            </AmenityItem>
          )}
          {hotel.spa && (
            <AmenityItem>
              <FaSpa size={18} />
              Spa
            </AmenityItem>
          )}
          {hotel.pool && (
            <AmenityItem>
              <FaSwimmingPool size={18} />
              Pool
            </AmenityItem>
          )}
          {hotel.bar && (
            <AmenityItem>
              <Wine className="size-4 mr-2" />
              Bar
            </AmenityItem>
          )}
          {hotel.restaurant && (
            <AmenityItem>
              <Utensils className="size-4 mr-2" />
              Restaurant
            </AmenityItem>
          )}
          {hotel.coffeeShop && (
            <AmenityItem>
              <Wine className="size-4 mr-2" />
              Coffee Shop
            </AmenityItem>
          )}
          {hotel.freeWifi && (
            <AmenityItem>
              <Wifi className="size-4 mr-2" />
              Free Wifi
            </AmenityItem>
          )}
          {hotel.parking && (
            <AmenityItem>
              <Car className="size-4 mr-2" />
              Parking
            </AmenityItem>
          )}
          {hotel.tv && (
            <AmenityItem>
              <Tv className="size-4 mr-2" />
              TV
            </AmenityItem>
          )}
          {hotel.sauna && (
            <AmenityItem>
              <Toilet className="size-4 mr-2" />
              Sauna
            </AmenityItem>
          )}
        </div>
      </div>
      <div>
        {!!hotel.room.length && (
          <div>
            <h3 className="text-lg font-semibold my-4">Hotel Rooms</h3>
            <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-col-3 gap-6">
              {hotel.room.map((room) => {
                return (
                  <RoomCard
                    hotel={hotel}
                    room={room}
                    key={room.id}
                    booking={booking}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
