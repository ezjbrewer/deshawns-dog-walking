import { useEffect, useState } from "react"
import { getCities } from "./Services/CityService.jsx"
import { getDogs, postNewDog } from "./Services/DogService.jsx"
import { useNavigate } from "react-router-dom"

export const AddDog = () => {
    const [cities, setCities] = useState([])
    
    const [dogName, setDogName] = useState("")
    const [cityId, setCityId] = useState(0)
    let dogId = 0
    const [dog, setDog] = useState({
        Name: "",
        CityId: 0,
    })

    const navigate = useNavigate()
    

    useEffect(() => {
        getCities().then(setCities)
    }, [])

    const handleDogNameChange = (event) => {
        setDogName(event.target.value)
    }

    const handleCityChange = (event) => {
        const selectedCityId = parseInt(event.target.value)
        setCityId(selectedCityId)
    }

    const handleNewDog = (event) => {
        event.preventDefault()
        dog.Name = dogName
        dog.CityId = cityId
        postNewDog(dog).then((dogObj) => {
            navigate(`/${dogObj.id}`)
        })
    }
    
    return(
        <div>
            <form onSubmit={(event) => {handleNewDog(event)}}>
                <fieldset>
                    <input type="text" onChange={handleDogNameChange} placeholder="Dog Name..." required/>
                </fieldset>
                <fieldset>
                    <select
                        className="dropdown-select"
                        onChange={handleCityChange}
                        defaultValue="0"
                        required
                    >
                        <option key="0" value="0" hidden>Choose a city...</option>
                        {cities.map((city) => {
                            return <option key={city.id} value={city.id}>{city.name}</option>
                        })}
                    </select>
                    <button type="submit">Add Dog</button>
                </fieldset>

            </form>
        </div>
    )
}