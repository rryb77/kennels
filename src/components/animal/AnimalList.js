import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("AnimalList: Initial render before data")
    getLocations()
    .then(getCustomers)
    .then(getAnimals)
}, []) // eslint-disable-line react-hooks/exhaustive-deps


  const history = useHistory()

  // Return the JSX formatted code to render to the DOM
  return (
      
    <>
      <h2>Animals</h2>
		  {/* onClick is a built in listener that allows us to do "something" when clicked. In this case it's sending the user to the /animals/create view of the DOM */}
      <button onClick={() => {history.push("/animals/create")}}>
          Add Animal
      </button> 

      <div className="animals">
          {/* map over the animals array so each animal entry in the DB will get rendered to the DOM */}
          {animals.map(animal => {
            // find the owner of the animal
            const owner = customers.find(c => c.id === animal.customerId)
            // find the clinic where the animal is located
            const clinic = locations.find(l => l.id === animal.locationId)

            // return the animal card for each animal found in the animals array, pass in the needed information with it via location={clinic}, etc..
            return <AnimalCard key={animal.id}
                        location={clinic}
                        customer={owner}
                        animal={animal} />
          })}
      </div>
    </>
  )
}