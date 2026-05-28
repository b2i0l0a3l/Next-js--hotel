import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const body = await req.json();
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const room = await prisma.room.create({
        data:{
            ...body
                }
    })
    return NextResponse.json({ room });
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}