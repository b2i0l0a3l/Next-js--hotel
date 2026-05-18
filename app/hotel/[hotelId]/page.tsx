import { auth } from "@clerk/nextjs/server";
import { getHotelById } from "@/features/hotel/actions/getHotelById";
import { requireAuth } from "@/lib/auth";
import AddHotelForm from "@/features/hotel/components/HotelForm/AddHotelForm";
import { Hotel } from "@prisma/client";

interface Props {
  params: Promise<{ hotelId: string }>;
}
export default async function HotelPage({ params }: Props) {
  const { hotelId } = await params;
  const hotel = await getHotelById(hotelId);
  const { authorized, userId, reason } = await requireAuth(hotel?.userId);

  if (!authorized) {
    return (
      <div>
        <p>{reason}</p>
      </div>
    );
  }

  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  );
}
