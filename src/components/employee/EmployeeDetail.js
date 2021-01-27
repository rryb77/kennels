import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams, useHistory } from "react-router-dom"

export const EmployeeDetail = () => {
  const { getEmployeeById } = useContext(EmployeeContext)

	const [employee, setEmployee] = useState({})

    const {employeeId} = useParams();
    
    const history = useHistory()

    useEffect(() => {
        console.log("useEffect", employeeId)
        getEmployeeById(employeeId)
        .then((response) => {
        setEmployee(response)
        })
        }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__location">{employee.location?.name}</div>
            <address className="employee__address">{employee.location?.address}</address>
            <br></br>
            <button onClick={() => {
            history.push(`/employees/edit/${employee.id}`)
        }}>Edit</button>
        </section>
  )
}