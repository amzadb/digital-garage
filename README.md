# Project: The Digital Garage
## Goal: Create a dashboard that displays a list of cars. Users should be able to "Toggle the Headlights" for each car individually.

## The Component Architecture
Break the task into three files (or sections):

App.js (The Garage): Holds the "State" (the list of car data).

Car.js (The UI): A functional component that displays the car's info.

Car.css (The Styling): To make the "Headlights" look different when they are on.

## The Requirements (The "Acceptance Criteria")
Task A: Define the Data
In your App.js, create an array of objects. Each object should have:

id: A unique number.
brand: e.g., "Tesla".
model: e.g., "Cybertruck".
year: e.g., 2024.

Task B: Create the Car Component
Your Car component should receive Props for the brand, model, and year.

Add State: Use useState to track a boolean called headlightsOn (default is false).

Add Interactivity: Create a button that says "Switch Lights." When clicked, it flips the state.

Task C: Dynamic Styling
Make the background color of the car card change if the headlights are on.

Hint: Use a ternary operator: style={{ backgroundColor: headlightsOn ? 'yellow' : 'white' }}
