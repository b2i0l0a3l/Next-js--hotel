import {Country , State , City} from "country-state-city";
import { getAllStates } from "country-state-city/lib/state";
export default function useLocation() {

    const getCountrtyByCode = (countryCode:string) =>{
        return Country.getAllCountries().find((country)=>country.isoCode === countryCode);
    }

    const getStatesByCountry = (countryCode:string) =>{
        const state =  State.getStatesOfCountry(countryCode).find((state)=>state.countryCode === countryCode);
        if(!state){
            return null;
        }
        return state; 
    }
    const getCountryStates = (countryCode:string) => {
        return State.getStatesOfCountry(countryCode);
    } 
    const getStateCities = (countryCode:string,stateCode?:string) => {
        return City.getAllCities().filter((city)=>city.countryCode === countryCode && city.stateCode === stateCode);
    } 
    return {
        getAllCountry : Country.getAllCountries,
        getCountryStates,
        getStateCities,
        getCountrtyByCode,
        getStatesByCountry,
    }


} 