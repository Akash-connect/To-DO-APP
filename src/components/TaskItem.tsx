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
    low: 'bg-blue-400/40 backdrop-blur-md text-blue-100 border border-blue-300/50',
    medium: 'bg-yellow-400/40 backdrop-blur-md text-yellow-100 border border-yellow-300/50',
    high: 'bg-red-400/40 backdrop-blur-md text-red-100 border border-red-300/50',
  };

  const priorityEmoji = {
    low: '🟦',
    medium: '🟨',
    high: '🟥',
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
  };

  if (isEditing) {
    return (
      <div className="task-card-glass p-4 sm:p-6 mb-3 animate-slide-in-up">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="input-field mb-3 text-sm sm:text-base"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="input-field resize-none h-20 mb-3 text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="btn-primary flex-1 text-sm sm:text-base py-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="btn-glass flex-1 text-sm sm:text-base py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`task-card-glass p-4 sm:p-5 mb-3 transition-all duration-300 animate-slide-in-up group hover:backdrop-blur-xl ${
        task.completed ? 'bg-white/60 opacity-80' : 'hover:shadow-2xl'
      }`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center transform ${
            task.completed
              ? 'bg-gradient-to-r from-primary to-secondary border-none scale-110'
              : 'border-white/50 hover:border-white/80 hover:scale-110'
          }`}
        >
          {task.completed && <Check size={16} className="text-white font-bold animate-pulse-glow" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0 py-0.5">
          <h3
            className={`font-bold text-base sm:text-lg transition-all duration-300 break-words ${
              task.completed
                ? 'line-through text-gray-500'
                : 'text-gray-900 group-hover:text-gray-950'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`text-xs sm:text-sm mt-2 leading-relaxed break-words ${
                task.completed ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-800'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Task Meta */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`badge ${priorityColors[task.priority]}`}>
              {priorityEmoji[task.priority]} {task.priority}
            </span>
            {task.dueDate && (
              <span className="flex items-center gap-1.5 text-xs text-white/90 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30">
                <Calendar size={14} />
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 sm:p-2.5 text-blue-300 hover:bg-blue-400/30 rounded-lg transition-all duration-200 hover:scale-110 backdrop-blur-md"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 sm:p-2.5 text-red-300 hover:bg-red-400/30 rounded-lg transition-all duration-200 hover:scale-110 backdrop-blur-md"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
