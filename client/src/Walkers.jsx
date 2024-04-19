import { useEffect, useState } from "react"
import { getWalkers } from "./Services/WalkerSerice.jsx"
import { getCities } from "./Services/CityService.jsx"

export const Walkers = () => {
    const [walkers, setWalkers] = useState([])
    const [filteredWalkers, setFilteredWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [selectedCityId, setCityId] = useState(0)

    useEffect(() => {
        getWalkers().then(setWalkers)
        getCities().then(setCities)
    }, [])

    useEffect(() => {
        if (selectedCityId === 0) {
            setFilteredWalkers(walkers)
        } else {
            const filteredArray = walkers.filter(walker => walker.walkerCities.find(walkerCity => walkerCity.cityId === selectedCityId))
            setFilteredWalkers(filteredArray)
        }
    }, [selectedCityId])

    const handleCityFilter = (event) => {
        setCityId(parseInt(event.target.value))
    }
    
    return(
        <div>
            <select
                className="dropdown-select"
                onChange={handleCityFilter}
                defaultValue="0"
                required
            >
            <option key="0" value="0">All Walkers...</option>
            {cities.map((city) => {
                return <option key={city.id} value={city.id}>{city.name}</option>
            })}
                
            </select>
            <div className="walker-list">
                {filteredWalkers.map((walker) => {
                    return(
                        <div className="walker-card" key={walker?.id}>
                            <div>{walker?.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}