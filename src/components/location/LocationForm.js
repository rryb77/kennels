import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { LocationContext } from './LocationProvider'


export const LocationForm = () => {
    
    const { location, getLocations, addLocation } = useContext(LocationContext)
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [locationAdd, setLocation] = useState({
      name: "",
      address: "",
    });

    const history = useHistory();

    /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
    useEffect(() => {
      getLocations()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newLocation = { ...locationAdd }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newLocation[event.target.id] = event.target.value
      // update state
      setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form
    
      const locationInput = document.getElementById("name").value
      const addressInput = document.getElementById("address").value
      
      if (locationInput === "" || addressInput === "") {
        window.alert("Please enter a location name as well as the address")
      } else {
        addLocation(locationAdd)
        .then(() => history.push("/locations"))
      }
    }

    return (
      <form className="locationForm">
          <h2 className="locationForm__title">New Location</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Location name: </label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={locationAdd.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Address: </label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required className="form-control" placeholder="Address" value={locationAdd.address}/>
              </div>
          </fieldset>
          
          <button className="btn btn-primary"
            onClick={handleClickSaveLocation}>
            Save Location
          </button>
      </form>
    )
}