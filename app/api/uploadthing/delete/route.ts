import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const utapi = new UTApi();

export async function POST(req: Request) {
    const {userId} = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {ImageKey} = await req.json(); 
    try {
        const res = await utapi.deleteFiles(ImageKey);
        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
}