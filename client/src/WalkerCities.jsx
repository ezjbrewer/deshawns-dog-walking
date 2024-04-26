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
        // e.preventDefault()
        deleteWalkerCity(e.target.value, walker.id).then(() => {
            getWalkerById(walkerId).then(setWalker)
                getCities().then(setCities)
        })
    }

    const handlePostWalkerCity = (e) => {
        // e.preventDefault()
        postWalkerCity(e.target.value, walker.id).then(() => {
            getWalkerById(walkerId).then(setWalker)
                getCities().then(setCities)
        })
    }

    const checkIfWalkerInCity = (city) => {
        const isWalkerInCity = walker.walkerCities.some(walkerCity => walkerCity.cityId === city.id);
        
        const handleCheckboxChange = (e) => {
            const isChecked = e.target.checked
            const cityId = parseInt(e.target.value)
    
            if (isChecked) {
                postWalkerCity(cityId, walker.id).then(() => {
                    getWalkerById(walkerId).then(setWalker)
                })
            } else {
                deleteWalkerCity(cityId, walker.id).then(() => {
                    getWalkerById(walkerId).then(setWalker)
                })
            }
        }
    
        return (
            <label key={city.id}>
                <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={isWalkerInCity}
                    value={city.id}
                />
                {city.name}
            </label>
        )
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