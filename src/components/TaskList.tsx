import { useMemo, useState } from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/Task';
import { Filter, Trash2, BarChart3 } from 'lucide-react';

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

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="w-full animate-slide-in-up">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="glass-effect-sm p-4 sm:p-6 text-center hover:glass-effect-lg transition-all duration-300 transform hover:scale-105 cursor-default">
          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            {stats.total}
          </p>
          <p className="text-xs sm:text-sm text-white/80 mt-1 uppercase tracking-wide">Total Tasks</p>
        </div>
        <div className="glass-effect-sm p-4 sm:p-6 text-center hover:glass-effect-lg transition-all duration-300 transform hover:scale-105 cursor-default">
          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            {stats.active}
          </p>
          <p className="text-xs sm:text-sm text-white/80 mt-1 uppercase tracking-wide">Active</p>
        </div>
        <div className="glass-effect-sm p-4 sm:p-6 text-center hover:glass-effect-lg transition-all duration-300 transform hover:scale-105 cursor-default">
          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            {stats.completed}
          </p>
          <p className="text-xs sm:text-sm text-white/80 mt-1 uppercase tracking-wide">Completed</p>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="glass-effect-sm p-4 sm:p-6 mb-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-white/90 flex-shrink-0" />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white/20 text-white/90 border border-white/40 backdrop-blur-md hover:bg-white/30'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 ${
                  filter === 'active'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white/20 text-white/90 border border-white/40 backdrop-blur-md hover:bg-white/30'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 ${
                  filter === 'completed'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white/20 text-white/90 border border-white/40 backdrop-blur-md hover:bg-white/30'
                }`}
              >
                ✓ Done
              </button>
            </div>
          </div>

          <div className="w-full sm:flex-1" />

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <BarChart3 size={18} className="text-white/90 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
              className="input-field py-2 px-3 text-xs sm:text-sm flex-1 sm:flex-none"
            >
              <option value="date">Most Recent</option>
              <option value="priority">By Priority</option>
            </select>
          </div>

          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-red-200 hover:bg-red-400/30 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-xs sm:text-sm font-semibold border border-red-300/50 backdrop-blur-md w-full sm:w-auto justify-center"
            >
              <Trash2 size={16} />
              Clear Done
            </button>
          )}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredAndSortedTasks.length > 0 ? (
          filteredAndSortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <div className="glass-effect-sm p-8 sm:p-12 text-center">
            <p className="text-white/60 text-base sm:text-lg font-medium">
              {filter === 'completed'
                ? '✨ No completed tasks yet!'
                : filter === 'active'
                ? '🎉 All done! No active tasks.'
                : '🚀 No tasks yet. Create one to get started!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
