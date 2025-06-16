import React, { useMemo } from 'react';
import { useTodoStore } from '../stores/useTodoStore';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
    const tasks = useTodoStore((state) => state.tasks);
    const filter = useTodoStore((state) => state.filter);

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'active':
                return tasks.filter((t) => !t.completed);
            case 'completed':
                return tasks.filter((t) => t.completed);
            default:
                return tasks;
        }
    }, [tasks, filter]);

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