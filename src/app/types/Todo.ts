export default interface Todo {
  id: string; // 从 Date 改为 uuid
  text: string;
  completed: boolean;
  createAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';