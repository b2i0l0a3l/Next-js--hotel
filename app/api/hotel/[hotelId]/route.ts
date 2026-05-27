import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default async function PATCH(req: NextRequest ,{params}: { params: { hotelId: Promise<string> } }){
    const hotelId = await params.hotelId;
    const body = await req.json();
    const {userId} = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } 
    try {

        const hotel = await prismadb.hotel.update({
            where: {
                id: hotelId,
                userId,
            },
            data : { ...body  }
        });

        if (!hotel) {
            return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
        }

        return NextResponse.json(hotel);
    } catch (error) {
        console.error("Error fetching hotel:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}