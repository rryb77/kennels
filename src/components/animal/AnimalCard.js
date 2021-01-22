import React from "react"
import "./Animal.css"

// The Animal card has access to the animal, customer, and location state information.
export const AnimalCard = ({ animal, customer, location }) => (
    // JSX format to be rendered to the DOM
    <section className="animal">
        <h2 className="animal__name">Animal Name: {animal.name}</h2>
        <h3 className="animal__breed">Breed: {animal.breed}</h3>
        <address className="location__address">Location: {location.name}</address>
        <h3 className="customer__name">Customer: {customer.name}</h3>
    </section>
)