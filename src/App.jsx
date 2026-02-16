import { useState, useEffect } from 'react'
import Car from './Car'
import CarForm from './CarForm'
import './App.css'

function App() {
    // Search and filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [yearFilter, setYearFilter] = useState('');
  // Define the Data - Array of car objects (now using state)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch cars data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3000/api/cars?ts=' + new Date().getTime()) // Cache busting with timestamp')
        
        console.log('Fetch response:', response)
        if (!response.ok) {
          setError('Failed to load cars data')
        } else {
          try {
            const data = await response.json()
            console.log('Parsed cars data:', data)
            setCars(data)
          } catch (jsonErr) {
            console.error('Error parsing JSON:', jsonErr)
            setError('Failed to parse cars data')
          }
        }
      } catch (err) {
        console.error('Failed to fetch cars:', err)
        setError('Failed to load cars data')
        // No fallback data; just leave cars as is
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  // Delete function to remove a car by ID (with backend DELETE)
  const deleteCar = async (carId) => {
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete car from backend');
      }
      setCars(prevCars => prevCars.filter(car => car.id !== carId));
    } catch (err) {
      console.error('Error deleting car from backend:', err);
      setCars(prevCars => prevCars.filter(car => car.id !== carId)); // fallback: update local state
    }
  }

  // Add function to add a new car (with backend POST)
  const addCar = async (newCar) => {
    try {
      // Remove id before sending to backend
      const { id, ...carData } = newCar;
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      if (!response.ok) {
        throw new Error('Failed to add car to backend');
      }
      // Use the returned car (with backend-generated id)
      const savedCar = await response.json();
      setCars(prevCars => [...prevCars, savedCar]);
    } catch (err) {
      console.error('Error adding car to backend:', err);
      setCars(prevCars => [...prevCars, newCar]); // fallback: update local state
    }
  }

  // Update function to update an existing car
  // Update function to update an existing car (with backend PUT)
  const updateCar = async (updatedCar) => {
    try {
      // Remove id from body, but use it in URL
      const { id, ...carData } = updatedCar;
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      if (!response.ok) {
        throw new Error('Failed to update car in backend');
      }
      const savedCar = await response.json();
      setCars(prevCars => prevCars.map(car => car.id === savedCar.id ? savedCar : car));
    } catch (err) {
      console.error('Error updating car in backend:', err);
      setCars(prevCars => prevCars.map(car => car.id === updatedCar.id ? updatedCar : car)); // fallback: update local state
    }
  }

  return (
    <div className="garage">
      <h1>🚗 The Digital Garage</h1>
      <p>Welcome to the car dashboard! Add new cars and toggle features for each one.</p>

      {/* Search, Filter, and Add Car Controls Row */}
      <div className="controls-row">
        <div className="add-car-btn-wrapper left-align">
          <CarForm onAddCar={addCar} />
        </div>
        <div className="search-filter-group">
          <p className="total-cars">Total Cars: <span className="count">{cars.length}</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by brand or model..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="year-filter"
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
          >
            <option value="">All Years</option>
            {[...new Set(cars.map(car => car.year))].sort((a, b) => b - a).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          </p>
        </div>

      </div>

      {loading && <div className="loading">Loading cars...</div>}
      {error && <div className="error">{error}</div>}

      {/* Filtered Cars Grid */}
      <div className="cars-grid">
        {cars
          .filter(car => {
            const matchesSearch =
              car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              car.model.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesYear = yearFilter ? String(car.year) === yearFilter : true;
            return matchesSearch && matchesYear;
          })
          .map(car => (
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
      {cars.filter(car => {
        const matchesSearch =
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = yearFilter ? String(car.year) === yearFilter : true;
        return matchesSearch && matchesYear;
      }).length === 0 && !loading && (
        <div className="empty-garage">
          <p>🏁 No cars match your search/filter. Try adjusting your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default App
