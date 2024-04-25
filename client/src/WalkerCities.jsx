import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getWalkerById } from "./Services/WalkerSerice.jsx"
import { getCities } from "./Services/CityService.jsx"
import { deleteWalkerCity, postWalkerCity } from "./Services/WalkerCityService.jsx"

export const WalkerCity = () => {
    const {walkerId} = useParams()
    const [walker, setWalker] = useState({})
    const [cities, setCities] = useState([])

    useEffect(() => {
        if (walker != undefined) {
            getWalkerById(walkerId).then(setWalker)
            getCities().then(setCities)
    }}, [walkerId, walker])

    const handleDeleteWalkerCity = (e) => {
        e.preventDefault()
        deleteWalkerCity(e.target.value, walker.id).then(() => {
            getWalkerById(walkerId).then(setWalker)
                getCities().then(setCities)
        })
    }

    const handlePostWalkerCity = (e) => {
        e.preventDefault()
        postWalkerCity(e.target.value, walker.id).then(() => {
            getWalkerById(walkerId).then(setWalker)
                getCities().then(setCities)
        })
    }

    const checkIfWalkerInCity = (city) => {
        const cityCheck = [];
        for (const walkerCity of walker?.walkerCities) {
            if (city.id === walkerCity.cityId) {
                cityCheck.push(city);
                return (
                    <label key={city.id}><input type="checkbox" onChange={(e) => {handleDeleteWalkerCity(e)}} checked key={city.id} value={city.id}/>{city.name}</label>
                );
            }
        }
        
        if (cityCheck.length === 0) {
            return (
                <label key={city.id}><input type="checkbox" onChange={(e) => {handlePostWalkerCity(e)}} key={city.id} value={city.id}/>{city.name}</label>
            );
        }
    }

    return(
        <div>
            <div>{walker?.name}</div>
            <div key={walker.id} className="checks">
                {cities.map((city) =>{
                    return checkIfWalkerInCity(city)
                })}
            </div>
        </div>
    )
}