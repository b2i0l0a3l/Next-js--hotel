import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { HotelFormType } from "../../type/HotelFormType";

export default function Location({ form }: { form: HotelFormType }) {
    const { getCountryStates , getStateCities , getAllCountry } = useLocation();
    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const Countries = getAllCountry(); 
    
   const selectedCountry = form.watch("country");
    const selectedState = form.watch("state");
    
    useEffect(() => {
        if (selectedCountry) {
            const countryStates = getCountryStates(selectedCountry);
            setStates(countryStates);
        } else {
            setStates([]);
        }
    }, [selectedCountry, getCountryStates]);
    
    useEffect(() => {
        if (selectedCountry && selectedState) {
            const stateCities = getStateCities(selectedCountry, selectedState);
            setCities(stateCities);
        } else {
            setCities([]);
        }
    }, [selectedCountry, selectedState, getStateCities]);
 
    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormField
                    control={form.control}
                    name="country"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Select Country *</FormLabel>
                        <FormDescription>Select the country where your hotel is located</FormDescription>
                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger className="bg-background">
                                <SelectValue defaultValue={field.value}  placeholder="Select country"/> 
                            </SelectTrigger>
                            <SelectContent>
                                {Countries.map((country) => (
                                    <SelectItem key={country.isoCode} value={country.isoCode}>
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="state"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Select State *</FormLabel>
                        <FormDescription>Select the state where your hotel is located</FormDescription>
                        <Select disabled={isLoading || states.length < 1 } onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger className="bg-background">
                                <SelectValue defaultValue={field.value}  placeholder="Select state"/> 
                            </SelectTrigger>
                            <SelectContent>
                                {states.map((state) => (
                                    <SelectItem key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                />
            </div>
             <FormField
                    control={form.control}
                    name="city"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Select City *</FormLabel>
                        <FormDescription>Select the city where your hotel is located</FormDescription>
                        <Select disabled={isLoading || cities.length < 1 } onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger className="bg-background">
                                <SelectValue defaultValue={field.value}  placeholder="Select city"/> 
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map((city) => (
                                    <SelectItem key={city.name} value={city.name}>
                                        {city.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                />

            <FormField
                control={form.control}
                name="locationDescription"
                render={({field})=>( <FormItem>
                    <FormLabel>Location Description *</FormLabel>
                    <FormDescription>Describe the location of your hotel</FormDescription>
                    <FormControl>
                        <Textarea placeholder="Location Description" {...field} className="min-h-[100px]"/>
                    </FormControl>
                    <FormMessage/> 
                </FormItem>)}
            />

        </>
           
    )
}

