import Todo from "./Todo";

export type TodoAction = // payload 类型是可选的，可以把里面的字段单独写出
  | { type: "ADD"; payload: { text: string; id: string; createdAt: number } }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "EDIT"; payload: { id: string; text: string } }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "CLEAR_COMPLETED" }; // 清除已完成，无 payload

// 把 ADD 的 payload 转成 Todo（completed 固定 false）
export function createTodoFromAddPayload(
  payload: Extract<TodoAction, { type: "ADD" }>["payload"],
): Todo {
  return {
    id: payload.id,
    text: payload.text,
    completed: false,
    createdAt: payload.createdAt,
  };
}
