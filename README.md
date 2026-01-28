# 🚗 Digital Garage Dashboard

A modern React-based car management dashboard where you can control multiple vehicles, toggle their systems, and manage your virtual garage.

## 🎯 Project Overview

The Digital Garage is an interactive dashboard that displays a collection of cars with individual controls for each vehicle. Users can manage headlights, engine systems, and perform vehicle operations in a beautiful, responsive interface.

## ✨ Features

### 🚙 **Vehicle Management**
- **Car Display**: View details for multiple cars including brand, model, and year
- **Delete Vehicle**: Remove cars from the garage with a single click
- **Live Counter**: Real-time "Total Cars" counter that updates automatically

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
├── App.css          # Garage layout and styling
└── Car.css          # Car card and control styling
```

### **State Management**
- **App Level**: Cars array with add/remove functionality
- **Car Level**: Individual engine and headlight states
- **React Hooks**: useState for all state management

### **Props Flow**
- **Car Data**: id, brand, model, year passed from App to Car
- **Delete Function**: onDelete callback passed from parent to child
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

### **Managing Vehicles**
1. View all cars in the responsive grid layout
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

- **Desktop**: Three-column button layout with full features
- **Mobile**: Single-column button layout for touch interaction
- **Tablet**: Adaptive grid that scales with screen size

## 🎨 Color Scheme

- **Engine Running**: Green/Orange theme with pulsing animation
- **Headlights On**: Yellow/Gold theme with gentle glow
- **Both Active**: Combined green theme indicating full operation
- **Inactive**: Clean gray theme for idle state
- **Delete Action**: Red theme for destructive actions

## 🔧 Built With

- **React 18**: Modern React with hooks
- **Vite**: Fast development and build tool
- **CSS3**: Custom styling with animations
- **JavaScript ES6+**: Modern JavaScript features

## 🚀 Future Enhancements

- Add new car form
- Fuel level indicators
- Sound effects for engine/lights
- Car color customization
- Garage themes
- Export/import garage configurations

---

**Enjoy managing your Digital Garage! 🏁**
