import React from 'react';
import { useFilteredTasks } from '../stores/useTodoStore';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
    const filteredTasks = useFilteredTasks();

    if (filteredTasks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                タスクがありません
            </div>
        );
    }

    return (
        <div className="space-y-2 mb-6">
            {filteredTasks.map((task) => (
                <TodoItem key={task.id} task={task} />
            ))}
        </div>
    );
}; 