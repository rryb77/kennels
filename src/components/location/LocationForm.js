import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { LocationContext } from './LocationProvider'


export const LocationForm = () => {
    
    const { getLocations, addLocation, getLocationById, updateLocation } = useContext(LocationContext)
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [location, setLocation] = useState({
      name: "",
      address: "",
    });

    const history = useHistory();
    const {locationId} = useParams()
    const [isLoading, setIsLoading] = useState(true)

    /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
    useEffect(() => {
      getLocations().then(() => {
          if (locationId) {
              getLocationById(locationId)
              .then(location => {
                  setLocation(location)
                  setIsLoading(false)
              })
          } else {
              setIsLoading(false)
          }
      })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newLocation = { ...location }
      
      newLocation[event.target.id] = event.target.value
      // update state
      setLocation(newLocation)
    }

    const handleClickSaveLocation = () => {

    const locationInput = document.getElementById("name").value
    const addressInput = document.getElementById("address").value
      
    if (locationInput === "" || addressInput === "") {
        window.alert("Please enter a location name as well as the address")
    } else {
        
        setIsLoading(true)

        if(locationId) {
          
            updateLocation({
                id: location.id,
                name: location.name,
                address: location.address
          })
          .then(() => history.push(`/locations/detail/${location.id}`))
        } else {
            addLocation(location)
                .then(() => history.push("/locations"))
        }
      }
    }

    return (
      <form className="locationForm">
          <h2 className="locationForm__title">New Location</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Location name: </label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Address: </label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required className="form-control" placeholder="Address" value={location.address}/>
              </div>
          </fieldset>
          
          <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveLocation()
          }}>
        {locationId ? "Save Location" : "Add Location"}</button>
      </form>
    )
}