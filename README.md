# Premium Todo App ✨

A beautiful, modern todo application built with React, TypeScript, and Tailwind CSS.

## Features

✅ **Full CRUD Operations**
- Create new tasks with title, description, priority, and due date
- Read/view all your tasks in a beautiful interface
- Update tasks on the fly with inline editing
- Delete individual tasks or clear all completed tasks

✅ **Smart Organization**
- Filter tasks (All, Active, Completed)
- Sort by date or priority
- Visual priority badges (Low, Medium, High)
- Task statistics dashboard

✅ **Premium UI/UX**
- Modern gradient background
- Smooth animations and transitions
- Responsive design for all screen sizes
- Glass-morphism effects
- Dark mode optimized

✅ **Persistent Storage**
- All tasks saved to browser localStorage
- Automatic saving on every change
- No backend required

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite** - Lightning fast bundler

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "to do app"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## 🚀 Deployment

Your app is ready to deploy! Choose your platform:

### Vercel (Recommended - 5 minutes)
```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git
git push -u origin main

# 2. Go to https://vercel.com/new
# 3. Connect your repository
# 4. Click Deploy
```

**Auto-deploys** on every push to `main` branch! 🎉

### Docker
```bash
docker build -t todo-app .
docker run -p 3000:3000 todo-app
```

### Other Options
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: See `DEPLOYMENT.md`
- **AWS/Google Cloud**: Use `Dockerfile`

**📖 See `DEPLOYMENT.md` or `DEPLOYMENT_READY.md` for detailed guides!**

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── TaskForm.tsx      # Form to add/edit tasks
│   ├── TaskItem.tsx      # Individual task component
│   └── TaskList.tsx      # Task list with filters
├── hooks/
│   └── useTasks.ts       # Custom hook for task management
├── types/
│   └── Task.ts           # TypeScript interfaces
├── App.tsx               # Main application component
├── index.css             # Global styles
└── main.tsx              # Entry point
```

## How to Use

1. **Add a Task**: Click the input field and type your task. Click the + button or expand for more details.
2. **Edit a Task**: Click the edit icon on any task to modify it.
3. **Complete a Task**: Click the checkbox to mark a task as done.
4. **Delete a Task**: Click the trash icon to remove a task.
5. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks.
6. **Sort Tasks**: Use the dropdown to sort by date or priority.

## CRUD Operations

### Create ✨
- Add new tasks with optional descriptions, priority levels, and due dates
- Tasks are automatically saved to localStorage

### Read 📖
- View all tasks with their details
- Filter and sort for better organization
- See task statistics at a glance

### Update ✏️
- Edit task title and description
- Mark tasks as complete/incomplete
- All changes are saved automatically

### Delete 🗑️
- Delete individual tasks
- Clear all completed tasks at once

## Browser Support

Works in all modern browsers that support:
- ES2020
- CSS Grid & Flexbox
- LocalStorage API

## Future Enhancements

- Dark/Light theme toggle
- Task categories/tags
- Search functionality
- Due date notifications
- Recurring tasks
- Export/Import functionality
- Cloud synchronization

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

Made with ❤️ using React & Tailwind CSS
