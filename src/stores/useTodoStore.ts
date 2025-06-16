import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import type { Task, FilterType } from '../types/todo';

interface TodoState {
    tasks: Task[];
    filter: FilterType;

    // Actions
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    updateTask: (id: string, title: string) => void;
    deleteTask: (id: string) => void;
    clearCompleted: () => void;
    setFilter: (filter: FilterType) => void;

    // Computed
    filteredTasks: () => Task[];
    activeTasksCount: () => number;
    completedTasksCount: () => number;
}

export const useTodoStore = create<TodoState>()(
    persist(
        immer((set, get) => ({
            tasks: [],
            filter: 'all',

            addTask: (title: string) =>
                set((state) => {
                    const newTask: Task = {
                        id: uuidv4(),
                        title: title.trim(),
                        completed: false,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    };
                    state.tasks.push(newTask);
                }),

            toggleTask: (id: string) =>
                set((state) => {
                    const task = state.tasks.find((t) => t.id === id);
                    if (task) {
                        task.completed = !task.completed;
                        task.updatedAt = Date.now();
                    }
                }),

            updateTask: (id: string, title: string) =>
                set((state) => {
                    const task = state.tasks.find((t) => t.id === id);
                    if (task) {
                        task.title = title.trim();
                        task.updatedAt = Date.now();
                    }
                }),

            deleteTask: (id: string) =>
                set((state) => {
                    state.tasks = state.tasks.filter((t) => t.id !== id);
                }),

            clearCompleted: () =>
                set((state) => {
                    state.tasks = state.tasks.filter((t) => !t.completed);
                }),

            setFilter: (filter: FilterType) =>
                set((state) => {
                    state.filter = filter;
                }),

            filteredTasks: () => {
                const state = get();
                switch (state.filter) {
                    case 'active':
                        return state.tasks.filter((t) => !t.completed);
                    case 'completed':
                        return state.tasks.filter((t) => t.completed);
                    default:
                        return state.tasks;
                }
            },

            activeTasksCount: () => {
                const state = get();
                return state.tasks.filter((t) => !t.completed).length;
            },

            completedTasksCount: () => {
                const state = get();
                return state.tasks.filter((t) => t.completed).length;
            },
        })),
        {
            name: 'todo-storage',
        }
    )
); 