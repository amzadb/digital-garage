import { useState } from 'react'
import Car from './Car'
import CarForm from './CarForm'
import './App.css'

function App() {
  // Define the Data - Array of car objects (now using state)
  const [cars, setCars] = useState([
    { id: 1, brand: 'Tesla', model: 'Cybertruck', year: 2024 },
    { id: 2, brand: 'BMW', model: 'X5', year: 2023 },
    { id: 3, brand: 'Audi', model: 'A4', year: 2022 },
    { id: 4, brand: 'Mercedes', model: 'C-Class', year: 2023 },
    { id: 5, brand: 'Ford', model: 'Mustang', year: 2024 }
  ])

  // Delete function to remove a car by ID
  const deleteCar = (carId) => {
    setCars(cars.filter(car => car.id !== carId))
  }

  // Add function to add a new car
  const addCar = (newCar) => {
    setCars(prevCars => [...prevCars, newCar])
  }

  // Update function to update an existing car
  const updateCar = (updatedCar) => {
    setCars(prevCars => 
      prevCars.map(car => 
        car.id === updatedCar.id ? updatedCar : car
      )
    )
  }

  return (
    <div className="garage">
      <h1>🚗 The Digital Garage</h1>
      <div className="garage-stats">
        <p className="total-cars">Total Cars: <span className="count">{cars.length}</span></p>
      </div>
      <p>Welcome to the car dashboard! Add new cars and toggle features for each one.</p>
      
      {/* Car Form Component */}
      <CarForm onAddCar={addCar} />
      
      <div className="cars-grid">
        {cars.map(car => (
          <Car 
            key={car.id}
            id={car.id}
            brand={car.brand}
            model={car.model}
            year={car.year}
            onDelete={deleteCar}
            onUpdate={updateCar}
          />
        ))}
      </div>
      {cars.length === 0 && (
        <div className="empty-garage">
          <p>🏁 Your garage is empty! Add your first car to get started.</p>
        </div>
      )}
    </div>
  )
}

export default App
