import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { CheckCircle2, Zap } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-bounce mb-4">
            <CheckCircle2 className="text-white drop-shadow-lg" size={64} />
          </div>
          <p className="text-white/90 text-base sm:text-lg font-semibold tracking-wide">
            Loading your tasks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Floating Particle Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl -top-40 -left-40"></div>
          <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl -bottom-40 -right-40"></div>
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-slide-in-down">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="glass-effect p-2 sm:p-3 rounded-xl sm:rounded-2xl">
              <CheckCircle2 className="text-white drop-shadow-lg" size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                My Tasks
              </h1>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5 font-medium tracking-wide">
                ✨ Premium Task Management
              </p>
            </div>
          </div>
          <p className="text-white/70 text-sm sm:text-base ml-0 leading-relaxed">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
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
        <div className="mt-8 sm:mt-12 md:mt-16 text-center text-white/60 text-xs sm:text-sm font-medium animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap size={16} />
            <span>Premium Task Manager • React • Tailwind • Glass UI</span>
            <Zap size={16} />
          </div>
          <p className="text-white/50 text-xs">
            Built with ❤️ for productivity
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
