import React, { useState, type KeyboardEvent } from 'react';
import { useTodoStore } from '../stores/useTodoStore';

export const TodoInput: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useTodoStore((state) => state.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTask(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="新しいタスクを入力してください..."
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                autoFocus
            />
        </form>
    );
}; 