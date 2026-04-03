import { useMemo, useState } from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/Task';
import { Filter, Trash2, BarChart3, TrendingUp } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onClearCompleted: () => void;
}

export const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
  onClearCompleted,
}: TaskListProps) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply filter
    if (filter === 'active') {
      filtered = tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      filtered = tasks.filter((task) => task.completed);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt - a.createdAt;
      } else {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (
          priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      }
    });

    return sorted;
  }, [tasks, filter, sortBy]);

  const completionRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
    highPriority: tasks.filter((t) => !t.completed && t.priority === 'high').length,
  };

  return (
    <div className="w-full animate-slide-in-up space-y-6">
      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card group hover:scale-105 transition-transform duration-300">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-xs uppercase font-bold tracking-widest">Total</span>
              <TrendingUp className="text-cyan-300 opacity-50 group-hover:opacity-100" size={16} />
            </div>
            <p className="stat-number mb-1">
              {stats.total}
            </p>
            <p className="text-white/60 text-xs font-medium">tasks to manage</p>
          </div>
        </div>

        <div className="stat-card group hover:scale-105 transition-transform duration-300">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-xs uppercase font-bold tracking-widest">Active</span>
              <BarChart3 className="text-yellow-300 opacity-50 group-hover:opacity-100" size={16} />
            </div>
            <p className="stat-number bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-1">
              {stats.active}
            </p>
            <p className="text-white/60 text-xs font-medium">pending completion</p>
          </div>
        </div>

        <div className="stat-card group hover:scale-105 transition-transform duration-300">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-xs uppercase font-bold tracking-widest">Done</span>
              <span className="text-green-300 text-xl">✓</span>
            </div>
            <p className="stat-number bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-1">
              {stats.completed}
            </p>
            <p className="text-white/60 text-xs font-medium">tasks completed</p>
          </div>
        </div>

        <div className="stat-card group hover:scale-105 transition-transform duration-300">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-xs uppercase font-bold tracking-widest">Progress</span>
              <span className="text-pink-300 text-xl">📈</span>
            </div>
            <p className="stat-number bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent mb-1">
              {completionRate}%
            </p>
            <p className="text-white/60 text-xs font-medium">completion rate</p>
          </div>
        </div>
      </div>

      {/* Advanced Filter and Sort */}
      <div className="glass-effect-lg p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-white font-bold flex-shrink-0" />
            <div className="flex gap-2 flex-wrap">
              {(['all', 'active', 'completed'] as const).map((btn) => (
                <button
                  key={btn}
                  onClick={() => setFilter(btn)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-110 relative overflow-hidden group ${
                    filter === btn
                      ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-2xl scale-105'
                      : 'glass-effect text-white/90 border border-white/50 hover:border-white/70'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {btn === 'all' && '📋'}
                    {btn === 'active' && '⚡'}
                    {btn === 'completed' && '✅'}
                    {btn.charAt(0).toUpperCase() + btn.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full sm:flex-1" />

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
              className="input-field py-2 px-3 text-xs sm:text-sm flex-1 sm:flex-none"
            >
              <option value="date">🕐 Most Recent</option>
              <option value="priority">🔥 By Priority</option>
            </select>
          </div>

          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="glass-effect text-red-200 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm font-bold border border-red-400/50 w-full sm:w-auto justify-center group hover:scale-105"
            >
              <Trash2 size={16} className="group-hover:rotate-12 transition-transform" />
              Clear Completed
            </button>
          )}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredAndSortedTasks.length > 0 ? (
          filteredAndSortedTasks.map((task, index) => (
            <div key={task.id} style={{animationDelay: `${index * 50}ms`}} className="animate-slide-in-up">
              <TaskItem
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </div>
          ))
        ) : (
          <div className="glass-effect-lg p-12 sm:p-16 text-center">
            <p className="text-white/70 text-base sm:text-lg font-bold mb-2">
              {filter === 'completed'
                ? '✨ No completed tasks yet!'
                : filter === 'active'
                ? '🎉 Amazing! No active tasks.'
                : '🚀 Create your first task to get started!'}
            </p>
            <p className="text-white/50 text-xs sm:text-sm">
              {filter === 'all' && 'Begin organizing your workflow'}
              {filter === 'active' && 'Keep up the momentum!'}
              {filter === 'completed' && 'Complete tasks to see them here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
