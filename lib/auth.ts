import { auth } from "@clerk/nextjs/server";

export async function requireAuth(entityUserId?: string) {
    const { userId } = await auth();
    
    if (!userId) {
        return {
            authorized: false,
            reason: "UNAUTHENTICATED",
        };
    }
 
    if (entityUserId && userId !== entityUserId) {
        return {
            authorized: false,
            reason: "Access Denied",
        };
    }

    return {
        authorized: true,
        userId,
    };
}
