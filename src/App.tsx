import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { CheckCircle } from 'lucide-react';

function App() {
  const {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    clearCompleted,
    toggleTask,
  } = useTasks();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <CheckCircle className="text-white" size={48} />
          </div>
          <p className="text-white text-xl font-semibold">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur">
              <CheckCircle className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-white">My Tasks</h1>
          </div>
          <p className="text-white/80">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <TaskForm onAddTask={addTask} />
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>✨ Premium Task Manager - Built with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;
