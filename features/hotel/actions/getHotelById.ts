import prisma from "@/lib/prismadb";

export async function getHotelById(hotelId: string) {
    try {
        const hotel = await prisma.hotel.findUnique({
            where: {
                id: hotelId,
            },
            include:{
                room: true
            }
        });
        if(!hotel) {
            return null;
        }
        return hotel;
    } catch (error:any) {
        throw new Error(error);
    }
}   