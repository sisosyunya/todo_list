export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
    updatedAt: number;
}

export type FilterType = 'all' | 'active' | 'completed'; 