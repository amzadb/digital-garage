import { useState } from 'react'
import Car from './Car'
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

  return (
    <div className="garage">
      <h1>🚗 The Digital Garage</h1>
      <div className="garage-stats">
        <p className="total-cars">Total Cars: <span className="count">{cars.length}</span></p>
      </div>
      <p>Welcome to your car dashboard! Toggle the headlights for each car.</p>
      
      <div className="cars-grid">
        {cars.map(car => (
          <Car 
            key={car.id}
            id={car.id}
            brand={car.brand}
            model={car.model}
            year={car.year}
            onDelete={deleteCar}
          />
        ))}
      </div>
      {cars.length === 0 && (
        <div className="empty-garage">
          <p>🏁 Your garage is empty! All cars have been removed.</p>
        </div>
      )}
    </div>
  )
}

export default App
