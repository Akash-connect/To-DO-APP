import { useState } from 'react';
import { Plus } from 'lucide-react';
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
      <div className="task-card p-6 mb-6">
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="input-field flex-1"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="btn-primary px-6"
          >
            <Plus size={20} />
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 border-t pt-4">
            <textarea
              placeholder="Add description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field resize-none h-20"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as 'low' | 'medium' | 'high')
                  }
                  className="input-field"
                >
                  <option value="low">
                    Low
                  </option>
                  <option value="medium">
                    Medium
                  </option>
                  <option value="high">
                    High
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
