import { useMemo, useState } from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/Task';
import { Filter, Trash2 } from 'lucide-react';

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
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="task-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Tasks</p>
        </div>
        <div className="task-card p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
          <p className="text-sm text-gray-600">Active</p>
        </div>
        <div className="task-card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="task-card p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition-colors ${
                  filter === 'active'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition-colors ${
                  filter === 'completed'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
              className="input-field py-1 text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              <Trash2 size={18} />
              Clear
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
          <div className="task-card p-12 text-center">
            <p className="text-gray-400 text-lg">
              {filter === 'completed'
                ? 'No completed tasks yet!'
                : filter === 'active'
                ? 'All done! No active tasks.'
                : 'No tasks yet. Create one to get started!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
