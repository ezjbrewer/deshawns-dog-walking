import { getDogs, deleteDog } from "./Services/DogService.jsx";
import { getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [allDogs, setDogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getDogs().then(setDogs)
  }, [])

  const handleDogDeletion = (dogId) => {
    deleteDog(dogId).then(() => {
      getDogs().then(setDogs)
    })
  }

  return (
    <div>
      <p>{greeting.message}</p>
      <button onClick={() => {navigate("/add-dog")}}>Add Dog</button>
      {allDogs.map((dog) => {
        return(
          <div className="dog-card" key={dog.id}>
            <p>Name: <Link key={dog.id} to={`/${dog.id}`}>{dog?.name}</Link></p>
            <p>City: {dog?.city?.name}</p>
            <button onClick={() => {handleDogDeletion(dog.id)}}>Remove</button>
          </div>
        )
      })}
    </div>)
}
