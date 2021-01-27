import React from "react"
import "./Location.css"
import { Link } from "react-router-dom"

export const LocationCard = ({location}) => (
    <section className="location">
        <h3 className="location__name">
          <Link to={`/locations/detail/${location.id}`}>
            { location.name }
          </Link>
        </h3>
        <h4 className="location__employees">Employees: {location.employees.length}</h4>
        <h4 className="location__animals">Animals: {location.animals.length}</h4>
    </section>
)