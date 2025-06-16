import React from 'react';
import { useTodoStore } from '../stores/useTodoStore';
import type { FilterType } from '../types/todo';

export const TodoFooter: React.FC = () => {
    const {
        filter,
        setFilter,
        activeTasksCount,
        completedTasksCount,
        clearCompleted,
    } = useTodoStore();

    const activeCount = activeTasksCount();
    const completedCount = completedTasksCount();

    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: 'すべて' },
        { key: 'active', label: '未完了' },
        { key: 'completed', label: '完了済み' },
    ];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
                {activeCount > 0 && (
                    <span>
                        {activeCount}個のタスクが残っています
                    </span>
                )}
                {activeCount === 0 && completedCount > 0 && (
                    <span>すべてのタスクが完了しました！</span>
                )}
                {activeCount === 0 && completedCount === 0 && (
                    <span>タスクを追加してください</span>
                )}
            </div>

            <div className="flex items-center gap-2">
                {filters.map((filterItem) => (
                    <button
                        key={filterItem.key}
                        onClick={() => setFilter(filterItem.key)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${filter === filterItem.key
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {filterItem.label}
                    </button>
                ))}
            </div>

            {completedCount > 0 && (
                <button
                    onClick={clearCompleted}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                >
                    完了済みを削除
                </button>
            )}
        </div>
    );
}; 