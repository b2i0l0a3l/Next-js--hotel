import { HotelWithRooms } from "../../type/HotelWithRooms";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, PencilLine } from "lucide-react";

export default function AddUpdateButton({ hotel, isLoading }: { hotel: HotelWithRooms | null; isLoading: boolean }) {
  return (
    <>
      {hotel ? (
        <Button className="max-w-[150px]" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            <>
              <PencilLine className="mr-2 h-4 w-4" /> Update
            </>
          )}
        </Button>
      ) : (
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" /> Create Hotel
            </>
          )}
        </Button>
      )}
    </>
  );
} 