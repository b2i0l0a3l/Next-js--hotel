"use client";
import { Button } from "@/components/ui/button";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";

export default function NotFound() {
    const { handleNavigation } = useHandleNavigation();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">404 Not Found</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Could not find requested resource</p>
            <Button onClick={() => handleNavigation("/")} className="mt-4">
                Go back to Home
            </Button> 
        </div>
    );
}