import { useEffect, useState } from "react"
import { getCities, postNewCity } from "./Services/CityService.jsx"


export const Cities = () => {
    const [cities, setCities] = useState([])
    const [cityInput, setCityInput] = useState("")
    
    useEffect(() => {
        getCities().then(setCities)
    }, [])

    const handleCityInputChange = (e) => {
        setCityInput(e.target.value)
    }

    const handleCitySubmission = () => {
        const city = {
            name: cityInput
        }
        postNewCity(city).then(() => {
            getCities().then(setCities)
        })
    }

    return(
        <div>
            <div>
                <input type="text" placeholder="Add City..." onChange={(e) => handleCityInputChange(e)}/>
                <button onClick={() => handleCitySubmission()}>Submit</button>
            </div>
            {cities.map((city) => {
                return <div>{city.name}</div>
            })}
        </div>
    )
}