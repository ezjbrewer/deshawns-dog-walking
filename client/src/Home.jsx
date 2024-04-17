import { getDogs } from "./Services/DogService.jsx";
import { getGreeting } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [allDogs, setDogs] = useState([])

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

  return (
    <div>
      <p>{greeting.message}</p>
      {allDogs.map((dog) => {
        return(
          <div className="dog-card" key={dog.Id}>
            <p>Name: {dog?.name}</p>
            <p>City: {dog?.city?.name}</p>
          </div>
        )
      })}
    </div>)
}
