import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { AnimalForm } from "./animal/AnimalForm"
import { EmployeeForm } from "./employee/EmployeeForm"
import { LocationForm } from "./location/LocationForm"
import { AnimalDetail } from "./animal/AnimalDetail"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>        

                <CustomerProvider>
                    <LocationProvider>
                        <Route exact path="/animals">
                            <AnimalList />
                        </Route> 
                        
                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>

                        <Route exact path="/animals/detail/:animalId(\d+)">
                            <AnimalDetail />
                        </Route>
                    </LocationProvider>
                </CustomerProvider>
            </AnimalProvider>

            {/* Render the animal list when http://localhost:3000/customers */}
            <CustomerProvider>  
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>  

            {/* Render the animal list when http://localhost:3000/employees */}
            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeList />
                    </Route>

                    <Route exact path="/employees/create">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>

            {/* Render the animal list when http://localhost:3000/locations */}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>

                <Route exact path="/locations/create">
                        <LocationForm />
                    </Route>
            </LocationProvider>
        </>
    )
}