import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      completed: false,
      dueDate: dueDate || undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-slide-in-up">
      <div className="glass-effect-lg p-4 sm:p-6 md:p-8 mb-6 relative overflow-hidden group">
        {/* Background shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -left-full group-hover:left-full transition-all duration-1000 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex gap-2 sm:gap-3 mb-3">
            <input
              type="text"
              placeholder="✨ Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="input-field flex-1 text-sm sm:text-base"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!title.trim()}
              className="btn-primary px-3 sm:px-6 py-3 sm:py-3 flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          </div>

          {isExpanded && (
            <div className="space-y-4 border-t border-white/20 pt-4 animate-slide-in-down">
              <textarea
                placeholder="Add description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field resize-none h-20 text-sm"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as 'low' | 'medium' | 'high')
                    }
                    className="input-field text-sm"
                  >
                    <option value="low">🟦 Low</option>
                    <option value="medium">🟨 Medium</option>
                    <option value="high">🟥 High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="btn-primary flex-1 w-full text-sm sm:text-base"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="btn-glass flex-1 w-full text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
