# 🚗 Digital Garage Dashboard

A modern React-based car management dashboard where you can add, edit, control multiple vehicles, toggle their systems, and manage your virtual garage with full CRUD operations.

## 🎯 Project Overview

The Digital Garage is an interactive dashboard that displays a collection of cars with individual controls for each vehicle. Users can add new cars, edit existing ones, manage headlights, engine systems, and perform vehicle operations in a beautiful, responsive interface with comprehensive form validation.

## ✨ Features

### 🚙 **Vehicle Management**
- **Car Display**: View details for multiple cars including brand, model, and year
- **Add New Car**: ➕ Interactive form to add cars with real-time validation
- **Edit Car**: ✏️ In-place editing of car details with validation
- **Delete Vehicle**: 🗑️ Remove cars from the garage with a single click
- **Live Counter**: Real-time "Total Cars" counter that updates automatically

### 📝 **Form Management & Validation**
- **Real-time Validation**: Instant feedback as you type in forms
- **Smart Error Messages**: Clear, descriptive validation messages with icons
- **Input Constraints**: 
  - Brand: 3-50 characters, letters/spaces/hyphens only
  - Model: 3-50 characters, any characters allowed
  - Year: 4-digit number between 1900 and current year + 2
- **Form States**: Loading states, success feedback, and error handling
- **Responsive Forms**: Mobile-optimized form layouts

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
├── App.jsx          # Main garage component with state management
├── Car.jsx          # Individual car component with controls
├── CarForm.jsx      # Add new car form with validation
├── CarEditForm.jsx  # Edit existing car form with validation
├── App.css          # Garage layout and styling
├── Car.css          # Car card and control styling
└── CarForm.css      # Form styling and animations
```

### **State Management**
- **App Level**: Cars array with full CRUD operations (Create, Read, Update, Delete)
- **Car Level**: Individual engine and headlight states
- **Form Level**: Form data, validation errors, loading states
- **React Hooks**: useState for all state management

### **Props Flow**
- **Car Data**: id, brand, model, year passed from App to Car
- **CRUD Functions**: onDelete, onUpdate, onAddCar callbacks passed from parent
- **Form Props**: car data, onUpdateCar, onCancel for editing
- **Independent State**: Each car maintains its own engine/light status

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-garage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎮 How to Use

### **Adding New Cars**
1. Click **➕ Add New Car** button at the top of the garage
2. Fill out the form with car details:
   - **Brand**: Car manufacturer (e.g., Tesla, BMW, Ford)
   - **Model**: Car model (e.g., Cybertruck, X5, Mustang)
   - **Year**: Manufacturing year (1900 to 2028)
3. See real-time validation as you type
4. Click **🚗 Add Car** to add to your garage
5. Form automatically resets and hides after successful addition

### **Editing Existing Cars**
1. Click **✏️ Edit** button on any car card
2. Car card transforms into an edit form with pre-filled values
3. Modify any details with real-time validation feedback
4. Click **💾 Update Car** to save changes or **Cancel** to discard
5. Car returns to display mode with updated information

### **Managing Vehicles**
1. View all cars in the responsive 3-column grid layout
2. Check the "Total Cars" counter at the top
3. Use the 🗑️ Delete button to remove unwanted vehicles

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

## 🚀 Future Enhancements

- ~~Add new car form~~ ✅ **Completed**
- ~~Edit existing cars~~ ✅ **Completed** 
- Fuel level indicators
- Sound effects for engine/lights
- Car color customization
- Garage themes
- Export/import garage configurations
- Search and filter functionality
- Bulk operations (select multiple cars)
- Car categories and sorting

---

**Enjoy managing your Digital Garage! 🏁**
