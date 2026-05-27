import { Country, State, City } from "country-state-city";
import { useCallback } from "react";

export default function useLocation() {
    const getCountrtyByCode = useCallback((countryCode: string) => {
        return Country.getAllCountries().find((country) => country.isoCode === countryCode);
    }, []);

    const getStatesByCountry = useCallback((countryCode: string) => {
        const state = State.getStatesOfCountry(countryCode).find((state) => state.countryCode === countryCode);
        if (!state) {
            return null;
        }
        return state; 
    }, []);

    const getCountryStates = useCallback((countryCode: string) => {
        return State.getStatesOfCountry(countryCode);
    }, []); 

    const getStateCities = useCallback((countryCode: string, stateCode?: string) => {
        return City.getAllCities().filter((city) => city.countryCode === countryCode && city.stateCode === stateCode);
    }, []); 

    return {
        getAllCountry: Country.getAllCountries,
        getCountryStates,
        getStateCities,
        getCountrtyByCode,
        getStatesByCountry,
    };
} 