import { useState, useEffect } from 'react'
import Car from './Car'
import CarForm from './CarForm'
import fallbackCarsData from './data/cars.json'
import './App.css'

function App() {
  // Define the Data - Array of car objects (now using state)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch cars data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/cars')
        
        if (!response.ok) {
          // If the cars endpoint doesn't exist, use fallback data
          setCars(fallbackCarsData)
        } else {
          const data = await response.json()
          setCars(data)
        }
      } catch (err) {
        console.error('Failed to fetch cars:', err)
        setError('Failed to load cars data')
        // Use fallback data on error
        setCars(fallbackCarsData)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

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
      
      {loading && <div className="loading">Loading cars...</div>}
      {error && <div className="error">{error}</div>}
      
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
            fuelLevel={car.fuelLevel}
            onDelete={deleteCar}
            onUpdate={updateCar}
          />
        ))}
      </div>
      {cars.length === 0 && !loading && (
        <div className="empty-garage">
          <p>🏁 Your garage is empty! Add your first car to get started.</p>
        </div>
      )}
    </div>
  )
}

export default App
