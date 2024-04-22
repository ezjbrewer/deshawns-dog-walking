import { useEffect, useState } from "react"
import { getDogs, getDogById } from "./Services/DogService.jsx"
import { assignWalker } from "./Services/DogService.jsx"
import { useNavigate } from "react-router-dom"

export const WalkersDogDropdown = ({walker}) => {
    const [dogs, setDogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getDogs().then((dogsArr) => {
            const filteredDogs = dogsArr.filter((dog) => {
                const isAssignedToCity = walker.walkerCities.some(city => city.cityId === dog.cityId)
                const isNotAssignedToWalker = dog.walkerId != walker.id
                return isAssignedToCity && isNotAssignedToWalker
            })
            setDogs(filteredDogs)
        })
    }, [])

    const handleWalkerAssign = (dogId) => {
        getDogById(dogId).then((dog) => {
            assignWalker(dog, walker.id).then(() => {
                navigate(`/${dog.id}`)
        })
    })
    }
    
    return (
        <div>
            <select onChange={(e) => handleWalkerAssign(e.target.value)}>
                <option value="0" hidden>Dogs to Assign...</option>
            {dogs.map((dog) => (
                <option key={dog.id} value={dog.id}>{dog.name}</option>
            ))}
            </select>
        </div>
    )
}