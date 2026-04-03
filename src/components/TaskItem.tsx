import { useState } from 'react';
import { Trash2, Edit2, Check, Calendar } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskItem = ({ task, onToggle, onDelete, onUpdate }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isEditing) {
    return (
      <div className="task-card p-4 mb-3 animate-slide-in-up">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="input-field mb-3"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="input-field resize-none h-16 mb-3"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`task-card p-4 mb-3 transition-all duration-300 animate-slide-in-up ${
        task.completed ? 'bg-gray-50 opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
            task.completed
              ? 'bg-gradient-to-r from-primary to-secondary border-none'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          {task.completed && <Check size={16} className="text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-lg transition-all duration-200 ${
              task.completed
                ? 'line-through text-gray-400'
                : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`text-sm mt-1 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Task Meta */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`badge ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                <Calendar size={14} />
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
