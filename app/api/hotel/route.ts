import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { hotelSchema } from "@/features/hotel/validator/hotelValidator";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = hotelSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const hotel = await prismadb.hotel.create({
      data: {
        ...parsed.data,
        userId,
      },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}