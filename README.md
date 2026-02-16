# 🚗 Digital Garage Dashboard

A modern React-based car management dashboard where you can add, edit, control multiple vehicles, monitor fuel levels, toggle their systems, and manage your virtual garage with full CRUD operations and API integration.

## 🎯 Project Overview

The Digital Garage is an interactive dashboard that displays a collection of cars with individual controls for each vehicle. Users can add new cars, edit existing ones, manage headlights, engine systems, monitor fuel levels, and perform vehicle operations in a beautiful, responsive interface with comprehensive form validation and API data loading.

## ✨ Features

### 🚙 **Vehicle Management**
- **Car Display**: View details for multiple cars including brand, model, year, and fuel level
- **Add New Car**: ➕ Interactive form to add cars with real-time validation (sends POST to `/api/cars`)
- **Edit Car**: ✏️ In-place editing of car details with validation (sends PUT to `/api/cars/:id`)
- **Delete Vehicle**: 🗑️ Remove cars from the garage with icon-only buttons (sends DELETE to `/api/cars/:id`)
- **Live Counter & Search/Filter**: Real-time "Total Cars" counter, search by brand/model, and filter by year—all in a unified control bar
- **API Integration**: Loads car data from backend API with fallback to local JSON

### ⛽ **Fuel Level Management**
- **Fuel Level Display**: Visual fuel percentage with color-coded indicators
- **Fuel Status Icons**: 
  - ⛽ Full tank (70%+) - Green
  - ⚠️ Medium fuel (30-70%) - Yellow 
  - 🚨 Low fuel warning (<30%) - Red
- **Fuel Progress Bar**: Animated visual fuel gauge with gradient effects
- **Fuel Level Input**: Add and edit fuel levels (0-100%) with validation

### 📝 **Form Management & Validation**
- **Real-time Validation**: Instant feedback as you type in forms
- **Smart Error Messages**: Clear, descriptive validation messages with icons
- **Input Constraints**: 
  - Brand: 3-50 characters, letters/spaces/hyphens only
  - Model: 3-50 characters, any characters allowed
  - Year: 4-digit number between 1900 and current year + 2
  - Fuel Level: 0-100% with numeric validation
- **Form States**: Loading states, success feedback, and error handling
- **Responsive Forms**: Mobile-optimized form layouts

### 🌐 **API Integration & Data Management**
- **Backend API Loading**: Fetches car data from your own backend at `/api/cars`
- **Search & Filter**: Instantly search cars by brand/model and filter by year using the top control bar
- **Loading States**: Shows "Loading cars..." while fetching data
- **Error Handling**: Graceful error handling with user-friendly messages
- **Data Persistence**: Local state management with add/edit/delete operations

### 🔧 **Engine Control**
- **Start/Stop Engine**: Independent engine control for each vehicle
- **Visual Feedback**: Animated engine button with pulsing effect when running
- **Status Indicators**: Clear engine status display (🚗 Running / ⏹️ Stopped)

### 💡 **Lighting System**
- **Headlight Toggle**: Turn headlights on/off for each car independently
- **Light Status**: Visual indicators showing light status (🔦 On / 🌑 Off)
- **Dynamic Styling**: Car cards change appearance based on light status

### 🎨 **Smart Visual Design**
- **Color-Coded States**: Different backgrounds and borders for various system combinations:
  - Both engine & lights: Light green with green border
  - Lights only: Light yellow with gold border
  - Engine only: Very light green with teal border
  - Both off: Gray with gray border
- **Responsive Layout**: Mobile-friendly grid that adapts to screen size
- **Smooth Animations**: Hover effects, transitions, and state changes

### 🏁 **Empty State**
- **Friendly Message**: Encouraging message when all cars are removed
- **Visual Design**: Dashed border styling for empty garage indication

## 🏗️ Technical Architecture

### **Component Structure**
```
src/
├── App.jsx          # Main garage component with state management & API integration
├── Car.jsx          # Individual car component with controls & fuel display
├── CarForm.jsx      # Add new car form with validation & fuel input
├── CarEditForm.jsx  # Edit existing car form with validation & fuel editing
├── App.css          # Garage layout, loading states, and error styling
├── Car.css          # Car card, controls, and fuel bar styling
├── CarForm.css      # Form styling and animations
└── data/
    └── cars.json    # Fallback car data with fuel levels
```

### **State Management**
- **App Level**: Cars array with full CRUD operations (Create, Read, Update, Delete)
- **API State**: Loading, error, and data states for external API integration
- **Car Level**: Individual engine, headlight, and fuel level states
- **Form Level**: Form data, validation errors, loading states
- **React Hooks**: useState and useEffect for state and lifecycle management

### **Props Flow**
- **Car Data**: id, brand, model, year, fuelLevel passed from App to Car
- **CRUD Functions**: onDelete, onUpdate, onAddCar callbacks passed from parent
- **Form Props**: car data, onUpdateCar, onCancel for editing
- **Independent State**: Each car maintains its own engine/light status
- **API Integration**: Centralized data fetching from backend API

## 🛠️ Installation & Setup

### Backend API Requirements

