import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
  const { getLocationById } = useContext(LocationContext)

	const [location, setLocation] = useState({})

    const {locationId} = useParams();
    const history = useHistory()

  useEffect(() => {
    console.log("useEffect", locationId)
    getLocationById(locationId)
    .then((response) => {
      setLocation(response)
    })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <section className="location">
        <h3 className="location__name">{location.name}</h3>
        <div className="location__address">{location.address}</div>
        <h4 className="location__employees">Employees</h4>
        {
            location.employees?.map(employee => {
                return employee.name
            }).join(", ")
        }
        <h4 className="location__animals">Current Residents</h4>
        {
            location.animals?.map(animal => {
                return animal.name
            }).join(", ")
        }
        <br></br>
        <button onClick={() => {
            history.push(`/locations/edit/${location.id}`)
            }}>Edit Location</button>
    </section>
  )
}