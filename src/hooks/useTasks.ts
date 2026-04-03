import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/Task';

const STORAGE_KEY = 'premium-todo-tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Failed to load tasks:', error);
        setTasks([]);
      }
    }
    setLoading(false);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  // CREATE: Add a new task
  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    return newTask;
  }, []);

  // READ: Get all tasks
  const getAllTasks = useCallback(() => {
    return tasks;
  }, [tasks]);

  // READ: Get task by ID
  const getTaskById = useCallback((id: string) => {
    return tasks.find((task) => task.id === id);
  }, [tasks]);

  // UPDATE: Update a task
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  // DELETE: Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  // DELETE: Delete all completed tasks
  const clearCompleted = useCallback(() => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  }, []);

  // Toggle task completion
  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Get tasks by priority
  const getTasksByPriority = useCallback((priority: Task['priority']) => {
    return tasks.filter((task) => task.priority === priority);
  }, [tasks]);

  // Get incomplete tasks
  const getIncompleteTasks = useCallback(() => {
    return tasks.filter((task) => !task.completed);
  }, [tasks]);

  return {
    tasks,
    loading,
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    clearCompleted,
    toggleTask,
    getTasksByPriority,
    getIncompleteTasks,
  };
};
