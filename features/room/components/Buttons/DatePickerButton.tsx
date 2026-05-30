import { Room } from "@prisma/client";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../DateRangePicker/DateRangePicker";
import { Checkbox } from "@/components/ui/checkbox";
import BookingStripeButton from "./BookingStripeButton";
import { HotelWithRooms } from "@/features/hotel/type/HotelWithRooms";

export default function DatePickerButton({ room ,hotel }: { room: Room,hotel: HotelWithRooms }) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState<number>(room.roomPrice);
  const [includeBreakFast, setincludeBreakFast] = useState(false);
  const [day, setDays] = useState(0);

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);
      setDays(dayCount);
      if (dayCount && room.roomPrice) {
        if (includeBreakFast && room.breakFastPrice) {
          setTotalPrice(
            dayCount * room.breakFastPrice + dayCount * room.roomPrice,
          );
        } else {
          setTotalPrice(dayCount * room.roomPrice);
        }
      } else {
        setTotalPrice(room.roomPrice);
      }
    }
  }, [date, room.roomPrice, includeBreakFast]);
  
  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">select days that you will spend in this room</div>
      <DatePickerWithRange date={date} setDate={setDate} />
      {room.breakFastPrice > 0 && (
        <div className="">
          Do you want to be served breakfast each day
          <div className="flex items-center space-x-2">
            <Checkbox
              id="breakFast"
              onCheckedChange={(value) => setincludeBreakFast(!!value)}
            />
            <label htmlFor="breakFast">Include BreakFast</label>
          </div>
        </div>
      )}
      <div>
        Total Price: <span className="font-bold">{totalPrice}</span> for{" "}
        <span className="font-bold">{day} Days</span>
      </div>
      <BookingStripeButton Date={date} hotel={hotel} includeBreakFast={includeBreakFast} room={room} totalPrice={totalPrice} />
    </div>
  );
}
