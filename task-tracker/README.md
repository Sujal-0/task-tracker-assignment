- Task Tracker

This is a Task Tracker web app that I built as part of the technical assignment for Penthara Technologies.
The goal was to create a simple and responsive task management app where users can add, edit, delete, and manage tasks efficiently.
The app supports CRUD operations, filtering, and local storage persistence.

- Features

Add, edit, and delete tasks

Mark tasks as complete or pending

Filter tasks by All, Completed, or Pending

Responsive and clean layout

Stores all data in localStorage

Timestamp showing when the task was created and last updated

Small confirmation texts and tooltips for better user experience

I have followed Proper code structure and naming conventions as mentioned in the assignment guidelines

src/
│
├── assets/ # Fonts, images, global styles
├── components/ # Reusable components like TaskForm, TaskList, TaskItem, Header, Footer, FilterBar
├── pages/ # Page-level components (Home)
├── services/ # Handles data persistence using localStorage
├── utils/ # Helper functions (like uid generator)
│
├── App.jsx
└── index.jsx

- Libraries Used

Tailwind CSS:
Used for designing the layout quickly and maintaining a consistent, responsive UI without writing a lot of custom CSS.

Lucide React:
Used for icons like Add, Edit, Delete, and Heart. They are lightweight, simple, and visually consistent with the design.

React Hot Toast:
Used to show success and error messages when adding, editing, or deleting tasks. It provides quick feedback to users.

Radix UI Tooltip:
Used to show tooltips on hover over action icons (Edit/Delete) for better accessibility and UX.

- Components Overview

Header.jsx – Displays the app title with a simple highlighted design

TaskForm.jsx – Handles adding and editing tasks, includes smooth expansion animation for the input field

TaskList.jsx – Renders the list of tasks with props from state

TaskItem.jsx – Displays individual tasks, checkboxes, and action buttons

FilterBar.jsx – Allows switching between All, Completed, and Pending tasks

Footer.jsx – A responsive footer that always stays at the bottom

taskService.js – Manages all localStorage data handling for persistence

- How to Run the Project

1. Clone the Repository

git clone https://github.com/Sujal-0/task-tracker.git

2. Navigate to the Project Directory

cd task-tracker

3. Install Dependencies

npm install
or
npm i

4. Start the Development Server

npm run dev

5. Open the App in the Browser

http://localhost:5173

Task Tracker - Assignment Submission
Submitted by: Sujal Singh
For: Penthara Technologies (Software Developer Intern)
Submission Date: November 3, 2025
