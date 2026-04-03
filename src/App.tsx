import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { CheckCircle2, Zap, Sparkles } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center">
          <div className="inline-block animate-bounce mb-6">
            <div className="glass-effect p-6 rounded-2xl animate-pulse-glow">
              <CheckCircle2 className="text-white drop-shadow-2xl" size={80} />
            </div>
          </div>
          <p className="text-white/95 text-lg sm:text-2xl font-bold tracking-wide">
            ✨ Loading your tasks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-40 -left-40 animate-float"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-40 -right-40 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute w-80 h-80 bg-pink-400/10 rounded-full blur-3xl top-1/2 left-1/2 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Premium Header */}
        <div className="mb-8 sm:mb-12 animate-slide-in-down relative z-20">
          <div className="glass-effect-lg p-6 sm:p-8 md:p-10 mb-4">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="glass-effect p-3 sm:p-4 rounded-2xl group hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="text-white drop-shadow-lg group-hover:animate-pulse-glow" size={40} />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight">
                  My Tasks
                </h1>
                <p className="text-xs sm:text-sm text-white/80 mt-1 font-bold uppercase tracking-widest">
                  ✨ Premium Task Management System
                </p>
              </div>
              <div className="hidden sm:flex">
                <Sparkles className="text-yellow-200 drop-shadow-lg animate-float" size={40} />
              </div>
            </div>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
              🚀 Stay organized and productive with your advanced personal task manager. Create, organize, and track your goals with premium style.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <TaskForm onAddTask={addTask} />
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Premium Footer */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center relative z-20">
          <div className="glass-effect-sm p-6 inline-block">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="text-yellow-200" size={18} />
              <span className="text-white font-bold uppercase tracking-wider text-sm">
                Premium Task Manager
              </span>
              <Zap className="text-yellow-200" size={18} />
            </div>
            <p className="text-white/70 text-xs font-medium">
              Built with React • Tailwind • Advanced Glass UI • 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
