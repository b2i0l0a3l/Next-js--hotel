import { HotelWithRooms } from "../../type/HotelWithRooms";
import HotelCard from "../Cards/HotelCard";

export default function HotelList({hotels}: {hotels: HotelWithRooms[]}) {
   
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
            {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
}