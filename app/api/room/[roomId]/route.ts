import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: Request ,{params}: { params: Promise<{ roomId: string }> }){
    const { roomId } = await params;
    if (!roomId) {
        return NextResponse.json({ message: "room not found" }, { status: 404 });
    }
    const body = await req.json();
    const {userId} = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } 

    try {

        const room = await prismadb.room.update({
            where: {
                id: roomId
            },
            data : { ...body  }
        });

        if (!room) {
            return NextResponse.json({ message: "room not found" }, { status: 404 });
        }

        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        console.error("Error fetching room:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



export async function DELETE(req: Request ,{params}: { params: Promise<{ roomId: string }> }){
    const { roomId } = await params;
    if (!roomId) {
        return NextResponse.json({ message: "room not found" }, { status: 404 });
    }
    const {userId} = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } 
    
    try {

        const room = await prismadb.room.delete({
            where: {
                id: roomId
            },
        });

        if (!room) {
            return NextResponse.json({ message: "room not found" }, { status: 404 });
        }

        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        console.error("Error fetching room:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}