import React, { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Task } from '../types/todo';
import { useTodoStore } from '../stores/useTodoStore';

interface TodoItemProps {
    task: Task;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);
    const inputRef = useRef<HTMLInputElement>(null);

    const { toggleTask, updateTask, deleteTask } = useTodoStore();

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSubmit = () => {
        if (editValue.trim() && editValue.trim() !== task.title) {
            updateTask(task.id, editValue.trim());
        }
        setIsEditing(false);
        setEditValue(task.title);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue(task.title);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                aria-label="タスクの完了状態を切り替え"
            />

            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSubmit}
                    className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="タスクを編集"
                />
            ) : (
                <span
                    onDoubleClick={handleDoubleClick}
                    className={`flex-1 cursor-pointer select-none ${task.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-900'
                        }`}
                >
                    {task.title}
                </span>
            )}

            <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                aria-label="タスクを削除"
            >
                ×
            </button>
        </div>
    );
}; 