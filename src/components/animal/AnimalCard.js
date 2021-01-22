import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <h2 className="animal__breed">{animal.breed}</h2>
        <address className="location__address">{location.name}</address>
        <h2 className="customer__name">{customer.name}</h2>
    </section>
)