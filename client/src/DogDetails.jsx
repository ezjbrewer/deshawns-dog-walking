import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDogById } from "./Services/DogService.jsx"

export const DogDetails = () => {
    const {dogId} = useParams()
    const [dog, setDog] = useState({})
    
    useEffect(() => {
        getDogById(dogId).then(setDog)
    }, [dogId])
    
    return(
        <div>
            <div>Dog Name: {dog?.name}</div>
            <div>City: {dog?.city?.name}</div>
            <div>Assigned Walker: {dog?.walker?.name}</div>
        </div>
    )
}