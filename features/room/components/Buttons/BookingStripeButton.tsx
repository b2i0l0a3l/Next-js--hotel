import { Button } from "@/components/ui/button";
import { HotelWithRooms } from "@/features/hotel/type/HotelWithRooms";
import useBookRoom, { RoomDataType } from "@/hooks/useBookRoom";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { useAuth } from "@clerk/nextjs";
import { Room } from "@prisma/client";
import { Loader2, Wand2 } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

export default function BookingStripeButton({
  hotel,
  room,
  totalPrice,
  includeBreakFast,
}: {
  hotel: HotelWithRooms;
  room: Room;
  totalPrice: number;
  includeBreakFast: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const { userId } = useAuth();
  const setRoomData = useBookRoom((state) => state.setRoomData);
  const setClientSecret = useBookRoom((state) => state.setClientSecret);
  const setPaymentIntent = useBookRoom((state) => state.setPaymentIntent);
  const paymentIntent = useBookRoom((state) => state.paymentIntent);
  const clientSecret = useBookRoom((state) => state.clientSecret);
  const { handleNavigation } = useHandleNavigation();

  const handleBookRoom = () => {
    console.log("handleBookRoom");
    
    if (!userId) return toast("Oops! Make sure you are logged in.");
    if (!hotel.userId)
      return toast("Something went wrong, refresh the page and try again!");
    if (date?.from && date?.to) {
      setIsLoading(true);
      const bookingRoomData = {
        room,
        totalPrice,
        breakFastIncluded: includeBreakFast,
        startDate: date.from,
        endDate: date.to,
      };
      setRoomData(bookingRoomData);

      fetch("api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            hotelOwnerId: hotel.userId,
            hotelId: hotel.id,
            roomId: room.id,
            starteDate: date.from,
            endDate: date.to,
            breakFastIncluded: includeBreakFast,
            totalPrice: totalPrice,
          },
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setIsLoading(false);
          if (res.status == 401) {
            return handleNavigation("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.clietn_secret);
          setPaymentIntent(data.paymentIntent.id);
          handleNavigation("/book-room");
        })
        .catch((error: any) => {
          toast("error happend");
        });
    }
  };

  return (
    <Button disabled={isLoading} onClick={() =>handleBookRoom()} type="button">
      {isLoading ? (
        <Loader2 className="size-4 mr-2" />
      ) : (
        <Wand2 className="mr-2 size-4" />
      )}
      {isLoading ? "Loading..." : "Book Room"}
    </Button> 
  );
}
