import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import getHotels from "@/features/hotel/actions/getHotels";
import HotelList from "@/features/hotel/components/HotelList/HotelList";

interface HomeProps {
  searchParams: Promise<{
    title: string;
    country: string;
    state: string;
    city: string;
  }>;
}
export default async function Home({searchParams}:HomeProps) {
  const SearchParams = await searchParams;
  const hotels = await getHotels(SearchParams);
  if(!hotels){
    return (
      <div>
        No hotels found
      </div>
    );
  }
  return (
    <div >
      <HotelList hotels={hotels}/>
    </div>
  );
}
