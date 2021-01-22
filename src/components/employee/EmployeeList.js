import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"
import { useHistory } from "react-router-dom"
import { LocationContext } from "../location/LocationProvider"

export const EmployeeList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getemployees")
    getLocations()
    .then(getEmployees)

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

  return (
        <>
            <h2>Employees</h2>
                <button onClick={() => {history.push("/employees/create")}}>
                    Add Employee
                </button> 
            <div className="employees">
            {console.log(locations)}
            {
                employees.map(employee => {
                    const clinic = locations.find(l => l.id === employee.locationId)

                    return <EmployeeCard key={employee.id}        
                                location={clinic}
                                employee={employee} />
                })
            }
            </div>
        </>
  )
}