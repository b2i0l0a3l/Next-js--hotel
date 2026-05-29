import { HotelWithRooms } from "../../type/HotelWithRooms";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, Pencil, PencilLine, Trash } from "lucide-react";
import RoomDialog from "../../../room/components/Dialog/RoomDialog";

export default function FormSubmitButton({
  hotel,
  isLoading,
  isDelete,
  handleDelete,
  handleNavigation,
}: {
  hotel: HotelWithRooms | null;
  isLoading: boolean;
  isDelete: boolean;
  handleDelete: (hotel: HotelWithRooms) => void;
  handleNavigation: (url: string) => void;
}) {
  return (
    <>
      {hotel && (
        <Button
          onClick={() => handleDelete(hotel)}
          className="max-w-[150px]"
          variant={"ghost"}
          type="button"
          disabled={isLoading || isDelete}
        >
          {isDelete ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting
            </>
          ) : (
            <>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </>
          )}
        </Button>
      )}
      {hotel && (
        <Button
          onClick={() => {
            handleNavigation(`/hotel-details/${hotel.id}`);
          }}
          type="button"
          variant="outline"
        >
          <Eye className="mr-2 h-4 w-4" /> View{" "}
        </Button>
      )}
      {hotel && (
        <RoomDialog
          name="Add a Room"
          title="Add a Room"
          description="Add Details about the room"
          hotel={hotel}
        />
      )}
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