- **GET /api/cars**: Returns an array of car objects
- **POST /api/cars**: Accepts a car object (brand, model, year, fuelLevel) and returns the created car with an id
- **PUT /api/cars/:id**: Accepts updated car data (brand, model, year, fuelLevel) and returns the updated car
- **DELETE /api/cars/:id**: Deletes the car with the given id

All endpoints should accept and return JSON. See the frontend code for the expected data structure.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-garage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```


3. **(Optional) Backend API Setup**
   Ensure your backend server (for /api/cars) is running at http://localhost:3000 and has CORS enabled if accessed directly.

4. **Vite Proxy for API (Recommended for Local Dev)**
   The project is configured to proxy `/api` requests to your backend using Vite's dev server. This avoids CORS issues during development.
   - See `vite.config.js` for the proxy setup:
     ```js
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3000',
           changeOrigin: true,
           secure: false,
         },
       },
     },
     ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎮 How to Use

### **Adding New Cars**
1. Click **➕ Add New Car** button at the top of the garage
2. Fill out the form with car details:
   - **Brand**: Car manufacturer (e.g., Tesla, BMW, Ford)
   - **Model**: Car model (e.g., Cybertruck, X5, Mustang)
   - **Year**: Manufacturing year (1900 to 2028)
   - **Fuel Level**: Current fuel percentage (0-100%)
3. See real-time validation as you type
4. Click **🚗 Add Car** to add to your garage
5. Form automatically resets and hides after successful addition

### **Editing Existing Cars**
1. Click **✏️** (edit icon) on any car card
2. Car card transforms into an edit form with pre-filled values
3. Modify any details including fuel level with real-time validation feedback
4. Click **💾 Update Car** to save changes or **Cancel** to discard
5. Car returns to display mode with updated information

### **Managing Vehicles**
1. View all cars in the responsive grid layout with fuel indicators
2. Use the top control bar to see the "Total Cars" count, search by brand/model, and filter by year
3. Use the **🗑️** (delete icon) to remove unwanted vehicles
4. Monitor fuel levels with color-coded progress bars

### **Fuel Management**
1. **View Fuel Status**: Each car displays current fuel percentage with color coding
2. **Fuel Indicators**: 
   - ⛽ Green (70%+): Full tank, good to go
   - ⚠️ Yellow (30-70%): Medium fuel, monitor usage
   - 🚨 Red (<30%): Low fuel, needs refueling soon
3. **Visual Progress Bar**: Animated fuel gauge shows exact fuel level
4. **Edit Fuel Levels**: Update fuel percentages when editing cars

### **Engine Control**
1. Click **🚀 Start** to start the engine (button becomes orange and pulses)
2. Click **🛑 Stop** to stop the engine (button returns to green)
3. Watch the status indicator update in real-time

### **Headlight Control**
1. Click **💡 On** to turn on headlights (car gets yellow glow)
2. Click **💡 Off** to turn off headlights
3. Notice how the car's background and border change

### **System Combinations**
- Try different combinations of engine and lights
- Watch how the car's appearance changes based on active systems
- Each car operates completely independently

## 📱 Responsive Design

- **Desktop**: 3-column car grid with 4-column button layout
- **Large Tablets (900px-1200px)**: 3-column car grid
- **Small Tablets (768px-900px)**: 2-column car grid  
- **Mobile**: 1-column car grid with 2-column button layout for touch interaction
- **Forms**: Stack vertically on mobile for better usability

## 🎨 Color Scheme

- **Add/Edit Forms**: Green gradient theme for positive actions
- **Edit Button**: Blue theme for modification actions
- **Engine Running**: Green/Orange theme with pulsing animation
- **Headlights On**: Yellow/Gold theme with gentle glow
- **Both Active**: Combined green theme indicating full operation
- **Inactive**: Clean gray theme for idle state
- **Delete Action**: Red theme for destructive actions
- **Validation Errors**: Red borders and error messages with warning icons

## 🔧 Built With

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast development and build tool
- **CSS3**: Custom styling with animations and responsive design
- **JavaScript ES6+**: Modern JavaScript features and async/await
- **Form Validation**: Real-time client-side validation with custom rules
- **API Integration**: Fetch API for external data loading with fallback mechanisms
- **JSON Data**: Structured car data with fuel level management

## 🚀 Future Enhancements

- ~~Add new car form~~ ✅ **Completed**
- ~~Edit existing cars~~ ✅ **Completed** 
- ~~Fuel level indicators~~ ✅ **Completed**
- ~~API integration with fallback~~ ✅ **Completed**
- ~~Icon-only edit/delete buttons~~ ✅ **Completed**
- Sound effects for engine/lights
- Car color customization
- Garage themes
- Export/import garage configurations
- ~~Search and filter functionality~~ ✅ **Completed**
- Bulk operations (select multiple cars)
- Car categories and sorting
- Fuel consumption tracking
- Service reminders based on mileage
- Car performance metrics

---

**Enjoy managing your Digital Garage! 🏁**
## 🛠️ CORS Troubleshooting

If you see CORS errors in the browser console when fetching `/api/cars`, ensure:
- Your backend server is running and accessible at the configured target (default: http://localhost:3000)
- The backend sends the correct `Access-Control-Allow-Origin` header (for direct API calls)
- You are using the Vite proxy (recommended) for local development
