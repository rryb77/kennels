import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
    const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const [employee, setEmployee] = useState({
      name: "",
      locationId: 0,
    });

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true)
    const {employeeId} = useParams()

    useEffect(() => {
      getLocations().then(() => {
        if (employeeId) {
          getEmployeeById(employeeId)
          .then(employee => {
            setEmployee(employee)
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
      const newEmployee = { ...employee }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newEmployee[event.target.id] = event.target.value
      // update state
      setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = () => {

      const locationId = parseInt(employee.locationId)

      if (locationId === 0) {

        window.alert("Please select a location")

      } else {
          
        setIsLoading(true)
          employee.locationId = locationId

          if (employeeId){
            
            updateEmployee({
              id: employee.id,
              name: employee.name,
              locationId: locationId
            })
            .then(() => history.push(`/employees/detail/${employee.id}`))

          } else {
            
            addEmployee(employee)
            .then(() => history.push("/employees"))

          }
      } 
    }

    return (
      <form className="employeeForm">
          <h2 className="employeeForm__title">New Employee</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Employee name: </label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select value={employee.locationId} name="locationId" id="locationId" className="form-control" onChange={handleControlledInputChange}>
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveEmployee()
          }}>
        {employeeId ? "Save Employee" : "Add Employee"}</button>
      </form>
    )
}