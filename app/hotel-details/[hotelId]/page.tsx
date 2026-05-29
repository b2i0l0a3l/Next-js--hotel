import HotelDetailsClient from "@/features/hotel-details/HotelDetailsClient";
import { getHotelById } from "@/features/hotel/actions/getHotelById";

interface HotelDetailsProps {
    params: Promise<{ hotelId: string }>
}
export default async function HotelDetailsPage({ params }: HotelDetailsProps) {
    const { hotelId } = await params;
    const hotel = await getHotelById(hotelId);
    if (!hotel) {
        return (
            <div>
                <h1 className="text-center">Ooops! This hotel is not found!</h1>
            </div>
        );
    }
    return (
        <div>
            <HotelDetailsClient hotel={hotel} booking={[]} />
        </div>
    );
}