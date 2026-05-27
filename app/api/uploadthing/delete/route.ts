import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const utapi = new UTApi();

export async function POST(req: Request) {
    const {userId} = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json(); 
    const fileKeys = body.imageKeys || body.ImageKey;

    if (!fileKeys || (Array.isArray(fileKeys) && fileKeys.length === 0)) {
        return NextResponse.json({ error: "No image keys provided" }, { status: 400 });
    }

    try {
        const res = await utapi.deleteFiles(fileKeys);
        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
}