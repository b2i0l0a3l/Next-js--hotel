import prismadb from "@/lib/prismadb";

export default async function getHotels(searchParams:{
    title: string;
    country: string;
    state: string;
    city: string;
}) {
    const {title, country, state, city} = searchParams;
    try{
        const hotels = await prismadb.hotel.findMany({
            where:{
                title:{
                    contains:title
                },
                country:{
                    contains:country
                },
                state:{
                    contains:state
                },
                city:{
                    contains:city
                }
            },
            include:{
                room:true
            }
        });
        return hotels;
    }catch(error){
        console.error("Failed to get hotels", error);
        throw new Error("Failed to get hotels");
    } 
}