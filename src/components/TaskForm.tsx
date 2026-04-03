import { useState } from 'react';
import { Plus, X, Lightbulb } from 'lucide-react';
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
      <div className="glass-effect-lg p-4 sm:p-6 md:p-8 relative overflow-hidden group shimmer">
        <div className="relative z-10">
          <div className="flex gap-2 sm:gap-3 mb-3">
            <div className="relative flex-1">
              <Lightbulb className="absolute left-3 top-3.5 text-yellow-300/60 group-hover:text-yellow-300 transition-colors" size={18} />
              <input
                type="text"
                placeholder="💡 Add a brilliant new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                className="input-field flex-1 pl-10 text-sm sm:text-base font-semibold"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={!title.trim()}
              className="btn-primary px-4 sm:px-8 py-3 sm:py-3 flex-shrink-0"
            >
              <Plus size={22} />
            </button>
          </div>

          {isExpanded && (
            <div className="space-y-4 border-t border-white/30 pt-6 animate-slide-in-down">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-white/90 mb-2 uppercase tracking-wider">
                  📝 Task Description
                </label>
                <textarea
                  placeholder="Add more details about your task (optional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field resize-none h-24 text-sm duration-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-white/90 mb-2 uppercase tracking-wider">
                    🎯 Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as 'low' | 'medium' | 'high')
                    }
                    className="input-field text-sm font-semibold cursor-pointer"
                  >
                    <option value="low">🟦 Low Priority</option>
                    <option value="medium">🟨 Medium Priority (Default)</option>
                    <option value="high">🟥 High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-white/90 mb-2 uppercase tracking-wider">
                    📅 Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="input-field text-sm font-semibold cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-primary flex-1 w-full text-sm sm:text-base flex items-center justify-center gap-2 font-bold uppercase tracking-wider py-3"
                >
                  <Plus size={20} />
                  Create Task Now
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="btn-glass flex-1 w-full text-sm sm:text-base flex items-center justify-center gap-2 font-bold uppercase tracking-wider py-3"
                >
                  <X size={20} />
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
