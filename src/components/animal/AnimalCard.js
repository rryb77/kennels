import React from "react"
import "./Animal.css"
import { Link } from "react-router-dom"

// The Animal card has access to the animal, customer, and location state information.
export const AnimalCard = ({ animal }) => {
    
  return (
    // JSX format to be rendered to the DOM
    
    <section className="animal">
        <h3 className="animal__name">
          <Link to={`/animals/detail/${animal.id}`}>
            { animal.name }
          </Link>
        </h3>
        <div className="animal__breed">{ animal.breed }</div>
    </section>
)
  }